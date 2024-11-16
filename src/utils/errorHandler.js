import { ElMessage } from "element-plus";

export const handleError = (error) => {
  let message = "Failed, please try again later."; // 預設錯誤訊息 (Default error message)

  const errorMessages = {
    2005: "Incorrect verification code", // 驗證碼不正確
    2006: "Verification code has expired", // 驗證碼已過期
    2021: "Invalid referral code", // 推薦碼錯誤
    4001: "Invalid request, please check the input information", // 請求無效，請檢查輸入資訊
    5000: "Internal server error, please try again later", // 伺服器內部錯誤，請稍後再試
  };

  if (error.response && error.response.data.message) {
    const systemCode = error.response.data.systemCode;

    message =
      errorMessages[systemCode] || error.response.data.message || message;
    return message;
  } else {
    return "Network error, please try again later."; // 網絡錯誤，請稍後再試。
  }
};

export const handleApiError = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return "Network error, please try again later."; // 網絡錯誤，請稍後再試。
  }
};

export const showErrorNotification = () => {
  ElMessage.error({
    message: "Server is busy, please try again later!", // 伺服器忙線中，請稍後再試！
    duration: 3000,
    grouping: true,
  });
};
