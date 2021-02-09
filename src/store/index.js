import Vue from "vue";
import Vuex from "vuex";
import api from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    repo: null,
    forks: [],
  },
  mutations: {
    setRepo(state, payload) {
      state.repo = payload;
    },
    setForks(state, payload) {
      state.forks = payload;
    },
  },
  actions: {
    getRepo({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}`, {params: payload}).then(res => {
        commit("setRepo", res.data);
      });
    },
    getForks({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}/forks`, {params: payload}).then(res => {
        commit("setForks", res.data);
      });
    },
  },
  getters: {
    repoName: (state) => {
      return state.repo.name;
    },
    ownerLogin: (state) => {
      return state.repo.owner.login;
    },
    forksCount: (state) => {
      return state.repo.forks_count;
    },
    forks: (state) => {
      return state.forks;
    },
  },
});
