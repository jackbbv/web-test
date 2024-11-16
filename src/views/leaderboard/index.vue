<template>
  <div class="container mt-5 px-3 px-lg-0">
    <div class="d-flex justify-content-between align-items-center">
      <div class="leaderboard-title text-start">
        <p class="fw-bold">Leaderboard</p>
      </div>
    <div class="d-flex justify-content-between">
      <!-- 固定的週與總數按鈕 -->
      <div class="d-flex col-12 col-sm-auto text-end btn-right leaderboard-btn">
        <button
          class="btn"
          :class="{ active: switchBtn === 'hunter' }"
          @click="handleChange('hunter')"
        >
          Hunter
        </button>
        <button
          class="ms-2 btn"
          :class="{ active: switchBtn === 'leaderboard' }"
          @click="handleChange('leaderboard')"
        >
          Leaderboard
        </button>
      </div>
    </div>
    </div>


    <div class="leaderboard-container">
      <table class="table table-borderless fw-bold custom-rounded mt-3">
        <thead>
          <tr v-if="switchBtn === 'leaderboard'">
            <th class="text-center col-1 ps-2 ps-sm-3 ps-md-5" scope="col">Rank</th>
            <th class="col-5" scope="col">Hunter</th>
            <th class="col-5 text-end pe-2 pe-sm-3 pe-md-5" style="height: 60px;" scope="col">Voted</th>
          </tr>
          <tr v-if="switchBtn === 'hunter'">
            <th class="text-center text-md-start col-3 col-sm-3 ps-0 ps-sm-3 ps-md-5" scope="col">Game Room</th>
            <th class="col-1 text-center d-none d-md-table-cell" scope="col">Round</th>
            <th class="col-2 d-none d-md-table-cell" scope="col">Time</th>
            <th class="col-5 col-sm-4 col-md-3" scope="col">Hunter</th>
            <th class="col-4 col-sm-5 col-md-3 text-end pe-2 pe-sm-3 pe-md-5" style="height: 60px;" scope="col">Prize</th>
          </tr>
        </thead>
        <tbody class="topBoard voteBoard" v-if="switchBtn === 'leaderboard'">
          <tr v-for="item in voteLeaderBoard" :key="item.key"
          :class="{
          'rank-first': item.rank === 1,
          'rank-second': item.rank === 2,
          'rank-third': item.rank === 3
          }
          ">
            <td class="text-center ps-2 ps-sm-3 ps-md-5 leaderboard-name" scope="row">{{ item.rank }}</td>
            <td class="leaderboard-name">
              <img :src="item.playerIconUrl" @error="setAltImg" alt=""/>
              {{ item.player }}
            </td>
            <td class="leaderboard-name text-end pe-2 pe-sm-3 pe-md-5" v-if="item.voted<1">{{ item.voted }}>
              <img style="margin-right: -6px;" :src="PointIcon" alt="Points Icon" />
            </td>
            <td class="leaderboard-name text-end pe-2 pe-sm-3 pe-md-5" v-else>{{ item.voted.toLocaleString("en-US") }}
              <img style="margin-right: -6px;" :src="PointIcon" alt="Points Icon" />
            </td>
          </tr>
        </tbody>

        <tbody class="topBoard hunterBoard" v-if="switchBtn === 'hunter'">
          <tr v-for="item in hunterBoard" :key="item.key">
            <td class="text-center text-md-start ps-0 ps-sm-3 ps-md-5 leaderboard-name d-flex justify-content-center justify-content-md-start  align-items-center" scope="row">
              <img :src="getCurrencyIcon(item.rewardSymbol)" alt=""/>
              <span class="d-none d-md-inline">{{ item.name }}</span>
            </td>
            <td class="leaderboard-name text-center d-none d-md-table-cell">
              {{ item.round }}
            </td>
            <td class="leaderboard-name d-none d-md-table-cell">
              {{ formatDate(item.endDateTime) }}
            </td>
            <td class="leaderboard-name">
              <img :src="item.winnnerIconUrl" @error="setAltImg" alt=""/>
              {{ item.winnner }}
            </td>
            <td class="leaderboard-name text-end pe-2 pe-sm-3 pe-md-5" v-if="item.rewardQuantity<1">{{ item.rewardQuantity }}
              <img style="margin-right: -6px;" :src="getCurrencyIcon(item.rewardSymbol)" alt=""/>
            </td>
            <td class="leaderboard-name text-end pe-2 pe-sm-3 pe-md-5" v-else>{{ item.rewardQuantity.toLocaleString("en-US") }}
              <img style="margin-right: -6px;" :src="getCurrencyIcon(item.rewardSymbol)" alt=""/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCurrencyIcon } from "@/assets/images.js";
import modules from "@/services/modules";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";
import PointIcon from "@/assets/images/icon/balance-icon.png"; // 你的圖標

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const {
  game: { getVoteLeaderBoard, getHunterInfo }
} = modules;

const voteLeaderBoard = ref([]);
const hunterBoard = ref([]);

const switchBtn = ref("hunter"); // 預設顯示 hunter

// 日期格式化
const formatDate = (isoDateString) => dayjs(isoDateString).format("MM-DD HH:mm");

const getData = async () => {
  try {
    const res1 = await getVoteLeaderBoard();
    const res2 = await getHunterInfo();
    if (res1 && res1.data && res1.data.data) {
      voteLeaderBoard.value = res1.data.data;
    }
    if (res2 && res2.data && res2.data.data) {
      hunterBoard.value = res2.data.data;
    }
  } catch (error) {
    ElMessage.error({
      message: "Unable to retrieve the leaderboard, please try again later！",
      duration: 3000,
      grouping: true,
    });
  }
}

// 時間範圍切換處理
const handleChange = (value) => {
  switchBtn.value = value;
};

onMounted(async () => {
  await getData();
});
</script>

<style scoped>
.btn-right {
  margin-left: auto;
}

.btn {
  padding: 3px 5px;
  background-color: #1e2329;
  color: floralwhite;
}

.leaderboard-title {
  font-size: 16px;
}

@media (min-width: 767.98px) {
  .leaderboard-title {
  font-size: 24px;
  }
}

.leaderboard-btn button.active {
  background-color: #181A20;
  color: white;
}

.leaderboard-btn {
  background-color: #1E2329;
  padding: 5px 5px;
  border-radius: 8px;
}

.leaderboard-btn button {
  flex: 1;
  padding: 2px 5px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: #f8f8f8;
}

@media (min-width: 767.98px) {
  .leaderboard-btn button {
    padding: 5px 30px;
  }
}

.leaderboard-btn button:hover {
  background-color: #414d5a;
}

.leaderboard-container .table {
  --bs-table-bg: none;
  background-color: #1E2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.leaderboard-container .table th,
.leaderboard-container .table td {
  vertical-align: middle;
}

.leaderboard-container .table th {
  font-size: 13px;
}

.leaderboard-container thead {
  color: #bbb;
}

.leaderboard-container .table tbody tr th {
  color: #bbb;
  text-align: center;
}

@media (min-width: 767.98px) {
.leaderboard-container .table tbody tr:hover td {
  background-color: #414d5a;
  }
}

.leaderboard-container .table img {
  max-width: 35px;
  margin-right: 10px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .leaderboard-container .table {
    background-color: transparent;
  }
  .leaderboard-container .table img {
    max-width: 24px;
  }
  .leaderboard-name {
    font-size: 0.85rem;
  }
  .leaderboard-container .table img {
    margin-right: 5px;
  }
}

.leaderboard-btn .crypto-type-btn button {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  background-color: #1e2329;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  width: fit-content !important;
  max-width: max-content;
}

.leaderboard-btn .crypto-type-btn button:hover {
  background-color: #414d5a;
}

@media (max-width: 575.98px) {
  .leaderboard-btn .crypto-type-btn button {
    margin-bottom: 8px;
  }
}

.table {
  border: 1px solid #505156;
  border-collapse: separate;
  border-spacing: 0;
}

.table td, .table th {
  border-top: none;
  border-bottom: 1px solid #505156;
  border-left: none;
  border-right: none;
}

@media (max-width: 575.98px) {
  .table {
    background-color: #1E2329;
    border: 1px solid #181A20;
  }

  .table td, .table th {
    border-bottom: 2px solid #181A20;
  }
}

.rank-first td:first-child{
  color: #FCD535;
  font-size: 28px;
  text-shadow:
    0 0 10px rgba(252, 213, 53, 0.8),
    0 0 20px rgba(252, 213, 53, 0.6),
    0 0 30px rgba(252, 213, 53, 0.4);
}

.rank-second td:first-child{
  color: #3ebe78;
  font-size: 28px;
  text-shadow:
    0 0 10px rgba(62, 190, 120, 0.8),
    0 0 20px rgba(62, 190, 120, 0.6),
    0 0 30px rgba(62, 190, 120, 0.4);
}

.rank-third td:first-child{
  color: #5bc0de;
  font-size: 28px;
  text-shadow:
    0 0 10px rgba(91, 192, 222, 0.8),
    0 0 20px rgba(91, 192, 222, 0.6),
    0 0 30px rgba(91, 192, 222, 0.4);
}
</style>
