<template>
  <div class="play-container mt-2 mt-md-3 mt-lg-5">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div class="col-8 d-flex align-items-center">
        <p class="fw-bold">THE POT</p>
        <div
          class="play-prize d-flex align-items-center justify-content-end ps-5"
        >
          <img :src="gameData.prizeIcon" alt="prize icon" />
          <p class="ms-2 fw-bold" v-if="gameData.prizeAmount<1">{{ gameData.prizeAmount }}</p>
          <p class="ms-2 fw-bold" v-else>{{ gameData.prizeAmount.toLocaleString("en-US") }}</p>
        </div>
      </div>
      <div>
        <div class="player-limit d-flex ps-3 align-items-center">
          <p class="d-flex align-items-center me-3 fw-bold">
            <img
              class="me-2"
              style="max-width: 24px"
              :src="gameData.voteIcon"
              alt=""
            />Vote
          </p>
          <span class="fw-bold"
            >{{ gameData.votes }} / {{ gameData.totalVotes }}</span
          >
          <!-- 動態的參加数 -->
        </div>
      </div>
    </div>
    <div class="game-intro mt-3">
      <div class="row">
        <div class="col-sm-6 col-md-7">
          <div
            class="game-intro-title d-flex justify-content-between align-items-start"
          >
            <h1 class="fw-bold">{{ gameDetails.name }}</h1>
            <div class="d-flex flex-column">
              <p class="d-block fw-bold">ROUND {{ gameDetails.round }}</p>
              <img
                class="dollar-width"
                :src="gameData.dollarIcon"
                alt=""
                @click="openJoinGameModal"
                :style="{
                  cursor:
                    gameData.votes === gameData.totalVotes
                      ? 'not-allowed'
                      : 'pointer',
                }"
              />
            </div>
          </div>
          <div class="game-intro-content">
            <span style="font-size: 14px">
              The Game is an interactive on-chain treasure hunting game, players
              join challenges, and the results are revealed once the player
              limit is reached, with only one winner.</span
            >
            <br /><br />
            <span
              class="fw-bold fs-6"
              style="margin-bottom: 10px; display: inline-block"
              >GAME INSTRUCTIONS</span
            ><br />
            <span style="font-size: 14px"
              >A provably fair algorithm is used to draw the prizes.</span
            ><br />
            <span style="font-size: 14px"
              >Winner revealed when voting is filled.</span
            >
          </div>
        </div>
        <div
          class="col-sm-6 col-md-5 col-xl-4 ms-md-auto d-flex flex-column justify-content-between"
        >
          <div
            class="mt-2 d-flex justify-content-center player-list-hexagon"
            style="flex-direction: row-reverse"
          >
            <HexagonButton
              v-for="(image, index) in hexagonImages"
              :key="index"
              class="ms-1"
              :backgroundImage="image"
              :isClickable="index === 0"
              @openModal="openModal"
            />

            <!-- Player list Modal large size-->
            <!-- PlayListModal -->
            <PlayerListModal
              :isOpen="showModal"
              :players="playListData"
              @closeModal="showModal = false"
            />
          </div>
          <div class="game-attend mt-3">
            <button
              class="game-attend-btn py-4 fs-1 fw-bold"
              @click="handleButtonClick"
              :disabled="gameData.votes === gameData.totalVotes"
              :class="{
                'disabled-button': gameData.votes === gameData.totalVotes,
              }"
            >
              {{
                gameData.votes === gameData.totalVotes
                  ? "Round Closed"
                  : "START"
              }}
            </button>

            <!-- Join Modal -->
            <JoinGameModal
              :isOpen="showJoinGameModal"
              :gameInfo="JoinGame"
              @closeModal="showJoinGameModal = false"
              @showInsufficientFundsModal="openInsufficientFundsModal"
              @refreshGameDetails="refreshGameDetails"
              @showVotingFullModal="openVotingFullModal"
            />

            <!-- 餘額不足modal -->
            <InsufficientFundsModal
              :isOpen="showInsufficientFundsModal"
              @closeModal="closeInsufficientFundsModal"
              title="Deposit"
            />

            <!-- maxParticipantsModal-->
            <VotingFullModal
              :isOpen="showVotingFullModal"
              @closeModal="showVotingFullModal = false"
            />

            <WinnerModal
              :isOpen="showWinnerModal"
              :winnerInfo="WinnerData"
              @closeModal="showWinnerModal = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrencyIcon } from "@/assets/images.js";
import { showErrorNotification } from "@/utils/errorHandler.js";
import modules from "@/services/modules.js";
import { useUserStore } from "@/stores/user";

import HexagonButton from "./components/HexagonButton.vue";
import PlayerListModal from "./components/PlayerListModal.vue";
import JoinGameModal from "./components/JoinGameModal.vue";
import VotingFullModal from "./components/VotingFullModal.vue";
import WinnerModal from "./components/WinnerModal.vue";
import InsufficientFundsModal from "./components/InsufficientFundsModal.vue";

// import backgroundImage01 from "@/assets/images/common/attend_eth.png";
import dollar from "@/assets/images/icon/dollar-phone2.png";
import mdiVote from "@/assets/images/icon/mdi_vote-outline.svg";
import defaultAvatar from "@/assets/images/icon/player-list.svg";

// api import
const {
  game: { getGamePlayer },
} = modules;

const props = defineProps({
  gameDetails: {
    type: Object,
    required: true,
  },
  showWinner: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["refreshGameDetails"]);

const showModal = ref(false); //player list modal 控制模態框是否顯示
const showJoinGameModal = ref(false);
const showVotingFullModal = ref(false);
const showWinnerModal = ref(false);
const showInsufficientFundsModal = ref(false); // 控制InsufficientFundsModal的顯示與隱藏

const playData = ref({});
const hexagonImages = ref([]);
const playListData = ref([]);
const route = useRoute(); // 獲取路由對象
const router = useRouter();
const userStore = useUserStore();
// let iconImage;

const isLoggedIn = userStore.isLoggedIn;

const gameData = computed(() => ({
  title: props.gameDetails.name,
  prizeIcon: getCurrencyIcon(props.gameDetails.rewardSymbol),
  prizeAmount: props.gameDetails.rewardQuantity,
  voteIcon: mdiVote, // 固定投票圖標
  votes: props.gameDetails.betQuantityTotal,
  totalVotes: props.gameDetails.maxQuantity,
  round: props.gameDetails.round || "-", // 預設回合數
  dollarIcon: dollar, // 固定美元圖標
}));

// if (props.gameDetails.betSymbol === "POINT") {
//   iconImage = backgroundImage01;
// }

// join game data
const JoinGame = ref({
  // backgroundImage: iconImage,
  backgroundImage: props.gameDetails.attendImgUrl,
  round: props.gameDetails.round,
  title: props.gameDetails.name,
  betUnitAmount: props.gameDetails.betUnitAmount,
  vote: props.gameDetails.betQuantityTotal,
  myVote: props.gameDetails.accountQuantity,
  maxVote: props.gameDetails.maxQuantity,
  accountMaxVote: props.gameDetails.accountMaxQuantity,
});

// winner data
const WinnerData = ref({
  winnerName: props.gameDetails.winnerName,
  winnerAvatarUrl: props.gameDetails.winnerAvatarUrl,
  backgroundImage: props.gameDetails.attendImgUrl,
});

// 打開餘額不足的視窗
const openInsufficientFundsModal = () => {
  showJoinGameModal.value = false; // 先關閉JoinGameModal遊戲視窗
  showInsufficientFundsModal.value = true;
};

// 關閉餘額不足的視窗
const closeInsufficientFundsModal = () => {
  showInsufficientFundsModal.value = false;
};

// 打開模態框
const openModal = () => {
  showModal.value = true; // 當接收到 openModal 事件時顯示模態框
};

const openJoinGameModal = () => {
  // console.log(gameData.value, 'gameData.value is right, but component joinGameModel is not update')
  if (gameData.value.votes !== gameData.value.totalVotes & isLoggedIn) {
      showJoinGameModal.value = true;
  }
  else if (!isLoggedIn) {
    router.push("/login");
  }
};

const handleButtonClick = () => {
  if (isLoggedIn) {
    openJoinGameModal();
  } else {
    router.push("/login");
  }
};

const openVotingFullModal = () => {
  showVotingFullModal.value = true;
};

const openWinnerModal = () => {
  showWinnerModal.value = true;
};

const getPlayerData = async (gameId) => {
  try {
    const res = await getGamePlayer(gameId);
    playData.value = res.data.data; // 這邊就是所有玩家資料的array

    // 使用 map 將玩家的 playerIconUrl 提取出來
    hexagonImages.value = [defaultAvatar] // 在開頭加上預設圖片
      .concat(playData.value.map((player) => player.playerIconUrl)) // 拼接玩家圖像
      .slice(0, 8); // 確保只取前 8 個

      // 如果玩家不足 8 個，用預設圖片補齊
    while (hexagonImages.value.length < 8) {
      hexagonImages.value.push(defaultAvatar);
    }

    playListData.value = playData.value.map((player) => ({
      name: player.player,
      votes: player.voteAmount,
      rate: player.voteRate,
      image: player.playerIconUrl,
    }));
  } catch (error) {
    console.error("Retrieving player data failed :", error);
    showErrorNotification();
  }
};

const refreshGameDetails = () => {
  emit("refreshGameDetails");
  getPlayerData(route.params.gameId); // 當收到更新資料也一同變更玩家資料
};

// 監聽路由參數 gameId 的變化，當路由變化時重新獲取玩家資料
watch(
  () => route.params.gameId,
  (newGameId) => {
    getPlayerData(newGameId); // 當 gameId 變化時，重新載入資料
  }
);

// 監聽 gameDetails 的變化
watch(
  () => props.gameDetails,
  (newDetails) => {
    // 當遊戲結束且有贏家時，打開 WinnerModal
    if (newDetails.gameEnded && newDetails.winnerName) {
      // 更新 WinnerData，以確保彈窗顯示最新的贏家資訊
      WinnerData.value = {
        winnerName: newDetails.winnerName,
        winnerAvatarUrl: newDetails.winnerAvatarUrl,
        backgroundImage: newDetails.attendImgUrl,
      };
      openWinnerModal();
    }
  }
);

// 檢查 `winnerName` 並決定是否顯示 `WinnerModal`
onMounted(() => {
  // 拿玩家資料
  getPlayerData(route.params.gameId);
  // 檢查遊戲是否已經結束
  if (props.gameDetails.gameEnded && props.gameDetails.winnerName) {
    openWinnerModal();
  }
});
</script>

<style scoped>
.play-container {
  flex: 1;
}

@media (min-width: 575.98px) and (max-width: 991.98px) {
  .play-container .dot {
    width: 4px;
    height: 4px;
    background-color: #f8f8f8;
    border-radius: 50%;
  }
}

.play-container .player-limit p {
  border: 1px solid #bbb;
  padding: 2px 4px;
}

.play-container .game-attend-btn {
  background-image: url("@/assets/images/common/play_button.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: 1px solid #bbb;
  color: #f8f8f8;
  width: 100%;
}

.play-container .game-attend-btn {
  position: relative;
  /* 确保伪元素覆盖按钮 */
  z-index: 1;
}

.play-container .game-attend-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.play-container .game-attend-btn:hover::after {
  background-color: rgba(255, 255, 255, 0.1);
}

.play-container .game-attend-btn.disable {
  color: #f8f8f8;
}

@media (min-width: 575.98px) {
  .game-intro-title {
    flex-direction: column;
    align-items: flex-start;
  }
  .game-intro-title .flex-column {
    flex-direction: row !important;
    align-items: center;
  }
  .game-intro-title .flex-column p {
    padding-right: 20px;
  }
}

.game-attend-btn {
  border-radius: 0px;
}

.winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-text-white {
  color: #f8f8f8;
}

.winnie-text-gray {
  color: #bbb;
}

@media (max-width: 767.98px) {
  .custom-rounded {
    border-radius: 0px;
  }
}

/* game-attend-modal & winner-modal */
.game-attend .modal-dialog {
  width: 100%;
}

@media (min-width: 575.98px) {
  .game-attend .modal-dialog {
    max-width: 400px;
  }
}

.game-attend #joinModal .modal-background,
#winnerModal .modal-background,
#maxParticipantsModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.game-attend #joinModal .modal-content {
  color: #f8f8f8;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
}

.game-attend #joinModal .attend-times-btn button {
  background-color: transparent;
  border: 1px solid #f8f8f8;
  padding: 8px 30px;
  color: #f8f8f8;
  border-radius: 10px;
}

.game-attend #joinModal .modal-header,
#winnerModal .modal-header,
#playerListModal .modal-header,
#playerListSmModal .modal-header,
#insufficientBalanceModal .modal-header,
#maxParticipantsModal .modal-header {
  border-bottom: none;
}

.game-attend #joinModal .modal-footer,
#winnerModal .modal-footer,
#playerListModal .modal-footer,
#playerListSmModal .modal-footer,
#insufficientBalanceModal .modal-footer,
#maxParticipantsModal .modal-footer {
  border-top: none;
}

.game-attend #joinModal .modal-body input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #f8f8f8;
  color: #f8f8f8;
  text-align: center;
  border-radius: 0px;
}

.game-attend #joinModal .modal-body input:focus {
  outline: none;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn {
  background-color: #fcd535;
  border: none;
  color: #181a20;
  padding: 8px 90px;
}

#winnerModal .modal-dialog .modal-content {
  min-height: 500px;
}

#winnerModal .modal-footer .winnie-color-gray,
#maxParticipantsModal .winnie-color-gray {
  color: #bbb;
}

#playerListModal .table,
#playerListSmModal .table {
  --bs-table-bg: transparent;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

#playerListModal .table .player-list-name {
  font-size: 1rem;
}

#playerListModal .table td,
#playerListModal .table th {
  vertical-align: middle;
}

#insufficientBalanceModal .modal-dialog {
  max-width: 576px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .modal-dialog {
    max-width: 750px;
  }
}

#insufficientBalanceModal a p {
  color: #f8f8f8;
}

#insufficientBalanceModal a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

#insufficientBalanceModal a button:hover,
#insufficientBalanceModal a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

#insufficientBalanceModal .vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

#insufficientBalanceModal .vertical-line.active {
  background-color: #f8f8f8;
}

#insufficientBalanceModal .divider {
  width: 1px;
  height: 30px;
  background-color: #bbb;
  margin: 0px 30px;
}

@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container {
    display: flex;
    align-items: flex-start;
    /* margin-bottom: 30px; */
  }
}

#insufficientBalanceModal .circle-number {
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

#insufficientBalanceModal .circle-number.active {
  background-color: #414d5a;
  color: #f8f8f8;
}

#insufficientBalanceModal .step-title {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
}

#insufficientBalanceModal .dropdown-menu {
  background-color: #2b3139;
  --bs-dropdown-link-hover-bg: #414d5a;
}

#insufficientBalanceModal .step-container .dropdown-toggle {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 600px;
  }
}

#insufficientBalanceModal .step-container ul.dropdown-menu {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 600px;
  }
}

#insufficientBalanceModal .deposit-notice-color {
  color: #f8f8f8;
}

#insufficientBalanceModal .deposit-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

#insufficientBalanceModal .winnie-fs-small {
  font-size: 12px;
}

#insufficientBalanceModal .company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

#insufficientBalanceModal .deposit-notice-bottom {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 400px;
  }
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 600px;
  }
}

#insufficientBalanceModal .company-address p {
  font-size: 16px;
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .company-address p {
    font-size: 14px;
  }
}

#insufficientBalanceModal .qrcode-pic {
  width: 160px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 120px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 170px;
  }
}

@media (max-width: 768px) {
  #insufficientBalanceModal .company-address p {
    word-wrap: break-word;
    word-break: break-all;
  }
}

#insufficientBalanceModal .form-control {
  box-shadow: none;
}

#insufficientBalanceModal .form-control:focus {
  box-shadow: none;
}

#insufficientBalanceModal ul li a img {
  max-width: 24px;
}

#insufficientBalanceModal ul li a .abbr {
  font-weight: bold;
  color: #f8f8f8;
}
#insufficientBalanceModal ul li a .full-name {
  color: #bbb;
}

.game-intro-title .dollar-width {
  height: 60px;
}

@media (max-width: 400px) {
  .game-intro-title h1 {
    font-size: 22px;
  }
  .game-intro-title .dollar-width {
    height: 46px;
  }
}

#maxParticipantsModal .modal-dialog .modal-content {
  min-height: 300px;
}

#maxParticipantsModal {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 禁用狀態的按鈕樣式 */
.disabled-button {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
}

.game-intro-content span {
  letter-spacing: 0.2px;
}
</style>