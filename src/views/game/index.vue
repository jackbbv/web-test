<template>
  <div class="container mt-5">
    <div class="game-title mb-5">
      <p class="fw-bold fs-1">TYCHE1 GAMES</p>
    </div>
    <!-- <div class="search-bar mb-5" style="width: 18rem">
      <div class="input-group mb-3">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="game name"
          aria-describedby="button-addon2"
          @keydown.enter="searchGames"
        />
        <button
          class="btn btn-outline-secondary search-game-btn"
          type="button"
          id="button-addon2"
          @click="searchGames"
        >
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </div>
    </div> -->
    <div class="game-container">
      <div class="row game-list gy-1 gy-md-2 px-0">
        <div
          v-for="(game, index) in games"
          :key="index"
          :class="index < 2 ? 'col-12 col-md-6 px-1 limited-height' : 'col-6 col-sm-4 col-lg-3 px-1'"
        >
          <GameCard
            :index="index"
            :imageSrc="game.imageSrc"
            :gameName="game.gameName"
            :gameType="game.gameType"
            :phoneIconSrc="game.phoneIconSrc"
            :feeIconSrc="game.feeIconSrc"
            :fee="game.fee"
            :peopleIconSrc="game.peopleIconSrc"
            :participants="game.participants"
            :totalParticipants="game.totalParticipants"
            :gameId="game.gameId"
            :gid="game.gid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import GameCard from "./GameCard.vue"; // 引入 GameCard 组件
import { images, getCurrencyIcon } from "@/assets/images.js";
import modules from "@/services/modules"; // 引入你定義的 API 模塊

const {
  game: { getGameRoomList, searchRoom, getGameRoomByGId },
} = modules; // 解構 modules 對象中的 game 模塊

const games = ref([]); // 用來存放從 API 獲取的遊戲數據
const searchTerm = ref(""); // 搜索框中的搜索詞

// 抽取數據映射邏輯
const mapGameData = (game) => ({
  gameId: game.id, // 從 API 返回的 gameRoomId
  imageSrc: game.cardImgUrl || images.ethCard, // 預設圖片，可以根據具體遊戲類型選擇不同圖片
  gid: game.gId,
  gameName: game.name,
  phoneIconSrc: images.dollarPhoneIcon, // 固定
  feeIconSrc: getCurrencyIcon(game.rewardSymbol), // 根據 rewardSymbol 選擇相應的貨幣圖標
  fee: game.rewardQuantity, // 費用
  participants: game.betQuantityTotal, // 目前參與的人數
  totalParticipants: game.maxQuantity, // 最大參與人數
});

// 從 API 獲取遊戲列表數據
const fetchGames = async () => {
  try {
    const response = await getGameRoomList(); // 調用 API 獲取數據
    games.value = response.data.data.map(mapGameData);
  } catch (error) {
    console.error("Error fetching game rooms:", error);
  }
};

// 調用 API 獲取數據
onMounted(fetchGames);

// 搜索遊戲
// const searchGames = async () => {
//   if (!searchTerm.value) {
//     // 如果搜索框為空，則重新加載完整的遊戲列表
//     await fetchGames();
//     return;
//   }

//   try {
//     const response = await searchRoom(searchTerm.value); // 調用 API 搜索
//     games.value = response.data.data.map(mapGameData); // 使用 mapGameData 函數映射數據
//   } catch (error) {
//     console.error("Error searching game rooms:", error);
//   }
// };
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.container .search-bar .form-control {
  background-color: transparent;
  color: #f8f8f8;
  border-color: #bbb;
  border-radius: 0px;
  box-shadow: none;
  height: 30px;
}

.search-game-btn {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
}

.container .search-bar button {
  border-color: #bbb;
}

.container .search-bar button {
  color: #bbb;
}

.container .search-bar button:hover {
  color: #f8f8f8;
}

.container .search-bar .form-control::placeholder {
  color: #bbb;
}
</style>

<style>
.limited-height .card-img-top {
  height: 400px !important;
  object-fit: cover;
}
</style>