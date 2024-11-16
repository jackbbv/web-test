<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="insufficientBalanceModal"
    tabindex="-1"
    aria-labelledby="insufficientBalanceModalLabel"
    aria-hidden="true"
    role="dialog"
    style="display: block"
  >
    <!-- Custom Modal Backdrop -->
    <div v-if="isOpen" class="custom-backdrop"></div>
  
    <!-- modal -->
    <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header pb-0 d-flex justify-content-between ms-4">
          <h5
            class="modal-title deposit-title fw-bold"
            id="insufficientBalanceModalLabel"
          >
            {{ title }}
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
        <div class="modal-body px-sm-5">
          <div class="px-3 px-sm-0">
            <DepositPage>
              <template v-slot:extra-content>
                <div class="d-flex mb-3">
                  <img
                    class="me-2"
                    style="max-width: 24px"
                    src="@/assets/images/icon/md-warning 1.svg"
                    alt=""
                  />
                  <p>Increase Balance</p>
                </div>
              </template>
            </DepositPage>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import DepositPage from "@/components/DepositPage.vue";

const modal = ref(null); // 用於存儲模態框的 DOM 元素

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  title: String,
});

// console.log("isOpen prop in InsufficientFundsModal:", props.isOpen);

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
#insufficientBalanceModal .modal-header {
  border-bottom: none;
}

#insufficientBalanceModal .modal-footer {
  border-top: none;
}

#insufficientBalanceModal .modal-dialog {
  max-width: 576px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .modal-dialog {
    max-width: 750px;
  }
}

#insufficientBalanceModal a p {
  color: #f8f8f8;
}

#insufficientBalanceModal a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

#insufficientBalanceModal a button:hover,
#insufficientBalanceModal a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

#insufficientBalanceModal .vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

#insufficientBalanceModal .vertical-line.active {
  background-color: #f8f8f8;
}

#insufficientBalanceModal .divider {
  width: 1px;
  height: 30px;
  background-color: #bbb;
  margin: 0px 30px;
}

@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container {
    display: flex;
    align-items: flex-start;
    /* margin-bottom: 30px; */
  }
}

#insufficientBalanceModal .circle-number {
  width: 40px;
  height: 40px;
  background-color: #2b3139;
  color: #3d3d3d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

#insufficientBalanceModal .circle-number.active {
  background-color: #414d5a;
  color: #f8f8f8;
}

#insufficientBalanceModal .step-title {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
}

#insufficientBalanceModal .dropdown-menu {
  background-color: #2b3139;
  --bs-dropdown-link-hover-bg: #414d5a;
}

#insufficientBalanceModal .step-container .dropdown-toggle {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 600px;
  }
}

#insufficientBalanceModal .step-container ul.dropdown-menu {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 600px;
  }
}

#insufficientBalanceModal .deposit-notice-color {
  color: #f8f8f8;
}

#insufficientBalanceModal .deposit-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

#insufficientBalanceModal .winnie-fs-small {
  font-size: 12px;
}

#insufficientBalanceModal .company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

#insufficientBalanceModal .deposit-notice-bottom {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 400px;
  }
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 600px;
  }
}

#insufficientBalanceModal .company-address p {
  font-size: 16px;
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .company-address p {
    font-size: 14px;
  }
}

#insufficientBalanceModal .qrcode-pic {
  width: 160px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 120px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 170px;
  }
}

@media (max-width: 768px) {
  #insufficientBalanceModal .company-address p {
    word-wrap: break-word;
    word-break: break-all;
  }
}

#insufficientBalanceModal .form-control {
  box-shadow: none;
}

#insufficientBalanceModal .form-control:focus {
  box-shadow: none;
}

#insufficientBalanceModal ul li a img {
  max-width: 24px;
}

#insufficientBalanceModal ul li a .abbr {
  font-weight: bold;
  color: #f8f8f8;
}
#insufficientBalanceModal ul li a .full-name {
  color: #bbb;
}

.modal-content {
  background-color: #181a20;
}

.winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
  color: #f8f8f8;
}

#insufficientBalanceModal .modal-dialog .modal-content {
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
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
