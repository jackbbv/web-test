<template>
  <div class="login-buttons">
    <button
      :class="['btn btn-outline-primary me-1 me-xl-2', loginButtonClass]"
      type="button"
      @click="login"
      :data-bs-dismiss="dismissModal ? 'modal' : ''"
    >
      Log In
    </button>
    <button
      :class="['btn btn-primary me-1 me-xl-2', signupButtonClass]"
      type="button"
      @click="signup"
      :data-bs-dismiss="dismissModal ? 'modal' : ''"
    >
      Sign Up
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  loginButtonClass: {
    type: String,
  },
  signupButtonClass: {
    type: String,
  },
  dismissModal: {
    type: Boolean,
  },
});

// define
const emit = defineEmits(["login", "signup"]);

// send 暫時沒用
// const login = () => {
//   emit("login");
// };

// const signup = () => {
//   emit("signup");
// };
const login = () => {
  router.push("/login"); // 直接跳轉到登錄頁面
};

const signup = () => {
  router.push("/register"); // 直接跳轉到註冊頁面
};
</script>

<style scoped>
/* 可在此處加入 LoginButtons 的樣式 */
.btn-outline-primary {
  border-color: #fcd535;
  color: #f8f8f8;
  font-weight: 600;
  border-radius: 10px;
}

.btn-outline-primary:hover, .btn-outline-primary:focus {
  border-color: #fcd535 !important;
  color: #fcd535;
  background-color: transparent !important;
}

.btn-primary {
  background-color: #fcd535;
  border-color: #fcd535;
  color: #181a20;
  font-weight: 600;
  border-radius: 10px;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #e5bf30 !important;
  border-color: #e5bf30 !important;
  color: #181a20;
}

.winnie-width-48 {
  width: 48%;
}

</style>
