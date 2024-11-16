<template>
  <div class="stats-content mx-auto text-start ps-4">
    <p class="fw-bold stats-title">{{ title }}</p>
    <div class="yellow-line"></div>
    <p class="fw-bolder mt-2 stats-number">{{ number }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: [Number, String],
    required: true,
  },
});
</script>

<style scoped>
/* Add any specific styles for StatsCard here */
.stats-number {
  font-size: 2rem;
}
@media (min-width: 991.98px) {
  .stats-number {
      font-size: 2.5rem;
  }
}
@media (min-width: 1399.98px) {
  .stats-number {
      font-size: 3rem;
  }
}

.stats-title {
  font-size: 1rem;
  padding-top: 8px;
  color: #8C939D;
}

@media (min-width: 1399.98px) {
  .stats-title {
    font-size: 1rem;
    padding-top: 15px;
  }
}

  .yellow-line {
  width: 45%;
  height: 4px;
  background-color: #FCD535;
  margin-top: 8px;
  border-radius: 8px;
  }
  
@media (max-width: 767.98px) {
  .yellow-line {
  width: 45%;
  min-width: 160px;
  }
}
</style>
