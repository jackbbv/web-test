<template>
  <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
    <Swiper
      :class="swiperClass"
      :autoplay="{ delay: autoplayDelay }"
      :loop="shouldLoop"
      :pagination="pagination ? { clickable: true } : false"
      :scrollbar="scrollbar ? { draggable: true } : false"
      :modules="modules"
      :effect="effect"
      :coverflow-effect="coverflowEffect"
      :breakpoints="breakpoints"
    >
      <SwiperSlide
        v-for="(item, index) in swiperData"
        :key="index"
        class="index-banner"
      >
        <!-- 圖片有手機板 區分時 -->
        <!-- 如果有區分手機和桌面圖片 -->
        <a :href="item.link" v-if="item.mobileImage && item.image && item.link">
          <img
            class="img-fluid d-md-none rounded-0"
            :src="item.mobileImage"
            :alt="item.alt"
          />
          <img
            class="img-fluid d-none d-md-block"
            :src="item.image"
            :alt="item.alt"
          />
        </a>
        <a v-else-if="item.mobileImage && item.image && !item.link" class="notLink">
          <img
            class="img-fluid d-md-none rounded-0"
            :src="item.mobileImage"
            :alt="item.alt"
          />
          <img
            class="img-fluid d-none d-md-block"
            :src="item.image"
            :alt="item.alt"
          />
        </a>

        <!-- 如果沒有區分，只有一個通用圖片 -->
        <router-link :to="item.link" v-else>
          <img class="img-fluid" :src="item.image" :alt="item.alt" />
        </router-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"; // Import Swiper Vue.js components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Import Swiper pagination styles
import "swiper/css/scrollbar"; // Import Swiper scrollbar styles
import { computed } from "vue";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";
// loop: 啟用幻燈片循環播放。
// :pagination="{ clickable: true }": 顯示可點擊的分頁點。
// :scrollbar="{ draggable: true }": 顯示可拖動的滾動條。
// :modules="[Autoplay, Pagination, Navigation]": 指定 Swiper 使用的功能模組

// Props definition 未傳遞部分使用預設值
const props = defineProps({
  swiperData: {
    type: Array,
    required: true,
  },
  autoplayDelay: {
    type: Number,
    default: 3000,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  scrollbar: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String,
    default: "slide",
  },
  coverflowEffect: {
    type: Object,
    default: () => ({}),
  },
  breakpoints: {
    type: Object,
    default: () => ({}),
  },
  modules: {
    type: Array,
    default: () => [Autoplay, Pagination, Scrollbar, EffectCoverflow],
  },
  swiperClass: {
    type: String,
    default: "",
  },
});

const shouldLoop = computed(() => props.swiperData.length >= 3); // 根據 slides 數量決定是否啟用 loop
</script>

<style scoped>
.mySwiper {
  max-height: 767.98px;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 10px;
}
@media (max-width: 991.98px) {
.mySwiper {
    width: 85%;
  }
}

.mySwiper img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.index-banner img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.game-card .swiper {
  padding-top: 10px;
}

.game-card .index-banner {
  width: 100%;
  aspect-ratio: 510 / 797;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.8);
}

.game-card .index-banner:hover {
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
  border: 3px solid #F8F8F8;
  border-radius: 14px;
}

a.notLink {
  cursor: default;
}

.game-card .index-banner img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 767.98px) {
  .mySwiper img {
    aspect-ratio: 1 / 1;
  }
}

@media (min-width: 767.98px) {
  .mySwiper {
    max-height: 480px;
    overflow: hidden;
    aspect-ratio: 1280 / 480;
  }
}

@media (min-width: 991.98px) {
  .index-banner img {
    border-radius: 30px;
  }

  .mySwiper {
    border-radius: 30px;
  }
}
</style>
