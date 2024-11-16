<template>
  <div :class="['dropdown', dropdownClass]" style="display: inline-flex">
    <a
      class="d-flex align-items-center dropdown-toggle"
      href="#"
      :id="menuId"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img :src="iconSrc" :alt="iconAlt" style="width: 17px; height: 17px" />
      <div
        v-if="hasNewNotification"
        class="notification-dot"
      ></div>
    </a>
    <ul
      class="dropdown-menu dropdown-menu-lg-start px-3 py-3 fw-bold"
      :aria-labelledby="menuId"
    >
      <li v-for="item in items" :key="item.label" class="py-1">
        <a
          class="dropdown-item fs-6"
          href="#"
          @click.prevent="handleClick(item)"
        >
        <div class="d-flex align-items-center">
          <img
            v-if="item.icon"
            :src="item.icon"
            :alt="item.label"
            class="me-2"
            style="width: 22px"
          />
          <span>{{ item.label }}</span>
          <span v-if="item.time" class="ms-auto item-time fw-light">{{ item.time }}</span>
          </div>
          <div v-if="item.description" class="item-description fw-light">
            {{ item.description }}
          </div>
        </a>
      </li>
      <div v-if="showMoreButton" class="text-center fw-light">
        <button class="dropdown-more-btn fw-light">View All</button>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  iconAlt: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  dropdownClass: {
    type: String,
    default: "",
  },
  showMoreButton: {
      type: Boolean,
      default: false,
    },
  hasNewNotification: {
      type: Boolean,
      default: false,
    },
});

const emit = defineEmits(["select"]);

const handleClick = (item) => {
  emit("select", item);
};
</script>

<style scoped>
.dropdown-menu {
  background-color: #1e2329;
}

.dropdown-item {
  color: #f8f8f8;
}

.dropdown-item:hover {
  color: #f8f8f8;
  background-color: #35485d;
}

.dropdown-toggle::after {
  visibility: hidden;
}

@media (min-width: 991.98px) {
  .dropdown-menu-lg-start[data-bs-popper] {
    right: 0;
    left: auto;
    top: 2em;
    border: 1px solid #414d5a;
  }
}

.item-description {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.item-time {
  font-size: 12px;
  color: #BBB;
}

.dropdown-notification ul {
  width: 300px;
  max-height: 280px;
}

.dropdown-more-btn {
  border: none;
  background: transparent;
  color: #F8F8F8;
}

.dropdown-more-btn:hover {
  color: #FCD535;
}

.notification-dot {
  width: 8px;
  height: 8px;
  background-color: #FCD535;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: 10px;
}
</style>
