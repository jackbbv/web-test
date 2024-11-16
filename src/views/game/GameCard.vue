<template>
  <div class="winnie-xs-style px-0">
    <router-link :to="{ name: 'GameDetail', params: { gameId: gameId } }">
      <div class="card winnie-p-xs-2 p-3">
        <div class="game-card-img position-relative">
          <img
            :src="imageSrc"
            class="card-img-top img-fluid mx-auto"
            style="max-width: 1200px"
            alt="..."
          />
        </div>
        <div class="card-body pt-2 px-0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="room-title">
              <span 
              :class="index < 2 ? 'fs-3 fw-bold' : 'fs-6'"
              class="card-title game-list-name"
              >{{ gameName }}</span>
              <span
                class="d-none d-xxl-inline card-title game-list-type ms-1"
                style="font-size: 14px"
                >{{ gameType }}</span
              >
            </div>
            <img
              class="img-fluid mt-1"
              :style="{ maxHeight: index < 2 ? '50px' : '38px', marginRight: '-4px' }"
              :src="phoneIconSrc"
              alt=""
            />
          </div>
          <div class="text-start">
            <p 
            class="game-list-type mt-1"
            style="font-size: 12px;"
            :class="index < 2 ? 'd-none' : ''"
            >THE POT</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span 
                v-if="index < 2" 
                class="me-2" 
                :style="{ color: '#BBB', fontSize: '1rem' }"
              >THE POT
              </span>
              <img
                class="me-1 img-fluid"
                style="margin-left: -2px;"
                :style="{ width: index < 2 ? '40px' : '28px'}" 
                :src="feeIconSrc"
                alt=""
              />
              <span 
                class="game-list-fee"
                :class="index < 2 ? 'fs-5' : 'fs-6'">
                {{ fee.toLocaleString("en-US") }}
              </span>
            </div>
            <div class="d-flex align-items-center">
              <img
                class="me-1 mb-1"
                style="max-width: 22px"
                :src="peopleIconSrc"
                alt=""
              />
              <span 
              class="card-text game-list-people"
              :style="{ fontSize: index < 2 ? '1rem' : '0.85rem'}"
                >{{ participants }} / {{ totalParticipants }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  gameId: String, // 接收 gameId
  index: Number,
  link: String,
  imageSrc: String,
  gameName: String,
  gameType: String, //先叫這個名字到時候再改gameDetailName
  phoneIconSrc: String,
  feeIconSrc: String,
  fee: Number,
  peopleIconSrc: String,
  participants: Number,
  totalParticipants: Number,
});
</script>

<style scoped>
.game-container .card {
  background-color: #2b3139;
  width: 100%;
  font-size: 0.85rem;
}

.game-container .card:hover {
  border: 1px solid #414D5A;
}

.container .game-container .card .game-list-name,
.container .game-container .card .game-list-fee {
  color: #f8f8f8;
}

.container .game-container .card .game-list-round,
.container .game-container .card .game-list-type,
.container .game-container .card .game-list-people {
  color: #bbb;
}

.container .game-container .card img {
  border-radius: 0px;
}

.container .game-container .card-body {
  padding-bottom: 0px;
}

.card:hover .card-img-top {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.card-img-top {
  transition: transform 0.3s ease;
}

.game-card-img {
  overflow: hidden;
}

@media (max-width: 420px) {
  .winnie-xs-style {
    padding: 0.25rem;
  }

  .winnie-xs-style .game-list-name,
  .winnie-xs-style .game-list-round,
  .winnie-xs-style .game-list-fee,
  .winnie-xs-style .game-list-people,
  .winnie-xs-style .fa-user {
    font-size: 13px;
  }

  .winnie-p-xs-2 {
    padding: 0.5rem !important;
  }
}

@media (max-width: 767.98px) {
  .winnie-xs-style {
    padding: 0.25rem;
  }

  .winnie-xs-style .game-list-name,
  .winnie-xs-style .game-list-round,
  .winnie-xs-style .game-list-fee,
  .winnie-xs-style .game-list-people,
  .winnie-xs-style .fa-user {
    font-size: 13px;
  }

  .winnie-p-xs-2 {
    padding: 0.5rem !important;
  }
}
</style>
