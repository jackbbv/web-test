<template>
  <div class="container play-container px-0 mt-2 mt-md-3 mt-lg-5">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div class="col-8 d-sm-flex align-items-center">
        <p>THE POT</p>
      </div>
      <div class="col-4">
        <div class="play-prize d-flex align-items-center justify-content-end">
          <img :src="gameData.prizeIcon" alt="prizeIcon" />
          <p class="ms-2 fs-5" v-if="gameData.prizeAmount<1">{{ gameData.prizeAmount }}</p>
          <p class="ms-2 fs-5" v-else>{{ gameData.prizeAmount.toLocaleString("en-US") }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2 justify-content-center player-list-hexagon" style="flex-direction: row-reverse;">
      <HexagonButton
        v-for="(image, index) in hexagonImages"
        :key="index"
        class="ms-1"
        :backgroundImage="image"
        :isClickable="index === 0"
        @openModal="openModal"
      />
      <!-- Player list Modal small size-->
      <PlayerListModal
        :isOpen="showModal"
        :players="playListData"
        @closeModal="showModal = false"
      />
    </div>
    <div class="d-flex mt-3 justify-content-between align-items-center">
      <p>ROUND {{ gameDetails.round }}</p>
      <div class="player-limit d-flex align-items-center">
        <p class="d-flex align-items-center me-3">
          <img
            class="me-2"
            style="max-width: 24px"
            src="@/assets/images/icon/mdi_vote-outline.svg"
            alt=""
          />Vote
        </p>
        <span>{{ gameData.votes }} / {{ gameData.totalVotes }}</span>
      </div>
    </div>
    <div class="game-intro mt-3">
      <div class="row">
        <div class="col-12 col-sm-7">
          <div
            class="game-intro-title d-flex justify-content-between align-items-center"
          >
            <h1 class="fw-bold">{{ gameDetails.name }}</h1>
            <div class="d-flex flex-column">
              <img
                class="dollar-width"
                style="cursor: pointer"
                src="@/assets/images/icon/dollar-phone2.png"
                alt=""
                @click="openJoinGameModal"
              />
            </div>
          </div>
          <div class="game-intro-content">
            <span class="fs-6">
            The Game is an interactive on-chain treasure hunting game, players join
            challenges, and the results are revealed once the player limit is
            reached, with only one winner.</span>
            <br /><br />
            <span class="fw-bold fs-6" style="margin-bottom: 10px; display: inline-block;">GAME INSTRUCTIONS</span><br />
            <span class="fs-6">A provably fair algorithm is used for the game.</span><br />
            <span class="fs-6">Winner revealed when voting is filled.</span>
          </div>
        </div>
        <div
          class="col-12 col-sm-5 col-md-4 ms-md-auto d-flex flex-column justify-content-between"
        >
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
            />

            <!-- InsufficientFunds Modal -->
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

            <!-- <button class="btn btn-outline-primary" @click="openWinnerModal">
              WinnerModal
            </button> -->
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
import modules from "@/services/modules.js";
import { useUserStore } from "@/stores/user";

import HexagonButton from "./components/HexagonButton.vue";
import PlayerListModal from "./components/PlayerListModal.vue";
import JoinGameModal from "./components/JoinGameModal.vue";
import VotingFullModal from "./components/VotingFullModal.vue";
import WinnerModal from "./components/WinnerModal.vue";
import InsufficientFundsModal from "./components/InsufficientFundsModal.vue";

import backgroundImage01 from "@/assets/images/common/attend_eth.png";
import dollar from "@/assets/images/icon/dollar-phone2.png";
import mdiVote from "@/assets/images/icon/mdi_vote-outline.svg";
import defaultAvatar from "@/assets/images/icon/player-list.svg";

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
const userStore = useUserStore();

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
let iconImage;
const isLoggedIn = userStore.isLoggedIn;

const gameData = computed(() => ({
  title: props.gameDetails.name,
  prizeIcon: getCurrencyIcon(props.gameDetails.rewardSymbol),
  prizeAmount: props.gameDetails.rewardQuantity,
  voteIcon: mdiVote, // 固定投票圖標
  votes: props.gameDetails.betQuantityTotal,
  myVote: props.gameDetails.accountQuantity,
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
});

const WinnerData = ref({
  winnerName: props.gameDetails.winnerName,
  winnerAvatarUrl: props.gameDetails.winnerAvatarUrl,
  backgroundImage: props.gameDetails.attendImgUrl,
});

const openInsufficientFundsModal = () => {
  showJoinGameModal.value = false; // 先關閉JoinGameModal遊戲視窗
  showInsufficientFundsModal.value = true; // 打開InsufficientFundsModal視窗
};

const closeInsufficientFundsModal = () => {
  showInsufficientFundsModal.value = false;
};

const openModal = () => {
  showModal.value = true; // 當接收到 openModal 事件時顯示模態框
};

const openJoinGameModal = () => {
  if (gameData.value.votes !== gameData.value.totalVotes &isLoggedIn) {
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
    //console.log(nonExistentVariable); // 這會觸發 ReferenceError: nonExistentVariable is not defined

    playListData.value = playData.value.map((player) => ({
      name: player.player,
      votes: player.voteAmount,
      rate: player.voteRate,
      image: player.playerIconUrl,
    }));
  } catch (error) {}
};

const refreshGameDetails = () => {
  console.log("Received join");
  emit("refreshGameDetails");
  getPlayerData(route.params.gameId);
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
        backgroundImage: backgroundImage01,
      };
      openWinnerModal();
    }
  }
);

// 檢查 `winnerName` 並決定是否顯示 `WinnerModal`
onMounted(() => {
  // 拿玩家資料
  getPlayerData(route.params.gameId);

  // 檢查遊戲是否已經結束並且有贏家
  if (props.gameDetails.gameEnded && props.gameDetails.winnerName) {
    openWinnerModal();
  }
});
</script>

<style scoped>
.play-container {
  flex: 1;
}

.play-container .hexagon {
  width: 12%;
  /* padding-top: 13.64%; */
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.play-container .hexagon-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-container .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(65, 77, 90, 0.9);
  clip-path: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-container .dots {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.play-container .dot {
  width: 6px;
  height: 6px;
  background-color: #f8f8f8;
  border-radius: 50%;
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

@media (min-width: 480px) {
  .play-container .hexagon {
    width: 10.5%;
  }
}

@media (max-width: 480px) {
  .game-intro-title h1 {
    font-size: 22px;
  }
  .game-intro-title .dollar-width {
    height: 46px;
  }
}

.game-attend-btn {
  border-radius: 0px;
}

/* 禁用狀態的按鈕樣式 */
.disabled-button {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
