<template>
  <div class="winnie-bg-dark form-bg-dark">
    <div class="register-container winnie-reset-pw d-flex mx-auto">
      <FormSide>
        <!-- 返回按鈕 -->
        <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3 ps-0">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" style="height: 30px;"/>
          </button>
        </div>
        <!-- 返回按鈕 -->
        <AuthForm
          title="Reset password"
          :buttonText="buttonText"
          :totalSteps="2"
          :currentStep="currentStep"
          :handleButtonClick="handleButtonClick"
          @goToLogin="returnToLogin"
          :marginBottom="'20px !important'"
          :textAlign="'start !important'"
          :isButtonDisabled="isButtonDisabled"
        >
          <!-- 步驟 1: 輸入原密碼、新密碼、Email驗證 -->
          <template v-slot:extra-password>
            <div class="mb-3" v-show="currentStep === 1">
              <div id="passwordInputContainer" class="mb-3 position-relative">
                <label for="inputPassword" class="form-label"
                  >Current password</label
                >
                <input
                :type="!isHidden1 ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Enter your current password"
                  id="managePasswordCurrentPassword"
                  v-model="currentPassword"
                  @keydown.enter.prevent
                  spellcheck="false"
                  autocomplete="off"
                />
                <img
                  class="img-fluid ms-2 mb-1 eye-dark"
                  :src="isHidden1 ? eyeCloseIcon : eyeIcon"
                  alt="Eye Icon" @click.stop.prevent="togglePassword1"
                />
              </div>
            </div>
            <!-- 插入錯誤訊息 -->
            <v-slot:error>
              <p v-if="errorMessage1" class="error-message d-flex align-items-start">
                <pre>{{ errorMessage1 }}</pre>
              </p>
            </v-slot:error>

            <div class="mb-3 position-relative" v-show="currentStep === 1">
              <label for="inputNewPassword" class="form-label"
                >New password</label
              >
              <input
                :type="!isHidden2 ? 'text' : 'password'"
                class="form-control" :class="{ notAllowed: !currentPassword }"
                placeholder="Enter your new password"
                id="managePasswordNewPassword"
                v-model="newPassword"
                @keydown.enter.prevent
                spellcheck="false"
                autocomplete="off"
                :disabled="!currentPassword"
              />
              <img
                class="img-fluid ms-2 mb-1 eye-dark"
                :src="isHidden2 ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="togglePassword2"
              />
            </div>
            <!-- 插入錯誤訊息 -->
            <v-slot:error>
              <p v-if="errorMessage2" class="error-message d-flex align-items-start">
                <!-- <img class="x-mark" src="../../assets/images/icon/antOutline-close 1.svg" alt=""> -->
                <pre>{{ errorMessage2 }}</pre>
              </p>
            </v-slot:error>

            <div class="mb-3 position-relative" v-show="currentStep === 1">
              <label for="inputConfirmNewPassword" class="form-label"
                >Confirm new password</label
              >
              <input
                :type="!isHidden3 ? 'text' : 'password'"
                id="managePasswordConfirmPassword"
                class="form-control" :class="{notAllowed: !newPassword }"
                placeholder="Enter your new password again"
                v-model="confirmPassword"
                @keydown.enter.prevent
                spellcheck="false"
                autocomplete="off"
                :disabled="!newPassword"
              />
              <img
                class="img-fluid ms-2 mb-1 eye-dark"
                :src="isHidden3 ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon" @click.stop.prevent="togglePassword3"
              />
            </div>
            <!-- 插入錯誤訊息 -->
            <v-slot:error>
              <p v-if="errorMessage3" class="error-message d-flex align-items-start">
                <pre>{{ errorMessage3 }}</pre>
              </p>
            </v-slot:error>

            <div class="mb-3" v-show="currentStep === 1">
              <label for="inputEmailAuthentication" class="form-label"
                >Email authentication</label
              >
              <div class="d-flex align-items-center gap-1">
                <input
                  type="text"
                  id="inputEmailAuthentication"
                  class="form-control" :class="{ notAllowed: !confirmPassword }"
                  v-model="verificationCode"
                  placeholder="Enter code"
                  @input="clearErrorMessage"
                  @keydown.enter.prevent="handleButtonClick"
                  spellcheck="false"
                  autocomplete="off"
                  :disabled="!confirmPassword || isButtonDisabled2"
                />
                <!-- 測試 -->
                  <button
                    style="height: 38px;"
                    type="button"
                    class="btn btn-resend-code"
                    @click="resendCode"
                    :disabled="!confirmPassword && !isTimerActive"
                    :class="{ 'btn-disabled': isTimerActive }"
                  >
                  {{ buttonText1 }}
                  </button>
                <!-- 測試 -->
              </div>
            </div>
            <!-- 插入錯誤訊息 -->
            <v-slot:error>
              <p v-if="errorMessage4" class="error-message d-flex align-items-start">
                <pre>{{ errorMessage4 }}</pre>
              </p>
            </v-slot:error>
          </template>

          <!-- 步驟 2: 成功頁面 -->
          <template v-slot:extra-final>
            <div class="text-center" v-show="currentStep === 2">
              <img
                src="../../assets/images/icon/success.svg"
                alt="Success"
                class="success-image"
              />
              <p class="success-message mt-3">
                You updated the password successfully!
              </p>
            </div>
          </template>
        </AuthForm>
      </FormSide>
      <div class="side-img d-none d-lg-block">
        <img class="img-fluid img-cover" src="@/assets/images/common/reset password banner.png" alt=""> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import modules from "@/services/modules.js";
import { handleApiError } from "@/utils/errorHandler.js";
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標
const router = useRouter();
const {
  account: { changePassword, sendAuthCode, checkVerificationCode },
} = modules;

const userStore = useUserStore();

// 定義步驟狀態
const currentStep = ref(1);
const verificationCode = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
let currentPasswordValid = false;
let codeVerified = false;

const errorMessage1 = ref("");
const errorMessage2 = ref("");
const errorMessage3 = ref("");
const errorMessage4 = ref("");

// 計時器狀態
const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;
const isButtonDisabled = ref(true);
const isButtonDisabled2 = ref(true);

const verificationType = "ChangePassword";

const buttonText1 = computed(() => {
  return isTimerActive.value ? `${timer.value}s` : (timer.value === 60 ? "Send" : "Resend");
});

// 清除錯誤訊息
const clearErrorMessage = () => {
  errorMessage1.value = "";
  errorMessage2.value = "";
  errorMessage3.value = "";
  errorMessage4.value = "";
};

const isHidden1 = ref(true);
const isHidden2 = ref(true);
const isHidden3 = ref(true);

// 切換顯示/隱藏密碼的狀態
const togglePassword1 = () => {
  isHidden1.value = !isHidden1.value; // 切換隱藏狀態
};

const togglePassword2 = () => {
  isHidden2.value = !isHidden2.value; // 切換隱藏狀態
};

const togglePassword3 = () => {
  isHidden3.value = !isHidden3.value; // 切換隱藏狀態
};

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Confirm";
    case 2:
      return "Go to Homepage";
    default:
      return "Confirm";
  }
});

const handleButtonClick = async () => {
  if (currentStep.value === 1) {
    try {
      // 驗證 欄位1,欄位4
      const isStepValid = validateStep();

      if (!isStepValid) return; // 如果前端驗證失敗，阻止後續操作

      const errors1 = [];
      const errors4 = [];

      // 驗證驗證碼是否正確
      await verifyCode();
      if (!codeVerified) {
        errors4.push("X Incorrect verification code.");
        isButtonDisabled.value = true;
      }
      if (errors4.length > 0) {
        errorMessage4.value = errors4.join("\n");
        return false;
      }

      // 接著驗證當前密碼，並更新狀態!!
      await ChangePassword();
      if (!currentPasswordValid) {
        errors1.push("X Incorrect original password.");
      }
      if (errors1.length > 0) {
        errorMessage1.value = errors1.join("\n");
        return false;
      }

      // 如果所有驗證通過，進入下一步
      handleStepChange(currentStep.value += 1);
      errorMessage1.value = "";
      errorMessage4.value = "";
    } catch (error) {
      // 處理非預期錯誤
      // console.log(error, 'error')
      errorMessage4.value = "An error occurred, please try again later.";
    }
  } else {
    returnToLogin();
  }
};

// 返回上一頁的函數
const goBack = () => {
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  currentStep.value = newStep;
};

// 驗證驗證碼
const verifyCode = async () => {
  // console.log(verificationCode.value, "查驗驗證碼"); // 確認有拿到使用者信箱
  try {
    const response = await checkVerificationCode(
      verificationType,
      userStore.userInfo?.email,
      verificationCode.value
    );

    if (response.data.success) {
      errorMessage4.value = "";
      codeVerified = true;
    }
  } catch (error) {
    // 檢查錯誤響應中是否有 systemCode
    if(error.response.data.systemCode === 2005) {
      codeVerified = false;
    } else {
      // 處理錯誤
      errorMessage4.value = "Server error occurred, please try again later.";
    }
  }
};

// 變更密碼函數
const ChangePassword = async () => {
  // console.log('接著驗證當前密碼，並更新狀態!!')
  try {
    // 建構請求資料
    const passwordPayload = {
      password: currentPassword.value,
      newPassword: newPassword.value,
      code: verificationCode.value,
    };

    // 發送請求
    const response = await changePassword(passwordPayload);
    if (response.data.success) {
      currentPasswordValid = true;
      errorMessage1.value = "";
      errorMessage2.value = "";
      errorMessage3.value = "";
      errorMessage4.value = "";
    }
  } catch (error) {
    // 如果是4006代表當前密碼錯誤
    // console.log(error, 'error');
    if(error.response.data.systemCode === 4006) {
      currentPasswordValid = false;
    } 
    else {
      currentPasswordValid = true;  // 其他情況下仍然設置為 true
      // 處理錯誤
      errorMessage4.value = handleApiError(error);
      //errorMessage.value = "server error occurred, please try again later.";
    }
  }

};

// 表單驗證函數驗證 欄位1,欄位4
const validateStep = () => {
  const errors1 = [];
  const errors4 = [];
  // 驗證舊密碼是否正確
  if (!verificationCode.value) {
    errors4.push("X Please enter the verification code.");
  }
  if (!currentPassword.value) {
    errors1.push("X Please enter the current password.");
  }

  if (errors1.length > 0) {
    errorMessage1.value = errors1.join("\n");
    return false;
  }
  if (errors4.length > 0) {
    errorMessage4.value = errors4.join("\n");
    return false;
  }
  errorMessage1.value = "";
  errorMessage4.value = "";
  return true;
};

// 發驗證信
const sendVerificationEmail = async () => {
  try {
    const response = await sendAuthCode(verificationType, userStore.userInfo?.email);

    if (response.data.success) {
      errorMessage4.value = "";
      startTimer(); // 啟動新的倒計時
    }
  } catch (error) {
    errorMessage4.value = "Server error occurred, please try again later.";
  }
  // console.log('已寄驗證信了')
};

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
  isButtonDisabled.value = false;
};

// 重新發送驗證碼
const resendCode = async () => {
  isButtonDisabled.value = false;
  isButtonDisabled2.value = false;
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    await sendVerificationEmail();
  }
};

watch(currentPassword, (currentPassword) => {
  if (currentPassword.length>0) {
    const errors2 = [];
    if (newPassword === currentPassword) {
      errors2.push("X New password must differ from the current password.");
    } else {
      errors2.shift(0, 1, "X New password must differ from the current password.");
    }
    if (errors2.length >= 0) {
      errorMessage2.value = errors2.join("\n");
      return false;
    }
    return true;
  }
})

watch(newPassword, (newPassword) => {
  if (newPassword.length>0) {
    const errors2 = [];
    if (newPassword === currentPassword.value) {
      errors2.push("X New password must differ from the current password.");
    } else {
      errors2.shift(0, 1, "X New password must differ from the current password.");
    }
    const rules = [
      { regex: /.{8,}/, message: "X At least 8 characters long." },
      { regex: /[0-9]/, message: "X 1 number." },
      { regex: /[a-z]/, message: "X 1 lowercase character (a-z)." },
      { regex: /[A-Z]/, message: "X 1 uppercase character (A-Z)." },
    ];
    for (const rule of rules) {
      if (!rule.regex.test(newPassword)) {
        errors2.push(`${rule.message}`);
      }
    }
    if (errors2.length >= 0) {
      errorMessage2.value = errors2.join("\n");
      return false;
    }
    return true;
  }
})

// confirmPassword 輸入時被 watch
watch(confirmPassword, (confirmPassword) => {
  if (confirmPassword.length>0) {
    const errors3 = [];
    if (confirmPassword !== newPassword.value) {
      errors3.push("X Passwords don't match.");
    } else {
      errors3.shift("X Passwords don't match.");
    }
    if (errors3.length >= 0) {
      errorMessage3.value = errors3.join("\n");
      return false;
    }
    return true;
  }
})

onMounted(async () => {
  await userStore.fetchUserInfo(); // get email
  // await sendVerificationEmail();
});
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: -0.8rem;
  padding-bottom: 1rem;
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

pre {
  font-family: "Lexend Deca", "Inter", sans-serif !important;
  font-size: 13px;
  margin-bottom: 0px;
  overflow: visible;
  text-align: start;
  white-space: pre-wrap;
}

.winnie-back-btn {
  top: 1rem;
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
}

.img-fluid.eye-dark {
  width: 15px;
  position: absolute;
  right: .7rem;
  top: 2.8rem;
  cursor: pointer;
}

.winnie-bg-dark input.form-control {
  border: 1px solid #bbb;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
  border-radius: 3px;
}

.winnie-bg-dark input.form-control:focus {
  border: 1px solid #181a20;
}

.winnie-bg-dark input.form-control::placeholder {
  color: #bbb;
  font-size: 14px;
}

.manage-pw-container .manage-pw-form label {
  color: #181a20;
}

.manage-pw-container .manage-pw-form input::placeholder {
  color: #bbb;
}

.winnie-bg-dark .manage-pw-container .form-control {
  border: 1px solid #bbb;
  border-radius: 4px;
}

.winnie-bg-dark .manage-pw-container .form-control:focus {
  border: 1px solid #181a20;
  outline: none;
}

@media (min-width: 991.98px) and (max-width: 1199.98px) {
  .manage-pw-form {
    padding: 10px;
  }
}

@media (min-width: 991.98px) {
  .winnie-back-btn {
    top: 1.75rem;
  }
}

.winnie-bg-dark .btn-resend-code {
  background-color: #181a20;
  color: #f8f8f8;
  border: none;
}

.winnie-bg-dark .btn-resend-code:hover {
  background-color: #2b3139;
}

.side-img {
  flex: 1;
  height: 700px;
}

.img-cover {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 991px) {
	.side-img {
		display: none;
	}
}

.x-mark {
  width: 13px;
  margin-right: 2px;
  margin-top: 3px;
}

.notAllowed {
  cursor: not-allowed;
}

.btn-disabled {
  background-color: #BBB !important;
  cursor: not-allowed;
}

.auth-form .btn:disabled {
  opacity: 1 !important;
  background-color: #BBB !important;
}
</style>