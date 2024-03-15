import { message } from 'ant-design-vue';
import { h } from 'vue';
import { CloseCircleOutlined } from '@ant-design/icons-vue';

const createElementVNode = (content: any, duration: number) => {
  const innerText = h(
    'span',
    { style: { color: 'rgba(0, 0, 0, 0.85)', fontSize: '14px' } },
    content,
  );
  const innerIcon = h(CloseCircleOutlined, {
    style: {
      marginLeft: '10px',
      marginRight: '0px',
      position: 'relative',
      top: '0px',
      color: 'rgba(0, 0, 0, 0.45)',
      cursor: 'pointer',
      fontSize: '12px',
    },
    onclick: () => message.destroy(),
  });
  const container = h('span', {}, [
    innerText,
    duration === 0 ? innerIcon : null,
  ]);
  return container;
};

/**
 * 创建一个图片地址的数组
 */
export function createImageList(modules: any) {
  const array = [] as any;
  Object.keys(modules).forEach((key: any) => {
    array.push(modules[key].default);
  });
  return array;
}

/**
 *
 * @param content 内容
 * @param type success|info|error|warning
 * @param duration
 */
export function showMessage(
  content: any,
  type: string = 'success',
  duration = 2.5,
) {
  if (type === 'success') {
    message.success(createElementVNode(content, duration), duration);
  } else if (type === 'warning') {
    message.warning(createElementVNode(content, duration), duration);
  } else if (type === 'error') {
    message.error(createElementVNode(content, duration), duration);
  } else {
    message.info(createElementVNode(content, duration), duration);
  }
}


export function deepClone(obj: any) {
  let result: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        // 有可能等于 null
        if (obj[key] === null) {
          result[key] = null;
          continue;
        }
        result[key] = deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * @description: 复制字符串
 * @param {*} val 复制内容
 * @return {*}
 */
export const copyString = (val: any): any => {
  let input = document.createElement('input');
  input.value = val;
  input.readOnly = true;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand('Copy');
  document.body.removeChild(input);
  // window.scrollTo(0, 0);
  // @ts-ignore
  // showMessage(i18n.global.t('moo.common.copySuccessfully'));
};
