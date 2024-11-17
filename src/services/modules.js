// src/services/modules.js
import apiClient from "./api";

// auth module
// const response = await auth.getUserInfo(false, true); 如果我要在別的地方使用自定義參數，不用預設時
const auth = {
  getUserInfo: (withGamePlayData = true, withRewardData = true) =>
    apiClient.get("/Account/AccountInfo", {
      params: {
        withGamePlayData,
        withRewardData,
      },
    }),
  getTransactionLog: (transactionType, pageSize, pageIndex) =>
    apiClient.get(
      `/Asset/TransactionLog/${transactionType}/${pageSize}/${pageIndex}`
    ),
};

const home = {
  home: () => apiClient.get("/Common/Home"),
};

// account module
// 發送註冊驗證信
const account = {
  register: (userData) => apiClient.post("/Account/Register", userData),

  CheckEmail: (email) =>
    apiClient.post(`/Account/CheckEmail`, { email: email }),

  changePassword: (passwordPayload) =>
    apiClient.put("/Account/ChangePassword", passwordPayload),

  checkRefererId: (refererId) =>
    apiClient.post("/Account/CheckRefererId", { refererId: refererId }),

  sendVerificationCode: (verificationType, email) =>
    apiClient.post("/Account/SendVerificationCode", {
      verificationType,
      email,
    }),

  sendAuthCode: (verificationType) =>
    apiClient.post("/Account/SendAuthCode", {
      verificationType,
    }),

  checkVerificationCode: (verificationType, email, code) =>
    apiClient.post("/Account/CheckVerificationCode", {
      verificationType,
      email,
      code,
    }),

  forgotPasswordChange: (email, newPassword, code) =>
    apiClient.post("/Account/ForgotPasswordChange", {
      email,
      newPassword,
      code,
    }),
  
  getNotification: (notificationTypeEnum, pageSize, pageIndex) =>
    apiClient.get(
      `/Account/Notification/${notificationTypeEnum}/${pageSize}/${pageIndex}`
    ),
  
  notificationRead: (id) => 
    apiClient.put("/Account/NotificationRead", { id }
  ),
};

// user module
const userInfo = {
  changeNickname: (name) => apiClient.put("/Account/ChangeNickname", { name }), // 變更暱稱
  getAvatarList: () => apiClient.get("/Account/AvatarList"), // 取得頭像列表
  changeAvatar: (avatarId) =>
    apiClient.put("/Account/ChangeAvatar", null, {
      params: {
        avatarId,
      },
    }),
  getAccountInfo: (
    withGamePlayData = true,
    withReawrdData = true,
    withReawrdBalanceData = true
  ) =>
    apiClient.get("/Account/AccountInfo", {
      params: {
        withGamePlayData,
        withReawrdData,
        withReawrdBalanceData,
      },
    }), // 取得用戶資訊
  getGameRewardHistory: () => apiClient.get("/Game/GameRewardHistory"), // 得獎紀錄
  getGameRewardInfo: (rewardId) =>
    apiClient.get("/Game/GameRewardHistory", {
      params: {
        rewardId,
      },
    }), // 個人得獎
};

// game module
const game = {
  getGameRoomList: () => apiClient.get("/Game/GameRoomList"),
  getGameRoom: (gameRoomId) =>
    apiClient.get("/Game/GameRoom", {
      params: {
        gameRoomId,
      },
    }),

  getGameRoomByGId: (gId) =>
    apiClient.get("/Game/GameRoomByGId", {
      params: {
        gId,
      },
    }),
  
  getGameRoomByAccount: (gameRoomId) =>
    apiClient.get("/Game/GameRoomByAccount", {
      params: {
        gameRoomId,
      },
    }),

  searchRoom: (name) =>
    apiClient.get("/Game/GameRoomByName", {
      params: {
        name,
      },
    }),

  playGame: (gameRoomId, betQuantity) =>
    apiClient.post("/Game/Vote", { gameRoomId, betQuantity }),

  getGamePlayer: (gameRoomId) =>
    apiClient.get("/Game/GamePlayHistory", {
      params: {
        gameRoomId,
      },
    }),

  getGameWinnerHistory: (gid, pageSize, pageIndex) =>
    apiClient.get("/Game/GameWinnerHistory", {
      params: { gid, pageSize, pageIndex },
    }),
  getGameLeaderBoard: (symbol, timePeriod, pageSize, pageIndex) =>
    apiClient.get("/Game/GameLeaderBoard", {
      params: {
        symbol,
        timePeriod,
        pageSize,
        pageIndex,
      },
    }),

  getVoteLeaderBoard: () => 
    apiClient.get("/Game/GetVoteLeaderBoard"), // 投票排行榜

  getHunterInfo: () => 
    apiClient.get("/Game/GetHunterInfo"), // 獵人信息
};

// 取得出入金網路 幣種以及金額設定
const asset = {
  getCryptocurrencySetting: () => apiClient.get("/Asset/CryptocurrencySetting"), // 取得出入金網路、幣種及金額設定
  withdrawApply: (formData) => apiClient.post("/Asset/WithdrawApply", formData), // 出金申請
  getAddress: (formData) =>
    apiClient.post("/Asset/GetAddress", null, { params: formData }), // 取得地址
  withdrawReward: (formData) =>
    apiClient.post("/Asset/WithdrawReward", formData), // 提出獎項
};

// 統一導出模組
export default {
  auth,
  account,
  game,
  userInfo,
  asset,
  home,
};
