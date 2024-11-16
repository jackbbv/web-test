<template>
  <div class="container px-3 px-sm-0 mt-5">
    <div class="transaction-detail">
      <div class="transaction-month mb-3">
        <p>History</p>
      </div>
      <div class="d-flex justify-content-center w-100">
        <div class="accordion accordion-flush w-100" id="accordionTransactionDetail" v-if="transactions.length > 0">
          <div
            v-for="(transaction, index) in transactions"
            :key="index"
            class="accordion-item mb-2"
          >
            <h2 class="accordion-header" :id="`flush-heading${index}`">
              <button
                class="accordion-button collapsed d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#flush-collapse${index}`"
                aria-expanded="false"
                aria-controls="`flush-collapse${index}`"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100"
                >
                  <span class="fs-5 winnie-color-gray">
                    {{ transaction.type }}
                  </span>
                  <span class="fs-5 me-2 fw-bold" v-if="transaction.amount<1">
                    {{ transaction.amount }}
                    <img :src="getCurrencyIcon(transaction.symbol)" alt="" v-if="transaction.symbol !=='POINT'" />
                    <img :src="PointIcon" style="width: 35px;" alt="Points Icon" v-else />
                  </span>
                  <span class="fs-5 me-2 fw-bold" v-else>
                    {{ transaction.amount.toLocaleString("en-US") }}
                    <img :src="getCurrencyIcon(transaction.symbol)" alt="" v-if="transaction.symbol !=='POINT'" />
                    <img :src="PointIcon" style="width: 35px;" alt="Points Icon" v-else />
                  </span>
                </div>
              </button>
            </h2>
            <div
              :id="`flush-collapse${index}`"
              class="accordion-collapse collapse"
              :aria-labelledby="`flush-heading${index}`"
              data-bs-parent="#accordionTransactionDetail"
            >
              <div class="accordion-body p-0">
                <a href="#">
                  <div class="accordion-li pt-2 pb-4 px-4">
                    <div
                      class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray"
                    >
                      <p>Time</p>
                      <p class="text-end">{{ transaction.timestamp }}</p>
                    </div>
                    <div class="d-flex justify-content-between round mt-2">
                      <p class="winnie-color-gray">Verify</p>
                      <a :href="transaction.url"
                        ><img
                          src="@/assets/images/icon/arcoDesign-launch 1.svg"
                          alt=""
                      /></a>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="more-btn mt-5">
            <button
              v-if="hasMoreData"
              class="text-center py-3"
              @click="onLoadMore"
            >
              <span>More</span>
            </button>
          </div>
        </div>
        <div class="accordion accordion-flush w-100 nodata" v-else>
          <div class="accordion-item mb-2">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed d-flex justify-content-between align-items-center" type="button">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span class="fs-5 winnie-color-gray">No data</span>
                </div>
              </button>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { getCurrencyIcon } from "@/assets/images.js";
import PointIcon from "@/assets/images/icon/balance-icon.png"; // 你的圖標

const props = defineProps({
  transactions: Array,
  hasMoreData: Boolean,
});
const emit = defineEmits(["load-more"]);

// 觸發父層的加載更多函數
const onLoadMore = () => {
  emit("load-more"); // 觸發父層的加載更多數據
};
</script>

<style scoped>
.winnie-account .accordion {
  --bs-accordion-border-width: none;
}

.winnie-account .accordion-li {
  background-color: #1e2329;
}

.winnie-account .accordion-item {
  border-radius: 8px !important;
  background-color: #2b3139;
}

.winnie-account .accordion-button {
  background-color: #2b3139;
  color: #f8f8f8;
  border-radius: 8px !important;
}

.winnie-account .accordion-button:focus {
  box-shadow: none;
}

/* .winnie-account .accordion {
  width: 276px;
}

@media (min-width: 412px) and (max-width: 575.98px) {
  .winnie-account .accordion {
    width: 380px;
  }
} */

.winnie-account .more-btn button {
  width: 100%;
  background-color: #2b3139;
  color: #f8f8f8;
  border: none;
  border-radius: 8px;
}

.winnie-account .more-btn button:active {
  background-color: #414d5a;
}

.accordion-button.collapsed::after,
.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.winnie-account .winnie-color-gray {
  color: #bbb;
}

.winnie-account-detail a p {
  color: #f8f8f8;
}

.accordion.accordion-flush.w-100.nodata {
  height: 0;
}

.nodata .accordion-button.collapsed::after, .nodata .accordion-button:not(.collapsed)::after {
  display: none;
}

</style>
