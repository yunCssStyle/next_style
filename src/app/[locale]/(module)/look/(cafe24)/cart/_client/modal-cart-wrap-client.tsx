'use client'

import Button from '@/components/button/button'
import IconCart from '@/components/icons/icon-cart'
import IconCloseXThin from '@/components/icons/icon-close-x-thin'
import SelectBox from '@/components/select/select-box'
import { defaultImage } from '@/constants/constant'
import { vendorUserEventStorage } from '@/lib/vendor-user-event'
import { useScopedI18n } from '@/locales/client'
import '@/styles/lookBasket.scss'
import { CartEvent, OptionSelect, ProductOption, ShopStyleRecommendationRes } from '@/types/product'
import { findCartProduct, setOptionsToCommonCodeDto } from '@/utils/cafe24-utils'
import { addComma } from '@/utils/string-format'
import { useEffect, useState } from 'react'

interface ModalCartWrapClientProps {
  stylesItem: ShopStyleRecommendationRes
  cartEvent: (cartEvent) => void
  closeCart: () => void
}
export default function ModalCartWrapClient({ stylesItem, cartEvent, closeCart }: ModalCartWrapClientProps) {
  // data
  const styleLook = useScopedI18n('style-look') // 언어
  const [isLoaded, setIsLoaded] = useState(false) // 로딩
  const [selectedOptions, setSelectedOptions] = useState<OptionSelect[]>([]) // 선택된 옵션들...

  // function
  const handleOptionChange = (index: number, selectData: string, option: ProductOption) => {
    const newSelectedOptions: OptionSelect[] = [...selectedOptions]
    newSelectedOptions[index] = { name: selectData, option }
    setSelectedOptions(newSelectedOptions)
  }
  const getOptionValue = (index: number) => {
    try {
      return selectedOptions[index]?.name
    } catch (error) {
      return ''
    }
  }
  // cafe24 옵션에 선택된 것이 있나 확인
  const checkRequired = (): boolean => {
    return selectedOptions.filter((it) => it.option.required_option === 'T' && it.name === '').length > 0
  }
  const addCart = () => {
    if (!checkRequired()) {
      const value = findCartProduct(stylesItem.productVendor, selectedOptions)
      const beforeVendorUserEvent = vendorUserEventStorage()
      if (value) {
        const cartData: CartEvent = {
          clientId: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID ?? '',
          product_id: stylesItem.id,
          variants: stylesItem.productVendor.variants,
          productList: value.map((cartProduct) => ({
            product_no: stylesItem.code ?? '',
            variant_code: cartProduct.variant_code,
            options: cartProduct.options,
            option_value: stylesItem.productVendor.variants
              .find((it) => it.variant_code === cartProduct.variant_code)
              ?.options?.map((option) => option.value)
              .join(', '),
            name: stylesItem.productVendor.product_name,
            price: stylesItem.productVendor.price,
            imageUrl: stylesItem.productVendor.detail_image,
            quantity: 1,
            variant: cartProduct.variant,
          })),
        }
        if (beforeVendorUserEvent !== null) {
          cartData.correlationId = beforeVendorUserEvent.correlationId
        }
        cartEvent(cartData)
        // postMessageWeb('callCartEvent', JSON.stringify(cartData))
      }
    }
  }
  // 상품 정보 랜더링
  const showProdInfo = () => {
    // 메인 이미지
    const imagePath = stylesItem.productVendor.detail_image ?? stylesItem.mainImageUrl ?? defaultImage
    // 상품 명
    const productName = stylesItem.productVendor.product_name ?? stylesItem.name ?? ''
    const productPrice = Number(stylesItem.productVendor.price) ?? 0
    return (
      <>
        <img src={imagePath} className="thumImg" alt="detail Img" />
        <p className="prodTitle">{productName}</p>
        {/* price */}
        {productPrice > 0 && (
          <p className="prodPrice">
            ₩
            {addComma({
              price: productPrice,
              currency: '',
            })}
          </p>
        )}
      </>
    )
  }
  // 상품 옵션 랜더링
  const showProdOPtions = () => {
    return (
      stylesItem.productVendor &&
      stylesItem.productVendor.options.has_option === 'T' &&
      stylesItem.productVendor.options.options.length > 0 && (
        <div className="optionsWrap">
          {stylesItem.productVendor.options.options.map((option, index) => (
            <div className="option" key={option.option_name}>
              <span className={option.required_option === 'T' ? 'required' : 'non_required'}>
                {option.required_option === 'T' ? styleLook('cart.required') : styleLook('cart.non-required')}
              </span>
              <div className="selectWrap">
                <SelectBox
                  theme="basket"
                  width="100%"
                  defaultString={option.option_name}
                  datas={setOptionsToCommonCodeDto(
                    option,
                    stylesItem.productVendor.variants,
                    stylesItem.productVendor.options.option_type,
                  )}
                  onClickOptionValue={(selectData: string) => handleOptionChange(index, selectData, option)}
                  labelColor={getOptionValue(index) !== '' ? '#1A181B' : '#B3AFB6'}
                  selectedValue={selectedOptions[index]?.name}
                  fontSize="0.875rem"
                  top="unset"
                  bottom="32px"
                  showArrow
                />
              </div>
            </div>
          ))}
        </div>
      )
    )
  }
  // useEffect
  useEffect(() => {
    setIsLoaded(false)
    const newSelectedOptions: OptionSelect[] = []
    stylesItem.productVendor.options.options.forEach((item) => {
      newSelectedOptions.push({
        name: item.option_code,
        option: item,
      })
    })
    setSelectedOptions(newSelectedOptions)
    setIsLoaded(true)
  }, [stylesItem])

  return (
    <div className="cartModalWrap">
      <div className="cartHeader">
        <span className="cartTitle">{styleLook('cart.select-option')}</span>
        <div
          className="cartClose"
          onClick={() => closeCart()}
          role="button"
          aria-label="Close Cart Modal"
          tabIndex={0}
          aria-hidden="true"
        >
          <IconCloseXThin width={24} height={24} stroke="#1A181B" />
        </div>
      </div>
      <div className="itemContainer">
        <div>
          {showProdInfo()}
          {isLoaded && showProdOPtions()}
          <Button
            theme={checkRequired() ? 'lookDisabled' : 'primary'}
            size="mediumMax"
            onClick={() => addCart()}
            disabled={checkRequired() && !isLoaded}
          >
            <div className="cartButton">
              <div className="cartIcon">
                <IconCart />
              </div>
              <p>{styleLook('cart.add-cart')}</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
