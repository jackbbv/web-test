import { nextTick } from "vue";

export const focusDirective = {
  mounted(el) {
    nextTick(() => {
      if (el && isFocusable(el)) {
        el.focus();
      }
    });
  },
  updated(el) {
    nextTick(() => {
      if (el && isFocusable(el)) {
        el.focus();
      }
    });
  },
  beforeUnmount(el) {
    // 在組件卸載之前清理掉焦點
    if (el && document.activeElement === el) {
      el.blur(); // 如果該元素有焦點，則手動解除
    }
  },
};

// 檢查元素是否可聚焦
function isFocusable(el) {
  const style = window.getComputedStyle(el);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    el.offsetHeight > 0
  );
}
