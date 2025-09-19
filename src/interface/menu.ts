export interface IMenu {
  name: string; // 标题名称
  path?: string; // 地址
  hash?: string; // 锚点
  onClick?: Function; // 点击事件
  menus?: IMenu[];
  openMenuKey?: boolean; // PC 打开弹窗控制
  openKeys?: any; // 存储menu的层级
  currentKey: string; // 当前菜单唯一标识
}
