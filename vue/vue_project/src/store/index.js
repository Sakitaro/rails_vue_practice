import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from '@/router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleItems: [],
    // 旧vue課題
    todos: [],
    // Vue x Rails課題
    user: null,
    tasks: [],
    allTasks: [],
    userError: null,
    authMessage: null,
    
  },
  getters: {
    sampleItems: state => state.sampleItems,
    // 旧vue課題
    allTodos: state => state.todos,
    // Vue x Rails課題
    isLoggedIn: state => !!state.user,
    user: state => state.user,
    userError: state => state.userError,
    tasks: state => state.tasks,
    allTasks: state => state.allTasks,
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
        commit('setUser', { user: response.data.session });
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
        commit('setAuthMessage', null);
        commit('clearUser'); 
        window.sessionStorage.removeItem('user');
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
  setAuthMessage({ commit }, message) {
    commit('setAuthMessage', message);
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
  async toggleTaskCompleted({ commit }, task) {
    const response = await api.put(`/tasks/${task.id}`, { completed: !task.completed });
    commit('updateTask', response.data.task);
  },
  async loadAllTasks({ commit }) {
    const response = await api.get('/alltasks');
    const allTasks = response.data.allTasks;
    commit('setAllTasks', { allTasks });
    return allTasks
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
    setUser(state, { user }) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setAuthMessage(state, message) { 
      state.authMessage = message;
    },
    setUserError(state, { message }) {
      state.userError = message;
    },
    setTasks(state, { tasks }) {
      state.tasks = tasks;
    },
    setAllTasks(state, { allTasks }) {
      state.allTasks = allTasks
    },
    addTask(state, { task }) {
      state.tasks.unshift(task);
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        // spliceメソッドで対象のタスクを更新後のタスクに置き換える
        state.tasks.splice(index, 1, task);
      }
    },
  },
  modules: {},
  plugins: [createPersistedState(
  {
   paths: ['user'],
   storage: window.sessionStorage
  })],
})
