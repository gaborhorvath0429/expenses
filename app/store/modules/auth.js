import axios from 'axios'

export const state = {
  user: null,
  token: null,
};

export const mutations = {
  logout(state) {
    state.user = null;
    state.token = null;
  },
  login(state, { user, token }) {
    state.user = user;
    state.token = token;
  }
};

export const actions = {
  logout: ({ commit }) => commit("logout"),

  login: ({ commit }, user) => {
    let {email, password} = user;
    return axios.post(process.env.API_URL + '/users/signin', {email, password}).then(res => {
      commit("login", { user, token: res.data.token });
      return Promise.resolve({ ...user });
    }).catch(e => {
      console.log(e);
      return Promise.reject(e);
    })
  },
};