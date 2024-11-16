<template>
  <div class="message-page container mt-5 px-3 px-lg-0">
		<div class="leaderboard-title text-start mb-3">
        <p class="fw-bold fs-3">Notifications</p>
    </div>
		<div class="winnie-message-table">
    <!-- 表首 -->
    <div class="tabs web-border-bottom py-3 d-none d-sm-block">
      <span class="tab ps-4" v-for="tab in tabs" :key="tab">{{ tab }}</span>
    </div>

    <!-- 表格內容 -->
    <div class="message-table-info">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-row web-border-bottom"
      >
        <!-- 手機版 -->
        <div class="message-row-mobile d-md-none p-2">
          <div class="message-header">
            <span class="title">{{ message.title }}</span>
          </div>
          <div class="message-detail">{{ message.details }}</div>
          <div class="date-link date mt-3">
              {{ message.date }}
              <a class="ms-2" href="#"><font-awesome-icon icon="fa-solid fa-angle-right fs-4"/></a>
          </div>
        </div>

        <!-- 桌面版 -->
        <div class="message-row-desktop d-none d-md-flex flex-column px-4">
					<div class="d-flex flex-row justify-content-between w-100">
						<div class="message-left">
            <div class="new-message-dot"></div>
            <span class="title">{{ message.title }}</span>
          </div>
          <div class="message-right">
            <span class="date">{{ message.date }}</span>
            <a href="#"><font-awesome-icon icon="fa-solid fa-angle-right fs-4"/></a>
          </div>
					</div>
					<div class="message-detail">{{ message.details }}</div>
        </div>
      </div>
		</div>

		<!-- 表尾 -->
    <!-- 分頁組件 (手機版) -->
    <div class="pagination d-md-none">
    </div>

    <!-- 表尾 (桌面版) -->
    <div class="view-more d-none d-md-block py-3">
      <a href="#">View More</a>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref(["All", "Deposit", "Withdraw", "Reward", "Game"]);
const messages = ref([
  {
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
  {
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
	{
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
	{
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
	{
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
	{
    title: "Withdrawal Successful",
    date: "10/28/2024 11:05:27",
    details: "You have successfully withdrawn 200 USDT."
  },
]);
</script>

<style scoped>
.container {
	max-width: 934px;
}

.tabs {
  display: flex;
}

.tab {
  padding: 8px 12px;
  background-color: transparent;
	color: #F8F8F8;
  cursor: pointer;
}


.tab:hover, .tab:active {
	color: #FCD535;
}

.winnie-message-table {
	border: 1px solid #505156;
	border-radius: 0px;
	background-color: transparent;
	max-width: 934px;
}

@media (min-width: 575.98px) {
  .winnie-message-table {
	border-radius: 15px;
  }
}

.message-table-info {
  display: flex;
  flex-direction: column;
}

@media (min-width: 575.98px) {
  .web-border-bottom {
    border-bottom: 1px solid #505156;
  }
}

/* 手機版樣式 */
.message-row-mobile {
  border-bottom: 1px solid #505156;
  padding-bottom: 12px;
}

.message-header {
  display: flex;
  justify-content: space-between;
}

.title {
  font-weight: bold;
}

.date-link {
  display: flex;
  align-items: center;
}

.message-detail {
  color: #BBB;
  margin-top: 4px;
}

.pagination {
  display: flex;
  justify-content: space-between;
}

.page-button {
  padding: 8px 12px;
  background-color: #f1f1f1;
  border: none;
  cursor: pointer;
}

/* 桌面版樣式 */
.message-row-desktop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.message-row-desktop:hover {
	background-color: #414D5A;
}

.message-left {
  flex: 1;
  text-align: left;
  font-weight: bold;
}

.message-right {
  display: flex;
  align-items: center;
}

.date {
  margin-right: 8px;
	color: #BBB;
  font-weight: 200;
  font-size: 12px;
  align-items: center;
}

.fa-angle-right {
	color: #BBB;
  height: 12px;
}

@media (min-width: 767.98px) {
  .fa-angle-right {
    margin-bottom: 2px;
  }
}


.view-more {
  text-align: center;
}

.view-more a {
  color: #FCD535;
  text-decoration: none;
}

.message-row-desktop {
  width: 100%;
}

.message-left {
  flex: 1;
}

.message-right {
  text-align: right;
}

.message-detail {
  text-align: left;
  width: 100%;
}

.new-message-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #FCD535;
  border-radius: 50%; 
  margin-right: 8px;
}

</style>