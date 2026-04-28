import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';

export async function render(_url: string) {
  const { app, router } = createApp();
  
  // 移除URL中的哈希部分，只使用路径部分进行路由处理
  let pathWithoutHash = _url.split('#')[0];
  
  // 处理根路径重定向，确保与路由配置一致
  if (pathWithoutHash === '/' || pathWithoutHash === '') {
    pathWithoutHash = '/home';
  }
  
  // 设置路由位置
  router.push(pathWithoutHash);
  await router.isReady();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {};

  const html = await renderToString(app, ctx);
  return { html };
}
