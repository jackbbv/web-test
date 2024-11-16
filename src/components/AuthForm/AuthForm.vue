<template>
  <div class="auth-form">
    <div id="formTitle" class="form-title text-start mb-4" :style="{ marginBottom: marginBottom, textAlign: textAlign }">
      <p class="fs-1 fw-bold">{{ title }}</p>
    </div>

    <!-- 插入步驟特定的 email 或其他輸入 -->
    <slot name="email-input"></slot>

    <!-- 插入推薦碼 或其他輸入 -->
    <slot name="extra-input"></slot>

    <!-- 插入額外的輸入框 (如推薦碼或新密碼) -->
    <slot name="extra-password"></slot>

    <!-- 插入其他內容，如隱私權政策或提醒 -->
    <slot name="extra-content"></slot>

    <!-- 插入其他內容，如隱私權政策或提醒 -->
    <slot name="extra-final"></slot>

    <!-- 錯誤訊息插槽 -->
    <slot name="error"></slot>

    <button
      class="btn btn-primary w-100 mb-3 mt-3"
      @click="handleButtonClick"
      :disabled="isButtonDisabled"
      :class="{ notAllowed: isButtonDisabled }"
    >
      {{ buttonText }}
    </button>

    <!-- 插入返回首頁或其他操作 -->
    <slot name="extra-action"></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// 定義 props
const props = defineProps({
  title: String,
  buttonText: String,
  totalSteps: {
    type: Number,
    default: 1,
  },
  currentStep: {
    type: Number,
    default: 1,
  },
  handleButtonClick: Function,
  isButtonDisabled: {
    type: Boolean,
    default: false,
  },
  marginBottom: {
    type: String,
    default: '10px'
  },
  textAlign: {
    type: String,
    default: 'start'
  }
});

const emit = defineEmits(["update:currentStep"]);

// 下一步邏輯
const nextStep = () => {
  // 檢查步驟狀態並發送事件
  if (props.currentStep < props.totalSteps) {
    emit("update:currentStep", props.currentStep + 1); // 更新步驟
  } else if (props.currentStep === props.totalSteps) {
    emit("goToLogin"); // 當到達最後一步時觸發 'goToLogin'
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
  padding: 10px;
}

.btn-primary {
  background-color: #181a20;
  color: #f8f8f8;
  border: none;
  --bs-btn-active-bg: #2b3139;
  --bs-btn-hover-bg: #2B3139;
  --bs-btn-focus-shadow-rgb: transparent;
}

.btn-primary:hover {
  background-color: #2b3139;
}

.btn:disabled {
  background-color: #BBB;
  border-color: #BBB;
  box-shadow: none;
  outline: none;
  opacity: 1;
}

.btn.notAllowed {
  cursor: not-allowed;
}

.winnie-reset-pw .fs-1 {
  font-size: 2rem !important;
}

</style>
