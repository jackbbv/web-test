<template>
  <ul class="navbar-nav ms-auto ms-2 mb-2 mb-lg-0">
    <li
      v-for="(item, index) in links"
      :key="item.id"
      class="nav-item"
      :class="{ dropdown: item.dropdown }"
    >
      <template v-if="item.dropdown">
        <router-link
          :class="`winnie-nav-link fs-6 ${
            item.dropdown ? 'dropdown-toggle' : ''
          }`"
          to="#" 
          :id="item.id"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <font-awesome-icon
            v-if="index === 0"
            icon="fa-solid fa-rocket"
            class="d-inline me-2"
          />
          <font-awesome-icon
            v-if="index === 1"
            icon="fa-solid fa-crosshairs"
            class="d-inline me-2"
          />
          <font-awesome-icon
            v-if="index === 2"
            icon="fa-solid fa-chart-simple"
            class="d-inline me-2"
          />
          {{ item.label }}
          <font-awesome-icon 
          icon="fa-solid fa-angle-down" 
          class="ms-2 dropdown-icon"
        />
        </router-link>
        <!-- Dropdown menu -->
        <ul class="dropdown-menu px-4 py-3 custom-dropdown-menu mt-1" :aria-labelledby="item.id">
          <p class="dropdown-title">{{ item.dropdownTitle }}</p>
          <div v-for="section in item.dropdownSections" :key="section.title">
            <div class="dropdown-subtitle">
              <div :class="section.circleClass"></div>
              <span class="dropdown-title">{{ section.title }}</span>
            </div>
            <li
              v-for="game in section.games"
              :key="game.roomNumber"
              class="mx-0" @click="refreshPage"
            >
              <router-link v-if="section.title!=='Drawn'"
                class="dropdown-item winnie-dropdown-item my-2 text-center"
                :to="game.url"
              >
                <span class="game-type-name">{{ game.gameRoom }}</span>
              </router-link>
              <router-link v-else
                class="dropdown-item winnie-dropdown-item my-2 text-center"
                :to="game.url+'?static=true'"
              >
                <span class="game-type-name">{{ game.gameRoom }}</span>
              </router-link>
            </li>
            <li class="mx-0" v-if="section.games.length === 0">
              <a href="#" class="dropdown-item winnie-dropdown-item my-2 text-center dropdown-item-nodata">
                <span class="game-type-name">
                  No data
                </span>
              </a>
            </li>
          </div>
        </ul>
      </template>
      <template v-else>
        <router-link
          class="winnie-nav-link fs-6"
          :to="{ name: item.routeName }"
        >
          <font-awesome-icon
            v-if="index === 0"
            icon="fa-solid fa-rocket"
            class="d-inline me-2"
          />
          <font-awesome-icon
            v-if="index === 1"
            icon="fa-solid fa-chart-simple"
            class="d-inline me-2"
          />
          <font-awesome-icon
            v-if="index === 2"
            icon="fa-solid fa-chart-simple"
            class="d-inline me-2"
          />
          {{ item.label }}
        </router-link>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const refreshPage = () => {
  // 非第一次首頁跳轉內頁，或內頁跳轉才reload
  if (window.location.pathname.length!==1) location.reload()
};
</script>

<style scoped>
.winnie-nav-link {
  color: #f8f8f8;
  display: flex;
  align-items: center;
  height: 100%;
}

.dropdown-menu {
  background-color: #1e2329;
}

.dropdown-title {
  font-size: 1rem;
  color: #f8f8f8;
  font-weight: 600;
}

.red-circle {
  width: 10px;
  height: 10px;
  background-color: #f63e3d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 3px;
}

.green-circle {
  width: 10px;
  height: 10px;
  background-color: #71f63d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 3px;
}

.winnie-dropdown-item {
  color: #f8f8f8;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2b3139;
  border-radius: 6px;
}

.winnie-dropdown-item:hover {
  background-color: #414d5a;
}
.winnie-dropdown-item:hover .game-type-name {
  color: #f8f8f8;
}
.winnie-dropdown-item:hover .room-number {
  color: #bbb !important;
}

.winnie-dropdown-item.dropdown-item-nodata, .winnie-dropdown-item.dropdown-item-nodata:hover, .winnie-dropdown-item.dropdown-item-nodata.active, .winnie-dropdown-item.dropdown-item-nodata:hover .game-type-name {
  background-color: transparent !important;
  cursor: default;
  color: #BBB !important;
}

ul li a {
  color: #f8f8f8;
  text-decoration: none;
  padding: 10px 20px;
  font-weight: 600;
}
@media (min-width: 1199.98px) {
  nav ul li a {
    padding: 8px 32px 8px 0px;
  }
  .dropdown-menu li a {
    padding: 8px 32px;
  }
}

nav ul li a:hover {
  color: #fcd535;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-icon {
  transition: transform 0.2s ease;
}

.dropdown-toggle[aria-expanded="true"] .dropdown-icon {
  transform: rotate(180deg);
}

.custom-dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #414d5a;
}

.custom-dropdown-menu::-webkit-scrollbar {
  width: 5px;
  background-color: #1e2329;
}

.custom-dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #2B3139;
  border-radius: 4px;
}
</style>
