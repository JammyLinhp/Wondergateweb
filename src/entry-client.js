/*
  客户端入口
*/
import { createApp } from './main';

console.log(12345);
const { app, router } = createApp(false);

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


app.mount('#app');

router.isReady().then(() => {

});
