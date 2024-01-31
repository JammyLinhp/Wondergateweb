export interface IMenu {
  name?: string,
  path?: string,
  hash?: string,
  onClick?: Function,
  menus?: IMenu[]
}
