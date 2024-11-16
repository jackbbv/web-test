<template>
  <div class="leaderboard-container">
    <table class="table table-borderless fw-bold custom-rounded">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :class="header.class"
            scope="col"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="data.length > 0">
          <tr v-for="(row, index) in data" :key="index">
            <td
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              :class="cell.class"
            >
              <!-- 如果 imageFirst 為 true，先顯示圖片，然後顯示文字 -->
              <template v-if="imageFirst">
                <!-- 檢查是否有 link，如果有則包裹在 <a> 中 -->
                <a v-if="cell.link" :href="cell.link" :target="cell.target">
                  <img
                    v-if="cell.image"
                    class="img-fluid pe-2 me-2 pe-md-3 me-md-0"
                    :src="cell.image"
                    alt=""
                  />
                </a>
                <!-- 如果沒有 link，則直接顯示圖片 -->
                <img 
                  v-else-if="cell.image" 
                  class="img-fluid" 
                  :src="cell.image" 
                  @error="setAltImg" 
                  alt="" 
                />
                {{ cell.text }}
              </template>

              <!-- 如果 imageFirst 為 false，先顯示文字，然後顯示圖片 -->
              <template v-else>
                {{ cell.text }}
                <a v-if="cell.link" :href="cell.link" :target="cell.target">
                  <img
                    v-if="cell.image"
                    class="img-fluid"
                    :style="cell.imageStyle ? cell.imageStyle : ''"
                    :src="cell.image"
                    alt=""
                  />
                </a>
                <img
                  v-else-if="cell.blackImage"
                  class="img-fluid"

                />
                <img
                  v-else-if="cell.image"
                  class="img-fluid"
                  :style="cell.imageStyle ? cell.imageStyle : ''"
                  :src="cell.image"
                  alt=""
                />
              </template>
            </td>
          </tr>
        </template>

        <!-- 如果 data 沒有資料，顯示 "No data" -->
        <template v-else>
          <tr>
            <td :colspan="headers.length" class="text-center">No data</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const props = defineProps({
  Title: String,
  headers: Array,
  data: Array,
  customClass: String,
  imageFirst: { type: Boolean, default: false }, // 控制圖片和文字的顯示順序
});

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
} 
</script>

<style scoped>
.leaderboard-container .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.leaderboard-container .table th,
.leaderboard-container .table td {
  vertical-align: middle;
}

.leaderboard-container thead {
  color: #bbb;
}

.leaderboard-container .table tbody tr th {
  color: #bbb;
  text-align: center;
}

.leaderboard-container .table tbody tr:hover td {
  background-color: #414d5a;
}


.leaderboard-container .table img {
  max-width: 35px;
}

.leaderboard-container .leaderboard-name img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .leaderboard-container .table {
    --bs-table-bg: none;
  }
  .leaderboard-container .table img {
    margin-right: 5px;
  }
  .custom-rounded {
    border-radius: 0px;
  }
}

.rewards-list-dropdown .dropdown-menu .leaderboard-container .table {
  --bs-table-bg: transparent;
  border-radius: 0px;
}

.icon-cursor img {
  cursor: pointer;
}

/* .leaderboard-container .table thead tr {
  border-bottom: 1px solid #414d5a;
}

.leaderboard-container .table tbody tr {
  border-bottom: 1px solid #414d5a;
} */

.leaderboard-container .table tbody tr:last-child {
  border-bottom: none;
}

.winnie-dashboard-ps {
  padding-left: 0.75rem !important;
}

.winnie-dashboard-pe {
  padding-right: 0.75rem !important;
}

@media (min-width: 767.98px) {
  .winnie-dashboard-ps {
  padding-left: 2rem !important;
  }
  .winnie-dashboard-pe {
  padding-right: 2rem !important;
  }
}

@media (min-width: 991.98px) {
  .winnie-dashboard-ps {
    padding-left: 5rem !important;
  }
  .winnie-dashboard-pe {
    padding-right: 5rem !important;
  }
}

.winnie-dashboard-pe img {
  margin-bottom: 0.25rem;
}
</style>
