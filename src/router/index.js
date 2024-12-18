import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        breadcrumb: "Home",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: {
        breadcrumb: "Contact",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        breadcrumb: "About",
      },
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
      path: "/resetPassword",
      name: "forgotPassword",
      component: () => import("@/components/Auth/Forgot_Component.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileAccountView.vue"),
      meta: {
        breadcrumb: "Profile",
      },
    },
    {
      path: "/wishList",
      name: "wishList",
      component: () => import("../views/WishListView.vue"),
      meta: {
        breadcrumb: "WishList",
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: {
        breadcrumb: "Cart",
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckOutView.vue"),
      meta: {
        breadcrumb: "CheckOut",
      },
    },
    {
      path: "/category",
      name: "category",
      component: () => import("../views/CategoryView.vue"),
      props: true,
      meta: {
        breadcrumb: "Category",
      },
    },
    {
      path: "/category/:id",
      name: "productDetail",
      component: () => import("../views/ProductDetailView.vue"),
      props: true,
      meta: {
        breadcrumb: "Product Detail",
      },
    },
    {
      path: "/coupon",
      name: "coupon",
      component: () => import("../views/CouponView.vue"),
      meta: {
        breadcrumb: "Coupon Service",
      },
    },
<<<<<<< HEAD
    // {
    //   path: "/service",
    //   name: "Service",
    //   component: () => import("../views/ServiceView.vue"),
    //   meta: {
    //     breadcrumb: "Service",
    //   },
    // },
=======
>>>>>>> 2bed8f10156df8942715d12671c12276a1e8d607
  ],
});

export default router;
