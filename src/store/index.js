import Vue from 'vue'
import Vuex from 'vuex'
import { generateRandomArray } from '@/helpers';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sortingArray: []
  },
  getters: {
    sortingArray: state => {
      return state.sortingArray;
    },
  },
  mutations: {
    generateSortingArray: (state) => {
      state.sortingArray = generateRandomArray(50);
    },
    setSortingArray: (state, payload) => {
      state.sortingArray = [...payload];
    }
  }
})
