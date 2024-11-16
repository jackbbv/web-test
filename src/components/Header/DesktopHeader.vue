<template>
  <!-- 電腦版nav 從hunting game到月亮icon -->
  <div class="collapse navbar-collapse">
    <!-- hunting game 到 leaderboard -->
    <NavMenu :links="navLinks" />

    <!-- 右側區塊 使用者個人資訊 -->
    <div class="d-flex align-items-center">
      <!-- 根據是否登入顯示不同內容 -->
      <!-- 使用 UserDropdown 組件 -->
      <template v-if="loggedIn">
        <UserDropdown
          :userId="userId"
          :balance="balance"
          :userAvatar="userAvatar"
          @logout="handleLogout"
        />
      </template>

      <template v-else>
        <!-- 未登入時顯示登入和註冊按鈕 -->
        <LoginButtons loginButtonClass="fs-6" signupButtonClass="fs-6" />
      </template>

      <!-- 語系及導覽 -->
      <!-- <div class="d-flex"> -->

        <!-- 語系下拉式 -->
        <!-- <DropdownMenu
          menuId="dropdownMenuLanguage"
          :iconSrc="mdLanguage"
          iconAlt="Language Icon"
          :items="languageOptions"
          @select="switchLanguage"
          dropdownClass="dropdown-language"
        /> -->

          <!-- 小鈴鐺下拉式 -->
          <DropdownMenu
          menuId="dropdownMenuNotifications"
          :iconSrc="notificationImage"
          iconAlt="Notifications Icon"
          :items="notificationItem"
          :showMoreButton="true"
          :hasNewNotification="true"
          @select="navigateTo"
          dropdownClass="dropdown-notification"
        />

        <!-- 導覽下拉式 -->
        <DropdownMenu
          menuId="dropdownMenuFaq"
          :iconSrc="faqImage"
          iconAlt="FAQ Icon"
          :items="faqOptions"
          @select="navigateTo"
          dropdownClass="dropdown-faq"
        />

        <!-- 切換主題顏色 月亮icon -->
        <!-- <a href="#">
          <img src="@/assets/images/icon/arcoDesign-moon.svg" alt="" />
        </a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import UserDropdown from "@/components/Header/UserDropdown.vue";
import NavMenu from "@/components/Header/NavMenu.vue";
import LoginButtons from "@/components/Header/LoginButtons.vue";
import DropdownMenu from "@/components/Header/DropdownMenu.vue";
import mdLanguage from "@/assets/images/icon/md-language.svg";
import notificationImage from "@/assets/images/icon/riFill-notification-2-fill 1.svg"
import faqImage from "@/assets/images/icon/antFill-question-circle.svg";
import mdInfo from "@/assets/images/icon/md-info.svg";
import zeLabelImage from "@/assets/images/icon/ze-label-o 1.svg";

const languageOptions = [
  { label: "English", code: "en" },
  { label: "繁體中文", code: "zh" },
];

const notificationItem = [
  {
    label: "Withdrawal Successful",
    time: "11:05",
    description: "You have successfully withdrawn 200 ...",
    href: "/messages",
  },
  {
    label: "Deposit Successful",
    time: "11:05",
    description: "You have successfully deposit 200 US...",
    href: "/messages",
  },
  {
    label: "Prize Claimed!",
    time: "10/26/2024",
    description: "Congratulations! You’ve won 3 BNB, w...",
    href: "/messages",
  },
];

const faqOptions = [
  {
    label: "About Tyche1",
    href: "/about",
    icon: mdInfo,
  },
  {
    label: "Terms of Service",
    href: "/terms-of-service",
    icon: zeLabelImage,
  },
];

const props = defineProps({
  navLinks: Array,
  loggedIn: Boolean,
  userId: String,
  balance: Number,
  userAvatar: String,
  showMoreButton: Boolean,
});

const emit = defineEmits(["logout", "switchLanguage"]);

const handleLogout = () => {
  emit("logout");
};

const switchLanguage = (item) => {
  emit("switchLanguage");
  // 根據選擇的語言進行切換
  console.log("Switch language:", item.code);
};

const navigateTo = (item) => {
  // 導向相應的頁面
  window.location.href = item.href;
};
</script>

<style scoped>

</style>
