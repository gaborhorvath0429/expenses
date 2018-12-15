import axios from 'axios'
import Vue from 'nativescript-vue'

export const state = {
  expenses: [],
  statistics: []
};

export const getters = {
  expenses: state => state.expenses,
  statistics: state => state.statistics
}

export const mutations = {
  set(state, expenses) {
    Vue.set(state, 'expenses', expenses);
  },

  add(state, expense) {
    state.expenses.unshift(expense);
  },

  remove(state, expense) {
    state.expenses.splice(state.expenses.map(exp => exp._id).indexOf(expense._id), 1);
  }
};

export const actions = {
  getAll: async ({ commit }) => {
    console.log('Getting all expenses', process.env.API_URL);
    let expenses = await axios.get(process.env.API_URL + '/expense');
    commit('set', expenses.data);
    return Promise.resolve();
  },

  add: async ({ commit }, expense) => {
    console.log('Adding expense');
    let { category, amount } = expense;
    return axios.post(process.env.API_URL + '/expense', { category, amount }).then(res => {
      commit('add', res.data);
      return Promise.resolve();
    }).catch(e => {
      console.log(e);
      return Promise.reject(e);
    })
  },

  remove: async ({ commit }, expense) => {
    console.log('Removing expense');
    return axios.delete(process.env.API_URL + '/expense/' + expense._id).then(res => {
      commit('remove', expense);
      return Promise.resolve();
    }).catch(e => {
      console.log(e);
      return Promise.reject(e);
    })
  }
};