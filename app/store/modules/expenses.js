import axios from 'axios'

export const state = {
  expenses: {},
};

export const mutations = {
  set(state, expenses) {
    state.expenses = expenses;
  },

  add(state, { category, amount }) {
    if (!state.expenses[category]) state.expenses[category] = [];
    state.expenses[category].push(Number(amount));
  },
};

export const actions = {
  getAll: async ({ commit }) => {
    let expenses = await axios.get(process.env.API_URL + '/expense');
    commit('set', expenses.data);
    return Promise.resolve();
  },

  add: async ({ commit }, expense) => {
    let { category, amount } = expense;
    return axios.post(process.env.API_URL + '/expense', { category, amount }).then(res => {
      commit('add', { category, amount });
      return Promise.resolve();
    }).catch(e => {
      console.log(e);
      return Promise.reject(e);
    })
  },
};