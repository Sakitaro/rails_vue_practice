import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleItems: [],
    // 旧vue課題
    todos: [],
  },
  getters: {
    sampleItems: state => state.sampleItems,
    // 旧vue課題
    allTodos: state => state.todos,
  },
  actions: {
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
  }
  
    
  },
  mutations: {
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
  },
  modules: {}
})
