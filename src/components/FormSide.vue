<template>
  <div class="side-form position-relative">
    <form class="px-3 px-md-0 px-lg-4 px-xl-5" id="loginForm" @submit.prevent>
      <slot></slot>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
form {
  color: #181A20;
}
.side-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
}
@media (max-width: 991px) {
  .side-form {
    width: 100%;
    padding: 15px;
  }
}
</style>
