<template>
  <div class="deposit-page px-3 px-sm-0 mt-5">
    <!-- Slot for additional content at the top -->
    <slot name="extra-content"></slot>
    <!-- Step 1 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div class="circle-number active me-4">1</div>
          <h5>Select Coin</h5>
        </div>
        <div class="d-flex justify-content-center w-100">
          <div class="vertical-line active d-none d-sm-block me-5"></div>
          <!-- Element Plus 下拉选择框 -->
          <el-select
            v-model="params.supportCoin"
            size="large"
            placeholder="Select Coin"
            v-if="selectShow"
            class="d-flex align-items-center justify-content-center my-4 my-sm-0"
          >
            <template #prefix>
              <el-image
                v-if="params.supportCoinImagePath"
                :src="params.supportCoinImagePath"
                style="width: 20px; height: 20px; margin-right: 5px"
              ></el-image>
            </template>
            <el-option
              v-for="item in options.supportCoins"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              class="winnie-text-white"
            >
              <template #default>
                <div class="option-content">
                  <el-image
                    :src="item.ImagePath"
                    style="width: 20px; height: 20px; margin-right: 10px"
                  ></el-image>
                  {{ item.label }}
                </div>
              </template>
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div
            class="circle-number me-4"
            :class="{ active: params.supportCoin }"
          >
            2
          </div>
          <h5>Select Network</h5>
        </div>
        <div class="d-flex align-items-center justify-content-center w-100">
          <div
            class="vertical-line me-5 d-none d-sm-block"
            :class="{ active: params.supportCoin }"
          ></div>
          <div
            class="dropdown dropdown-coin d-flex align-items-center justify-content-center w-100"
            :style="{ visibility: params.supportCoin ? 'visible' : 'hidden' }"
          >
            <el-select
              v-model="params.selectNetwork"
              size="large"
              placeholder="Select Network"
              v-if="selectShow"
              class="my-4 my-sm-0 d-flex align-items-center justify-content-center"
              @change="selectedOption"
            >
              <el-option
                v-for="network in filteredNetworks"
                :key="network.network"
                :value="network.network"
                :label="`${network.network} (${network.protocol})`"
                style="height: auto"
              >
                <template #default>
                  <div class="info">
                    <div class="d-flex justify-content-between">
                      <span class="winnie-text-white" style="color: #f8f8f8">{{
                        network.network
                      }}</span>
                      <span class="winnie-text-white" style="color: #f8f8f8"
                        >&#8776; {{ network.confirmMins }} mins</span
                      >
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="winnie-text-gray winnie-fs-small"
                        >{{ network.fullName }} ({{ network.protocol }})</span
                      >
                      <span class="winnie-text-gray winnie-fs-small"
                        >{{ network.confirmMins }} mins</span
                      >
                    </div>
                  </div>
                </template>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div
            class="circle-number me-4"
            :class="{ active: params.selectNetwork }"
          >
            3
          </div>
          <h5>Deposit Address</h5>
        </div>
        <div
          class="d-flex justify-content-center justify-content-md-start w-100"
        >
          <div
            v-if="params.selectNetwork"
            class="d-flex align-items-center flex-column flex-md-row"
          >
            <div
              class="vertical-line me-5 d-none d-md-block"
              style="background-color: transparent"
            ></div>
            <div class="mt-3">
              <!-- <img v-if="!apiIsLoading" class="qrcode-pic" src="@/assets/images/common/qrcode-test.png" alt=""> -->
              <vue-qr
                v-if="!apiIsLoading"
                class="qrcode-pic"
                :text="params.address"
                :size="200"
              ></vue-qr>
            </div>
            <div class="mt-3 ms-2 ms-sm-0 ms-md-3 mx-lg-4">
              <p class="my-2">Address</p>
              <div
                class="company-address mb-4 d-flex justify-content-between align-items-center mx-auto w-100"
              >
                <p class="my-2 py-1 ps-3">
                  {{ params.address }}
                </p>
                <font-awesome-icon
                  icon="fa-solid fa-copy"
                  class="d-inline px-3"
                  @click="copyAddress"
                />
              </div>
              <p class="my-2" v-if="params.selectNetwork !== 'BSC_TEST'">Minimum deposit 10 USD</p>
              <p class="my-2" v-else>
                Minimum deposit
                {{ params.minDepositAmount }}
                USD
              </p>
              <p class="my-2 winnie-text-gray">1 USD = 1 Point</p>
            </div>
          </div>
        </div>
        <div
          v-if="params.selectNetwork"
          class="d-md-flex align-items-center"
        >
          <div
            class="vertical-line me-5 d-none d-md-block"
            style="background-color: transparent"
          ></div>
          <div
            class="deposit-notice-bk-color p-3 justify-content-between deposit-notice-bottom"
          >
            <p class="deposit-notice-color" style="font-size: 12px">
              <font-awesome-icon
              icon="fa-solid fa-circle-exclamation"
              class="winnie-text-white me-2"
            />
              Please note that only supported networks on Tyche1.com platform are shown, if you deposit via another network your assets may be lost.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- reminder Modal -->
    <ReminderModal
      :isOpen="showReminderModal"
      :isForDeposit="true"
      :selectedNetwork="params.selectNetwork"
      :supportCoin="params.supportCoin"
      @closeModal="showReminderModal = false"
    />
  </div>
</template>

<script setup>
import api from "@/services/modules"; // 引入 API 模組
import { ref, onMounted, reactive, watch, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import USDCicon from "@/assets/images/icon/USDC-account.svg";
import USDTicon from "@/assets/images/icon/USDT-account.svg";
import VueQr from "vue-qr/src/packages/vue-qr.vue";
import { useUserStore } from "@/stores/user";
// import WithdrawModal from "@/components/WithdrawModal.vue";
import ReminderModal from "@/components/ReminderModal.vue";

const userStore = useUserStore();
const memberId = ref(null);
const userInfo = ref({});

console.log(memberId, "memberId");

// create websocket connect
const socketUrl = "wss://test.tyche1.com:8443/ws/notification";
const sockMessage = ref(""); // 存儲從後端接收到的消息

let socket;

const showSuccessModal = ref(false);
const showReminderModal = ref(false);
// const modalTitle = ref("Deposit successful!");
const sockDepositAmount = ref(0);
const sockTransactionId = ref("");

const connectWebSocket = () => {
  socket = new WebSocket(socketUrl);

  // 2. 當 WebSocket 連接成功
  socket.onopen = () => {
    console.log("WebSocket connection established");

    if (!memberId.value) {
      console.log("MemberId cannot be empty！");
      return;
    }
    const initialData = JSON.stringify({ memberId: memberId.value });
    console.log("Send data: " + initialData);
    socket.send(initialData); // 發送 JSON 數據
  };

  // 3. 當收到後端發來的消息
  socket.onmessage = (event) => {
    console.log(event);
    const data = JSON.parse(event.data);
    console.log("Received message from server:", data);

    // 假設後端推送的消息格式為 { type: 'depositSuccess', message: 'Deposit successful!' }
    if (data) {
      sockMessage.value = "Deposit successful!";
      sockDepositAmount.value = data[data.length - 1].Amount;
      sockTransactionId.value = data[data.length - 1].Txid;
      showSuccessModal.value = true; // open modal

      // // 顯示入金成功的通知
      // ElMessage({
      //   message: "Deposit successful!",
      //   type: "success",
      //   duration: 5000,
      // });
    }
  };

  // 4. 當 WebSocket 連接關閉
  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  // 5. 當 WebSocket 出現錯誤
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

// 輸入內容
const params = reactive({
  supportCoin: "",
  supportCoinImagePath: "",
  selectNetwork: "",
  address: "",
  originAddress: "",
  minDepositAmount: "",
});

const apiIsLoading = ref(false);

// 根據選擇的幣種過濾網路
const filteredNetworks = ref([]);

const isCopyCoolDown = ref(false);

const copyAddress = async () => {
  if (isCopyCoolDown.value) {
    return; // 如果冷卻中，直接返回，不顯示提示
  }

  try {
    await navigator.clipboard.writeText(params.originAddress);
    ElMessage({
      message: "Address copied successfully.",
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

const selectedOption = () => {
  showReminderModal.value = true;
};

watch(
  [() => params.supportCoin, () => params.selectNetwork],
  async ([newSupportCoin, newSelectNetwork]) => {
    if (newSupportCoin && newSelectNetwork) {
      apiIsLoading.value = true;

      const formData = {
        network: newSelectNetwork,
        symbol: newSupportCoin,
      };
      const response = await getAddress(formData);

      if (response?.data?.address) {
        params.address = response.data.address;
        params.originAddress = response.data.address;
      }

      apiIsLoading.value = false;
    }
  }
);

// const maskAddress = (address) => {
//   // 提取前 13 個字符和最後 4 個字符
//   const prefix = address.slice(0, 13);
//   const suffix = address.slice(-4);
//   // 組合成所需的格式
//   return `${prefix}...${suffix}`;
// };

// api - 取得地址
const getAddress = async (formData) => {
  try {
    const response = await api.asset.getAddress(formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

const supportNetworks = ref([]);

// 監聽異動&圖片更換及網路更新
watch(
  [() => params.supportCoin, () => params.selectNetwork],
  async ([newSupportCoin, newSelectNetwork]) => {
    
    if (newSupportCoin) {
      // 更新加密貨幣圖片
      const findSupportCoin = options.supportCoins.find(
        (supportCoin) => supportCoin.value === newSupportCoin
      );
      if (findSupportCoin) {
        params.supportCoinImagePath = findSupportCoin.ImagePath;
      }

      // 取得網路
      try {
        const networkSetting = await getCryptocurrencySetting(newSupportCoin);
        supportNetworks.value = networkSetting.data.deposit.supportNetworks; // 取得網路資料

        // 根據所選幣種過濾網路
        filteredNetworks.value = supportNetworks.value.filter((network) =>
          network.supportSymbols.some(
            (symbol) => symbol.symbol === params.supportCoin
          )
        );

        if (networkSetting) {
          // 更新網路選擇框的選項
          options.supportNetworks =
            networkSetting.data.deposit.supportNetworks.map((network) => ({
              network: network.network, // 确保这里有 network
              supportSymbols: network.supportSymbols, // 确保这里有 supportSymbols
            }));
        } 
        else {
          console.error(
            "NetworkSetting data is not in expected format:",
            networkSetting.data
          );
        }

        console.log("Selected currency:", newSupportCoin);
        console.log("Selected network:", newSelectNetwork);
        // console.log("要讀取的資料", options.supportNetworks);
        const i = options.supportNetworks.find(
          i => (i.network === newSelectNetwork )
        );

        if ( params.selectNetwork === 'BSC_TEST') {
          if (i.supportSymbols[0].symbol === newSupportCoin ) params.minDepositAmount = i.supportSymbols[0].minDepositAmount
          if (i.supportSymbols[1].symbol === newSupportCoin ) params.minDepositAmount = i.supportSymbols[1].minDepositAmount
        }

      } catch (error) {
        console.error("Failed to get NetworkSetting:", error);
      }
    }
  }
);

// api - 取得出入金網路，幣種以及金額設定
const getCryptocurrencySetting = async () => {
  try {
    const response = await api.asset.getCryptocurrencySetting();
    console.log("CryptocurrencySetting get successfully:", response);

    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

const options = reactive({
  supportCoins: [],
  supportNetworks: [],
});

const iconMap = {
  USDT: USDTicon,
  USDC: USDCicon,
};

onMounted(async () => {
  const cryptocurrencySetting = await getCryptocurrencySetting();

  if (cryptocurrencySetting) {
    cryptocurrencySetting.data.deposit.supportCoins.forEach((supportCoin) => {
      options.supportCoins.push({
        ImagePath: iconMap[supportCoin.symbol] || "",
        label: supportCoin.fullName,
        value: supportCoin.symbol,
        symbol: supportCoin.symbol,
      });
    });
  }

  userInfo.value = await userStore.fetchUserInfo();
  if (!userInfo.value) {
    userInfo.value = {}; // 確保 userInfo 是一個空對象
  }
  memberId.value = userInfo.value?.userId;
  console.log(userInfo.value);
  connectWebSocket();
});

// 7. 組件卸載時關閉 WebSocket 連接
onBeforeUnmount(() => {
  if (socket) {
    socket.close();
  }
});

const selectShow = ref(true);
</script>

<style scoped>
/* deposit */

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .container {
    width: 75%;
  }
}

a p {
  color: #f8f8f8;
}

a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

a button:hover,
a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.dropdown-item:focus,
.dropdown-item:hover {
  color: #f8f8f8;
  background-color: #414d5a;
}

.vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

.vertical-line.active {
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

@media (max-width: 575.98px) {
  .deposit-page {
    width: 100%;
  }
  .vertical-line {
    display: none;
  }
  .deposit-notice-bk-color.deposit-notice-bottom {
    margin: 2rem 0 -2rem;
  }
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
  .step-container .dropdown-toggle,
  .el-popper,
  .el-select-dropdown {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .dropdown-toggle,
  .el-popper,
  .el-select-dropdown {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .dropdown-toggle,
  .el-popper,
  .el-select-dropdown {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .dropdown-toggle,
  .el-popper,
  .el-select-dropdown {
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
  margin: 2rem 0;
}

.winnie-fs-small {
  font-size: 12px;
}

.company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

@media (min-width: 575.98px) {
  .deposit-notice-bottom {
    width: 100%;
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
  font-size: 14px;
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

.dropdown-toggle::after {
  display: none;
}
</style>

<style>
.step-container .el-select__wrapper {
  width: 100%;
  background-color: transparent;
}

@media (min-width: 420px) {
  .step-container .el-select__wrapper {
    width: 100%;
  }
}
@media (min-width: 575.98px) {
  .step-container .el-select__wrapper {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .el-select__wrapper {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .el-select__wrapper {
    width: 600px;
  }
}

.company-address {
  width: fit-content;
}

.option-content {
  display: flex;
  align-items: center;
}

.step-container .el-select__wrapper {
  background-color: transparent;
  border: 1px solid #6c757d;
  box-shadow: none;
}

.step-container .el-select__placeholder {
  color: #f8f8f8;
}

.step-container .form-control {
  border: 1px solid #6c757d;
}

.step-container .el-select__selection {
  background-color: transparent;
}

.step-container .el-input__wrapper {
  display: flex;
  background-color: transparent;
  box-shadow: none;
}

.step-container .el-input.form-control {
  padding: 0px;
}

.fa-copy {
  cursor: pointer;
}

.d-winnie-text {
  display: none;
}

@media (min-width: 470px) {
  .d-winnie-text {
    display: block;
  }
}

.el-select-dropdown {
  background-color: #1e2329;
}

.el-select-dropdown__item {
  background-color: #1e2329;
}

.el-select-dropdown__item.selected {
  background-color: #414d5a;
}

.el-select-dropdown__item:hover {
  background-color: #414d5a;
}

.el-select-dropdown__item.is-hovering {
  background-color: #414d5a;
}

select,
input {
  font-size: 16px;
}

.note-topic {
  display: block;
  width: 100%;
}
p.note-topic {
  text-align: center;
  color: #df9f9f;
  padding-bottom: 0.5rem;
}
.deposit-notice-color p {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 1rem;
  text-indent: -0.5rem;
}
p.text-start ul {
  display: flex;
}
p.text-start ul {
  display: block;
  width: 100%;
}


</style>