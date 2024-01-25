import { message } from 'ant-design-vue';
import { h } from 'vue';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { i18n } from '@/main';

const createElementVNode = (content: any, duration: number) => {
  const innerText = h(
    'span',
    { style: { color: 'rgba(0, 0, 0, 0.85)', fontSize: '14px' } },
    content
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
 *
 * @param content 内容
 * @param type success|info|error|warning
 * @param duration
 */
export function showMessage(
  content: any,
  type: string = 'success',
  duration = 2.5
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

export function getEnumLabelByValue(
  menus: any[],
  value: any,
  valueKey: any = '',
  labelName: string = ''
) {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    let itemValue = '';
    if (valueKey) {
      itemValue = item[valueKey];
    } else {
      itemValue = item.value;
    }
    if (itemValue === value) {
      if (labelName) {
        return item[labelName];
      } else {
        return item.label;
      }
    }
  }
}

export function showError(content: string, type: string = 'error') {
  if (type === 'success') {
    message.error(content);
  } else if (type === 'warning') {
    message.warning(content);
  } else if (type === 'error') {
    message.error(content);
  } else {
    message.info(content);
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

// 初始化options数据
export function initOptions(
  list: any[],
  label: string|Function,
  value: string,
  disabled: string = '',
  enable: string = ''
) {
  const options = [];
  for (let i = 0; i < list.length; i++) {
    options.push({
      label: typeof label === 'string' ? list[i][label] : label(list[i]),
      value: list[i][value],
      disabled: disabled
        ? list[i][disabled]
        : enable
          ? !list[i][enable]
          : false,
    });
  }
  return options;
}


// 获取url文件名
export function getFileNameForURL(url: any) {
  try {
    const urlArr = url.quotationUrl.split('?');
    const k = urlArr[0];
    const names = k.split('/');
    return names[names.length - 1];
  } catch {
    return 'file';
  }
}

// 提取标签内的文本内容
export function getTagContentText(str: any) {
  try {
    const parser = new DOMParser();
    const content = parser.parseFromString(str, 'text/html');
    return content.body.innerText.trim();
  } catch {
    return '';
  }

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
  showMessage(i18n.global.t('moozumi.salesperson.copySuccessfully'));
};
