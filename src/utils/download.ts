import { useAppStore } from '@/stores/app';
import http from '@/utils/http';
import { storeToRefs } from 'pinia';
import { i18n } from '@/main';
import { showMessage } from './tools';

export const downloadFileTask = (
  url: string,
  params: any,
  isGet = true,
) => {
  return new Promise((resolve, reject) => {
    const { spinning } = storeToRefs(useAppStore());
    spinning.value = true;
    const httpResults = isGet ?
      http.get(url, { params }) :
      http.post(url, params);
    httpResults.then((res) => {
      spinning.value = false;
      // @ts-ignore
      showMessage(i18n.global.t('moozumi.common.downloadTaskSuccessTip'));
      resolve(res);
    })
      .catch((error) => {
        spinning.value = false;
        reject(error);
      });
  });
};

export const downloadFile = (
  url: string,
  params: any,
  isGet = true,
  headers?: any,
) => {
  return new Promise((resolve, reject) => {
    const { spinning } = storeToRefs(useAppStore());
    spinning.value = true;
    const httpResults = isGet ?
      http.get(url, { params, responseType: 'blob' }) :
      http.post(url, params, { responseType: 'blob', ...headers });
    httpResults.then((res: any) => {
      spinning.value = false;
      try {
        createDownloadFile(res);
        // @ts-ignore 下载成功
        showMessage(i18n.global.t('moozumi.common.downloadSuccessfullyTip'));
      } catch {
        // @ts-ignore 下载失败
        showMessage(i18n.global.t('moozumi.common.downloadFailedTip'), 'error');
      }
      resolve(res.data);
    })
      .catch((error: any) => {
        spinning.value = false;
        showMessage(i18n.global.t('moozumi.common.downloadFailedTip'), 'error');
        reject(error);
      });
  });
};

const createDownloadFile = (res: any) => {
  const fileName = res.headers['content-disposition'].match(/filename=(.*)/)[1];
  // 将二进制流转为blob
  const blob = new Blob([res.data], { type: 'application/octet-stream' });
  if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    (window.navigator as any).msSaveBlob(blob, decodeURI(fileName));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', decodeURI(fileName));
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }
};
