export interface ICategoryInfo {
  name: string
  images: string[]
  is_active: boolean
  show_in_ecommerce: boolean
}

export interface ICategoryInfoError {
    [key: string]: string | null | undefined
}