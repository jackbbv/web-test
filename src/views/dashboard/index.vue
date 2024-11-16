<template>
  <div>
    <MobileDashboard v-if="isMobile" />
    <DesktopDashboard />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide } from "vue";
import MobileDashboard from "./MobileDashboard.vue";
import DesktopDashboard from "./DesktopDashboard.vue";
import modules from "../../services/modules";

const {
  userInfo: { getAvatarList },
} = modules;

// 監聽螢幕變化起
const isMobile = ref(window.innerWidth < 575.98);

const handleResize = () => {
  isMobile.value = window.innerWidth < 575.98;
};

const AvatarImageList = ref([]);

const getAvatarImageList = async () => {
  try {
    const res = await getAvatarList();
    AvatarImageList.value = res.data.data;
  } catch (error) {
    console.log("GetAvatarImage failed", error);
  }
};

// 監聽頁面寬度變化
onMounted(() => {
  window.addEventListener("resize", handleResize);
  getAvatarImageList();
});

// 组件銷毀時移除監聽
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
// 監聽螢幕變化 始

provide("AvatarImageList", AvatarImageList);
</script>

<style scoped></style>
