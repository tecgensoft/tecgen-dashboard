export interface ICategoryInfo {
  name: string
  icon_images: string[]
  is_active: boolean
  show_in_ecommerce: boolean
}
export interface IEditValue {
  name: string;
  is_active: boolean;
  show_in_ecommerce: boolean;
  logo: string | null;  
  icon: string | null;
}
export interface ICategoryInfoError {
    [key: string]: string | null | undefined
}