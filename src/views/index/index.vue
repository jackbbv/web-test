<template>
  <div class="mx-lg-5">
    <!-- banner 輪播 -->
    <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
      <Swiper
        :swiperClass="'mySwiper'"
        :swiperData="banner"
        :pagination="false"
        :scrollbar="false"
      />
    </div>

    <!-- card 輪播 -->
    <div>
      <div class="text-center">
        <p class="game-title fw-bolder d-sm-none mt-5">
          <span style="color: #fcd535">TYCHE1 </span>
          <span style="color: #F8F8F8">GAMES</span>
        </p>
      </div>
      <div class="game-card mt-5">
        <div class="card-intro text-center mx-2 d-none d-sm-block">
          <p class="fw-bold" style="letter-spacing: 3px;">
            <span style="color: #fcd535;">TYCHE1</span>
            <span class="ms-3" style="color: #F8F8F8;">GAMES</span>
          </p>
        </div>

        <Swiper
          :swiperClass="'myCardSwiper mt-5'"
          :swiperData="gameRoomList"
          :pagination="false"
          :scrollbar="false"
          effect="coverflow"
          :breakpoints="breakpoints"
          centeredSlides: true
          class="d-block d-sm-none"
        >
        </Swiper>

        <Swiper
          :swiperClass="'myCardSwiper mt-5'"
          :swiperData="gameRoomList"
          :pagination="false"
          :scrollbar="false"
          effect="coverflow"
          :coverflow-effect="coverflowEffect"
          :breakpoints="breakpoints"
          centeredSlides: true
          class="d-none d-sm-block"
        >
        </Swiper>

        <div class="text-center mt-5">
          <button
            class="more-btn px-5 py-2 fs-5"
            onclick="window.location.href='game/game-list';"
          >
            START GAME
          </button>
        </div>
      </div>
    </div>

        <!-- PLATFORM stats -->
    <div class="stats mx-auto mt-5">
      <div class="stats-intro text-start">
        <p class="fw-bolder mt-5 fs-5 d-flex align-items-end">
          <img class="me-1 img-fluid" :src="equalizer" alt="" />PLATFORM STATS
        </p>
      </div>
      <div class="row justify-content-center mt-0 mt-lg-4 w-100">
        <div class="d-flex flex-column flex-lg-row justify-content-between">
          <template v-for="(item, index) in statsData" :key="index">
            <div class="winnie-width mt-3 mt-lg-0 winnie-stats-bk py-2 col" :class="index === 1 ? 'mx-lg-3' : ''">
              <!-- 迭代統計數據數組，渲染 StatsCard 組件 -->
              <StatsCard :title="item.title" :number="item.number" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- game-intro -->
    <div class="game-intro mx-auto mt-4 px-4 pt-4 pb-0">
      <div class="row">
        <div class="col-12 col-xl-8 text-start">
          <h1 class="fw-bolder">GAME INSTRUCTIONS</h1>
          <p class="mt-3 fs-5 d-block d-sm-none">
            A provably fair algorithm is used to draw the prizes.<br>Winner revealed when voting is filled.
          </p>
          <p class="mt-4 fs-5 d-none d-sm-block">
            A provably fair algorithm is used to draw the prizes.<br>Winner revealed when voting is filled.<br>You can buy a ticket for $1.
          </p>
        </div>
        <div class="col-12 col-xl-4 text-center mt-3 mt-xl-0">
          <img
            class="img-fluid w-50"
            style="max-width: 400px; min-width: 220px;"
            :src="diamondSM"
            alt="diamond"
          />
        </div>
      </div>
    </div>

    <!-- Partnerships -->
    <div class="partnerships mx-auto mt-4">
      <div class="partnerships-intro text-start">
        <p class="fw-bolder fs-5">OUR FRIENDS</p>
      </div>
      <div class="row text-center align-items-center">
        <div
          class="col-6 col-lg-3 mt-4"
          v-for="(logo, index) in logos"
          :key="index"
        >
          <a href="#">
            <img
              class="partner-logo hover-logo"
              :src="hoverIndex === index ? logo.colorSrc : logo.whiteSrc"
              alt="logo.alt"
              @mouseover="hoverIndex = index"
              @mouseout="hoverIndex = null"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

import { onMounted, ref } from "vue";
import Swiper from "@/components/Swiper.vue"; // 引入輪播組件
import StatsCard from "./StatsCard.vue"; // 引入 StatsCard 組件

import banner01 from "@/assets/images/common/banner01.png";
import banner02 from "@/assets/images/common/banner02.png";
import bannerSM01 from "@/assets/images/common/banner-sm01.png";
import bannerSM02 from "@/assets/images/common/banner-sm02.png";

import diamondSM from "@/assets/images/common/diamond-sm.png";

import XRP from "@/assets/images/common/card-xrp.png";
import ETH from "@/assets/images/common/card-eth.png";
import BNB from "@/assets/images/common/card-bnb.png";
import TRX from "@/assets/images/common/card-trx.png";
import SOL from "@/assets/images/common/card-sol.png";
import DOGE from "@/assets/images/common/card-doge.png";
import BTC from "@/assets/images/common/card-btc.png";

import binanceWhite from "@/assets/images/common/binance-white.png";
import tronWhite from "@/assets/images/common/tron-white.png";
import chainLink from "@/assets/images/common/chainlink-logo-white.png";
import monoWhite from "@/assets/images/common/mono-white.png";

import binanceColor from "@/assets/images/common/binance-color.png";
import tronColor from "@/assets/images/common/tron-color.png";
import chainLinkColor from "@/assets/images/common/chainlink-logo-color.png";
import monoColor from "@/assets/images/common/mono-color.png";

import equalizer from "@/assets/images/icon/md-equalizer 1.svg";
import modules from "@/services/modules";

const {
  home: { home },
} = modules;

const userStore = useUserStore();
// console.log(userStore.userInfo?.name, "NAME");

const hoverIndex = ref(null);
const homePageData = ref([]);
const banner = ref([
  {
    mobileImage: bannerSM01,
    image: banner01,
    alt: "Default Banner",
    link: "#",
  },
  {
    mobileImage: bannerSM02,
    image: banner02,
    alt: "Default Banner",
    link: "#",
  },
]);
const gameRoomList = ref([]);

// const gameRoomList = ref([
//   {
//     mobileImage: XRP,
//     image: XRP,
//     alt: "Card",
//     link: `/game`, // 生成每個遊戲房的路由連結
//   },
//   {
//     mobileImage: ETH,
//     image: ETH,
//     alt: "Card",
//     link: `/game`, // 生成每個遊戲房的路由連結
//   },
// ]);
const statsData = ref([
  { title: "Total Players", number: 0 },
  { title: "Total Game Volume", number: "$100" },
  { title: "Total Game Rounds", number: 0 },
]);
// 輪播圖片數據

// 配置 coverflow 效果
const coverflowEffect = {
  depth: 250,
  rotate: 0,
  stretch: 80,
  slideShadows: false,
};

// 配置響應式斷點
const breakpoints = {
  320: { slidesPerView: 3, spaceBetween: 2 },
  575.98: { slidesPerView: 9, spaceBetween: -120 },
  640: { slidesPerView: 9, spaceBetween: -100 },
  991: { slidesPerView: 9, spaceBetween: -110 },
  1199: { slidesPerView: 9, spaceBetween: -150 },
};

const logos = [
  {
    whiteSrc: binanceWhite,
    colorSrc: binanceColor,
    alt: "binanceWhite",
  },
  {
    whiteSrc: tronWhite,
    colorSrc: tronColor,
    alt: "tronWhite",
  },
  {
    whiteSrc: chainLink,
    colorSrc: chainLinkColor,
    alt: "chainLink",
  },
  {
    whiteSrc: monoWhite,
    colorSrc: monoColor,
    alt: "monoWhite",
  },
];

const getHomeData = async () => {
  try {
    // 進行 API 請求，並取得回傳資料
    const { data } = await home();
    // 解構賦值來取得需要的資料
    const { banner: bannerData, gameRoomList: roomData, statics } = data.data;
    // 更新響應式變數
    homePageData.value = data.data;
    banner.value = handleBannerData(bannerData); // 處理 banner 資料
    gameRoomList.value = handleRoomData(roomData); // 處理遊戲房資料
    statsData.value = handleStatics(statics); // 處理統計數據
    startCounting(); // 開始數字遞增
  } catch (error) {
    // 錯誤處理：可以顯示錯誤訊息給使用者，或記錄錯誤以便追蹤
    console.error("Failed to fetch home data:", error);
  }
};

const handleRoomData = (obj) => {
  const roomData = obj.map((item) => ({
    mobileImage: item.cardImgUrl,
    image: item.cardImgUrl,
    alt: "Card" + item.rewardSymbol,
    gid: item.gId,
    link: `/game/${item.id}`, // 生成每個遊戲房的路由連結
    // link: `/game/${item.id}?gId=${item.gId}`, // 生成每個遊戲房的路由連結
  }));
  // console.log(roomData, 'roomData.link')

  return roomData;
};

const handleBannerData = (obj) => {
  const bannerData = obj.map((item) => ({
    mobileImage: item.smallUrl || bannerSM01,
    image: item.url || banner01,
    alt: "Banner",
    link: item.linkUrl,
  }));
  return bannerData;
};

const handleStatics = (obj) => {
  return [
    { title: "Total Players", number: obj.totalPlayers },
    { title: "Total Game Volume", number: formatCurrency(obj.totalGameVolume) },
    { title: "Total Game Rounds", number: obj.totalGameRounds },
  ];
};

const formatCurrency = (number) => {
  return `$${number.toLocaleString("en-US")}`;
};


// 數字跳動邏輯
const startCounting = () => {
  statsData.value.forEach((item) => {
    const targetNumber = parseInt(item.number); // 確保是數字
    const increment = Math.ceil(targetNumber / 100); // 遞增的量，每100次內完成
    const interval = setInterval(() => {
      if (item.currentNumber < targetNumber) {
        item.currentNumber += increment; // 遞增 currentNumber
      } else {
        item.currentNumber = targetNumber; // 達到目標數字，停止
        clearInterval(interval); // 停止計時器
      }
    }, 20); // 每 20 毫秒更新一次
  });
};

onMounted(async () => {
  await getHomeData();
});
</script>

<style scoped>
.game-title span { 
  font-size: 38px;
}
@media (min-width: 420px) {
  .game-title span { 
  font-size: 40px;
}
}
.card-intro span {
  font-size: 70px;
}
@media (min-width: 575.98px) and (max-width: 991.98px) {
  .card-intro span { 
  font-size: 58px;
}
}

.swiper-banner {
  max-width: 1280px;
}

.swiper-card-slide img {
  border-radius: 10px;
}

/* card */
.game-intro {
  width: 85%;
  max-width: 1800px;
  background-color: #1E2329;
  border-radius: 10px;
}

@media (min-width: 991.98px) {
  .game-intro {
    width: 100%;
    max-width: 1280px;
  }
}

.card-intro p {
  font-size: 70px;
  letter-spacing: 2px;
  word-spacing: 1px;
}

.game-card .more-btn {
  background-color: #fcd535;
  color: #181a20;
  border-radius: 50px;
  font-weight: 700;
  border: none;
}

.game-card .more-btn:hover {
  background-color: #e5bf30;
}

.game-card .swiper-banner {
  max-width: 400px;
}
@media (min-width: 575.98px) {
  .game-card .swiper-banner {
  max-width: 900px;
}
}
@media (min-width: 767.98px) {
  .game-card .swiper-banner {
  max-width: 1600px;
}
}

/* stats */
.stats {
  width: 85%;
  max-width: 1800px;
}

@media (min-width: 991.98px) {
  .stats {
    width: 100%;
    max-width: 1280px;
  }
}

.stats .row {
  --bs-gutter-x: none;
}

@media (max-width: 991.98px) {
  .stats .winnie-width {
    background-color: #1e2329;
    border-radius: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
  }
}

@media (min-width: 991.98px) {
  .stats .winnie-width {
    width: 25%;
  }
}

/* state hr */
.vertical-divider {
  width: 30px;
  border-color: #fcd535;
  height: 1px;
  transform: rotate(90deg);
  margin: 0 0.25rem;
  align-self: center;
  border-width: 3px;
  opacity: 1;
}
@media (min-width: 991.98px) {
  .vertical-divider {
    width: 60px;
  }
}
@media (min-width: 1399.98px) {
  .vertical-divider {
    margin: 0 1rem;
  }
}

.stats-intro img {
  width: 24px;
  padding-bottom: 4px;
}

.winnie-stats-bk {
  background-color: #1E2329;
  border-radius: 8px;
}
/* partnerships */
.partnerships {
  width: 85%;
  max-width: 1800px;
}

@media (min-width: 991.98px) {
  .partnerships {
    width: 100%;
    max-width: 1280px;
  }
}

.partner-logo {
  max-width: 100%;
  transition: opacity 0.3s ease;
  position: relative;
}

.partner-logo img {
  display: block;
  width: 100%;
  height: auto;
}

.partner-logo:hover img {
  opacity: 0;
}
</style>
