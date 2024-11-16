<template>
  <div class="app-container">
    <!-- main -->
    <div class="winnie-withdraw container tabs mt-5 px-3 px-lg-0">
      <div class="d-flex justify-content-center align-items-center">
        <div class="p-2 text-center">
          <router-link to="/account/deposit">
            <button class="d-md-none mb-2">
              <img
                src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg"
                alt=""
              />
            </button>
            <p class="fw-bold">Deposit</p>
          </router-link>
        </div>
        <div class="divider align-items-center d-none d-md-inline"></div>
        <div class="p-2 text-center">
          <router-link to="/account/withdrawal">
            <button class="d-md-none mb-2 winnie-btn-active">
              <img
                src="@/assets/images/icon/iconPark-arrow-down 1.svg"
                alt=""
              />
            </button>
            <p class="fw-bold winnie-text-active">Withdraw</p>
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
              <img
                src="@/assets/images/icon/antOutline-history 1.svg"
                alt=""
              />
            </button>
            <p class="fw-bold">History</p>
          </router-link>
        </div>
      </div>
      
      <div class="d-flex justify-content-center">
        <div class="withdraw-page px-3 px-sm-0 mt-5">
          <div class="step-container step-one">
            <div>
              <div class="step-title">
                <div class="circle-number active me-4">1</div>
                <h5>Select Coin</h5>
              </div>
              <div class="d-flex justify-content-center">
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
                    style="background-color: #181a20"
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
          <div class="step-container step-two">
            <div>
              <div class="step-title">
                <div
                  class="circle-number me-4"
                  :class="{ active: params.supportCoin }"
                >
                  2
                </div>
                <h5>Withdraw to</h5>
              </div>
              <div
                class="d-flex align-items-center justify-content-center w-100"
              >
                <div
                  class="vertical-line me-5 d-none d-sm-block"
                  :class="{ active: params.supportCoin }"
                ></div>
                <div
                  class="mt-3 mt-md-0 w-100"
                  :style="{
                    visibility: params.supportCoin ? 'visible' : 'hidden',
                  }"
                >
                <div class="form-group">
                  <!-- 提款地址輸入 -->
                  <el-input
                    v-model="params.withdrawAddress"
                    class="form-control mb-2"
                    id="exampleFormControlInput1"
                    placeholder="Enter your address"
                    size="large"
                    clearable
                    @blur="validateAddress"
                  />
                    <!-- 如果地址驗證失敗，顯示紅字錯誤訊息 -->
                    <p v-if="addressError" class="text-danger">
                      {{ addressErrorMessage }}
                    </p>
                  </div>
                  <!-- 選擇網路 -->
                  <div
                    class="dropdown dropdown-coin d-flex align-items-center my-2 my-sm-0"
                  >
                    <el-select
                      v-model="params.selectNetwork"
                      size="large"
                      placeholder="Select Network"
                      v-if="selectShow"
                      class="d-flex align-items-center justify-content-start"
                      @change="selectedOption"
                    >
                      <!-- 提醒 -->
                      <!-- <div
                        class="deposit-notice-bk-color m-2 p-2 d-flex justify-content-between"
                      >
                        <p>
                          <font-awesome-icon
                            icon="fa-solid fa-circle-exclamation"
                            class="winnie-text-white me-2"
                          />
                        </p>
                        <p
                          class="text-start deposit-notice-color"
                          style="font-size: 12px;"
                        >
                          Please note that only supported networks on Binance
                          platform are shown, if you deposit via another network
                          your assets may be lost.
                        </p>
                      </div> -->
                      <el-option
                        v-for="network in options.supportNetworks"
                        :key="network.value"
                        :value="network.value"
                        :label="`${network.label} (${network.protocol})`"
                        style="height: 60px; background-color: #181a20"
                      >
                        <template #default>
                          <div class="info">
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <span
                                class="winnie-text-white"
                                >{{ network.label }}</span
                              >
                              <span
                                class="winnie-text-white"
                                >&#8776; {{ network.confirmMins }} mins</span
                              >
                            </div>
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <span class="winnie-text-gray winnie-fs-small"
                                >{{ network.fullName }} ({{
                                  network.protocol
                                }})</span
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
          </div>

          <!-- Step 3 -->
          <div class="step-container step-three">
            <div class="w-100">
              <div class="step-title">
                <div
                  class="circle-number me-4"
                  :class="{
                    active: params.selectNetwork && params.withdrawAddress,
                  }"
                >
                  3
                </div>
                <h5>Withdrawl Amount</h5>
              </div>
              <div
                v-if="stepThreeVisible"
                class="d-flex align-items-center flex-column flex-sm-row"
              >
                <div
                  class="vertical-line me-5 d-none d-sm-block"
                  style="background-color: transparent; height: 100px"
                ></div>
                <div class="input-group my-3 winnie-width-100">
                  <el-input
                    type="number"
                    id="inputWithdrawAmount"
                    size="large"
                    class="form-control amount-input no-spin-button"
                    placeholder="Minimum 30 USD"
                    v-model.number="params.withdrawAmount"
                    aria-label="withdraw amount"
                    aria-describedby="amount"
                    @blur="validateWithdrawAmountOnBlur"
                  />
                  <button class="btn max-btn" @click="setMaxWithdrawAmount">
                    MAX
                  </button>
                  <span class="input-group-text" id="withdrawUnit">{{
                    params.serviceFeeSymbol
                  }}</span>
                </div>
              </div>
              <div v-if="stepThreeVisible" class="d-flex">
                <div
                  class="vertical-line me-5 d-none d-sm-block"
                  style="background-color: transparent"
                ></div>
                <div class="info-section w-100">
                  <div class="info-row mb-1 mb-md-2">
                    <span>Available Withdrawal Balance</span>
                    <span class="d-none d-md-inline"
                      >{{ Number(params.maxWithdrawAmount || 0).toLocaleString('en-US') }}
                      {{ params.serviceFeeSymbol }}</span
                    >
                  </div>
                  <span class="d-inline d-md-none"
                    >{{ params.maxWithdrawAmount }} {{ params.serviceFeeSymbol }}</span
                  >
                  <div class="info-row mb-1 mb-md-2 mt-3 mt-md-0">
                    <span>Service fee</span>
                    <span class="d-none d-md-inline"
                      >{{ params.serviceFee }}
                      {{ params.serviceFeeSymbol }}</span
                    >
                  </div>
                  <span class="d-inline d-md-none"
                    >{{ params.serviceFee }} {{ params.serviceFeeSymbol }}</span
                  >
                  <!-- withdrawModal -->
                  <div
                    class="info-row justify-content-center justify-content-sm-end mt-4"
                  >
                    <button
                      class="withdraw-btn"
                      @click="checkFormDataAndSendEmail"
                      :disabled="!isAddressValid"
                    >
                      Withdraw
                    </button>
                  </div>
                  <div
                    v-if="isOpenEmailVerificationModal"
                    class="modal fade show"
                    id="withdrawModal"
                    tabindex="-1"
                    aria-labelledby="withdrawModalLabel"
                    aria-hidden="true"
                    role="dialog"
                    style="display: block"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div
                          class="modal-header d-flex justify-content-between"
                        >
                          <h5 class="modal-title" id="withdrawModalLabel"></h5>
                          <button
                            type="button"
                            class="btn winnie-btn-close"
                            @click="isOpenEmailVerificationModal = false"
                          >
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                          </button>
                        </div>
                        <div class="modal-body px-5">
                          <p class="fs-2 fw-bold">Email Verification</p>
                          <br />
                          <p class="winnie-text-gray">
                            We've sent a code to your email.
                          </p>
                          <br />
                          <div class="d-flex justify-content-center">
                            <input
                              v-for="(code, index) in codes"
                              :key="index"
                              ref="inputRefs"
                              type="text"
                              class="form-control text-center mx-1 code-input"
                              maxlength="1"
                              v-model="codes[index]"
                              @input="handleInput(index)"
                              @keydown.backspace="handleBackspace(index)"
                              autofocus
                            />
                          </div>
                            <!-- 錯誤訊息開始 -->
                            <p v-if="errorMessage" class="error-message d-flex">
                              <img src="@/assets/images/icon/antOutline-close 1.svg" class="me-2" style="width: 14px;" alt="">
                              <pre>{{ errorMessage }}</pre>
                            </p>
                            <!-- 錯誤訊息結束 -->
                        </div>
                        <div class="modal-footer px-5">
                          <button
                            id="withdrawConfirmButton"
                            type="button"
                            class="btn btn-primary w-100 mb-3 mt-3"
                            @click="withdrawApply"
                            :disabled="!formValid"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- withdraw Modal -->
    <WithdrawModal
      :isOpen="showSuccessModal"
      :title="modalTitle"
      :amount="Number(params.withdrawAmount || 0).toLocaleString('en-US')"
      :txid="params.withdrawAddress"
      @closeModal="showSuccessModal = false, toDashboard()"
    />

    <!-- reminder Modal -->
    <ReminderModal
      :isOpen="showReminderModal"
      :isForDeposit="false"
      @closeModal="showReminderModal = false"
    />
  </div>
</template>

<script setup>
import api from "@/services/modules"; // 引入 API 模組
import { ref, onMounted, reactive, watch, computed } from "vue";
// 下拉式測試 start
import USDCicon from "@/assets/images/icon/USDC-account.svg";
import USDTicon from "@/assets/images/icon/USDT-account.svg";
import { handleApiError } from "@/utils/errorHandler.js";
import WithdrawModal from "../../components/WithdrawModal.vue";
import ReminderModal from "@/components/ReminderModal.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const addressError = ref(false); // 地址驗證錯誤標誌
const addressErrorMessage = ref(""); // 錯誤訊息
const showSuccessModal = ref(false);
const showReminderModal = ref(false);
const isValid = ref(false);
const isOpenEmailVerificationModal = ref(false);
const isAddressValid = ref(false); // 新增一個變數來動態控制按鈕狀態
const modalTitle = ref("Withdrawal successful!");

// 定義是否可以提交表單
const formValid = computed(() => {
  return (
    params.withdrawAddress !== "" &&
    !addressError.value &&
    codes.value.every((code) => code !== "") &&
    isValid.value === true
  ); // 地址有效且驗證碼已填
});

// 輸入內容
const params = reactive({
  supportCoin: "",
  supportCoinImagePath: "",
  withdrawAddress: "",
  selectNetwork: "",
  withdrawAmount: 0,
  maxWithdrawAmount: "",
  code: "",
  serviceFee: "",
  serviceFeeSymbol: "",
});

const errorMessage = ref("");
const email = ref("")

const stepThreeVisible = ref(false); // 控制第三步是否顯示

const selectedOption = () => {
  showReminderModal.value = true;
};

// 當選擇的網路和地址變化時，檢查是否顯示第三步驟
watch(
  [() => params.selectNetwork, () => params.withdrawAddress],
  ([newSelectNetwork, newWithdrawAddress]) => {
    if (newSelectNetwork && newWithdrawAddress) {
      // 如果用戶輸入了地址並選擇了網路，顯示第三步驟
      stepThreeVisible.value = true;
    }
  }
);

const userInfo = reactive({});
// 監聽異動&圖片更換及網路更新
watch(
  () => params.supportCoin,
  async (newValue) => {
    await getWithDrawalData(); // 拿資料
    if (newValue) {
      // 更新加密貨幣圖片
      const findSupportCoin = options.supportCoins.find(
        (supportCoin) => supportCoin.value === newValue
      );
      if (findSupportCoin) {
        params.supportCoinImagePath = findSupportCoin.ImagePath;
      }

      try {
        const networkSetting = await getCryptocurrencySetting(newValue);

        // 检查 networkSetting.data 是否存在，并从 withdraw 部分获取数据
        if (networkSetting) {
          // 更新網路選擇框的選項
          options.supportNetworks =
            networkSetting.data.withdraw.supportNetworks.map((network) => ({
              label: network.networkFullName,
              value: network.network,
              protocol: network.protocol,
              confirmMins: network.confirmMins,
              fullName: network.networkFullName,
              supportSymbols: network.supportSymbols, // 确保这里有 supportSymbols
            }));
        } else {
          console.error(
            "NetworkSetting data is not in expected format:",
            networkSetting.data
          );
        }
      } catch (error) {
        console.error("Failed to get NetworkSetting:", error);
      }
    }
  }
);

watch(
  [() => params.selectNetwork, () => params.supportCoin],
  ([newSelectNetwork, newSupportCoin]) => {
    if (params.selectNetwork && params.supportCoin) {
      const selectNetwork = options.supportNetworks.find(
        (network) => network.value === newSelectNetwork
      );
      if (selectNetwork) {
        params.serviceFee = selectNetwork?.supportSymbols[0]?.withdrawalFee;
        params.serviceFeeSymbol = selectNetwork?.supportSymbols[0]?.symbol;
      } else {
        params.serviceFee = "N/A";
        console.error("Selected network not found:", newValue);
      }
    }
  }
);

// 校验输入金额是否在最小值和最大值范围内
const validateWithdrawAmountOnBlur = () => {
  if (params.withdrawAmount && params.withdrawAmount < 30) {
    params.withdrawAmount = 30;
  } else if (params.withdrawAmount > params.maxWithdrawAmount) {
    params.withdrawAmount = params.maxWithdrawAmount;
  }
};

// api - 取得使用者資訊
const getAccountInfo = async () => {
  try {
    const response = await api.userInfo.getAccountInfo();
    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

const setMaxWithdrawAmount = () => {
  params.withdrawAmount = params.maxWithdrawAmount;
};

// api - 取得出入金網路，幣種以及金額設定
const getCryptocurrencySetting = async () => {
  try {
    const response = await api.asset.getCryptocurrencySetting();
    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

// api - 發送驗證碼
const postSendAuthCode = async (type) => {
  try {
    const response = await api.account.sendAuthCode(type);
    console.log("Verification email", response);

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

// 出金申請
const withdrawApply = async () => {
  const findSupportCoin = options.supportCoins.find(
    (supportCoin) => supportCoin.value === params.supportCoin
  );
  const codeString = codes.value.join(""); // 将数组元素连接成字符串

  const formData = {
    network: params.selectNetwork,
    symbol: findSupportCoin.symbol,
    toAddress: params.withdrawAddress,
    amount: params.withdrawAmount, //記得之後要加手續費
    code: codeString,
  };

  try {
    const response = await api.asset.withdrawApply(formData);
    isOpenEmailVerificationModal.value = false;
    showSuccessModal.value = true;
    console.log("successfully:", response);
  } catch (error) {
    isOpenEmailVerificationModal.value = false;
    console.error("Failed:", error);
  }
};

const checkFormDataAndSendEmail = async () => {
  const type = "WithdrawApply";
  isOpenEmailVerificationModal.value = true;
  await postSendAuthCode(type);
};


// 當輸入提款地址時，進行正則驗證
const validateAddress = async () => {
  await getWithDrawalData()

  const addressRegex = new RegExp(addressRule.value); // 取得該獎勵的 addressRegex
  console.log()
  if (!addressRegex.test(params.withdrawAddress)) {
    addressError.value = true;
    addressErrorMessage.value = `Invalid address format. Please use a valid address for ${params.supportCoin}.`;
    isAddressValid.value = false; // 地址無效，禁用按鈕
  } else {
    addressError.value = false;
    addressErrorMessage.value = ""; // 清空錯誤訊息
    isAddressValid.value = true; // 地址有效，啟用按鈕
  }
};

const supportNetworks = ref([]);
const filteredData = ref([]);
const addressRule = ref([])
const getWithDrawalData = async() => {
  console.log(params.supportCoin,"Selected currency")
  try {
    const networkSetting = await getCryptocurrencySetting();
    supportNetworks.value = networkSetting.data.withdraw.supportNetworks; // 取得網路資料
    console.log(supportNetworks.value, "api data");
    // 根據所選幣種過濾網路
    filteredData.value = supportNetworks.value.filter((network) =>
      network.supportSymbols.some(
        (symbol) => symbol.symbol === params.supportCoin
      )
    );
    addressRule.value = filteredData.value[0].addressRegex
    console.log(addressRule.value)
    
    console.log(filteredData.value, "All relevant information about the currency");
  } catch (error) {
    console.error("Failed to get NetworkSetting:", error);
  }
}

onMounted(async () => {
  const cryptocurrencySetting = await getCryptocurrencySetting();
  const responseUserInfo = await getAccountInfo();

  Object.assign(userInfo, responseUserInfo.data);
  email.value = userInfo.email;
  params.maxWithdrawAmount = userInfo.balanceData.balance;
  if (cryptocurrencySetting) {
    cryptocurrencySetting.data.withdraw.supportCoins.forEach((supportCoin) => {
      options.supportCoins.push({
        ImagePath: iconMap[supportCoin.symbol] || "",
        label: supportCoin.fullName,
        value: supportCoin.symbol,
        symbol: supportCoin.symbol,
      });
    });
  }
});

const selectShow = ref(true);

// 下拉式測試 end
// Email驗證切分格子測試
const codes = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]); // 這將儲存所有 input 的引用

// 當用戶在一格中輸入後，自動跳到下一格
function handleInput(index) {
  if (codes.value[index].length === 1 && index < codes.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }

  // 檢查是否所有欄位都已輸入完畢，然後調用 verifyCode
  if (index === codes.value.length - 1) {
    const allFilled = codes.value.every((code) => code.length === 1);
    if (allFilled) {
      verifyCode(); // 當輸入到最後一格，並且所有格子都有輸入時調用驗證函數
    }
  }
}

// 當用戶按下 backspace 鍵時，自動退回到前一格
function handleBackspace(index) {
  if (codes.value[index] === "" && index > 0) {
    inputRefs.value[index - 1].focus();
    errorMessage.value = '';
  }
}

// 拼接六個輸入的值，並驗證
function verifyCode() {
  const fullCode = codes.value.join("");
  console.log("Full code:", fullCode);

  verifyCodeWithAPI(fullCode);
}

const verifyCodeWithAPI = async (code) => {
  const type = "WithdrawApply";
  try {
    const response = await api.account.checkVerificationCode(
      type,
      email.value,
      code
    );
    errorMessage.value = '';
    isValid.value = true;
    console.log(response, "Verification successful");
  } catch (error) {
    console.log(error);
    errorMessage.value = handleApiError(error);
  }
};

const toDashboard = () => {
  setTimeout(() => {
    router.push("/dashboard")
  }, 500);
};

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

/* email test */
.verification-container {
  max-width: 300px;
  margin: 0 auto;
}

.code-input {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
}

.container {
  width: 100%;
}

.winnie-withdraw a p {
  color: #f8f8f8;
}

.winnie-withdraw a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.winnie-withdraw a button:hover,
.winnie-withdraw a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.winnie-withdraw-bk {
  background-color: #2b3139;
  width: 100%;
  border-radius: 8px;
}

.winnie-withdraw .amount-input::placeholder {
  color: #6c757d;
}

@media (min-width: 420px) and (max-width: 575.98px) {
  .winnie-withdraw-bk {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .winnie-withdraw-bk {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .winnie-withdraw-bk {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .winnie-withdraw-bk {
    width: 600px;
  }
}

@media (max-width: 420px) {
  .winnie-withdraw {
    width: 100%;
  }
}

.winnie-withdraw input[type="number"]::-webkit-outer-spin-button,
.winnie-withdraw input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.winnie-withdraw input[type="number"] {
  -moz-appearance: textfield;
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

.btn {
  --bs-btn-border-color: none;
}

.max-btn {
  border-top: 1px solid #6c757d;
  border-bottom: 1px solid #6c757d;
  background-color: transparent;
  border-radius: 0px;
  color: #f8f8f8;
  padding: 1px 6px;
}

.max-btn:hover,
.max-btn:focus,
.max-btn:active {
  color: #fcd535;
  outline: none;
  box-shadow: none;
  border: none;
  border-top: 1px solid #6c757d;
  border-bottom: 1px solid #6c757d;
}

.max-btn:focus {
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


.step-three .info-section {
  margin-top: 20px;
}

.step-three .info-section .info-row {
  display: flex;
  justify-content: space-between;
}

.step-three #withdrawUnit {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #f8f8f8;
  border-left: none;
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

.step-three .input-group.winnie-width-100 {
  width: 100%;;
}

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .step-three .input-group.winnie-width-100  {
    width: 400px !important;
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

.winnie-withdraw .withdraw-btn {
  border: none;
  border-radius: 50px;
  background-color: #fcd535;
  padding: 8px 30px;
  color: #2b3139;
}

.withdraw-btn:disabled {
  background-color:  #2b3139;
  color: #F8F8F8;
  cursor: not-allowed;
  opacity: 0.6;
}

.withdraw-btn:disabled {
  background-color:  #2b3139;
  color: #F8F8F8;
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 575.98px) {
  .winnie-withdraw .withdraw-btn {
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    margin-top: 10px;
  }
}

.vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 130px;
  margin: 0 20px;
}

.vertical-line.active {
  background-color: #f8f8f8;
}

#withdrawModal, #withdrawSuccessModal,
#withdrawRemindModal,
#depositRemindModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#withdrawModal .form-control, #withdrawSuccessModal .form-control{
  border: none;
  border-bottom: 1px solid #bbbbbb;
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

#withdrawModal .form-control:focus,
#withdrawSuccessModal .form-control:focus {
  border-color: #f8f8f8;
  outline: none;
}

#withdrawModal .modal-header,
#withdrawSuccessModal .modal-header,
#withdrawRemindModal .modal-header,
#depositRemindModal .modal-header {
  border-bottom: none;
}

#withdrawModal .modal-footer,
#withdrawSuccessModal .modal-footer,
#withdrawRemindModal .modal-footer,
#depositRemindModal .modal-footer {
  border-top: none;
}

#withdrawModal .modal-dialog,
#withdrawSuccessModal .modal-dialog {
  display: flex;
  align-items: center;
}

#withdrawModal .modal-content,
#withdrawSuccessModal .modal-content {
  background-color: #181a20;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

#withdrawModal .modal-footer button,
#withdrawSuccessModal .modal-footer button {
  background-color: #2b3139;
  border: none;
  color: #f8f8f8;
}

#withdrawModal button#withdrawConfirmButton:hover,
#withdrawSuccessModal button#withdrawConfirmButton:hover {
  background-color: #414d5a;
}

#withdrawRemindModal button,
#depositRemindModal button {
  background-color: #fcd535;
  color: #181a20;
}

#withdrawRemindModal .modal-content,
#depositRemindModal .modal-content {
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

/* 共用 */

@media (max-width: 575.98px) {
  .withdraw-page {
  width: 100%;
  }
}

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

.step-container .dropdown-toggle, .el-input__wrapper {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .dropdown-toggle, .el-input__wrapper {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .dropdown-toggle, .el-input__wrapper {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .dropdown-toggle, .el-input__wrapper {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .dropdown-toggle, .el-input__wrapper {
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
  width: 270px;
}

@media (min-width: 420px) and (max-width: 575.98px) {
  .deposit-notice-bk-color {
    max-width: 300px;
  }
}
@media (min-width: 575.98px) {
  .deposit-notice-bk-color {
    max-width: 340px;
  }
}

@media (min-width: 767.98px) {
  .deposit-notice-bk-color {
    max-width: 400px;
  }
}
@media (min-width: 991.98px) {
  .deposit-notice-bk-color {
    max-width: 580px;
  }
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
</style>
<style>
.step-container .el-select__wrapper, .step-two .form-control {
  width: 100%;
  background-color: transparent;
}
@media (min-width: 420px) {
  .step-container .el-select__wrapper, .step-two .form-control {
    width: 100%;
  }
}
@media (min-width: 575.98px) {
  .step-container .el-select__wrapper, .step-two .form-control {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .el-select__wrapper, .step-two .form-control {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .el-select__wrapper, .step-two .form-control {
    width: 600px;
  }
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

.el-select-dropdown__item {
  line-height: 30px;
}

.no-spin-button::-webkit-outer-spin-button,
.no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spin-button input[type="number"]::-webkit-outer-spin-button,
.no-spin-button input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-number {
  -webkit-appearance: textfield;
}
.no-number input[type="number"] {
  -webkit-appearance: textfield;
}

.el-input__inner {
  color: #f8f8f8;
}

.winnie-btn-active {
  background-color: #414d5a !important;
}

.el-input .el-input__wrapper, .el-popper {
  background-color: #181a20 !important;
}
.el-popper ul li:hover {
  background-color: #414d5a  !important;
}

@media (min-width: 767.98px) {
  .winnie-text-active {
  color: #fcd535 !important;
  }
}
</style>
