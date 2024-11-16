<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="nicknameReviseModal"
    tabindex="-1"
    aria-labelledby="nicknameReviseModalLabel"
    role="dialog"
    style="display: block"
  >
      <!-- Custom Modal Backdrop -->
      <div v-if="isOpen" class="custom-backdrop"></div>

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title ps-4" id="nicknameReviseModalLabel">
            Nickname
          </h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div class="modal-body winnie-container-nickname mx-auto">
          <div class="nickname-change mb-3">
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
            <div id="nicknameHelpBlock" class="form-text">
              {{ nickname.length }}/20
            </div>
          </div>
          <div class="nickname-notice">
            <p style="font-size: 14px">
              Your nickname can be edited 3 more time(s) this year
            </p>
            <div
              class="nickname-notice-bk-color mt-2 mb-3 p-2 d-flex justify-content-between"
            >
              <p style="font-size: 12px">
                <i
                  class="fa-solid fa-circle-exclamation me-2 winnie-text-white"
                ></i>
              </p>
              <p
                class="text-start deposit-notice-color"
                style="font-size: 12px"
              >
                Make sure your nickname does not contain disrespectful language,
                our official names (i.e. product names), or names of other
                trading platforms
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer mx-auto mb-3">
          <button
            type="button"
            class="btn btn-primary save-btn"
            @click="saveNickname"
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
import modules from "@/services/modules";
import { ElMessage } from "element-plus";

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
const originalNickname = ref(""); // 存儲用戶上次保存的暱稱 （作為比較用）

// 監聽 props.userName 的變化，並更新本地的 userName
watch(
  () => props.userName,
  (newUserName) => {
    nickname.value = newUserName;
    originalNickname.value = newUserName; // 確保兩者同步，作為比較基準
  }
);

onMounted(() => {});

const closeModal = () => {
  emit("closeModal");
};

// 保存並發送 API 請求
const saveNickname = async () => {
  if (nickname.value === originalNickname.value) {
    ElMessage({
      message: "The nickname is the same as before, no changes needed.",
      type: "warning",
      duration: 3000,
    });
    return;
  }

  if (!nickname.value) {
    ElMessage({
      message: "Nickname cannot be empty.",
      type: "error",
      duration: 3000,
    });
    return;
  }
  // 用戶輸入 -> 比較 -> 發送請求 -> 更新狀態。
  try {
    // 調用 API 發送修改請求
    await changeNickname(nickname.value);
    emit("upDataNickname", nickname.value);

    // 更新 originalNickname 為最新的暱稱（下次比較用）
    originalNickname.value = nickname.value;
    ElMessage.success("Nickname updated successfully!");
    // 更新完成後，關閉模態框
    closeModal();
  } catch (error) {
    console.error("Failed to update nickname. Please try again later.", error);
  }
};
</script>

<style scoped>
#nicknameReviseModal .modal-content {
  background-color: #2b3139;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

#nicknameReviseModal .modal-header {
  border-bottom: none;
}

#nicknameReviseModal .modal-footer {
  border-top: none;
}

#nicknameReviseModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
}

#nicknameReviseModal button.save-btn:hover {
  background-color: #1e2329;
}

@media (min-width: 575.98px) {
  #nicknameReviseModal .modal-dialog {
    max-width: 500px;
  }
}

#nicknameReviseModal .winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

#nicknameReviseModal .winnie-btn-close:hover {
  background-color: #414d5a;
}

.nickname-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

#nicknameHelpBlock {
  color: #bbb;
  text-align: end;
}

#nicknameReviseModal input {
  background-color: transparent;
  border: 1px solid #414d5a;
  color: #f8f8f8;
}

#nicknameReviseModal input::placeholder {
  color: #bbb;
}

#nicknameReviseModal input:focus {
  outline: none;
  box-shadow: none;
}

#nicknameReviseModal .winnie-container-nickname {
  width: 80%;
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
