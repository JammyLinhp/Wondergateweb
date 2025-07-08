import { IMenu } from '@/interface/menu';

const SAVE_KEY: any = 'header_key';

export const saveHeaderKeyValue = (item: any) => {
  window.localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      currentKeys: item.name,
      openKeys: item.openKeys,
    })
  );
};

export const geHeaderKeyValue = (key?: any) => {
  try {
    const keysJson = JSON.parse(
      window.localStorage.getItem(SAVE_KEY) as string
    );
    if (key) {
      return keysJson[key];
    }
    return keysJson;
  } catch (error: any) {
    return { currentKeys: '', openKeys: [] };
  }
};

export const menuList: IMenu[] = [
  {
    name: 'moo.menu.productCenter',
    path: '/product-center/global-payments',
    hash: '#header',
    menus: [
      {
        name: 'moo.menu.globalPayments',
        path: '/product-center/global-payments',
        hash: '#header',
      },
      {
        name: 'moo.menu.collectionAccount',
        path: '/product-center/global-collection-account',
        hash: '#header',
      },
      {
        name: 'moo.menu.issuingVirtualCards',
        path: '/product-center/issuing-virtual-cards',
        hash: '#header',
      },
      {
        name: 'moo.menu.paymentSolutions',
        path: '/product-center/payment-solutions',
        hash: '#header',
      },
    ],
  },
  {
    name: 'moo.menu.securityCenter',
    path: '/security-center',
    hash: '#header',
    menus: [
      {
        name: 'moo.menu.securityCenter',
        path: '/security-center',
        hash: '#header',
      },
      {
        name: 'moo.menu.TermsAndPolicies',
        path: '/security-center/terms-and-policies/agreement',
        hash: '#header',
      }
    ]
  },
  {
    name: 'moo.menu.aboutUs',
    path: '/about-us',
    hash: '#header',
  },
  {
    name: 'moo.menu.contactUs',
    path: '/contact-us',
    hash: '#header',
  },
];
