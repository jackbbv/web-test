<template>
  <div class="app-container d-none d-sm-block d-flex flex-column">
    <!-- screen-size-web -->
    <div class="winnie-account-web container d-none d-sm-block flex-grow-1">
      <div class="personal-info d-flex flex-wrap">
        <div class="col-12 col-lg-8 col-xl-7 d-flex">
          <div
            @click="openChangePicModal"
            class="col-4 col-md-2 avatar-container text-end text-lg-start me-3"
          >
            <img class="avatar-photo" :src="userInfo.avatarUrl" @error="setAltImg" alt="avatar" />
            <img
              class="hover-icon"
              src="@/assets/images/icon/iconPark-edit-two 1.svg"
              alt=""
            />
          </div>

          <ChangePicModal
            :isOpen="showChangePicModal"
            @closeModal="showChangePicModal = false"
            @avatarChanged="onAvatarChanged"
          />

          <div class="col-4 d-flex flex-column">
            <div class="d-flex mb-1">
              <p class="fw-bold">{{ userInfo.name }}</p>
              <a href="#" @click="openNicknameReviseModal">
                <img
                  class="ms-2"
                  src="@/assets/images/icon/iconPark-edit-two 1.svg"
                  alt=""
              /></a>
              <router-link to="/manage-password"
                ><img
                  class="ms-2"
                  src="@/assets/images/icon/antFill-lock 1.svg"
                  alt=""
              /></router-link>
            </div>
            <div class="personal-email fw-bold">
              <p class="winnie-color-gray" style="font-size: 14px">Email</p>
              <p>{{ userInfo.email }}</p>
            </div>
          </div>
          <div class="col-4 ps-3 ps-md-2 col-md-6 d-flex flex-column ms-5">
            <div class="mb-1">
              <button
                class="d-flex align-items-center btn-get-rewards fw-bold"
                @click="openGetRewardsModal"
              >
                <img
                  class="me-2"
                  src="@/assets/images/icon/antFill-gift 1 (yellow).svg"
                  alt=""
                />Get Rewards!
              </button>
            </div>

            <GetRewardsModal
              :isOpen="showGetRewardsModal"
              @closeModal="showGetRewardsModal = false"
              :userId="userInfo.userId"
            />

            <NicknameReviseModal
              :isOpen="showNicknameReviseModal"
              @closeModal="showNicknameReviseModal = false"
              :userName="userInfo.name"
              @upDataNickname="onNicknameChanged"
            />

            <div class="personal-id">
              <p class="winnie-color-gray fw-bold" style="font-size: 14px">
                User ID
                <img
                  class="copy-icon ms-1"
                  src="@/assets/images/icon/md-content_copy 1.svg"
                  alt="userId"
                  @click="copyUserId"
                />
              </p>
              <p class="fw-bold">{{ userInfo.userId }}</p>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-lg-4 col-xl-5 d-flex flex-column align-items-center align-items-lg-end mt-5 mt-lg-0"
        >
          <div class="personal-balance d-flex align-items-center mb-2 mb-lg-0">
            <button
              class="btn-dashboard bck-yellow fw-bold f-color-dark py-0 me-2"
              @click="goToDepositPage"
            >
              Buy Now
            </button>
            <img src="@/assets/images/icon/balance-icon.png" alt="" />
            <span class="fs-2 fw-bold ms-2">
              {{
                isBalanceHidden
                  ? maskBalance
                  : balance.toLocaleString("en-US")
              }}
              </span>
              <a href="#" @click.stop.prevent="toggleBalanceVisibility">
                <img
                  class="img-fluid ms-3 mb-1"
                  style="max-width: 18px; vertical-align: middle"
                  :src="isBalanceHidden ? eyeCloseIcon : eyeIcon"
                  alt="Eye Icon"
                />
              </a>
          </div>

          <!-- <div v-else>尚無資料</div> -->
        </div>
        <div class="d-flex mt-5 w-100" v-if="rewardButtonData.length > 0">
            <div class="d-flex col justify-content-end flex-wrap">
              <div
                class="box-item"
                v-for="item in filteredRewardButtonData"
                :key="item.round"
              >
                <button
                  class="d-flex flex-row btn-dashboard-auto justify-content-center align-items-center bck-dark ms-2 px-2 mb-2"
                  type="button"
                  id="dropdownMenuRewardsList"
                  aria-expanded="false"
                  @click="goToRewardPage(item.symbol)"
                >
                  <img :src="getCurrencyIcon(item.symbol)" alt="" />
                  <span class="f-color-white fw-bold pe-1" v-if="item.balance<1">
                    {{item.balance}}
                  </span>
                  <span class="f-color-white fw-bold pe-1" v-else>
                    {{item.balance.toLocaleString("en-US")}}
                  </span>
                </button>
              </div>

              <div class="dropdown rewards-list-dropdown ms-2">
                <button
                  class="d-flex flex-row btn-dashboard-auto justify-content-center align-items-center bck-dark px-3"
                  type="button"
                  id="dropdownMenuRewardsList"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="f-color-white fw-bold" style="font-size: 12px"
                    >more...</span
                  >
                </button>
                <!-- rewards-list-start -->
                <ul
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuRewardsList"
                >
                  <TableComponent
                    Title=""
                    :headers="rewardHeaders"
                    :data="rewardsData"
                    customClass="transparent-bg-table"
                    :imageFirst="true"
                  />
                </ul>
                <!-- rewards-list-end -->
              </div>
            </div>
          </div>
      </div>
      <div class="account-form my-5">
        <TableComponent
          Title=""
          :headers="headers"
          :data="tableData"
          :imageFirst="false"
        />
      </div>
    </div>
  </div>
  <Pagination
        v-if="tableData.length > 0"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @page-changed="fetchPageData"
        class="mt-auto"
      />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

import ChangePicModal from "./component/ChangePicModal.vue";
import GetRewardsModal from "./component/GetRewardsModal.vue";
import NicknameReviseModal from "./component/NicknameReviseModal.vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import VerifyIcon from "@/assets/images/icon/arcoDesign-launch 1.svg";
import VerifyBlackIcon from "@/assets/images/icon/arcoDesign-launch 1-black.svg";
import UploadIcon from "@/assets/images/icon/md-file_upload Copy 2.svg";
import Point from "@/assets/images/icon/balance-icon.png";

import { useUserStore } from "@/stores/user";
import modules from "@/services/modules";
import { getCurrencyIcon } from "@/assets/images.js";

import eyeIcon from "@/assets/images/icon/antFill-eye.svg"; // 顯示金額圖標
import eyeCloseIcon from "@/assets/images/icon/antFill-eye-invisible.svg"; // 隱藏金額圖標
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const isBalanceHidden = ref(true);

const {
  userInfo: { getGameRewardHistory, getAccountInfo },
  auth: { getTransactionLog },
} = modules;

const router = useRouter();

const userStore = useUserStore();
const showChangePicModal = ref(false);
const showGetRewardsModal = ref(false);
const showNicknameReviseModal = ref(false);
const userInfo = ref({
  name: "",
  userId: "",
  avatarUrl:
    "https://defiweb.oss-ap-northeast-1.aliyuncs.com/images/icon/NFT/14.png",
  email: "",
  balanceData: {
    symbol: "POINT",
    balance: 0.0,
    lockedBalance: 0.0,
  },
});
const balance = ref(0); // 改為響應式變量
const tableData = ref([]);
const rewardsData = ref([]);
const totalItems = ref(0); // 總項目數
const itemsPerPage = ref(8); // 每頁顯示 5 筆
const transactionType = "All";
const rewardButtonData = ref([]);

const withGamePlayData = false;
const withRewardData = false;
const withRewardBalanceData = true;

const headers = [
  { text: "Timestamp", class: "winnie-dashboard-ps col-4 col-lg-7 py-3" },
  { text: "Type", class: "col-3 col-lg-2" },
  { text: "Value", class: "text-end pe-4 col-4 col-lg-2" },
  { text: "Verify", class: "winnie-dashboard-pe text-center col-1" },
];

const rewardHeaders = [
  { text: "Round", class: "ps-3" },
  { text: "Time", class: "text-center" },
  { text: "Type", class: "text-center" },
  { text: "Value", class: "text-end" },
  { text: "Withdraw", class: "text-center" },
];

// 使用 computed 來過濾掉 balance 為 0 的項目
const filteredRewardButtonData = computed(() => {
  return rewardButtonData.value.filter((item) => item.balance > 0);
});

const fetchRewardButtonData = async () => {
  try {
    const res = await getAccountInfo(
      withGamePlayData,
      withRewardData,
      withRewardBalanceData
    );

    rewardButtonData.value = res.data.data.getRewardBalanceData;
  } catch (error) {
    console.error("Fetching the history failed：", error);
  }
};

// 調用 API 獲取歷史資料
const fetchPageData = async (pageIndex) => {
  try {
    const response = await getTransactionLog(
      transactionType,
      itemsPerPage.value,
      pageIndex
    );

    if (response && response.data.data) {
      tableData.value = formatHistoryData(response.data.data.items); // 該頁資料的整理
      totalItems.value = response.data.data.total; // 總筆數
    } else {
      console.error("Failed to retrieve valid history data");
    }
  } catch (error) {
    console.error("Fetching the history failed：", error);
  }
};

const formatHistoryData = (data) => {
  return data.map((history) => [
    {
      text: formatDate(history.transactionDateTime),
      class: "winnie-dashboard-ps py-3",
      image: null,
    },
    {
      text: history.type,
      image:
        history.type === "Deposit" ? getCurrencyIcon(history.sourceSymbol) : "",
      imageStyle: history.type === "Deposit" ? "max-width: 22px" : "",
      class: "",
    },
    {
      text: history.amount.toLocaleString("en-US"),
      image: getCurrencyIcon(history.symbol) || Point,
      class: "text-end",
    },
    {
      image: VerifyIcon,
      class: "text-center icon-cursor winnie-dashboard-pe",
      link: history.transactionUrl,
      target: "_blank",
      blackImage: VerifyBlackIcon,
    },
  ]);
};

const getRewards = async () => {
  try {
    const res = await getGameRewardHistory();
    if (res && res.data.data) {
      rewardsData.value = formatRewardsData(res.data.data); // 該頁資料的整理
    }
  } catch (error) {
    console.log("getRewards error", error);
  }
};

const formatDate = (isoDateString) =>
  dayjs(isoDateString).format("YYYY/MM/DD HH:mm:ss");

const formatRewardsData = (data) => {
  return data.map((reward) => {
    return [
      { text: reward.round, class: "ps-3 text-center" }, // rewardId
      { text: formatDate(reward.time) }, // 格式化的日期
      {
        text: reward.rewardSymbol + " " + reward.rewardFullName,
        image: getCurrencyIcon(reward.rewardSymbol),
        class: "text-start",
      }, // 幣種符號及圖標
      { text: reward.rewardAmount.toLocaleString("en-US"), class: "text-end" }, // 獎勵數量
      {
        image: UploadIcon,
        class: "text-center",
        link: `/account/reward/${reward.rewardId}`,
        target: "_self",
      },
    ];
  });
};

const openChangePicModal = () => {
  showChangePicModal.value = true;
};

const openGetRewardsModal = () => {
  showGetRewardsModal.value = true;
};

const openNicknameReviseModal = () => {
  showNicknameReviseModal.value = true;
};

const goToDepositPage = () => {
  router.push("/account/deposit");
};

const goToRewardPage = (symbol) => {
  router.push({ path: `/account/reward/${symbol}` });
};

const isCopyCoolDown = ref(false);

// 定義一個方法來複製 userId 到剪貼板
const copyUserId = async () => {
  if (isCopyCoolDown.value) return;
  try {
    await navigator.clipboard.writeText(userInfo.value.userId);
    ElMessage({
      message: "User ID Copied successfully.",
      type: "success",
    });

    isCopyCoolDown.value = true;

    setTimeout(() => {
      isCopyCoolDown.value = false;
    }, 3000);
  } catch (error) {
    ElMessage.error({
      message: "Copy failed, please try again!",
      duration: 3000,
      grouping: true,
    });
  }
};

// 被子組件通知更換新名稱
const onNicknameChanged = (newNickname) => {
  userStore.updateNickname(newNickname);
};

// 被子組件通知更換新頭像
const onAvatarChanged = (newAvatarUrl) => {
  userStore.updateAvatar(newAvatarUrl);
};

// 加載用戶信息的函數
const loadUserInfo = async () => {
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo

  balance.value = userInfo.value?.balanceData?.balance?.toLocaleString("en-US");
  userInfo.value.email = userInfo.value?.email
    ? maskEmail(userInfo.value.email)
    : ""; // 隱藏 email 部分內容
};

// 定義隱藏 email 的函數
const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) {
    return `${localPart}***@${domain}`; // 如果前綴少於或等於3個字母，全顯示然後加***
  }
  const maskedLocalPart = `${localPart.slice(0, 3)}***`;
  return `${maskedLocalPart}@${domain}`;
};

// 切換顯示/隱藏金額的狀態
const toggleBalanceVisibility = () => {
  isBalanceHidden.value = !isBalanceHidden.value; // 切換隱藏狀態
};

// 計算屬性，用來生成與金額位數相同的星號
const maskBalance = computed(() => {
  return "*".repeat(6); // 生成為6* 
});

onMounted(async () => {
  await Promise.all(
    [loadUserInfo(), getRewards(), fetchPageData(1)],
    fetchRewardButtonData()
  );
});
</script>

<style scoped>
/* web */
.app-container {
  min-height: 77vh !important;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
}

.winnie-account-web {
  min-height: 65vh;
  margin-top: 3rem;
}

.winnie-account-web .personal-info .avatar-photo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.btn-get-rewards {
  border: none;
  background-color: #2b3139;
  color: #fcd535;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 50px;
}

.btn-get-rewards:hover {
  background-color: #414d5a;
}

.btn-dashboard {
  border: none;
  border-radius: 50px;
  width: 150px;
  height: 35px;
}

.btn-dashboard-auto {
  border: none;
  border-radius: 50px;
  width: auto;
  height: 35px;
}

.bck-yellow {
  background-color: #fcd535;
}

button.bck-yellow:hover {
  background-color: #e5bf30;
}

.bck-dark {
  background-color: #2b3139;
}

.bck-dark:hover {
  background-color: #414d5a;
}

.winnie-account-web .f-color-white {
  color: #f8f8f8;
}

.winnie-account-web .f-color-dark {
  color: #1e2329;
}

.account-form .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.account-form .table th,
.account-form .table td {
  vertical-align: middle;
}

.account-form thead {
  color: #bbb;
}

.account-form .table tbody tr th {
  color: #bbb;
  text-align: start;
  padding-left: 5rem;
}

.account-form .table tbody tr:hover {
  --bs-table-hover-bg: #414d5a !important;
}

.account-form .table img {
  max-width: 35px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .account-form .table {
    --bs-table-bg: none;
  }
  .account-form .table img {
    max-width: 24px;
  }
  .content_detail__pagination.cdp.mt-auto {
    display: none;
  }
}

.dashboard-page-nav .pagination {
  --bs-pagination-bg: transparent;
  --bs-pagination-border-color: none;
  --bs-pagination-focus-color: #fcd535;
  --bs-pagination-hover-bg: transparent;
  --bs-pagination-focus-bg: transparent;
  --bs-pagination-hover-color: #fcd535;
  --bs-pagination-color: #415058;
  --bs-pagination-focus-box-shadow: none;
}

.account-form .table th {
  min-width: 120px;
}

#changeAvatarModal .modal-header {
  border-bottom: none;
}

#changeAvatarModal .modal-footer {
  border-top: none;
}

.rewards-list-dropdown table th,
.rewards-list-dropdown table td {
  vertical-align: middle;
}

.rewards-list-dropdown .dropdown-menu,
.rewards-list-dropdown .dropdown-menu table th,
.rewards-list-dropdown .dropdown-menu table td {
  background-color: #2b3139;
  color: #f8f8f8;
}

.rewards-list-dropdown .dropdown-menu {
  width: 500px;
  border: 1px solid #414D5A;
}

@media (min-width: 991.98px) {
  .rewards-list-dropdown .dropdown-menu {
    width: 660px;
    max-height: 300px;
    overflow-y: scroll;
  }

    .rewards-list-dropdown .dropdown-menu::-webkit-scrollbar {
    width: 5px;
    background-color: #2b3139;
  }

  .rewards-list-dropdown .dropdown-menu::-webkit-scrollbar-thumb {
    background-color: #1e2329;
    border-radius: 4px;
  }

  .rewards-list-dropdown .dropdown-menu::-webkit-scrollbar-thumb:hover {
    background-color: #414D5A;
  }
}



/* setting */

.winnie-dialog-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-bottom {
  transform: translateY(100%);
}

.modal.show .winnie-dialog-bottom {
  transform: translateY(0);
}

.winnie-dialog-right {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-right {
  transform: translateX(-100%);
}

.modal.show .winnie-dialog-right {
  transform: translateX(0);
}

#changeAvatarModal .modal-dialog,
#changeAvatarModal .modal-content {
  background-color: #2b3139;
  color: #f8f8f8;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

#changeAvatarModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 280px;
  border: none;
  border-radius: 10px;
  height: 47px;
}

#nicknameRevisePhoneModal .modal-dialog .modal-content {
  background-color: #181a20;
}

.rewards-list-dropdown .dropdown-menu .leaderboard-container .table {
  --bs-table-bg: transparent;
}

.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 50%;
  width: 72px;
  height: 72px;
}

.avatar-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.1s ease;
}

.avatar-container:hover::before {
  opacity: 1;
}

.avatar-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.hover-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-container:hover .hover-icon {
  opacity: 1;
}

.copy-icon {
  cursor: pointer;
}

.el-popper.is-dark {
  background-color: red !important;
  color: white !important;
}
</style>
