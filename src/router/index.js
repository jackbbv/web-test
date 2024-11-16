import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/index/index.vue";
import Login from "../views/login/index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  { path: "/test-login", name: "testLogin", component: Login },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register/index.vue"),
    props: (route) => ({ referralCode: route.query.join }),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/forgotPassword/index.vue"),
  },
  {
    path: "/manage-password",
    name: "managePassword",
    component: () => import("../views/managePassword/index.vue"),
  },
  {
    path: "/game/game-list",
    name: "Game",
    component: () => import("../views/game/index.vue"), // 動態導入
  },
  {
    path: "/game/:gameId", // 動態路由，使用遊戲的 ID 作為參數
    name: "GameDetail",
    component: () => import("../views/gameDetail/GameDetailPage.vue"), // 動態導入
    props: true, // 傳遞路由參數作為組件的 props
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../views/Leaderboard/index.vue"), // 動態導入
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard/index.vue"), // 動態導入
  },
  {
    path: "/account/deposit",
    name: "Deposit",
    component: () => import("../views/deposit/index.vue"), // 動態導入
  },
  {
    path: "/account/withdrawal",
    name: "Withdrawal",
    component: () => import("../views/withdrawal/index.vue"), // 動態導入
  },
  {
    path: "/account/reward/:rewardId?",
    name: "Reward",
    component: () => import("../views/reward/index.vue"), // 動態導入
    props: true, // 傳遞路由參數作為組件的 props
  },
  {
    path: "/account/setting",
    name: "accountSetting",
    component: () => import("../views/accountSetting/index.vue"), // 動態導入
  },
  {
    path: "/terms-of-service",
    name: "AccountSetting",
    component: () => import("../views/terms/index.vue"), // 動態導入
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about/index.vue"), // 動態導入
  },
  {
    path: "/messages",
    name: "Messages",
    component: () => import("../views/messages/index.vue"), // 動態導入
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
