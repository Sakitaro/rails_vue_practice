import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleItems: [],
    // 旧vue課題
    todos: [],
    // Vue x Rails課題
    // ユーザーエラーメッセージを保存
    userError: null,
    tasks: [],
  },
  getters: {
    sampleItems: state => state.sampleItems,
    // 旧vue課題
    allTodos: state => state.todos,
    // Vue x Rails課題
    userError: state => state.userError,
    tasks: state => state.tasks,
  },
  actions: {
    // サンプル
    async loadSampleItems({commit}) {
      const res = await api.get('sample_items');
      const sampleItems = res.data.sample_items;
      commit('setSampleItems', { sampleItems });
      return sampleItems;
    },
    async addSampleItem({commit}, { text }) {
      const res = await api.post('sample_items', { sample_item: { text: text }});
      const sampleItem = res.data.sample_item;
      commit('addSampleItem', { sampleItem });
      return sampleItem;
    },
    // 旧vue課題
    async loadTodos({ commit, state }) {
      if (state.todos.length === 0) {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todos = await res.json();
        commit('setTodos', { todos });
      }
      return state.todos;
    },
    
    async addTodo({ commit }, newTodo) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
              title: newTodo,
              completed: false,
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      });
  
      if (response.ok) {
          const todo = await response.json();
          console.log("POST request result:", todo);
          commit('addTodo', { todo });
          return todo;
      }
  },
  // Vue x Rails課題
  // ログイン系
  async signIn({ commit }, { credentials }) {
    try {
      console.log(credentials);
      const response = await api.post('/sign_in', { session: credentials });

      if (response.data.success) {
        router.push({ name: 'MyPage' });
      } else {
        commit('setUserError', { message: response.data.message });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  async signUp({ commit }, { userInfo }) {
    try {
      console.log(userInfo);
      const response = await api.post('/sign_up', { user: userInfo });

      if (response.data.success) {
        router.push({ name: 'MyPage'});
      } else {
        commit('setUserError', { message: response.data.message});
      }
    } catch (error) {
      console.error('An error occurred:', error)
      if (error.response && error.response.data) {
        commit('setUserError', { message: error.response.data.message });
      }
    }
  },
  async signOut({ commit }){
    try{
      const response = await api.delete('/sign_out')

      if (response.data.success) {
        router.push({  name: 'RailsVue' });
      } else {
        commit('setUserError', { message: response.data.message });
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      if (error.response && error.response.data) {
        commit('setUserError', { message: error.response.data.message });
      }
    }
  },
  // タスク系
  async loadTasks({ commit }) {
    const response = await api.get('/tasks');
    const tasks = response.data.tasks;
    commit('setTasks', { tasks });
    return tasks
  },
  async addTask({ commit }, taskData) {
    const response = await api.post('/tasks', { task: taskData });
    const task = response.data.task;
    commit('addTask', { task });
    return task
  },
  
    
  },
  mutations: {
    // サンプル
    setSampleItems(state, { sampleItems }) {
      state.sampleItems = sampleItems;
    },
    addSampleItem(state, { sampleItem }) {
      state.sampleItems.push(sampleItem);
    },
    // 旧vue課題
    setTodos(state, { todos }) {
      state.todos = todos;
    },
    addTodo(state, { todo }) {
      state.todos.unshift(todo);
    },
    // Vue x Rails課題
    setUserError(state, { message }) {
      state.userError = message;
    },
    setTasks(state, { tasks }) {
      state.tasks = tasks;
    },
    addTask(state, { task }) {
      state.tasks.unshift(task);
    },
  },
  modules: {}
})
