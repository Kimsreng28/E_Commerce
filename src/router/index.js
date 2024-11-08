import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signIn",
      name: "signIn",
      component: () => import("../views/SignIn/SignInView.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/SignUp/SignUpView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileAccountView.vue"),
    },
  ],
});

export default router;
