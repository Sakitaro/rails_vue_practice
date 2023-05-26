import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleItems: [],
  },
  getters: {
    sampleItems: state => state.sampleItems,
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
  },
  mutations: {
    setSampleItems(state, { sampleItems }) {
      state.sampleItems = sampleItems;
    },
    addSampleItem(state, { sampleItem }) {
      state.sampleItems.push(sampleItem);
    },
  },
  modules: {}
})
