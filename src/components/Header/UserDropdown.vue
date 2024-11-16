<template>
  <div
    class="dropdown dropdown-member-info d-inline-flex align-items-center me-3"
  >
    <a
      class="d-flex align-items-center dropdown-toggle text-white"
      href="#"
      id="dropdownMenuMember"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div>
        <img class="me-2 w-4" :src="userAvatar" @error="setAltImg" alt="User Avatar" />
      </div>
      <p class="personal-id text-center fs-6 fw-bold mb-0">{{ userId }}</p>
    </a>
    <ul
      class="dropdown-menu dropdown-menu-lg-start px-3 py-4 fw-bold"
      style="width: 250px"
      aria-labelledby="dropdownMenuMember"
    >
      <div class="text-center mt-1">
        <img class="img-fluid user-avatar" :src="userAvatar" @error="setAltImg" alt="User Avatar" />
        <p class="fs-6 fw-bold mt-2">
          {{ userId }}
        </p>
      </div>

      <div class="personal-balance-info mt-4">
        <div class="d-flex justify-content-center align-items-center mt-3 mx-2">
          <img
            class="me-2 img-fluid balance-icon"
            style="max-width: 30px; vertical-align: middle"
            src="@/assets/images/icon/balance-icon.png"
            alt="Balance Icon"
          />
          <p class="personal-balance fw-bold mb-0 w-100">
            {{
              isBalanceHidden ? maskBalance : balance.toLocaleString("en-US")
            }}
            <a href="#" @click.stop.prevent="toggleBalanceVisibility">
              <img
                class="img-fluid ms-2 mb-1"
                style="max-width: 16px; vertical-align: middle"
                :src="isBalanceHidden ? eyeCloseIcon : eyeIcon"
                alt="Eye Icon"
              />
            </a>
          </p>
        </div>
        <div class="text-center mt-3">
          <button
            class="btn btn-primary fs-6 mt-1 px-4"
            style="border-radius: 50px"
            type="button"
            @click="router.push('/account/deposit')"
          >
            Recharge Now
          </button>
        </div>
      </div>

      <li class="mt-4">
        <router-link
          class="dropdown-item winnie-member-info fs-6 fw-bold"
          to="/dashboard"
        >
          <img
            class="me-3 mb-1"
            style="max-width: 16px"
            src="@/assets/images/icon/md-dashboard.svg"
            alt="Dashboard Icon"
          />
          Dashboard
        </router-link>
      </li>
      <li class="mt-2">
        <a
          class="dropdown-item winnie-member-info fs-6 fw-bold"
          @click="$emit('logout')"
        >
          <font-awesome-icon icon="fa-solid fa-power-off" class="me-3" />
          Log Out
        </a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const router = useRouter();
const isBalanceHidden = ref(true);

// 計算屬性，用來生成與金額位數相同的星號
const maskBalance = computed(() => {
  return "*".repeat(6); // 生成為6* 
});

// 切換顯示/隱藏金額的狀態
const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value; // 切換隱藏狀態
};

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  userAvatar: {
    type: String,
  },
});
</script>

<style scoped>
.w-4 {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
}
.dropdown-menu {
  background-color: #1e2329;
}

.dropdown-item:hover {
  color: #f8f8f8;
  background-color: #35485d;
}

.collapse .dropdown-member-info p {
  color: #f8f8f8;
}

.collapse .dropdown-member-info .personal-balance {
  font-size: 1.25rem;
}

.collapse .dropdown-member-info .winnie-member-info {
  background-color: transparent;
  color: #f8f8f8;
}

.collapse .dropdown-member-info .winnie-member-info:hover {
  background-color: #35485d;
}

.navbar .btn-primary {
  background-color: #fcd535;
  border-color: #fcd535;
  color: #181a20;
  font-weight: 600;
  border-radius: 10px;
}

.navbar .btn-primary:hover {
  background-color: #e5bf30;
  border-color: #e5bf30;
  color: #181a20;
  font-weight: 600;
  border-radius: 10px;
}

.dropdown-toggle::after {
  display: none;
}

@media (min-width: 991.98px) {
  .dropdown-menu-lg-start[data-bs-popper] {
    right: 0;
    left: auto;
    top: 2.2em;
    border: 1px solid #414D5A;
  }
}

.balance-icon {
  margin-right: auto;
}

.personal-balance {
  flex: 1;
  text-align: end;
}

.user-avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-member-info li {
  cursor: pointer;
}
</style>
