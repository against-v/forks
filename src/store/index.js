import Vue from "vue";
import Vuex from "vuex";
import api from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    forks: [],
  },
  mutations: {
    setForks(state, data) {
      state.forks = data;
    },
  },
  actions: {
    getForks({commit}, payload) {
      const owner = payload.owner;
      const repo = payload.repo;
      console.log(payload);
      return api.get(`repos/${owner}/${repo}`, {params: payload}).then(res => {
        console.log(res);
        commit("setForks", res.data);
      });
    },
  },
  modules: {
  },
});
