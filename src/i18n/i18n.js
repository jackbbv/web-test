import { createI18n } from 'vue-i18n';
import en from './en.json';
import zh from './zh.json';

const i18n = createI18n({
  locale: 'en', // 默認語言
  legacy: false, // 如果要使用composition API，要設置為false
  messages: {
    en,
    zh,
  },
});

export default i18n;
