// src/services/auth.js 處理與驗證相關的 API 呼叫
import apiClient from "./api";

// 定義登入函數
export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/Account/Login", credentials);
    if (response.data.success) return response.data;
  } catch (error) {
    throw error;
  }
};

// 定義登出函數
export const logout = async () => {
  try {
    // 調用它API
    await apiClient.post("/Account/Logout");

    // 移除本地存儲的 token
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error during logout", error);
  }
};
