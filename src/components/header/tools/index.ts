import { IMenu } from "@/interface/menu";

export const saveKey: any = "header_key";

export const menuList: IMenu[] = [
  {
    name: "moo.menu.productCenter",
    path: "/product-center/global-payments",
    hash: "#header",
    menus: [
      {
        name: "moo.menu.globalPayments",
        path: "/product-center/global-payments",
        hash: "#header",
      },
      {
        name: "moo.menu.collectionAccount",
        path: "/product-center/global-collection-account",
        hash: "#header",
      },
      {
        name: "moo.menu.issuingVirtualCards",
        path: "/product-center/issuing-virtual-cards",
        hash: "#header",
      },
      {
        name: "moo.menu.paymentSolutions",
        path: "/product-center/payment-solutions",
        hash: "#header",
      },
    ],
  },
  {
    name: "moo.menu.securityCenter",
    path: "/security-center",
    hash: "#header",
  },
  {
    name: "moo.menu.aboutUs",
    path: "/about-us",
    hash: "#header",
  },
  {
    name: "moo.menu.contactUs",
    path: "/contact-us",
    hash: "#header",
  },
];
