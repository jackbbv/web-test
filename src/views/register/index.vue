<template>
  <div class="winnie-bg-dark form-bg-dark">
    <div class="register-container d-flex mx-auto">
      <FormSide class="position-relative">
        <!-- 返回按鈕 先不使用-->
        <!-- <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3 ps-0">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" style="height: 30px;"/>
          </button>
        </div> -->
        <!-- 返回按鈕 -->
        <AuthForm
          :title="formTitle"
          :buttonText="buttonText"
          :totalSteps="3"
          :currentStep="currentStep"
          @goToLogin="returnToLogin"
          :handleButtonClick="handleButtonClick"
          :isButtonDisabled="isButtonDisabled"
          :marginBottom="currentStep === 2 ? '8px !important' : ''"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input >
            <div id="emailInputContainerRegister" class="form-floating mb-2" v-show="currentStep === 1">
              <input
                v-model="email"
                type="email"
                class="form-control ps-0"
                id="floatingInputEmailRegister"
                placeholder="Email"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <label class="ps-0" style="margin-left: -1.5px;" for="floatingInput">Email</label>
            </div>
            <!-- input欄位有邀請碼時不可編輯 -->
            <div id="referralCodeInput" class="form-floating mb-3" v-show="currentStep === 1">
              <input
                type="text"
                class="form-control ps-0" :class="{ notAllowed: props.referralCode }"
                id="floatingInputReferralCode"
                placeholder="Referral code (optional)"
                v-model="referralCode"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off" :disabled="props.referralCode"
              />
              <label class="ps-0" style="margin-left: -1.5px;" for="floatingInput">Referral code (optional)</label>
            </div>
          </template>

          <!-- 步驟 1: 插入隱私政策或提醒內容 -->
          <template v-slot:extra-content >
            <div id="termsRemind" class="terms-remind form-check mt-5" v-show="currentStep === 1">
              <input class="form-check-input" type="checkbox" value="" id="termsCheck" v-model="checked">
              <label class="form-check-label fs-6 checkbox" for="termsCheck">
                By using this site, you agree to the <a
                  href="/terms-of-service"
                  >Terms of Service</a
                >.
              </label>
            </div>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input v-if="currentStep === 2">
            <div>
              <p class="verificationMessage mb-4">
                We've sent a verification code to {{ email }}.
              </p>
              <input
                type="text"
                class="input-field verification-code-input mb-2 w-100"
                placeholder="Verification Code"
                v-model="verificationCode"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
            </div>
          </template>

          <!-- 步驟 3: 重寄驗證碼 -->
          <template v-slot:extra-action>
            <div
              id="logInLink"
              class="text-start winnie-log-in-link position-absolute"
            >
              <p class="mb-0" v-show="currentStep === 1 || currentStep === 3">
                Already have an account?
                <a @click="returnToLogin" class="fw-bold">Log In</a>
              </p>
              <p id="resendMessage" v-show="currentStep === 2" class="resend">
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
            </div>
          </template>

          <!-- 步驟 3: 設置密碼 -->
          <template v-slot:extra-password >
            <div class="form-floating mb-2" v-show="currentStep === 3">
              <input
                ref="inputRef"
                :type="!isHidden1 ? 'text' : 'password'"
                class="form-control input-field ps-0"
                placeholder="New Password"
                v-model="passwordNew"
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
              <label class="ps-0" style="margin-left: -1.5px;" for="floatingInput">Password</label>
            </div>
            <div class="form-floating mb-2" v-show="currentStep === 3">
              <input
                :type="!isHidden2 ? 'text' : 'password'"
                placeholder="Confirm Password"
                class="form-control input-field ps-0"
                v-model="confirmPassword"
                @input="clearErrorMessage"
                @keydown.enter.prevent="handleButtonClick"
                spellcheck="false"
                autocomplete="off"
              />
              <img
                class="img-fluid ms-2 mb-2 eye-dark"
                style="max-width: 30px; vertical-align: middle"
                :src="isHidden2 ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="togglePassword2"
              />
              <label class="ps-0" style="margin-left: -1.5px;" for="floatingInput">Confirm Password</label>
            </div>
          </template>

          <!-- 步驟 4: 成功頁面 -->
          <!-- <template v-slot:extra-final v-if="currentStep === 4">
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
          </template> -->

          <!-- 插入錯誤訊息 -->
          <template v-slot:error>
            <span v-if="errorMessage" class="error-message d-flex align-items-start">
              <img class="x-mark" src="../../assets/images/icon/antOutline-close 1.svg" alt="">
              <pre>{{ errorMessage }}</pre>
            </span>
          </template>
        </AuthForm>
      </FormSide>
      <ImageSide />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import { handleApiError } from "@/utils/errorHandler.js";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標

let verificationAttempts = 0;

const {
  account: { sendVerificationCode, checkVerificationCode, register, checkRefererId },
} = modules;

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 定義步驟狀態
const currentStep = ref(1);

const email = ref("");
const referralCode = ref("");
const verificationCode = ref("");
const passwordNew = ref("");
const confirmPassword = ref("");

// 計時器狀態
const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;


const errorMessage = ref("");
const verificationType = "Register";
// const testEmail = "nalsonlionmedia+16@gmail.com";

const isButtonDisabled = ref(false);

const isHidden1 = ref(true);
const isHidden2 = ref(true);
const checked = ref(true);

// 切換顯示/隱藏密碼的狀態
const togglePassword1 = () => {
  isHidden1.value = !isHidden1.value; // 切換隱藏狀態
};

const togglePassword2 = () => {
  isHidden2.value = !isHidden2.value; // 切換隱藏狀態
};

// 動態設置標題
const formTitle = computed(() => {
  if (currentStep.value === 1) {
    return "Register";
  } else if (currentStep.value === 2) {
    return "Email Verification";
  } else if (currentStep.value === 3) {
    return "Create Password";
  }
});


// 針對不同步驟的處理邏輯
const handleButtonClick = async () => {
  errorMessage.value = ""; // 驗證通過時清空錯誤消息

  if (!validateStep()) return; // 驗證失敗 終止後續操作

  isButtonDisabled.value = true; // 禁用按鈕

  if (currentStep.value === 1) {
    sendVerificationEmail(); // 點下一步之後可以發驗證信
  } else if (currentStep.value === 2) {
    const hasVerifyCode = await verifyCode(); // 驗證驗證碼
    if (!hasVerifyCode) return; // 如果驗證碼驗證失敗，則停止
  } else if (currentStep.value === 3) {
    registerAccount();
  } else {
    returnToLogin();
  }
};

// 發驗證信
const sendVerificationEmail = async (shouldChangeStep = true) => {
  try {
    const response = await sendVerificationCode(verificationType, email.value);
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
      errorMessage.value = "";
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
      errorMessage.value = "The email authentication code has expired. Request for a new code.";
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
    console.log("Resend code clicked");
    await sendVerificationEmail(false); // 傳遞 `false` 避免步驟跳轉
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
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdownInterval);
      isTimerActive.value = false;
    }
  }, 1000);
};

// 註冊函數
const registerAccount = async () => {
  try {
    // 構建註冊請求的資料
    const userData = {
      email: email.value, // 使用者 Email
      password: passwordNew.value, // 密碼
      code: verificationCode.value, // 驗證碼
      refererId: referralCode.value || null, // 推薦碼（可選）
    };

    // 發送註冊請求
    const response = await register(userData);
    if (response.data.success) {
      // 註冊成功後自動登入
      errorMessage.value = "";
      await loginUser(userData.email, userData.password);
      router.push("/");
    }
  } catch (error) {
    if (error.response && error.response.data.message === "Account not found.") {
      errorMessage.value = "The Referral ID is invalid. ";
      return
    }
    errorMessage.value = handleApiError(error);
  } finally {
    isButtonDisabled.value = false;
  }
};

// 自動登入函數
const loginUser = async (email, password) => {
  try {
    const response = await userStore.loginUser({
      email: email,
      password: password,
    });
    if (response.data.success) {
      // 設置token或其他必要的用戶狀態
      userStore.setToken(response.data.data.token);
    }
  } catch (error) {
    errorMessage.value = handleApiError(error);
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
  if (currentStep.value === 1 ) {
    if (!validateEmail(email.value)) {
      errorMessage.value = "Please enter a valid email.";
      return false;
    }

    if (!validateReferralCode(referralCode.value)) {
      errorMessage.value = "Invalid referral code";
      return false;
    }

    if (!checked.value) {
      ElMessage.error({
        message: "You need to accept our terms to create an account",
        duration: 3000,
        grouping: true,
      });
      return false;
    }
  }

  // 針對第三步的驗證
  if (currentStep.value === 3) {
    // 如果密碼為空
    if (!passwordNew.value) {
      errorMessage.value = "Please enter your password.";
      return false;
    }

    // 密碼格式不符合規範
    if (!validatePasswords()) {
      return false;
    }
  }
  return true;
};

// 驗證推薦碼
const validateReferralCode = () => {
  if (!referralCode.value) {
    // 不輸入可pass
    return true;
  } else if (!isNaN(Number(referralCode.value)) && (referralCode.value.length === 8 )) {
    // 或輸入8位數字也pass
    return true
  }
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswords = () => {
  const errors = [];
  if (passwordNew.value !== confirmPassword.value) {
    errors.push(
      "Password and Confirm password are different."
    );
  }

  const rules = [
    { regex: /.{8,}/, message: "At least 8 characters long." },
    { regex: /[0-9]/, message: "1 number." },
    { regex: /[a-z]/, message: "1 lowercase character (a-z)." },
    { regex: /[A-Z]/, message: "1 uppercase character (A-Z)." },
  ];

  for (const rule of rules) {
    if (!rule.regex.test(passwordNew.value)) {
      errors.push(`${rule.message}`);
    }
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join('\n');
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
      return "Verify";
    case 3:
      return "Register";
    default:
      return "Next";
  }
});

const props = defineProps({
  referralCode: String
});

const inputRef = ref()

const focusInput = () => {
  nextTick(() => {
    inputRef.value.focus()
  })
};

// 在註冊頁加載時自動檢查 URL 是否有推薦碼
onMounted(() => {
  referralCode.value = props.referralCode
  focusInput()
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

@media (min-width: 991.98px) {
  .winnie-back-btn {
    top: 1.75rem;
  }
}

.winnie-bg-dark .form-control {
  border: none;
  border-bottom: 1px solid #BBBBBB; 
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

.winnie-bg-dark .form-control.notAllowed {
  cursor: not-allowed;
}

.winnie-bg-dark .form-control:focus {
  border-bottom: 1px solid #181A20;
  outline: none;
}

.winnie-bg-dark .form-floating label {
  background-color: transparent;
  color: #BBB;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.form-floating>.form-control-plaintext~label::after, .form-floating>.form-control:focus~label::after, .form-floating>.form-control:not(:placeholder-shown)~label::after, .form-floating>.form-select~label::after {
  background-color: transparent;
}

.img-fluid.eye-dark {
  position: absolute;
  right: 1rem;
  top: 1.7rem;
  cursor: pointer;
  width: 15px;
}

.arrow {
  color: #BBB;
}

.arrow:hover {
  color: #1E2329;
}

.verificationMessage {
  color: #75797E;
}

button.resend-link {
  border: none;
  background-color: transparent;
  font-weight: 600;
  color: #181A20;
}

button.resend-link:disabled {
  cursor: not-allowed;
  font-weight: 500;
  color: #1010104D;

}

button.resend-link:disabled:hover {
  color: #1010104D;
}

button.resend-link:hover {
  color: #FCD535;
  cursor: pointer;
}

.verification-code-input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #BBB;
  background-color: transparent;
  outline: none;
  box-shadow: none;
  color: #181A20;
}

.verification-code-input::placeholder {
  color: #BBB;
}

.winnie-bg-dark .terms-remind label a{
    color: #181A20;
    text-decoration: underline;
}

.form-check-input {
  box-shadow: none;
  border-color: #BBB;
  background-color: transparent;
}

.form-check-input:checked {
  background-color: #181A20;
  border-color: #181A20;
}

.winnie-log-in-link a {
  color: #181A20;
  border-bottom: 1px solid #181A20;
}

.winnie-log-in-link a:hover {
  border-bottom-color: transparent;
  cursor: pointer;
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
  overflow: visible;
  text-align: start;
  white-space: pre-wrap;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px #f8f8f8 inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #F8F8F8 inset !important;
  -webkit-text-fill-color: #000 !important;
}

.x-mark {
  width: 13px;
  margin-right: 2px;
  margin-top: 3px;
}
</style>
