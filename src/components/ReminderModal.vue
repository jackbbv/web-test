<template>
  <!-- reminder modal -->
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="reminderModal"
    tabindex="-1"
    aria-labelledby="reminderModalLabel"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reminderModalLabel"></h5>
        </div>
        <div
          class="modal-body d-flex flex-column align-items-center justify-content-center"
        >
          <img
            class="mb-3"
            src="@/assets/images/icon/md-warning 1.svg"
            alt=""
          />
          <p class="text-center" v-if="!isForDeposit">
            Please ensure your receiving platform supports the token and network you are withdrawing. If you are unsure, kindly check with the receiving platform first.
          </p>
          <p class="text-center" v-else>
            <p class="note-topic">Please Note</p>
            <p class="deposit-notice-color" style="font-size: 12px" v-show="selectedNetwork === 'Tron'">
              <p>•  Address of TRC20 protocol starts with “T”, which requires 12 blockchain confirmations and could take around 1 minute to deposit the fund.</p>
              <p>•  Only deposit via TRC20 protocol to the above address, coin sent via other protocols will result in loss of funds.</p>
              <p>•  Tyche1 DOES NOT support any form of smart contract transfers on Tron mainnet, coins sent via this protocol will result in loss of funds.</p>
            </p>
            <p class="deposit-notice-color" style="font-size: 12px" v-show="selectedNetwork !== 'Tron'">
              <p>•  For <span v-show="supportCoin === 'USDT'">BSCUSDT</span><span v-show="supportCoin === 'USDC'">BSCUSDC</span>, 15 block confirmations are required and it may take up to 2 minutes to confirm the transaction.</p>
              <p>•  Only deposit via BSC network to the above address, coin sent via other protocols will result in loss of funds.</p>
            </p>
          </p>
        </div>
        <div class="modal-footer px-5">
          <button type="button" class="btn w-100 mb-3 mt-3" @click="$emit('closeModal')">OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: Boolean,
  isForDeposit: Boolean,
  selectedNetwork: String,
  supportCoin: String,
});

const emit = defineEmits(["closeModal", "selectedNetwork"]);
const modal = ref(null); // 用於存儲模態框的 DOM 元素

</script>

<style scoped>

#reminderModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#reminderModal .form-control {
  border: none;
  border-bottom: 1px solid #bbbbbb;
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

#reminderModal .form-control:focus {
  border-color: #f8f8f8;
  outline: none;
}

#reminderModal .modal-header {
  border-bottom: none;
}

#reminderModal .modal-footer {
  border-top: none;
}

#reminderModal .modal-dialog {
  display: flex;
  align-items: center;
}

#reminderModal .modal-content {
  background-color: #181a20;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
  margin: auto;
}

#reminderModal .modal-footer button {
  background-color: #2b3139;
  border: none;
  color: #f8f8f8;
}

#reminderModal .modal-footer button:hover {
  background-color: #414D5A;
}

#reminderModal button#withdrawConfirmButton:hover {
  background-color: #414d5a;
}

#reminderModal .modal-body button{
  border: 1px solid #414D5A;
  background-color: #181a20;
  font-size: 14px;
}

#reminderModal .modal-body button:hover{
  background-color: #2B3139;
}

.modal-title {
  font-size: 20px;
}
</style>
