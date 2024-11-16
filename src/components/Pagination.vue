<template>
  <div class="content_detail__pagination cdp" actpage="1">
    <a href="#!-1" class="winnie-pagination" @click.prevent="changePage(currentPage - 1)">
      <font-awesome-icon 
          icon="fa-solid fa-angle-left" 
      />
    </a>
    
    <template v-if="totalPages > 0">
      <a
        v-for="page in visiblePages"
        :key="page"
        v-if="page !== '...' || isVisible(page)"
        class="winnie-pagination"
        :class="{ active: page === currentPage }"
        href="#!" 
        @click.prevent="changePage(page)"
      >
        {{ page }}
      </a>
    </template>

    <a href="#!+1" class="winnie-pagination" @click.prevent="changePage(currentPage + 1)">
      <font-awesome-icon 
          icon="fa-solid fa-angle-right" 
      />
    </a>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 定義 props
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

// 狀態管理
const currentPage = ref(1);

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

// 計算可見的頁面
const visiblePages = computed(() => {
  const pages = [];
  if (totalPages.value <= 8) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage.value > 4) pages.push('...'); // 添加省略號
    for (let i = Math.max(2, currentPage.value - 1); i <= Math.min(totalPages.value - 1, currentPage.value + 1); i++) {
      pages.push(i);
    }
    if (currentPage.value < totalPages.value - 3) pages.push('...');
    pages.push(totalPages.value);
  }
  return pages;
});

// 判斷省略號是否可見
const isVisible = (page) => {
  return page === '...' && (currentPage.value > 4 || currentPage.value < totalPages.value - 3);
};

// 定義事件
const emit = defineEmits(["page-changed"]);

// 切換頁面
const changePage = (page) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page-changed", page); // 傳遞頁碼至父組件
  }
};
</script>

<style scoped>
.content_detail__pagination {
  position: relative;
  text-align: center;
  padding: 20px 0;
  margin: 50px 0;
}

.winnie-pagination {
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  margin: 0 3px 6px;
  height: 38px;
  min-width: 38px;
  border-radius: 38px;
  line-height: 38px;
  padding: 0;
  color: #fff;
  font-weight: 700;
  letter-spacing: .03em;
}

.winnie-pagination:hover {
  background-color: transparent;
  color: #FCD535;
}

.winnie-pagination.active {
  background-color: #FCD535;
  color: #fff;
}

.disabled .winnie-pagination {
  color: #415058;
  background-color: transparent;
}

.disabled .winnie-pagination:hover {
  background-color: transparent;
  color: #415058;
}
</style>
