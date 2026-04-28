import { IMenu } from '@/interface/menu';

const SAVE_KEY: any = 'header_key';

export const jumpToPage = (router: any, item: any) => {
  router.push(item.path);
  saveHeaderKeyValue(item);
};

// 存储的上次点击的菜单
export const saveHeaderKeyValue = (item: any) => {
  window.localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      currentKey: item.currentKey,
      openKeys: item.openKeys,
    }),
  );
};

// 获取缓存中存储的上次点击的菜单
export const geHeaderKeyValue = (key?: string) => {
  try {
    const keysJson = JSON.parse(window.localStorage.getItem(SAVE_KEY) as string);
    if (key) {
      return keysJson[key];
    }
    return keysJson;
  } catch (error: any) {
    const defaultJson: any = { currentKey: '', openKeys: [] };
    return key ? defaultJson[key] : defaultJson;
  }
};

export const menuList: IMenu[] = [
  {
    name: 'moo.menu.productCenter',
    currentKey: 'moo.menu.productCenter',
    path: '/product-center/global-payments',
    hash: '#header',
    menus: [
      {
        name: 'moo.menu.globalPayments',
        currentKey: 'moo.menu.globalPayments',
        path: '/product-center/global-payments',
        hash: '#header',
      },
      {
        name: 'moo.menu.collectionAccount',
        currentKey: 'moo.menu.collectionAccount',
        path: '/product-center/global-collection-account',
        hash: '#header',
      },
      {
        name: 'moo.menu.issuingVirtualCards',
        currentKey: 'moo.menu.issuingVirtualCards',
        path: '/product-center/issuing-virtual-cards',
        hash: '#header',
      },
      {
        name: 'moo.menu.paymentSolutions',
        currentKey: 'moo.menu.paymentSolutions',
        path: '/product-center/payment-solutions',
        hash: '#header',
      },
    ],
  },
  {
    name: 'moo.menu.securityCenter',
    currentKey: 'moo.menu.securityCenter',
    path: '/security-center',
    hash: '#header',
    menus: [
      {
        name: 'moo.menu.securityCenter',
        currentKey: 'moo.menu.securityCenterSub',
        path: '/security-center',
        hash: '#header',
      },
      {
        name: 'moo.menu.TermsAndPolicies',
        currentKey: 'moo.menu.TermsAndPolicies',
        path: '/security-center/terms-and-policies/agreement',
        hash: '#header',
      },
    ],
  },
  {
    name: 'moo.menu.aboutUs',
    currentKey: 'moo.menu.aboutUs',
    path: '/about-us',
    hash: '#header',
  },
  {
    name: 'moo.menu.contactUs',
    currentKey: 'moo.menu.contactUs',
    path: '/contact-us',
    hash: '#header',
  },
  {
    name: 'moo.menu.blogBanner',
    currentKey: 'moo.menu.blogBanner',
    path: '/blog',
    hash: '#header',
  },
];
