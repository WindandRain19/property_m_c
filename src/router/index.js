import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // 重定位到登录界面
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "Login",
    component: (resolve) => require(["@/views/Login"], resolve),
  },
  {
    path: "/Home",
    name: "Home",
    component: (resolve) => require(["@/views/Home"], resolve),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
