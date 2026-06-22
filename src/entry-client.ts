import './style.css';
import { createApp } from './main';


// Read SSR data from <script id="ssr-data"> injected by server
function getSSRData() {
  try {
    const el = document.getElementById('ssr-data');
    if (el && el.textContent) { return JSON.parse(el.textContent); }
  } catch (e) { console.warn('SSR data parse failed:', e); }
  return {};
}

// 创建并挂载应用
const { app, router } = createApp();

// 等待路由准备就绪，确保客户端路由与服务端路由匹配
router.isReady().then(() => {
  const ssrData = getSSRData();
  app.provide('ssrData', ssrData);
  app.provide('isSSR', !!ssrData.post || !!ssrData.categories);
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
