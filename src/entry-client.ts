import './style.css';
import { createApp } from './main';

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

// 先执行屏幕适配，确保在应用挂载前字体大小已经设置
reSize();
window.onresize = () => {
  reSize();
};

// 创建并挂载应用
const { app, router } = createApp();

// 等待路由准备就绪，确保客户端路由与服务端路由匹配
router.isReady().then(() => {
  app.mount('#app');
  
  // 隐藏加载状态，确保页面完全渲染后再显示
  setTimeout(() => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }, 300);
  
  // 触发预渲染事件
  if (import.meta.env.PROD) {
    window.dispatchEvent(new Event('prerender-ready'));
  }
});
