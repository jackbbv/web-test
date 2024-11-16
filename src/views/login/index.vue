<template>
  <div class="winnie-bg-dark form-bg-dark">
    <div class="login-container d-flex mx-auto">
      <ImageSide />
      <FormSide class="login-form position-relative">
        <!-- 返回按鈕 先不使用-->
        <!-- <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3 ps-0">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" style="height: 30px;" />
          </button>
        </div> -->
        <!-- 返回按鈕 -->
        <AuthForm
          title="Log in"
          :buttonText="buttonText"
          :totalSteps="2"
          :currentStep="currentStep"
          :handleButtonClick="handleButtonClick"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input v-if="currentStep === 1">
            <div class="form-floating mb-2">
              <input
                ref="emailInput"
                type="email"
                class="form-control ps-0"
                id="floatingInputEmailReset"
                placeholder="Email"
                v-model="email"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <label class="ps-0" style="margin-left: -3px;" for="floatingInputEmailReset">Email</label>
            </div>
          </template>

          <!-- 步驟 1: 插入設置密碼或返回首頁的鏈接 -->
          <template
            v-slot:extra-action
          >
          <div v-if="currentStep === 1" class="text-center winnie-sign-up-link">
              <p class="mb-0">
                Don't have an account?
                <router-link to="/register" class="fw-bold winnie-hover-link"
                  >Sign up
                </router-link>
              </p>
            </div>
            <div v-if="currentStep === 2" class="d-flex justify-content-end mb-3">
              <router-link to="/forgot-password" class="winnie-forget-pw-link"
                >Forgot your password?
              </router-link>
            </div>
          </template>

          <!-- 步驟 4: 設置密碼 -->
          <template v-slot:extra-password v-if="currentStep === 2">
          <div class="form-floating mb-2">
            <input
              ref="passwordInput"
              :type="!isBalanceHidden ? 'text' : 'password'"
              class="form-control input-field ps-0"
              id="floatingInputPasswordReset"
              placeholder="New Password"
              v-model="password"
              @input="clearErrorMessage"
              @keydown.enter.prevent="handleButtonClick"
              spellcheck="false"
              autocomplete="off"
            />
            <img
                class="img-fluid ms-2 mb-1 eye-dark"
                style="max-width: 30px; vertical-align: middle"
                :src="isBalanceHidden ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="toggleBalanceVisibility"
              />
            <label class="ps-0" style="margin-left: -3px;" for="floatingInputPasswordReset">Password</label>
            </div>
          </template>

          <!-- 插入錯誤訊息 -->
          <template v-slot:error>
            <div v-if="errorMessage" class="error-message d-flex align-items-start">
              <img class="x-mark" src="../../assets/images/icon/antOutline-close 1.svg" alt="">
              <pre>{{ errorMessage }}</pre>
            </div>
          </template>
        </AuthForm>
      </FormSide>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標
const router = useRouter();



// 定義步驟狀態
const currentStep = ref(1);

const email = ref("");
const password = ref("");

const errorMessage = ref("");
const userStore = useUserStore();

// 定義 ref 用於 email 輸入框
const emailInput = ref(null);
const passwordInput = ref(null);

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Login";
    default:
      return "Next";
  }
});

// 返回上一頁的函數
const goBack = () => {
  errorMessage.value = "";
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

// 針對不同步驟的處理邏輯
const handleButtonClick = async () => {
  errorMessage.value = ""

  if (currentStep.value === 1) {
    if (!email.value) {
      errorMessage.value = "Please enter a valid email.";
      return
    }

    const emailCheck = await handleCheckEmail();

    // 驗證 Email 格式是否正確
    if (!validateEmailFormat(email.value)) {
      errorMessage.value = "Please enter a valid email.";
      return;
    }

    if(!emailCheck) {
      // errorMessage.value = "Email does not exist"
      errorMessage.value = "Account not found."
      return
    }

    handleStepChange(currentStep.value + 1);
  } else if (currentStep.value === 2) {
    await login(); // 打登入api
  }
};

const handleCheckEmail = async() => {
  try {
    const res = await modules.account.CheckEmail(email.value)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const login = async () => {
  errorMessage.value = ""

  if (!password.value) {
    errorMessage.value = "Please enter your password.";
    return
  }

  await userStore.loginUser({
    email: email.value,
    password: password.value,
  });

  if(userStore.token) {
    router.push("/");
  }

  // 使用 store 中的 errorMessage 判斷是否有錯誤
  if (userStore.errorMessage) {
    errorMessage.value = userStore.errorMessage; // get store errorMessage
  } 
};

const isBalanceHidden = ref(true);

// 切換顯示/隱藏金額的狀態
const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value; // 切換隱藏狀態
};

onMounted(() => {
  // 當頁面掛載時手動聚焦 email 輸入框
  if (currentStep.value === 1) {
    focusEmailInput();
  }
});

watch(currentStep, (newStep) => {
  if (newStep === 1) {
    // 在步驟變回1的時候也聚焦
    focusEmailInput();
  } else if (newStep === 2) {
    focusPasswordInput();
  }
});

const focusEmailInput = () => {
  nextTick(() => {
    emailInput.value?.focus(); // 確保 DOM 已經更新後聚焦
  });
};

const focusPasswordInput = () => {
  nextTick(() => {
    passwordInput.value?.focus(); // 確保 DOM 已經更新後聚焦
  });
};



// 步驟變更邏輯
const handleStepChange = (newStep) => {
  if (currentStep.value <= 2) {
    currentStep.value = newStep;
  }
};

// 定義正則表達式來驗證Email格式
const validateEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 清除錯誤訊息
const clearErrorMessage = () => {
  errorMessage.value = "";
};

</script>

<style scoped>
/* login */

.winnie-bg-dark{
  background-color: #181A20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
}

.login-container{
  background: linear-gradient(to right, transparent 0%, transparent 25%, #F8F8F8 50%, #F8F8F8 75%, #F8F8F8 100%);
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  border-radius: 30px;
}

.login-img{
    flex: 2;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.auth-form .form-floating .img-fluid.eye-dark {
  position: absolute;
  right: 0.5rem;
  top: 1.7rem;
  cursor: pointer;
  width: 15px;
}

.form-title p{
    color: #181A20;
}

.winnie-bg-dark .form-control {
  border: none;
  border-bottom: 1px solid #BBBBBB; 
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

.winnie-bg-dark .form-control:focus {
  border-bottom: 1px solid #181A20;
  outline: none;
}

.winnie-bg-dark .form-floating label {
  background-color: transparent;
  color: #BBB;
}

.winnie-bg-dark .login-container .login-form form .winnie-login-btn {
  background-color: #181A20;
  color: #F8F8F8;
  border: none;
}

.form-floating>.form-control-plaintext~label::after, .form-floating>.form-control:focus~label::after, .form-floating>.form-control:not(:placeholder-shown)~label::after, .form-floating>.form-select~label::after {
  background-color: transparent;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.winnie-bg-dark .login-container .winnie-sign-up-link{
  color: #181A20;
}

.winnie-bg-dark .login-container .winnie-sign-up-link a{
  color: #181A20;
  border-bottom: 1px solid #181A20;
}

.winnie-bg-dark .login-container .winnie-sign-up-link a:hover{
  border-bottom-color: transparent;
}

.winnie-bg-dark .login-container .winnie-forget-pw-link {
  color: #181A20;
}

.winnie-bg-dark .login-container .winnie-forget-pw-link:hover {
  color: #FCD535;
}

.winnie-bg-dark .login-form .winnie-back-btn{
  top: 2rem;
}

.winnie-bg-dark .winnie-sign-up-link {
  color: #181A20;
  text-decoration: none;
  transition: color 0.3s ease;
  bottom: 2rem;
  left: 0;
  right: 0;
}

@media (max-width: 991px) {
  .login-img {
    display: none;
  }

  .login-container {
    background-color: #f8f8f8;
    flex-direction: row;
    height: 93.5vh;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    border-color: #F8F8F8;
  }

  .login-form {
    width: 100%;
    height: 92.5vh;
    padding: 15px;
  }
  
  .winnie-bg-dark {
    padding: 0px;
    height: 100%;
  }

  .winnie-bg-dark.form-bg-dark {
    height: auto;
    min-height: auto;
  }
}

button.arrow {
  border: none;
  background-color: transparent;
  color: #BBB;
}

button.arrow:hover {
  color: #1E2329;
}

.error-message {
  color: #F63E3D;
}

pre {
  font-family: "Lexend Deca", "Inter", sans-serif !important;
  font-size: 13px;
  margin-bottom: 0px;
  text-align: start;
  white-space: pre-wrap;
}

.x-mark {
  width: 13px;
  margin-right: 2px;
  margin-top: 3px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px #f8f8f8 inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #F8F8F8 inset !important;
  -webkit-text-fill-color: #000 !important;
}
</style>
