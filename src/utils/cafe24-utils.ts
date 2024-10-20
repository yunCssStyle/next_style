import { CommonCodeDto, SharedStyleCartDto } from '@/services/generated/lookstore.schemas'
import {
  CartEvent,
  CartOption,
  CartProduct,
  OptionSelect,
  ProductCafe24,
  ProductOption,
  ProductOptions,
  Variant,
} from '@/types/product'
import postMessageWeb from './iframe-utils'
// 옵션 셀렉트 박스에 들어갈 옵션들을 CommonCodeDto로 변환
export const setOptionsToCommonCodeDto = (
  option: ProductOption,
  variants: Variant[],
  option_type: ProductOptions['option_type'],
): CommonCodeDto[] => {
  try {
    const commonCode: CommonCodeDto[] = []
    option.option_value.forEach((value, index) => {
      if (option_type === 'E') {
        if (index === 0) {
          commonCode.push({
            code: option.option_code,
            name: option.option_name,
          })
        }
        commonCode.push({
          code: value.value_no ? JSON.stringify(value) : value.option_text,
          name: value.option_text,
        })
      } else {
        variants.forEach((variant) => {
          variant.options?.forEach((vOption) => {
            if (
              vOption.name === option.option_name &&
              vOption.value === value.option_text &&
              variant.display === 'T' &&
              variant.selling === 'T'
            ) {
              // 중복된 값이 있는지 확인
              const isDuplicate = commonCode.some((code) => code.code === value.option_text)
              if (!isDuplicate) {
                commonCode.push({
                  code: value.option_text,
                  name: value.option_text,
                })
              }
            }
          })
        })
      }
    })

    return commonCode
  } catch (error) {
    console.error('error', error)
    postMessageWeb('closeCartIFrame', '')
    return []
  }
}
const findMatchingVariantCode = (product: ProductCafe24, optionSelects: OptionSelect[]): string | null => {
  const foundVariant = product.variants.find((variant) => {
    const isMatch = optionSelects.every((optionSelect) => {
      const variantOption = variant.options.find((option) => option.name === optionSelect.option.option_name)
      return variantOption && variantOption.value === optionSelect.name
    })
    return isMatch
  })
  return foundVariant ? foundVariant.variant_code : null
}
// 선택한 옵션들로 variant_code 찾기
export const findCartProduct = (product: ProductCafe24, optionSelects: OptionSelect[]): CartProduct[] | null => {
  const cartProducts: CartProduct[] = []
  product.variants.forEach((variant) => {
    if (variant.options && variant.options.length > 0) {
      if (variant.options.length > 1) {
        const variant_code = findMatchingVariantCode(product, optionSelects)
        if (
          variant_code &&
          cartProducts.filter((cartProduct) => cartProduct.variant_code === variant_code).length === 0
        ) {
          cartProducts.push({
            product_no: product.product_no.toString(),
            variant_code: variant_code,
          })
        }
      } else {
        variant.options.forEach((option) => {
          optionSelects.forEach((optionSelect) => {
            if (optionSelect.name === option.value) {
              cartProducts.push({
                product_no: product.product_no.toString(),
                variant_code: variant.variant_code,
              })
            }
          })
        })
      }
    } else {
      const cartOptions: CartOption[] = []
      optionSelects.forEach((optionSelect) => {
        if (optionSelect.name !== '') {
          try {
            const jsonOptionSelect = JSON.parse(optionSelect.name)
            product.options.options
              .filter((option) => option.option_name === optionSelect.option.option_name)
              .forEach((optionValue) => {
                optionValue.option_value.forEach((value) => {
                  if (
                    value.option_text === jsonOptionSelect.option_text &&
                    value.value_no === jsonOptionSelect.value_no
                  ) {
                    cartOptions.push({
                      option_code: optionValue.option_code,
                      value_no: jsonOptionSelect.value_no,
                    })
                  }
                })
              })
          } catch (e) {
            const stringOptionSelect = optionSelect.name
            product.options.options
              .filter((option) => option.option_name === optionSelect.option.option_name)
              .forEach((optionValue) => {
                if (optionValue.option_code === stringOptionSelect) {
                  cartOptions.push({
                    option_code: stringOptionSelect,
                    value_no: '',
                  })
                }
              })
          }
        }
      })
      cartProducts.push({
        product_no: product.product_no.toString(),
        variant_code: variant.variant_code,
        options: cartOptions.length > 0 ? cartOptions : undefined,
      })
    }
  })
  return cartProducts
}
export const transformAddToCart = (json: SharedStyleCartDto): string => {
  const cartDto: CartProduct[] = json.attributes.carts as CartProduct[]
  const cartEvent: CartEvent = {
    clientId: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID ?? '',
    productList: cartDto,
  }
  return JSON.stringify(cartEvent)
}
