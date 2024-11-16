<template>
  <!-- 以下為手機版 漢堡排展開的modal-start -->
  <div class="modal winnie-modal" tabindex="-1" id="navbarModal" ref="navbarModal">
    <div class="modal-dialog modal-sm-half modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 以下為登入後出現 -->
          <template v-if="loggedIn">
            <!-- 個人資料-照片 & id -->
            <div class="personal-info">
              <div class="personal-photo text-center">
                <img :src="userAvatar" @error="setAltImg" alt=""/>
              </div>
              <p class="personal-id text-center fs-5 fw-bold mt-2">
                {{ userId }}
              </p>
            </div>
            <!-- 目前餘額 -->
            <div class="personal-balance-info mt-4">
              <div
                class="d-flex justify-content-between align-items-center mx-3"
              >
                <p class="personal-balance-title fs-5 fw-bold mb-0">
                  Total Balance
                </p>
              </div>
              <div
                class="d-flex justify-content-start align-items-center mt-3 mx-3"
              >
                <p class="personal-balance fw-bold mb-0 fs-1">
                  <img
                    class="me-2"
                    src="@/assets/images/icon/balance-icon.png"
                    alt=""
                  />{{
                    isBalanceHidden
                      ? maskBalance
                      : balance.toLocaleString("en-US")
                  }}
                </p>
                <a href="#" @click.stop.prevent="toggleBalanceVisibility">
                  <img
                    class="img-fluid ms-2 mb-1 eye-img"
                    style="max-width: 20px; vertical-align: middle"
                    :src="isBalanceHidden ? eyeCloseIcon : eyeIcon"
                    alt="Eye Icon"
                  />
                </a>
              </div>
            </div>
            <!-- deposit & dashboard btn -->
            <div class="personal-function mt-4">
              <div class="row justify-content-center">
                <div class="col-5 text-center personal-function-deposit mx-2">
                  <router-link
                    to="/account/deposit"
                    class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                    style="color: #f8f8f8; height: 100px"
                    @click="closeModal"
                  >
                    <img
                      src="@/assets/images/icon/semiDesign-semi-icons-plus.svg"
                      alt=""
                    />
                    <p class="mt-2 mb-0 fs-5 fw-bold">Deposit</p>
                  </router-link>
                </div>
                <div class="col-5 text-center personal-function-dashboard mx-2">
                  <router-link
                    to="/dashboard"
                    class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                    style="color: #f8f8f8; height: 100px"
                    @click="closeModal"
                  >
                    <img src="@/assets/images/icon/md-dashboard.svg" alt="" />
                    <p class="mt-2 mb-0 fs-5 fw-bold">Dashboard</p>
                  </router-link>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- 未登入時，要出現log in & sign up btn -->
            <div class="row">
              <LoginButtons
                loginButtonClass="fs-5 fw-bold winnie-width-48"
                signupButtonClass="fs-5 fw-bold winnie-width-48"
                :dismissModal="true"
              />
            </div>
          </template>

          <div class="accordion mt-4" id="accordionNav">
            <!-- 每個選項都是一個item, 分別是Hunt/treasure spot/leaderboard -->
            <MobileNavMenu
              v-for="(item, index) in navPhoneLinks"
              :key="item.id"
              :item="item"
              :index="index"
              :close-modal="closeModal"
            />

            <!-- FAQ以及他的下拉式選項 -->
            <div class="accordion-item">
              <div class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed fs-5 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-circle-question"
                    class="me-3"
                  />FAQ
                </button>
              </div>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionNav"
              >
                <div class="accordion-body pt-0">
                  <ul class="ps-0">
                    <li class="my-2 py-2 text-start">
                      <router-link 
                      class="fs-5" 
                      to="/about"
                      @click="closeModal"
                      >
                        <img
                          style="width: 24px"
                          src="@/assets/images/icon/md-info.svg"
                          alt=""
                        />
                        About Tyche1
                      </router-link>
                    </li>
                    <li class="my-2 py-2 text-start">
                      <router-link 
                      class="fs-5" 
                      to="/terms-of-service"
                      @click="closeModal"
                      >
                        <img
                          style="width: 24px"
                          src="@/assets/images/icon/ze-label-o 1.svg"
                          alt=""
                        />
                        Terms of Service
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 語言下拉式 尚未完成 先隱藏 -->
            <!-- <div class="accordion-item mt-3">
              <div class="accordion-header" id="headingFive">
                <select
                  class="form-select ms-3 w-auto"
                  aria-label="Default select example"
                >
                  <option selected>English</option>
                  <option value="1">繁體中文</option>
                </select>
              </div>
            </div> -->
            <!-- 登出按鈕 -->
            <div class="accordion-item mt-3" v-if="loggedIn">
              <div class="accordion-header" id="headingSeven">
                <a class="accordion-button fs-5 fw-bold no-arrow" data-bs-dismiss="modal" @click="handleLogout"
                  ><font-awesome-icon
                    icon="fa-solid fa-power-off"
                    class="me-3"
                  />Log Out</a
                >
              </div>
            </div>
            <!-- 更換主題色的選項 尚未完成 先隱藏-->
            <!-- <div class="accordion-item mt-3">
              <div class="form-check form-switch me-auto ms-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  <img src="@/assets/images/icon/md-wb_sunny.svg" alt="" />
                </label>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal-end -->

  <!-- 漢堡排btn start -->
  <button
    class="custom-navbar-toggler d-lg-none"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#navbarModal"
  >
    <span class="custom-navbar-toggler-icon"></span>
    <span class="custom-navbar-toggler-icon"></span>
    <span class="custom-navbar-toggler-icon"></span>
  </button>
  <!-- 漢堡排btn end -->
</template>

<script setup>
import { ref, computed } from "vue";
import LoginButtons from "@/components/Header/LoginButtons.vue";
import MobileNavMenu from "./MobileNavMenu.vue";
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const navbarModal = ref(null);
const isBalanceHidden = ref(true);

const closeModal = () => {
  const modalInstance = bootstrap.Modal.getInstance(navbarModal.value); // 獲取模態框實例
  if (modalInstance) {
    modalInstance.hide(); // 隱藏模態框
  }
};

// 計算屬性，用來生成與金額位數相同的星號
const maskBalance = computed(() => {
  return "*".repeat(6); // 生成為6* 
});

// 切換顯示/隱藏金額的狀態
const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value; // 切換隱藏狀態
};

const props = defineProps({
  loggedIn: Boolean,
  userId: String,
  balance: Number,
  userAvatar: String,
  navPhoneLinks: Array,
});

const emit = defineEmits([
  // "recharge",
  "logout",
  // "switchLanguage",
  // "navigateTo",
]);

const handleLogout = () => {
  emit("logout");
};

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
} 
</script>

<style scoped>
.modal-header,
.modal-body {
  background: #181A20;
}

.modal-header {
    border-bottom: none;
}

.modal-content {
  border: 2px solid #F8F8F8 !important;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

.modal-footer {
    border-top: none;
}

@media (min-width: 575.98px) and (max-width: 991.98px) {
  .modal-sm-half {
    max-width: 50%;
    margin-left: auto;
    margin-right: 0;
  }
}
.winnie-modal .accordion-item {
  background-color: transparent;
  border: none;
}

.winnie-modal .accordion-button {
  background-color: transparent;
  color: #f8f8f8;
}

.winnie-modal .accordion-button:focus {
  outline: none;
  box-shadow: none;
}

.winnie-modal .accordion {
  --bs-accordion-border-color: transparent;
}

.winnie-modal .accordion .form-select:focus {
  border-color: transparent;
  box-shadow: none;
}

/* 漢堡選單 */
.custom-navbar-toggler {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
}

.custom-navbar-toggler-icon {
  width: 20px;
  height: 1px;
  background-color: #f8f8f8;
  display: block;
  margin: 5px auto;
  transition: background-color 0.2s;
}

.custom-navbar-toggler:focus {
  outline: none;
}

/* 存取款邊框 */
.personal-function-deposit {
  border-radius: 10px;
  background-color: #2b3139;
}

.personal-function-dashboard {
  border-radius: 10px;
  background-color: #2b3139;
}

.form-check-input:checked {
  background-color: #FCD535;
  border: #2b3139;
}

.form-check-input:not(:checked) {
  background-color: #414D5A;
  border: #2b3139;
}

.form-check-input:focus {
  outline: none;
  box-shadow: none;
}

.form-check-input:active {
  outline: none;
  box-shadow: none;
}

.form-check-input:checked {
  outline: none;
  box-shadow: none;
}

.form-check-input:hover {
  outline: none;
  box-shadow: none;
}

.form-check-input {
  outline: none;
  box-shadow: none;
}

.accordion-button.collapsed::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.no-arrow::after {
  display: none;
}

a.fs-5 {
  color: #F8F8F8;
  font-weight: 600;
}

.personal-photo img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover
}
</style>
