<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="playerListModal"
    tabindex="-1"
    aria-labelledby="playerListModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <!-- Custom Modal Backdrop -->
    <div v-if="isOpen" class="custom-backdrop"></div>

    <!-- Modal -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h4 class="modal-title ms-2 mb-3 fw-bold" id="playerListModalLabel">
            Player List
          </h4>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th class="text-end pe-3 pe-sm-0" scope="col">Vote</th>
                <th class="text-end" scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr class="fw-bold" v-for="player in players" :key="player.id">
                <td class="player-list-name">
                  <img
                    class="me-1"
                    :class="getImageClass"
                    :src="player.image"
                    :style="{ 'max-width': getMaxWidth }"
                    @error="setAltImg" 
                    alt=""
                  />
                  {{ player.name }}
                </td>
                <td class="text-end pe-3 pe-sm-0">
                  <span
                    >{{ player.votes }}
                    <img
                      class="img-fluid"
                      :style="{ 'max-width': getMaxWidth }"
                      src="@/assets/images/icon/balance-icon.png"
                      alt=""
                    />
                  </span>
                </td>
                <td class="text-end">{{ player.rate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";
import defaultUserIcon from "@/assets/images/icon/NFT/md-account_circle 1@1x.png";

const setAltImg = (e) => {
  e.target.src = defaultUserIcon 
}

const modal = ref(null); // 用於存儲模態框的 DOM 元素

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  players: Array,
});

// console.log("isOpen prop in PlayerListModal:", props.isOpen);

const emit = defineEmits(["closeModal"]);

// 計算屬性 getImageClass
const getImageClass = computed(() => {
  return "img-fluid"; // 根據需求可動態返回不同的 class
});

const closeModal = () => {
  emit("closeModal");
};
// 計算不同裝置下的圖片大小
const getMaxWidth = computed(() => (window.innerWidth < 768 ? "30px" : "32px"));
</script>

<style scoped>
#playerListModal .modal-header,
#playerListSmModal .modal-header {
  border-bottom: none;
}

#playerListModal .modal-footer,
#playerListSmModal .modal-footer {
  border-top: none;
}

#playerListModal .modal-content {
  background-color: #181a20;
  border: 2px solid #F8F8F8;
  box-shadow: 0 4px 20px rgba(248, 248, 248, 0.5);
  max-height: 600px;
  min-height: 600px;
  overflow-y: auto;
}

#playerListModal .modal-content::-webkit-scrollbar {
  width: 5px;
  background-color: #2b3139;
}

#playerListModal .modal-content::-webkit-scrollbar-thumb {
  background-color: #1e2329;
  border-radius: 4px;
}
#playerListModal .modal-content::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

#playerListModal .table,
#playerListSmModal .table {
  --bs-table-bg: transparent;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

#playerListModal .table .player-list-name {
  font-size: 1rem;
}

#playerListModal .table .player-list-name img {
  border-radius: 50%;
  object-fit: cover;
}

#playerListModal .table thead {
  color: #BBB;
}

#playerListModal .table td,
#playerListModal .table th {
  vertical-align: middle;
}

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

.custom-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
