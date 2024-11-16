// src/stores/user.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "../services/modules"; // 引入 API 模組
import { login } from "../services/auth";

// 定義一個函數來返回初始的 userInfo 結構
const getDefaultUserInfo = () => ({
  name: "",
  userId: "",
  avatarUrl:
    "https://defiweb.oss-ap-northeast-1.aliyuncs.com/images/icon/NFT/14.png",
  email: "",
  balanceData: {
    symbol: "POINT",
    balance: 0.0,
    lockedBalance: 0.0,
  },
});

export const useUserStore = defineStore("user", () => {
  // 定義狀態 state
  const token = ref(localStorage.getItem("token") || "");
  const userInfo = ref(null);
  const errorMessage = ref("");
  //const userInfo = ref(getDefaultUserInfo());

  // 判斷是否已登入
  const isLoggedIn = computed(() => !!token.value);

  // 定義 actions
  const loginUser = async (loginData) => {
    try {
      const response = await login(loginData);
      token.value = response.data; // 將 token 儲存到狀態
      localStorage.setItem("token", token.value); // 同時儲存到 localStorage

      if (response.data) {
        // 登入成功取得用戶資訊
        await fetchUserInfo();
      }
    } catch (error) {
      token.value = ""; // 登入失敗時清除 token
      localStorage.removeItem("token"); // 確保 localStorage 中的 token 被清除
      if (error.response && error.response.data.systemCode) {
        if (error.response.data.systemCode === 4001) {
          errorMessage.value = "Incorrect email or password. Note that they are case sensitive.";
        } else {
          errorMessage.value = error.response.data.message;
        }
      }
    }
  };

  // 定義 actions，用來從 API 獲取用戶信息
  const fetchUserInfo = async () => {
    if (!userInfo.value) {
      // 檢查 userInfo 是否已有數據
      try {
        const response = await api.auth.getUserInfo();
        userInfo.value = response.data.data;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }

    return userInfo.value; // 如果已經有數據，直接返回，不打 API
  };

  // 當子組件通知父組件頭像已變更時，更新 store
  const updateNickname = (newNickname) => {
    userInfo.value.name = newNickname;
  };

  // 當子組件通知父組件頭像已變更時，更新 store
  const updateAvatar = (newAvatarUrl) => {
    userInfo.value.avatarUrl = newAvatarUrl;
  };

  const updateTreasureSpot = (newPlayHistoryData) => {
    // value can update value, obj must replace all
    userInfo.value = {
      ...userInfo.value,
      playHistoryData: newPlayHistoryData,
    };
  };

  const updateBalance = (newBalance) => {
    if (!userInfo.value) {
      userInfo.value = {}; // 如果 userInfo.value 尚未定義，先初始化為空對象
    }
    if (!userInfo.value.balanceData) {
      userInfo.value.balanceData = {}; // 如果 balanceData 尚未定義，先初始化為空對象
    }
    userInfo.value.balanceData.balance = newBalance; // 更新 balance 值
  };

  // 定義actions，登出
  const logoutUser = () => {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token"); // 清理本地存儲中的 token
  };

  // 返回 state 和 actions
  return {
    token,
    userInfo,
    isLoggedIn, // 用來判斷是否登入
    loginUser,
    fetchUserInfo,
    logoutUser,
    errorMessage,
    updateNickname,
    updateAvatar,
    updateTreasureSpot,
    updateBalance,
  };
});
