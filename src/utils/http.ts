import axios from 'axios';
import { useAppStore } from '@/stores/app';
import { showMessage } from '@/utils/tools';
import { storeToRefs } from 'pinia';
import { useLangStore } from '@/stores/lang';
import qs from 'qs';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  transformRequest: [
    function formatData(data, headers) {
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data;
      }

      // 用于去掉纯空格
      function setNullValue(params: any, key?: any) {
        const item = key ? params[key] : params;
        if (typeof item === 'string' && key) {
          params[key] = item.trim();
        } else if (typeof item === 'object') {
          Object.keys(item).forEach((itemKey: any) => {
            const subItem = item[itemKey];
            if (typeof subItem === 'string') {
              item[itemKey] = subItem.trim();
            } else setNullValue(subItem);
          });
        }
      }

      try {
        if (data) {
          Object.keys(data).forEach((key: any) => {
            setNullValue(data, key);
          });
        }
      } catch (error: any) {
        return JSON.stringify(data);
      }
      return JSON.stringify(data);
    },
  ],
  paramsSerializer: {
    serialize: (params: any) => {
      return qs.stringify(params, { allowDots: true });
    },
  },
});

http.interceptors.response.use(
  (res) => {
    const useApp = useAppStore();
    if (res.data.status === 437) {
      // 未登录
      if (!/^\/user/.test(location.pathname)) {
        useApp.loginOut();
      } else {
        showMessage(res.data.message, 'error');
      }
      return Promise.reject({ status: 437, path: res.config.url });
    }
    // 下载
    if (res.config.responseType === 'blob') {
      return res;
    }
    if (res.data.status !== 200) {
      showMessage(res.data.message, 'error');
      return Promise.reject(res.data);
    }
    useApp.loginTime = new Date().getTime();
    return res.data.data;
  },
  (error) => {
    // @ts-ignore
    // showMessage(i18n.global.t('moozumi.common.failed'), 'error');
    return Promise.reject(error);
  }
);

/**
 *  国际化增加请求头参数 Lang
 */
http.interceptors.request.use(
  (config) => {
    const { lang } = storeToRefs(useLangStore());
    config.headers['Lang'] = lang.value; // 请求头带上国际化标识
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
