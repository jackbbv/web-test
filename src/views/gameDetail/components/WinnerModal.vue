<template>
  <!-- winner Modal -->
  <div
    v-if="isOpen"
    class="modal fade show"
    id="winnerModal"
    tabindex="-1"
    aria-labelledby="winnerModalLabel"
    aria-modal="true"
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
        :style="{ backgroundImage: `url(${winnerInfo.backgroundImage})` }"
      >
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="winnerModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div
          class="modal-body text-center d-flex flex-column justify-content-center"
        >
          <div class="game-winner-title">
            <p class="fs-2 fw-bold">WINNER</p>
          </div>
          <div class="winner-info mt-5">
            <img :src="winnerInfo.winnerAvatarUrl" alt="avatar" @error="setAltImg" />
            <p class="fs-5 fw-bold mt-2">{{ winnerInfo.winnerName }}</p>
          </div>
        </div>
        <div class="modal-footer mx-auto">
          <p class="winnie-color-gray">{{ countdown }} sec</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";
import confetti from "https://esm.run/canvas-confetti@1";

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const countdown = ref(5); //初始化倒數計時5秒

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  winnerInfo: Object,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

watch(
  () => props.isOpen, //監聽props.isOpen的變化
  (newVal) => {
    if (newVal) {
      countdown.value = 5; //每次打開modal都會重置倒數

      // 在 modal 打開時顯示 confetti
      confetti({
        particleCount: 150,
        spread: 60
      });
      
      const timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          clearInterval(timer);
          closeModal();
        }
      }, 1000);
    }
  }
);
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

#winnerModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#winnerModal .modal-header {
  border-bottom: none;
}

#winnerModal .modal-footer {
  border-top: none;
}

#winnerModal .modal-dialog .modal-content {
  min-height: 500px;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
}

#winnerModal .modal-footer .winnie-color-gray {
  color: #bbb;
}

.modal-content {
  background-color: transparent;
}

.custom-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 575.98px) {
  .modal-fullscreen-sm-down .modal-content{
    width: 90vw;
    height: auto;
    margin: 0 auto;
  }
}
.winner-info img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
