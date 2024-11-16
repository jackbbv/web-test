// 使用 import 導入圖片 game
import dollarPhoneIcon from "@/assets/images/icon/dollar-phone2.png"; /*共用 dollar img */
import peopleIcon from "@/assets/images/icon/mdi_vote-outline_gray.svg"; /*共用 peopleIcon img */

import ethCard from "@/assets/images/common/card-eth.png";
import bnbCard from "@/assets/images/common/card-bnb.png";

import ethAccountIcon from "@/assets/images/icon/ETH-account.svg";
import bnbAccountIcon from "@/assets/images/icon/BNB-account.svg";
import XRPAccountIcon from "@/assets/images/icon/XRP-account.svg";
import TRXAccountIcon from "@/assets/images/icon/TRX-account.svg";
import BTCAccountIcon from "@/assets/images/icon/BTC-account.svg";
import DOGEAccountIcon from "@/assets/images/icon/DOGE-account.svg";
import SOLAccountIcon from "@/assets/images/icon/SOL-account.svg";
import AAVAccountIcon from "@/assets/images/icon/AAVE-account.svg";
import ADAAccountIcon from "@/assets/images/icon/ADA-account.svg";
import DOGSAccountIcon from "@/assets/images/icon/DOGS-account.svg";
import LINKAccountIcon from "@/assets/images/icon/LINK-account.svg";
import NEARAccountIcon from "@/assets/images/icon/NEAR-account.svg";
import PEPEAccountIcon from "@/assets/images/icon/PEPE-account.svg";
import SHIBAccountIcon from "@/assets/images/icon/SHIB-account.svg";
import SUIAccountIcon from "@/assets/images/icon/SUI-account.svg";
import TONAccountIcon from "@/assets/images/icon/TON-account.svg";
import WIFAccountIcon from "@/assets/images/icon/WIF-account.svg";

import USDTIcon from "@/assets/images/icon/USDT.svg";
import USDCIcon from "@/assets/images/icon/USDC.svg";

//Detail Page
// import nft01 from "@/assets/images/icon/NFT/01.png";
// import nft02 from "@/assets/images/icon/NFT/02.png";
// import nft03 from "@/assets/images/icon/NFT/03.png";
// import nft04 from "@/assets/images/icon/NFT/04.png";
// import nft05 from "@/assets/images/icon/NFT/05.png";
// import nft06 from "@/assets/images/icon/NFT/06.png";
// import nft07 from "@/assets/images/icon/NFT/07.png";
// import HexagonImage from "@/assets/images/icon/NFT/08.png";

// 輸出圖片路徑
export const images = {
  dollarPhoneIcon,
  peopleIcon,
  ethCard,
  ethAccountIcon,
  bnbCard,
  bnbAccountIcon,
  // nft01,
  // nft02,
  // nft03,
  // nft04,
  // nft05,
  // nft06,
  // nft07,
  // HexagonImage,
  XRPAccountIcon,
  TRXAccountIcon,
  BTCAccountIcon,
  DOGEAccountIcon,
  SOLAccountIcon,
  USDTIcon,
  USDCIcon,
  AAVAccountIcon,
  ADAAccountIcon,
  DOGSAccountIcon,
  LINKAccountIcon,
  NEARAccountIcon,
  PEPEAccountIcon,
  SHIBAccountIcon,
  SUIAccountIcon,
  TONAccountIcon,
  WIFAccountIcon,
};

// 用來根據 rewardSymbol 獲取對應圖標的函數
export const getCurrencyIcon = (symbol) => {
  const icons = {
    ETH: images.ethAccountIcon,
    BNB: images.bnbAccountIcon,
    XRP: images.XRPAccountIcon,
    TRX: images.TRXAccountIcon,
    BTC: images.BTCAccountIcon,
    DOGE: images.DOGEAccountIcon,
    SOL: images.SOLAccountIcon,
    USDT: images.USDTIcon,
    USDC: images.USDCIcon,
    AAV: images.AAVAccountIcon,
    ADA: images.ADAAccountIcon,
    DOGS: images.DOGSAccountIcon,
    LINK: images.LINKAccountIcon,
    NEAR: images.NEARAccountIcon,
    PEPE: images.PEPEAccountIcon,
    SHIB: images.SHIBAccountIcon,
    SUI: images.SUIAccountIcon,
    TON: images.TONAccountIcon,
    WIF: images.WIFAccountIcon,
  };
  return icons[symbol]; // 如果沒有對應的貨幣圖標，使用一個默認的圖標
  //return icons[symbol] || images.defaultIcon; // 如果沒有對應的貨幣圖標，使用一個默認的圖標
};
