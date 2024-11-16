<template>
  <div class="d-flex justify-content-between nickname-change mb-4">
    <p>Nickname</p>
    <a href="#" @click.prevent="openModal">
      <div>
        <span class="winnie-color-gray">{{ originalNickname }}</span>
        <img src="@/assets/images/icon/ze-arrow 1 Copy 2.svg" alt="" />
      </div>
    </a>
    <!-- Change Nickname start -->
    <div
      class="modal fade"
      id="changeNicknameModal"
      tabindex="-1"
      aria-labelledby="changeNicknameModalLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog modal-fullscreen winnie-dialog-right">
        <div class="modal-content">
          <div
            class="modal-header d-flex align-items-center justify-content-center py-3"
          >
            <h5 class="modal-title fs-5 fw-bold" id="changeNicknameModalLabel">
              Nickname
            </h5>
            <a
              href="#"
              class="position-absolute start-0 ms-3"
              data-bs-dismiss="modal"
              @click.prevent="closeModal"
              aria-label="Close"
              ><img src="@/assets/images/icon/ze-arrow-left 1.svg" alt="arrow"
            /></a>
          </div>

          <div class="modal-body px-4">
            <div class="nickname-change my-3">
              <label
                style="font-size: 14px"
                for="inputNickname"
                class="form-label"
                >Your nickname is used for trading messages</label
              >
              <input
                type="text"
                id="inputNickname"
                class="form-control"
                placeholder="Enter your new nickname"
                aria-describedby="nicknameHelpBlock"
                v-model="nickname"
              />
              <div
                v-if="nickname"
                id="nicknameHelpBlock"
                class="form-text white"
              >
                {{ nickname.length }}/20
              </div>
            </div>
            <div class="mt-4">
              <p class="mb-2 winnie-color-gray" style="font-size: 14px">
                * Your nickname can be edited 3 more time(s) this year
              </p>
              <p class="winnie-color-gray" style="font-size: 14px">
                * Make sure your nickname does not contain disrespectful
                language, our official names (i.e. product names), or names of
                other trading platforms
              </p>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button
                  class="mb-3 save-btn btn btn-primary w-75"
                  type="button"
                  @click="saveNickname"
                >
                  Submit
                </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Change Nickname start -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import modules from "@/services/modules";
import { ElMessage } from "element-plus";

const modalRef = ref(null);
let bootstrapModal = null;

const {
  userInfo: { changeNickname },
} = modules;

const props = defineProps({
  isOpen: Boolean,
  userName: String,
});

const emit = defineEmits(["closeModal", "upDataNickname"]);
const modal = ref(null); // 用於存儲模態框的 DOM 元素

const nickname = ref(props.userName); // 用戶當前暱稱（即輸入框中顯示的暱稱）
const originalNickname = ref(""); // 存儲用戶上次保存的暱稱

// 監聽 props.userName 的變化，並更新本地的 userName
watch(
  () => props.userName,
  (newUserName) => {
    nickname.value = newUserName;
    originalNickname.value = newUserName;
  }
);

// 保存並發送 API 請求
const saveNickname = async () => {
  // 判斷新暱稱是否與上次暱稱一樣
  if (nickname.value === originalNickname.value) {
    ElMessage({
      message: "The nickname is the same as before, no changes needed.",
      type: "warning",
      duration: 3000,
    });
    return;
  }

  // 有一個判斷沒寫  如果這次的暱稱與上次暱稱一樣 則不發送api
  if (!nickname.value) {
    ElMessage({
      message: "Nickname cannot be empty.",
      type: "error",
      duration: 3000,
    });
    return;
  }

  try {
    // 調用 API 發送修改請求
    await changeNickname(nickname.value);
    emit("upDataNickname", nickname.value);

    // 更新 originalNickname 為新的暱稱
    originalNickname.value = nickname.value;
    ElMessage.success("Nickname updated successfully!");
    // 更新完成後，關閉模態框
    closeModal();
  } catch (error) {
    console.error("Failed to update nickname. Please try again later.", error);
    ElMessage.error("Failed to update nickname. Please try again later.");
  }
};

const openModal = () => {
  if (bootstrapModal) {
    bootstrapModal.show();
  }
};

const closeModal = () => {
  if (bootstrapModal) {
    bootstrapModal.hide();
  }
};

onMounted(() => {
  // 初始化 Bootstrap 的 Modal
  const modalElement = modalRef.value;
  if (modalElement) {
    bootstrapModal = new window.bootstrap.Modal(modalElement); // 初始化模態框
  }
});
</script>

<style scoped>
.modal-content {
  background-color: #181a20;
  color: #f8f8f8;
}

.modal.fade .winnie-dialog-right {
  transform: translateX(100%);
}

.modal.show .winnie-dialog-right {
  transform: translateX(0);
}

.white {
  color: white;
}

.nickname-change a {
  color: #f8f8f8;
}

#changeNicknameModal input {
  background-color: transparent;
  border: 1px solid #414d5a;
  color: #f8f8f8;
}

#changeNicknameModal input:focus {
  box-shadow: none;
}

#changeNicknameModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
  height: 47px;
}

#changeNicknameModal .modal-header {
  border-bottom: none;
}

#changeNicknameModal .modal-footer {
  border-top: none;
}

#changeNicknameModal .modal-header {
  border-bottom: 1px solid #414d5a;
}

#nicknameHelpBlock {
  color: #bbb;
  text-align: end;
}
</style>
