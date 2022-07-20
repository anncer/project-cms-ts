import type { RouteRecordRaw } from "vue-router";
// import Layout from '@/layout'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/main",
    component: () => import("@/views/main/index.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  // }
];

export default routes;
