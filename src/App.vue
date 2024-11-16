<template>
  <Header v-if="isMobile || !isShow" />
  <router-view />
  <Footer v-if="!isShow" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watchEffect, onBeforeUnmount } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// get current route
const route = useRoute();
const router = useRouter();
const isShow = ref(true);
const isMobile = ref(false);

watchEffect(() => {
  const pathsToHideHeader = [
    "/manage-password",
    "/forgot-password",
    "/register",
    "/login",
  ];

  isShow.value = pathsToHideHeader.includes(route.path);
});

// 檢測螢幕大小並切換樣式
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 991.98; // 設定768px為手機和桌面的臨界點
};

const idleTimeout = 10*60*1000; // 閒置若10分鐘
let idleTimer = null;

const resetIdleTimer = () => {
  if (idleTimer) {
    clearTimeout(idleTimer);
  }
  idleTimer = setTimeout(() => {
    logout();
  }, idleTimeout);
};

const logout = () => {
  // 清除 token 或登出邏輯
  localStorage.removeItem("token"); // 或 sessionStorage
  router.push("/login");
};

const trackUserActivity = () => {
  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('keydown', resetIdleTimer);
};

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice); // 監聽視窗大小變化
  trackUserActivity();
  resetIdleTimer(); // 當頁面加載時啟動計時
});

onBeforeUnmount(() => {
  // 清理監聽事件
  document.removeEventListener('mousemove', resetIdleTimer);
  document.removeEventListener('keydown', resetIdleTimer);
  if (idleTimer) {
    clearTimeout(idleTimer);
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
