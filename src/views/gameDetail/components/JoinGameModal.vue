<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="joinModal"
    tabindex="-1"
    aria-labelledby="joinModalLabel"
    role="dialog"
    style="display: block"
  >
    <!-- Custom Modal Backdrop -->
    <div v-if="isOpen" class="custom-backdrop"></div>

    <div
      class="modal-dialog mx-auto modal-dialog-centered"
    >
      <div
        class="modal-content modal-background"
        :style="{ backgroundImage: `url(${gameInfo.backgroundImage})` }"
      >
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="joinModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="$emit('closeModal')"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div
          class="modal-body text-center d-flex flex-column justify-content-center"
        >
          <div class="game-round-name fw-bold">
            <p class="fs-5 mb-2">Round {{ gameInfo.round }}</p>
            <p class="fs-2">{{ gameInfo.title }}</p>
          </div>
          <div class="attend-fee mt-5 fs-5 fw-bold">
            <p class="mb-2">Total Vote</p>
            <!-- 剩餘可投數：{{ gameInfo.maxVote - count }}<br>
            個人限額：{{ gameInfo.accountMaxVote }}<br>
            <p>個人已投：{{ myCount }}</p> -->
            <p class="fs-3 fw-bold">
              <img
                class="me-2"
                style="width: 50px"
                src="@/assets/images/icon/balance-icon.png"
                alt=""
              />{{ totalAmountDeducted }}
            </p>
          </div>
          <div class="attend-times-btn d-flex justify-content-center mt-5 fs-5">
            <button @click="setAttendVote(1)" class="fw-bold">1</button>
            <button @click="setAttendVote(5)" class="mx-3 mx-md-4 fw-bold">5</button>
            <button @click="setAttendVote(10)" class="fw-bold">10</button>
          </div>
          <div class="attend-times-input mt-4 d-flex justify-content-center">
            <button @click="changeCounter('-1')" class="fw-bold btn">-</button>
            <input
              class="fs-5 fw-bold"
              type="number" min="1" :max="restVote"
              v-model="attendVote"
            />
            <button @click="changeCounter('1')" class="fw-bold btn">+</button>
            <button @click="setAttendVote(restVote)" class="fw-bold max-btn">MAX</button>
          </div>
          <div class="reminder-word mt-2" style="margin-left: 12rem;">
            <p>( Limit : 30% )</p>
          </div>
        </div>
        <div class="modal-footer mx-auto">
          <button
            type="button"
            class="btn attend-confirm-btn mb-5 fs-5"
            data-bs-target="#winnerModal"
            @click="confirmParticipation"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, inject, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import modules from "@/services/modules";
import { ElMessage } from "element-plus";

const props = defineProps({
  isOpen: Boolean,
  gameInfo: Object,
});

const emit = defineEmits([
  "closeModal",
  "showInsufficientFundsModal",
  "refreshGameDetails",
]);

const {
  game: { playGame },
} = modules;
const route = useRoute();

const modal = ref(null); // 用於存儲模態框的 DOM 元素
const attendVote = ref(1);
const votes = inject("votes");
const maxVotes = inject("maxVotes");
const myVote = inject("myVote");

const userStore = useUserStore();
const userData = computed(() => userStore.userInfo); // 使用 computed 來響應式地追蹤 userInfo 的變化
const walletAmount = computed(() => userData.value?.balanceData?.balance); // 使用 computed 來取得錢包點數

const totalAmountDeducted = computed(() => {
  // betUnitAmount 乘以 attendVote 來計算總數
  if (attendVote.value<=0) attendVote.value = 1;
  return attendVote.value * props.gameInfo.betUnitAmount;
});

// 監視所有人的已投數
const count = votes;
watch(count, { immediate: true });

const myCount = myVote;
watch(myCount, { immediate: true });

const restVote = computed(() => {
  // 計算剩餘可投數
  //     如果 ( 全部總數 - 已投總數) > (個人限額 - 個人已投數 )
  //          那就等於 (個人限額 - 個人已投數 )
  //          不然就是 ( 全部總數 - 已投總數)
  return (props.gameInfo.maxVote - count.value) > (props.gameInfo.accountMaxVote - myVote.value)
          ? props.gameInfo.accountMaxVote - myVote.value
          : props.gameInfo.maxVote - count.value;
});

watch(attendVote,
  (newValue) => {
    attendVote.value = newValue > restVote.value ? restVote.value : newValue;
  }
);

// 參加次數
const setAttendVote = (num) => {
  attendVote.value = num;
};

const changeCounter = (num) => {
  attendVote.value += +num
  if (attendVote.value >= restVote.value) attendVote.value = restVote.value
  !isNaN(attendVote.value) && attendVote.value > 0 ? attendVote.value : attendVote.value = 1;
};

const voteResult = computed(() => {
  return maxVotes.value - votes.value;
});

// 點擊確認參加
const confirmParticipation = async () => {
  if (totalAmountDeducted.value > walletAmount.value) {
    emit("showInsufficientFundsModal"); // 跳出點數不足視窗
  } else {
    // 按下確認參加遊戲
    const gameRoomId = route.params.gameId; // 獲取路由參數中的 gameId
    try {
      const res = await playGame(gameRoomId, attendVote.value);
      if (res.data.success) {
        // 投票成功後通知父組件刷新遊戲資料
        emit("refreshGameDetails");
      }
    } catch (error) {
      // 檢查遊戲，是否投票已滿
      emit("refreshGameDetails");

      // (if 個人額度 > 剩餘可投數)
      if (attendVote.value > voteResult.value) {

        ElMessage.error("Exceeds total votes");
      } else if (error.response.data.message === "Vote is over quantity") {
        emit("showVotingFullModal");
      } else if (
        error.response.data.message === "Account vote is over quantity"
      ) {
        ElMessage.error("Failed! Voting Limit Exceeded!");
      }
    }
  }
  emit("closeModal"); // 無論點數夠不夠，先關閉JoinGameModal
};
</script>

<style scoped>
.winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
  color: #f8f8f8;
}

.game-attend .modal-dialog {
  width: 100%;
}

@media (min-width: 575.98px) {
  .game-attend .modal-dialog {
    max-width: 400px;
  }
}

#joinModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#joinModal .modal-content {
  color: #f8f8f8;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

#joinModal .attend-times-btn button {
  background-color: transparent;
  border: 1px solid #f8f8f8;
  padding: 8px 30px;
  color: #f8f8f8;
  border-radius: 10px;
}

#joinModal .attend-times-btn button:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

#joinModal .attend-times-input button.float-right {
  position: absolute;
  padding: 8px 10px;
  right: 57px;
  margin-top: -2rem;
}

#joinModal .max-btn {
  background-color: transparent;
  border: 1px solid #F8F8F8;
  color: #F8F8F8;
  padding: 2px 6px;
  border-radius: 0px;
  margin-left: 4px;
}

#joinModal .attend-times-btn button.btn:hover {
  background-color: transparent;
}

#joinModal .attend-times-input button.btn {
  padding: 4px 12px;
  background-color: #F8F8F8;
  border-radius: 0;
  cursor: pointer;
  color: #181a20;
}

#joinModal .attend-times-input button.btn:hover {
  color: #212529;
}

#joinModal .attend-times-input button.btn:last-child {
  right: 65px;
}

#joinModal .modal-header {
  border-bottom: none;
}

#joinModal .modal-footer {
  border-top: none;
}

#joinModal .modal-content {
  background-color: transparent;
}

#joinModal .modal-body input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #f8f8f8;
  color: #f8f8f8;
  text-align: center;
  border-radius: 0px;
  width: 150px;
}

.game-attend #joinModal .modal-body input:focus {
  outline: none;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn {
  background-color: #fcd535;
  border: none;
  color: #181a20;
  padding: 8px 90px;
  font-weight: 600;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn:hover {
  background-color: #e5bf30;
}

.custom-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* 在 Chrome 和 Safari 中禁用 */
  margin: 0; /* 防止 margin 影響佈局 */
}

input[type=number] {
  -moz-appearance: textfield; /* 在 Firefox 中禁用 */
}

.reminder-word p {
  font-size: 12px;
  color: #F8F8F8;
  font-weight: lighter;
}

</style>
