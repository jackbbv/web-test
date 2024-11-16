<template>
  <div>
    <div
      v-if="isOpen"
      ref="modal"
      class="modal fade show"
      id="avatarModal"
      tabindex="-1"
      aria-labelledby="avatarModalLabel"
      role="dialog"
      style="display: block"
    >
      <!-- Custom Modal Backdrop -->
      <div v-if="isOpen" class="custom-backdrop"></div>

      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title ps-2 ps-lg-3" id="avatarModalLabel">
              Change profile picture
            </h5>
            <button
              type="button"
              class="btn winnie-btn-close"
              data-bs-dismiss="modal"
              @click="closeModal"
              aria-label="Close"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <div class="modal-body container">
            <div class="text-center mt-1 mb-5">
              <img
                style="width: 65px"
                class="selected-avatar"
                :src="selectedAvatarUrl"
                @error="setAltImg"
                alt="Selected Avatar"
              />
            </div>
            <div class="select-avatar">
              <p class="mb-3 fw-bold">Select avatar</p>
              <div class="d-flex">
                <div class="row gy-3">
                  <div
                    class="col-3 text-center"
                    v-for="avatar in avatars"
                    :key="avatar.id"
                  >
                    <img
                      :src="avatar.url"
                      alt="Avatar"
                      @click="selectAvatar(avatar)"
                      class="avatar-img"
                      :class="{ 'avatar-img': selectedAvatarId === avatar.id }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer mx-auto mb-3">
            <button
              type="button"
              class="btn btn-primary save-btn"
              @click="saveAvatar"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, inject } from "vue";
import { useUserStore } from "@/stores/user";
import modules from "@/services/modules";
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const { changeAvatar } = modules.userInfo; // api

const props = defineProps({
  isOpen: Boolean,
  // avatars: Array,
});
const emit = defineEmits(["closeModal", "avatarChanged"]);

const avatars = inject("AvatarImageList");
const userStore = useUserStore();
const selectedAvatarId = ref(null); // 定義選中的頭像 ID 和 URL
const selectedAvatarUrl = ref(""); // 默認顯示第一個頭像
const modal = ref(null); // 用於存儲模態框的 DOM 元素

// 加載用戶信息的函數
const loadUserInfo = async () => {
  await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
  selectedAvatarUrl.value = userStore.userInfo?.avatarUrl;
};

// 當用戶選擇頭像時更新
const selectAvatar = (avatar) => {
  selectedAvatarId.value = avatar.id;
  selectedAvatarUrl.value = avatar.url;
};

// 當點擊 Save 按鈕時保存變更
const saveAvatar = async () => {
  if (selectedAvatarId.value) {
    try {
      await changeAvatar(selectedAvatarId.value);
      console.log("Avatar changed successfully!");
      closeModal();
      emit("avatarChanged", selectedAvatarUrl.value);
    } catch (error) {
      console.error("Failed to change avatar:", error);
    }
  } else {
    console.log("Please select an avatar.");
  }
};

onMounted(() => {
  loadUserInfo(); // 載入用戶信息
});

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
#avatarModal {
  color: #f8f8f8;
}

#avatarModal .modal-content {
  background-color: #2b3139;
  max-height: 500px !important;
  overflow-y: auto;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

#avatarModal .modal-header {
  border-bottom: none;
}

#avatarModal .modal-body img {
  width: 48px;
}

#avatarModal .modal-body img:hover {
  cursor: pointer;
}

.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

#avatarModal .modal-footer {
  border-top: none;
}

#avatarModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
}

#avatarModal button.save-btn:hover {
  background-color: #1e2329;
}

@media (min-width: 575.98px) {
  #avatarModal .modal-dialog {
    max-width: 350px;
  }
}

#avatarModal .winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

#avatarModal .winnie-btn-close:hover {
  background-color: #414d5a;
}

@media (min-width: 575.98px) {
  #avatarModal .modal-dialog {
    max-width: 350px;
  }
}

#avatarModal .modal-content::-webkit-scrollbar {
  width: 5px;
  background-color: #2b3139;
}

#avatarModal .modal-content::-webkit-scrollbar-thumb {
  background-color: #1e2329;
  border-radius: 4px;
}
#avatarModal .modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.selected-avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
}

.custom-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
