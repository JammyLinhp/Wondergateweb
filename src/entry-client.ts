import './style.css';
import { createApp } from './main';

const { app } = createApp();

app.mount('#app');

// 触发预渲染事件
if (import.meta.env.PROD) {
  window.dispatchEvent(new Event('prerender-ready'));
}

// 适配屏幕大小
const reSize = () => {
  let baseFontSize = 8;
  const designSize = 900;
  const width = +window.innerWidth;
  if (width <= 2000 && width > 1600) {
    baseFontSize = 9;
  }
  if (width <= 1600 && width > 1350) {
    baseFontSize = 10.6;
  }
  if (width <= 1350) {
    baseFontSize = 11;
  }

  let currentFontSize = (width / designSize) * baseFontSize;
  if (width <= 770) {
    currentFontSize = 12;
  }

  document.getElementsByTagName(
    'html'
  )[0].style.fontSize = `${currentFontSize}px`;
};
reSize();
window.onresize = () => {
  reSize();
};
