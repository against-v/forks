import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: {name: "Home"},
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results",
    name: "Results",
    component: () => import(/* webpackChunkName: "results" */ "../views/Results.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
