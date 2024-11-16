<template>
  <div>
    <header
      class="position-relative"
      style="max-width: 575.98px; border-bottom: 1px solid #2b3139"
    >
      <div class="d-flex align-items-center justify-content-center py-3">
        <router-link to="/dashboard">
          <img
            src="@/assets/images/icon/ze-arrow-left 1.svg"
            alt=""
            class="position-absolute start-0 ms-3"
        /></router-link>
        <p class="mb-0 fs-5 fw-bold">Setting</p>
      </div>
    </header>

    <div class="winnie-account" style="max-width: 575.98px">
      <div class="personal-info text-center">
        <div class="avatar-photo">
          <img
            class="my-3 winnie-personal-photo"
            :src="userInfo?.avatarUrl"
            alt=""
          />
          <p class="fs-4 fw-bold">{{ userInfo?.name }}</p>
          <p class="fs-6 fw-bold winnie-color-gray">
            UID {{ userInfo?.userId }}
            <img
              class="ms-2"
              src="@/assets/images/icon/md-content_copy 1.svg"
              alt=""
              @click="copyUserId"
            />
          </p>
        </div>
      </div>
      <div class="winnie-profile container mt-5">
        <p class="winnie-color-gray mb-4">Profile</p>
        <div class="d-flex justify-content-between email-account mb-4">
          <p>Email</p>
          <p>{{ userInfo?.email }}</p>
        </div>
        <!-- 引入 AvatarChange 組件 -->
        <AvatarChange
          :userImage="userInfo.avatarUrl"
          @avatarChanged="onAvatarChanged"
        />

        <div class="d-flex justify-content-between login-pw-change mb-4">
          <p>Log in Password</p>
          <router-link to="/manage-password">
            <img src="@/assets/images/icon/ze-arrow 1 Copy 2.svg" alt="" />
          </router-link>
        </div>
        <NickNameChange
          :userName="userInfo.name"
          @upDataNickname="onNicknameChanged"
        />
        <div class="d-flex justify-content-start log-out-link mb-4">
          <a href="account/login">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

import AvatarChange from "./components/AvatarChange.vue";
import NickNameChange from "./components/NickNameChange.vue";

const userStore = useUserStore();
const userInfo = ref({});

const loadUserInfo = async () => {
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
};

const onAvatarChanged = (newAvatarUrl) => {
  userStore.updateAvatar(newAvatarUrl);
};

// 被子組件通知更換新名稱
const onNicknameChanged = (newNickname) => {
  userStore.updateNickname(newNickname);
};

const isCopyCoolDown = ref(false); // 狀態變量來控制冷卻時間

// 定義一個方法來複製 userId 到剪貼板
const copyUserId = async () => {
  if (isCopyCoolDown.value) return;

  try {
    await navigator.clipboard.writeText(userInfo.value.userId);
    ElMessage({
      message: "User ID copied successfully.",
      type: "success",
    });
    isCopyCoolDown.value = true;

    setTimeout(() => {
      isCopyCoolDown.value = false;
    }, 3000);
  } catch (error) {
    ElMessage.error({
      message: "Copy failed, please try again!",
      duration: 3000,
      grouping: true,
    });
  }
};

onMounted(async () => {
  await loadUserInfo();
});
</script>

<style scoped>
.winnie-account .log-out-link a {
  color: #f8f8f8;
}

.winnie-dialog-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-bottom {
  transform: translateY(100%);
}

.modal.show .winnie-dialog-bottom {
  transform: translateY(0);
}

.winnie-personal-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

#changeAvatarModal .modal-dialog,
#changeAvatarModal .modal-content {
  background-color: #2b3139;
  color: #f8f8f8;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

#changeAvatarModal button.save-btn,
#changeNicknameModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 280px;
  border: none;
  border-radius: 10px;
  height: 47px;
}

#nicknameRevisePhoneModal .modal-dialog .modal-content {
  background-color: #181a20;
}

#changeNicknameModal .modal-header {
  border-bottom: 1px solid #414d5a;
}
</style>
