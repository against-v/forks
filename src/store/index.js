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
    getForksCount({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}`, {params: payload}).then(res => {
        return res.data.forks_count;
      });
    },
    getForks({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}/forks`, {params: payload}).then(res => {
        return res.data;
      });
    },
  },
  modules: {
  },
});
