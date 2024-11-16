<template>
  <div class="app-container">
    <div class="container winnie-deposit tabs mt-5 px-3 px-lg-0">
      <div class="d-flex justify-content-center align-items-center">
        <div class="p-2 text-center">
            <router-link to="/account/deposit">
            <button class="d-md-none mb-2 winnie-btn-active">
                <img src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg" alt="">
            </button>
            <p class="fw-bold winnie-text-active">Deposit</p>
            </router-link>
        </div>
        <div class="divider align-items-center d-none d-md-inline"></div>
        <div class="p-2 text-center">
          <router-link to="/account/withdrawal">
            <button class="d-md-none mb-2">
              <img
                src="@/assets/images/icon/iconPark-arrow-down 1.svg"
                alt=""
              />
            </button>
            <p class="fw-bold">Withdraw</p>
          </router-link>
        </div>
        <div class="divider align-items-center d-none d-md-inline"></div>
        <div class="p-2 text-center">
          <router-link to="/account/reward">
            <button class="d-md-none mb-2">
              <img
                src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg"
                alt=""
              />
            </button>
            <p class="fw-bold">Reward</p>
          </router-link>
        </div>
        <div class="divider align-items-center d-none d-md-inline"></div>
        <div class="p-2 text-center">
          <router-link to="/dashboard">
            <button class="d-md-none mb-2">
              <img src="@/assets/images/icon/antOutline-history 1.svg" alt="" />
            </button>
            <p class="fw-bold">History</p>
          </router-link>
        </div>
      </div>

    <div class="d-flex justify-content-center">
      <DepositPage />
    </div>
    </div>
  </div>
</template>

<script setup>
import DepositPage from "../../components/DepositPage.vue";
</script>

<style scoped>
.app-container {
  min-height: 77vh;
  display: flex;
  flex-direction: column;
}
.container {
  width: 100%;
}

.tabs {
  margin-top: 3rem;
}
/* deposit */

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .winnie-deposit .container {
    width: 75%;
  }
}

/* .winnie-deposit {
    height: calc(100vh - 200px);
} */

.winnie-deposit a p {
  color: #f8f8f8;
}

.winnie-deposit a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.winnie-deposit a button:hover,
.winnie-deposit a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.winnie-deposit .vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

.winnie-deposit .vertical-line.active {
  background-color: #f8f8f8;
}

.step-one .form-control {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #bbb;
  padding: 8px;
  outline: none;
  border-radius: 0px;
  color: #f8f8f8;
  text-align: end;
}

.step-one .form-control:focus {
  border-bottom: 1px solid #f8f8f8;
  background-color: transparent;
}

.max-btn {
  border: 1px solid #f8f8f8;
  background-color: transparent;
  border-radius: 0px;
  color: #f8f8f8;
}

.step-two .form-control {
  background-color: transparent;
  color: #f8f8f8;
  border: 1px solid #6c757d;
}

.step-two .form-control::placeholder {
  color: #6c757d;
}

.step-three .form-control {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #f8f8f8;
  border-right: none;
}

.step-three .input-group {
  width: 100%;
}

.step-three .info-section {
  margin-top: 20px;
}

.step-three .info-section .info-row {
  display: flex;
  justify-content: space-between;
}

.step-three .input-group input {
  color: #f8f8f8;
}

.step-container .step-three .input-group {
  width: 280px;
  background-color: transparent;
}

.step-three .info-section {
  width: 100%;
}

@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 600px;
  }
}

#depositRemindModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#depositRemindModal .modal-header {
  border-bottom: none;
}

#depositRemindModal .modal-footer {
  border-top: none;
}

#depositRemindModal button {
  background-color: #fcd535;
  color: #181a20;
}

#depositRemindModal .modal-content {
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

/* 共用 */

.divider {
  width: 1px;
  height: 30px;
  background-color: #bbb;
  margin: 0px 30px;
}

@media (min-width: 575.98px) {
  .step-container {
    display: flex;
    align-items: flex-start;
    /* margin-bottom: 30px; */
  }
}

.circle-number {
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

.circle-number.active {
  background-color: #414d5a;
  color: #f8f8f8;
}

.step-title {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
}

.dropdown-menu {
  background-color: #2b3139;
  --bs-dropdown-link-hover-bg: #414d5a;
}

ul li a img {
  max-width: 24px;
}

ul li a .abbr {
  font-weight: bold;
  color: #f8f8f8;
}
ul li a .full-name {
  color: #bbb;
}

.step-container .dropdown-toggle {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .dropdown-toggle {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .dropdown-toggle {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .dropdown-toggle {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .dropdown-toggle {
    width: 600px;
  }
}

.step-container ul.dropdown-menu {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container ul.dropdown-menu {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container ul.dropdown-menu {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container ul.dropdown-menu {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container ul.dropdown-menu {
    width: 600px;
  }
}

.winnie-text-white {
  color: #f8f8f8;
}

.winnie-text-gray {
  color: #bbb;
}

.deposit-notice-color {
  color: #f8f8f8;
}

.deposit-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

.winnie-fs-small {
  font-size: 12px;
}

.company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

.deposit-notice-bottom {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .deposit-notice-bottom {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .deposit-notice-bottom {
    width: 400px;
  }
}

@media (min-width: 767.98px) {
  .deposit-notice-bottom {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .deposit-notice-bottom {
    width: 600px;
  }
}

.company-address p {
  font-size: 16px;
}
@media (min-width: 767.98px) {
  .company-address p {
    font-size: 14px;
  }
}

.qrcode-pic {
  width: 160px;
}

@media (min-width: 767.98px) {
  .qrcode-pic {
    width: 120px;
  }
}
@media (min-width: 991.98px) {
  .qrcode-pic {
    width: 170px;
  }
}

@media (max-width: 768px) {
  .company-address p {
    word-wrap: break-word;
    word-break: break-all;
  }
}

.form-control {
  box-shadow: none;
}

.form-control:focus {
  box-shadow: none;
}

.winnie-btn-close {
  background-color: #2b3139;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
}

@media (min-width: 767.98px) {
  .winnie-text-active {
  color: #fcd535 !important;
  }
}
</style>