<template>
  <!---
	<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawSuccessModal">
	Open Withdraw Modal
	</button
	-->
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="withdrawSuccessModal"
    tabindex="-1"
    aria-labelledby="withdrawSuccessModalLabel"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h3 class="modal-title ms-4 fw-bold" id="withdrawSuccessModalLabel">
            {{ title }}
          </h3>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="$emit('closeModal')"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <!-- <div
          class="modal-body px-5 d-flex justify-content-between align-items-center"
        >
          <img :src="PointIcon" alt="Points Icon" />
          <p class="fs-5 fw-bold">{{ amount }}</p>
          <button
            class="btn btn-primary text-light"
            @click="openTransactionDetails"
          >
            View Transaction Details
          </button>
        </div> -->
        <div class="modal-footer px-5">
          <button
            type="button"
            class="btn btn-primary w-100 mb-3 mt-3"
            @click="$emit('closeModal')"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
// import PointIcon from "@/assets/images/icon/balance-icon.png"; // 你的圖標

const props = defineProps({
  isOpen: Boolean,
  title: String,
  amount: Number,
  txid: String,
});

const emit = defineEmits(["closeModal"]);

// 點擊按鈕打開交易明細
// const openTransactionDetails = () => {
//   window.open(`https://testnet.bscscan.com/tx/${props.txid}`, "_blank");
// };

const modal = ref(null); // 用於存儲模態框的 DOM 元素
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

#withdrawModal,
#withdrawSuccessModal,
#withdrawRemindModal,
#depositRemindModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#withdrawModal .form-control,
#withdrawSuccessModal .form-control {
  border: none;
  border-bottom: 1px solid #bbbbbb;
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

#withdrawModal .form-control:focus,
#withdrawSuccessModal .form-control:focus {
  border-color: #f8f8f8;
  outline: none;
}

#withdrawModal .modal-header,
#withdrawSuccessModal .modal-header,
#withdrawRemindModal .modal-header,
#depositRemindModal .modal-header {
  border-bottom: none;
}

#withdrawModal .modal-footer,
#withdrawSuccessModal .modal-footer,
#withdrawRemindModal .modal-footer,
#depositRemindModal .modal-footer {
  border-top: none;
}

#withdrawModal .modal-dialog,
#withdrawSuccessModal .modal-dialog {
  display: flex;
  align-items: center;
}

#withdrawModal .modal-content,
#withdrawSuccessModal .modal-content {
  background-color: #181a20;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
  width: 70%;
  margin: auto;
}

#withdrawModal .modal-footer button,
#withdrawSuccessModal .modal-footer button {
  background-color: #2b3139;
  border: none;
  color: #f8f8f8;
}

#withdrawModal .modal-footer button:hover,
#withdrawSuccessModal .modal-footer button:hover {
  background-color: #414D5A;
}

#withdrawModal button#withdrawConfirmButton:hover,
#withdrawSuccessModal button#withdrawConfirmButton:hover {
  background-color: #414d5a;
}

#withdrawSuccessModal .modal-body button{
  border: 1px solid #414D5A;
  background-color: #181a20;
  font-size: 14px;
}

#withdrawSuccessModal .modal-body button:hover{
  background-color: #2B3139;
}

.modal-title {
  font-size: 20px;
}


@media (max-width: 480px) {
  #withdrawModal .modal-content, #withdrawSuccessModal .modal-content {
    width: 80%;
  }
}

</style>
