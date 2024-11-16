import { createApp } from "vue";
import { createPinia } from "pinia"; // 引入 Pinia
import "normalize.css";
import router from "./router";
import i18n from "./i18n/i18n";
import App from "./App.vue";
import { focusDirective } from "./directives/focus"; // 導入自定義指令

// 引入Element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入 Bootstrap 的 CSS
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
window.bootstrap = bootstrap;
import "./style.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import {
  faPowerOff,
  faCircleUser,
  faCrosshairs,
  faRocket,
  faChartSimple,
  faCircleInfo,
  faCircleQuestion,
  faCircleExclamation,
  faMagnifyingGlass,
  faXmark,
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faCog,
  faCopy,
  faList,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPowerOff,
  faCircleUser,
  faCrosshairs,
  faRocket,
  faChartSimple,
  faCircleInfo,
  faCircleQuestion,
  faCircleExclamation,
  faMagnifyingGlass,
  faXmark,
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faCog,
  faCopy,
  faList,
  faBell,
);
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pinia = createPinia();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(ElementPlus)
  .directive("focus", focusDirective) // 全局註冊 v-focus 指令
  .mount("#app");
