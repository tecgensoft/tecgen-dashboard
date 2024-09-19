export interface IMenuItemType {
  icon?: JSX.Element
  title: string
  items?: IMenuItemType[]
  to?: string
}