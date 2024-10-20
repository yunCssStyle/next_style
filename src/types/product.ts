import { ProductResDto, ProductStyleRecommendDto } from '@/services/generated/lookstore.schemas'

interface ProductDTO extends ProductResDto {
  checked?: boolean
}
export default ProductDTO

export interface ShopStyleRecommendationRes extends ProductStyleRecommendDto {
  productVendor: ProductCafe24
}
// cafe24 선택된 variant_code 와 option 타입
export interface CartOption {
  option_code: string
  value_no: string
}
// cafe24 선택된 variant_code 와 장바구니 타입
export interface CartProduct {
  product_no: string
  variant_code?: string
  options?: CartOption[]
  option_name?: string
  option_value?: string
  additional_amount?: number
  name?: string
  imageUrl?: string
  price?: string
  quantity?: number
  variant?: Variant[]
}
export interface CartEvent {
  clientId: string
  correlationId?: string
  productList: CartProduct[]
  product_id?: number
  variants?: Variant[]
}
// 옵션 셀렉트 박스에 들어갈 옵션들을 CommonCodeDto로 변환된 타입
export interface OptionSelect {
  name: string
  option: ProductOption
}
// cafe24 가져온 상품 정보 타입 들
export type ProductCafe24 = {
  product_no: number
  product_code: string
  product_name: string
  price: string
  retail_price: string
  detail_image: string
  list_image: string
  tiny_image: string
  small_image: string
  options: ProductOptions
  variants: Variant[]
}
export type ProductOptions = {
  has_option: 'T' | 'F'
  option_type: 'T' | 'F' | 'E' // T : 조합형 E : 연동형 F : 독립형
  option_list_type: 'S' | 'R'
  options: ProductOption[]
  select_one_by_option: 'T' | 'F'
  use_additional_option: 'T' | 'F'
  additional_options: any[]
  use_attached_file_option: 'T' | 'F'
  attached_file_option: any | null
}
export type OptionValue = {
  option_text: string
  value_no: number | null
  additional_amount: number | null
}
export type VariantOption = {
  name: string
  value: string
}

export type Variant = {
  shop_no: number
  variant_code: string
  options: VariantOption[]
  display: 'T' | 'F'
  selling: 'T' | 'F'
  additional_amount: string
  quantity: number
  safety_inventory: number
  image: string
}

export type ProductOption = {
  option_code: string
  option_name: string
  required_option: 'T' | 'F'
  option_display_type: 'S' | 'R'
  option_value: OptionValue[]
}
