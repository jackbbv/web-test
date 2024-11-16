<template>
  <div
    class="modal winnie-modal fade"
    tabindex="-1"
    :id="modalId"
    ref="modalElement"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm-half modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 根據設備類型顯示不同的內容 -->
          <template v-if="isMobile">
            <!-- 手機版：Accordion 樣式 -->
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Drawn
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>GID 1225 - BINANCE</p>
                    <p>GID 1136 - TRON</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- 桌面版：Dropdown 樣式 -->
            <div>
              <p class="dropdown-title">Treasure Spot</p>
              <div class="dropdown-subtitle mt-3">
                <div class="red-circle"></div>
                <span class="dropdown-title">Drawn</span>
              </div>
              <li class="mx-0">
                <a
                  class="dropdown-item winnie-dropdown-item my-2"
                  href="game/play-bnb.html"
                >
                  <span class="me-5 room-number">GID 1225</span>
                  <span class="game-type-name">BINANCE</span>
                </a>
              </li>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
});

const isMobile = ref(false);
const modalInstance = ref(null);
const modalElement = ref(null);

// 檢測螢幕大小並切換樣式
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768; // 設定768px為手機和桌面的臨界點
};

// 初始化模態框
const initializeModal = () => {
  if (modalElement.value) {
    modalInstance.value = new Modal(modalElement.value, {
      backdrop: true,
    });
  }
};

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice); // 監聽視窗大小變化
  initializeModal(); // 初始化模態框
});

onUnmounted(() => {
  window.removeEventListener("resize", checkDevice);
  if (modalInstance.value) {
    modalInstance.value.dispose();
  }
});
</script>

<style scoped>
/* Custom styling for modal */
.modal-content {
  background-color: #181a20;
}

.accordion-button {
  background-color: transparent;
  color: #f8f8f8;
}
</style>
