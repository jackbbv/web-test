<template>
  <div class="winnie-bg-dark form-bg-dark">
    <div class="reset-password-container d-flex mx-auto">
      <FormSide class="text-center">
        <!-- 返回按鈕 先不使用-->
        <!-- <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" style="height: 30px;"/>
          </button>
        </div> -->
        <!-- 返回按鈕 -->
        <AuthForm
          :title="formTitle"
          :buttonText="buttonText"
          :totalSteps="4"
          :currentStep="currentStep"
          @goToLogin="returnToLogin"
          :handleButtonClick="handleButtonClick"
          :isButtonDisabled="isButtonDisabled"
          :marginBottom="currentStep === 2 ? '8px !important' : ''"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input >
            <div class="form-floating mb-3" v-show="currentStep === 1">
              <input
            
                id="floatingInputEmailReset"
                ref="emailInputRef"
                class="form-control ps-0"
                type="email"
                placeholder="Email"
                v-model="email"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <label class="ps-0" style="margin-left: -2px;" for="floatingInputEmailReset">Email</label>
            </div>
          </template>

          <!-- 步驟 1: 插入隱私政策或提醒內容 -->
          <template v-slot:extra-content>
            <!-- <p
              v-show="currentStep === 1"
              class="mb-4 text-start"
              style="color: #75797e; font-size: 12px;"
            >
              To protect your account, you won't be able to withdraw funds or
              use P2P trading to sell crypto for 24 hours after you reset or
              change your account password.
            </p> -->
            <!-- <p v-show="currentStep === 3">
              Complete the puzzle to verify you're not a robot.
            </p> -->
          </template>

          <!-- 步驟 1: 插入設置密碼或返回首頁的鏈接 -->
          <template v-slot:extra-action>
            <router-link
              v-show="currentStep === 1 || currentStep === 3"
              to="login"
              class="text-decoration-underline winnie-reset-password-link"
              >Return to log in
            </router-link>

            <p id="resendMessage" v-show="currentStep === 2" class="resend text-start">
              Didn't receive anything? <br />
              <button
                id="resendCode"
                class="resend-link p-0"
                @click="resendCode"
                :disabled="isTimerActive"
              >
                Resend code
              </button>
              <span v-show="isTimerActive"> ({{ timer }}s)</span>
            </p>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input>
            <div v-show="currentStep === 2">
              <p class="mb-4 text-start" style="color: #75797e">
                We've sent a code to {{ email }}.
              </p>
              <input
                type="text"
                class="input-field verification-code-input w-100 mb-2"
                ref="verificationCodeInputRef"
                placeholder="Verification Code"
                v-model="verificationCode"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
            </div>
          </template>

          <!-- 步驟 4: 設置密碼 -->
          <template v-slot:extra-password>
            <div class="form-floating mb-2" v-show="currentStep === 3">
              <input
                :type="!isHidden1 ? 'text' : 'password'"
                class="input-field form-control ps-0"
                placeholder="New Password"
                ref="passwordInputRef"
                v-model="newPassword"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <img
                class="img-fluid ms-2 mb-1 eye-dark"
                style="max-width: 30px; vertical-align: middle"
                :src="isHidden1 ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="togglePassword1"
              />
              <label class="ps-0" style="margin-left: -2px;" for="floatingInput">New Password</label>
            </div>
            <div class="form-floating mb-3" v-show="currentStep === 3">
              <input
                :type="!isHidden2 ? 'text' : 'password'"
                class="input-field form-control ps-0"
                placeholder="Confirm Password"
                ref="confirmPasswordInputRef"
                v-model="confirmPassword"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <img
                class="img-fluid ms-2 mb-1 eye-dark"
                style="max-width: 30px; vertical-align: middle"
                :src="isHidden2 ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="togglePassword2"
              />
              <label class="ps-0" style="margin-left: -2px;" for="floatingInput">Confirm Password</label>
            </div>
          </template>

          <!-- 步驟 5: 成功頁面 -->
          <template v-slot:extra-final>
            <div v-show="currentStep === 4">
              <div class="text-center">
                <img
                  src="../../assets/images/icon/success.svg"
                  alt="Success"
                  class="success-image"
                />
                <p class="success-message mt-3">
                  You updated the password successfully!
                </p>
              </div>
            </div>
          </template>

          <!-- 插入錯誤訊息 -->
          <template v-slot:error>
            <p v-if="errorMessage" class="error-message d-flex align-items-start">
              <img class="x-mark" src="../../assets/images/icon/antOutline-close 1.svg" alt="">
              <pre>{{ errorMessage }}</pre>
            </p>
          </template>
        </AuthForm>
      </FormSide>
      <ImageSide />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import { handleApiError } from "@/utils/errorHandler.js";
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標

let verificationAttempts = 0;

// 定義 refs for input fields
const emailInputRef = ref(null);
const verificationCodeInputRef = ref(null);
const passwordInputRef = ref(null);
const confirmPasswordInputRef = ref(null);

const {
  account: {
    sendVerificationCode,
    checkVerificationCode,
    forgotPasswordChange,
  },
} = modules;

const router = useRouter();

// 定義步驟狀態
const currentStep = ref(1);

const email = ref("");
const verificationCode = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// 計時器狀態
const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;
const errorMessage = ref("");
const verificationType = "ForgotPassword"; // 驗證類型，例如 "emailVerification"
// const testEmail = "nalsonlionmedia+16@gmail.com";
const verificationError = ref(null);
const isButtonDisabled = ref(false);

const isHidden1 = ref(true);
const isHidden2 = ref(true);
// 切換顯示/隱藏密碼的狀態
const togglePassword1 = () => {
  isHidden1.value = !isHidden1.value; // 切換隱藏狀態
};
const togglePassword2 = () => {
  isHidden2.value = !isHidden2.value; // 切換隱藏狀態
};

// 監聽步驟變化
watch(currentStep, (newStep, oldStep) => {
  // 取消舊步驟的焦點
  if (oldStep === 1 && emailInputRef.value) {
    emailInputRef.value.blur(); // 取消 email 輸入框的焦點
  } else if (oldStep === 2 && verificationCodeInputRef.value) {
    verificationCodeInputRef.value.blur(); // 取消驗證碼的焦點
  } else if (oldStep === 4) {
    if (passwordInputRef.value) passwordInputRef.value.blur(); // 取消密碼框的焦點
    if (confirmPasswordInputRef.value) confirmPasswordInputRef.value.blur(); // 取消確認密碼框的焦點
  }

  // 根據新步驟設置焦點
  if (newStep === 1 && emailInputRef.value) {
    emailInputRef.value.focus();
  } else if (newStep === 2 && verificationCodeInputRef.value) {
    verificationCodeInputRef.value.focus();
  } else if (newStep === 4) {
    if (passwordInputRef.value) passwordInputRef.value.focus();
    if (confirmPasswordInputRef.value) confirmPasswordInputRef.value.focus();
  }
});


// 針對不同步驟的處理邏輯
const handleButtonClick = () => {
  errorMessage.value = ""

  if (!validateStep()) return; // 驗證失敗 終止後續操作

  isButtonDisabled.value = true; // 禁用按鈕

  if (currentStep.value === 1) {
    sendVerificationEmail(); // 點下一步之後可以發驗證信
  } else if (currentStep.value === 2) {
    verifyCode(); //驗證 驗證碼
  } 
  // else if (currentStep.value === 3) {
  //   // 因為目前還沒放圖形驗證所以先自動加一略過這步驟 另外按鈕的禁用也要打開
  //   handleStepChange(currentStep.value + 1); //成功的話跳轉下一步
  //   isButtonDisabled.value = false;
  // } 
  else if (currentStep.value === 3) {
    resetPassword();
  } else {
    returnToLogin();
  }
};

// 發驗證信
const sendVerificationEmail = async (shouldChangeStep = true) => {
  try {
    const response = await sendVerificationCode(verificationType, email.value); //這邊到時候測試完要改掉
    // 如果成功 就到下一步
    if (response.data.success) {
      if (shouldChangeStep) {  // 檢查是否應該改變步驟
        handleStepChange(currentStep.value + 1);
      }
    }
  } catch (error) {
    errorMessage.value = handleApiError(error);

    console.error("Failed to send verification email", error);
  } finally {
    isButtonDisabled.value = false;
  }
};

// 驗證驗證碼
const verifyCode = async () => {
  if (!verificationCode.value) {
    errorMessage.value = "Please enter the verification code.";
    isButtonDisabled.value = false;
    return false; // 驗證碼為空，返回 false
  }

  try {
    const response = await checkVerificationCode(
      verificationType,
      email.value,
      verificationCode.value
    );
  
    if (response.data.success) {
      // 驗證成功，重置錯誤次數
      verificationAttempts = 0;

      // 跳轉到下一步或其他處理
      handleStepChange(currentStep.value + 1); //成功的話跳轉下一步
      return true;
    }
  } catch (error) {
    // 檢查錯誤響應中是否有 systemCode
    if (error.response && error.response.data.systemCode === 2005) {
      // 增加錯誤次數
      verificationAttempts += 1;
      errorMessage.value = "Please enter a 6-digit verification code.";

      // 檢查是否達到 5 次錯誤
      if (verificationAttempts >= 5) {
        ElMessage.error({
          message: "If you enter the wrong authentication code 5 times consecutively, your account will be automatically locked for 1 minute to protect your security. Beware of telecommunication fraud. Our customer support will never ask for your password or authentication code.",
          duration: 3000,
          grouping: true,
        });
      }
    } else if (error.response && error.response.data.systemCode === 2006) {
      errorMessage.value = "The verification code has expired.";
    } else {
      errorMessage.value = "Server error occurred, please try again later.";
    }
    return false; // 驗證失敗
  } finally {
    isButtonDisabled.value = false;
  }
};

// 重新發送驗證碼
const resendCode = async () => {
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    await sendVerificationEmail(false);
    // 開始新的倒數計時
    startTimer();
  }
};

// 監聽 currentStep，當進入步驟 2 時自動啟動倒數計時
watch(currentStep, (newStep) => {
  if (newStep === 2) {
    startTimer();
  }
});

// 開始倒數計時
const startTimer = () => {
  isTimerActive.value = true;
  timer.value = 60;

  countdownInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdownInterval);
      isTimerActive.value = false;
    }
  }, 1000);
};

// 重設密碼 api
const resetPassword = async () => {
  try {
    // 發送註冊請求
    const response = await forgotPasswordChange(
      email.value,
      newPassword.value,
      verificationCode.value
    );
    if (response.data.success) {
      handleStepChange(currentStep.value + 1);
    }

    // 根據需求進行下一步處理（例如跳轉頁面或顯示成功訊息）
  } catch (error) {
    console.error("Registration failed", error.response ? error.response.data : error);
    // 處理錯誤（例如顯示錯誤訊息給使用者）
    errorMessage.value = handleApiError(error);
  } finally {
    isButtonDisabled.value = false;
  }
};

// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 返回上一頁的函數
const goBack = () => {
  errorMessage.value = "";
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  if (currentStep.value <= 4) {
    currentStep.value = newStep;
  }
};

// 表單驗證函數
const validateStep = () => {
  if (currentStep.value === 1 && !validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email.";
    return false;
  }

  if (currentStep.value === 3) {
    // 如果密碼為空
    if (!newPassword.value) {
      errorMessage.value = "Please enter your password.";
      return false;
    }

    // 密碼格式不符合規範
    if (!validatePasswords()) {
      return false;
    }
  }
  errorMessage.value = ""; // 驗證通過時清空錯誤消息
  return true;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswords = () => {
  const errors = [];
  if (newPassword.value !== confirmPassword.value) {
    errors.push(
      "Password and Confirm password are different."
    );
  }

  const rules = [
    { regex: /.{8,}/, message: "At least 8 characters long." },
    { regex: /[0-9]/, message: "1 number." },
    {
      regex: /[a-z]/,
      message: "1 lowercase character (a-z).",
    },
    {
      regex: /[A-Z]/,
      message: "1 uppercase character (A-Z).",
    },
  ];

  for (const rule of rules) {
    if (!rule.regex.test(newPassword.value)) {
      errors.push(`${rule.message}`);
    }
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join("\n");
    return false;
  }

  return true;
};

// 清除錯誤訊息
const clearErrorMessage = () => {
  errorMessage.value = "";
};

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Next";
    // case 3:
    //   return "Next";
    case 3:
      return "Confirm";
    default:
      return "Next";
  }
});

// 動態設置標題
const formTitle = computed(() => {
  if (currentStep.value === 1) {
    return "Reset Password";
  } else if (currentStep.value === 2) {
    return "Enter Verification";
  // } else if (currentStep.value === 3) {
  //   return "Puzzle Verification";
  } else if (currentStep.value === 3) {
    return "Reset Password";
  }
});

// 在組件掛載時設置初始焦點
onMounted(() => {
  if (currentStep.value === 1 && emailInputRef.value) {
    emailInputRef.value.focus(); // 設置第一步的 email 輸入框焦點
  }
});
</script>

<style scoped>
.error-message {
  color: red;
}
.winnie-bg-dark {
  background-color: #181a20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
}
@media (max-width: 991px) {
  .winnie-bg-dark {
    padding: 0px;
    height: 100%;
  }

  .winnie-bg-dark.form-bg-dark {
    height: auto;
    min-height: auto;
  }

  .side-form {
    width: 100%;
    height: 92.5vh;
    padding: 15px;
  }
}

.register-container {
  background: linear-gradient(
    to left,
    transparent 0%,
    transparent 25%,
    #f8f8f8 50%,
    #f8f8f8 75%,
    #f8f8f8 100%
  );
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  border-radius: 30px;
}

@media (max-width: 991px) {
  .register-container {
    flex-direction: row;
    height: 93.5vh;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    background-color: #f8f8f8;
  }
}

.winnie-back-btn {
  top: 2rem;
}
@media (min-width: 991px) and (max-width: 1199.98px) {
  .winnie-back-btn {
    top: 1rem;
  }
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
  padding: 0px;
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

.form-floating>.form-control-plaintext~label::after, .form-floating>.form-control:focus~label::after, .form-floating>.form-control:not(:placeholder-shown)~label::after, .form-floating>.form-select~label::after {
  background-color: transparent;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.reset-password-container {
  background: linear-gradient(
    to left,
    transparent 0%,
    transparent 25%,
    #f8f8f8 50%,
    #f8f8f8 75%,
    #f8f8f8 100%
  );
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  border-radius: 30px;
}

.register-password-img {
  flex: 2;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-btn {
  background-color: #181a20;
  color: #f8f8f8;
}

.winnie-bg-dark .reset-password-container .winnie-log-in-link {
  color: #181a20;
  transition: color 0.3s ease;
  bottom: 2rem;
  left: 0;
  right: 0;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-link {
  color: #181a20;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-link:hover {
  color: #fcd535;
}

.winnie-bg-dark .reset-password-container .winnie-forget-pw-link {
  color: #181a20;
}

.winnie-bg-dark .reset-password-form .winnie-back-btn {
  top: 2rem;
}

.winnie-bg-dark .reset-password-form .terms-remind p {
  color: #181a20;
}

.winnie-bg-dark .reset-password-form .terms-remind p a {
  color: #181a20;
  text-decoration: underline;
}

@media (max-width: 991px) {
  .reset-password-container {
    flex-direction: row;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    background-color: #f8f8f8;
  }

  .reset-password-form {
    width: 100%;
    padding: 15px;
  }
}

button.arrow {
  border: none;
  background-color: transparent;
  color: #bbb;
}

button.arrow:hover {
  color: #1e2329;
}

.error-message {
  color: #F63E3D;
}

.x-mark {
  width: 13px;
  margin-right: 2px;
  margin-top: 3px;
}

pre {
  font-family: "Lexend Deca", "Inter", sans-serif !important;
  font-size: 13px;
  margin-bottom: 0px;
  overflow: visible;
  text-align: start;
  white-space: pre-wrap;
}

.verification-code-input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #BBB;
  background-color: transparent;
  outline: none;
  box-shadow: none;
  color: #212529;
}

.verification-code-input::placeholder {
  color: #BBB;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px #f8f8f8 inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #F8F8F8 inset !important;
  -webkit-text-fill-color: #000 !important;
}

button.resend-link {
  border: none;
  background-color: transparent;
  font-weight: 600;
}

button.resend-link:disabled {
  cursor: not-allowed;
  font-weight: 500;
}

button.resend-link:disabled:hover {
  color: #1010104D;
}

button.resend-link:hover {
  color: #FCD535;
  cursor: pointer;
}

.img-fluid.eye-dark {
  position: absolute;
  right: .5rem;
  top: 1.7rem;
  cursor: pointer;
  width: 15px;
}

</style>
