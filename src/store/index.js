import Vue from "vue";
import Vuex from "vuex";
import api from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    repo: null,
    forks: [],
    favList: JSON.parse(localStorage.getItem("favList")) || [],
    searchRequest: "",
  },
  mutations: {
    setRepo(state, payload) {
      state.repo = payload;
    },
    setForks(state, payload) {
      state.forks = payload;
    },
    addToFavList(state, payload) {
      state.favList.push(payload);
    },
    removeFromFavList(state, payload) {
      const index = state.favList.findIndex(item => item === payload);
      if (index > -1) {
        state.favList.splice(index, 1);
      }
    },
    updateFavList(state) {
      window.localStorage.favList = JSON.stringify(state.favList);
    },
    clearForks(state) {
      state.forks = [];
    },
    setSearchRequest(state, payload) {
      state.searchRequest = payload;
    },
  },
  actions: {
    getRepo({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}`, {params: payload}).then(res => {
        commit("setRepo", res.data);
      }).catch(() => {
        commit("setRepo", null);
      });
    },
    getForks({commit}, payload) {
      return api.get(`repos/${payload.owner}/${payload.repo}/forks`, {params: payload}).then(res => {
        commit("setForks", res.data);
      });
    },
    addToFavList({commit}, payload) {
      commit("addToFavList", payload);
      commit("updateFavList", payload);
    },
    removeFromFavList({commit}, payload) {
      commit("removeFromFavList", payload);
      commit("updateFavList", payload);
    },
  },
  getters: {
    repoName: (state) => {
      return state.repo?.name || null;
    },
    ownerLogin: (state) => {
      return state.repo?.owner.login || null;
    },
    forksCount: (state) => {
      return state.repo?.forks_count || null;
    },
    forks: (state) => {
      return state.forks;
    },
    favList: (state) => {
      return state.favList;
    },
    searchRequest: (state) => {
      return state.searchRequest;
    },
  },
});
