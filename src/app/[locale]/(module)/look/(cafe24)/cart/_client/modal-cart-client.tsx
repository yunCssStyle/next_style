'use client'

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-boolean-value */

import { colorBlack } from '@/constants/theme'
import { LookContext } from '@/contexts/look-context'
import { eventAtcClick, vendorUserEventStorage } from '@/lib/vendor-user-event'
import { StyleRecommendResDto } from '@/services/generated/lookstore.schemas'
import '@/styles/lookBasket.scss'
import { ShopStyleRecommendationRes } from '@/types/product'
import postMessageWeb from '@/utils/iframe-utils'
import { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useDetailContainerStore } from '../../detail/_client/store'
import ModalCartWrapClient from './modal-cart-wrap-client'

export default function ModalCartClient({ id }: { id: string }) {
  const lookContext = useContext(LookContext)
  // data
  const detailStore = useDetailContainerStore((state) => state.updateItem)
  const [selectFitting, setSelectFitting] = useState<StyleRecommendResDto[]>([])
  const [cafe24Item, setCafe24Item] = useState<ShopStyleRecommendationRes | null>(null)
  useEffect(() => {
    if (detailStore && detailStore.styles) {
      setSelectFitting(detailStore.styles)
    }
  }, [detailStore])
  useEffect(() => {
    if (selectFitting) {
      const cafe24Items =
        selectFitting.flatMap(
          (fitting) => fitting?.products?.filter((it) => it.code === id) as ShopStyleRecommendationRes[],
        ) ?? []
      if (cafe24Items.length > 0) {
        setCafe24Item(cafe24Items[0])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFitting])

  const cartEvent = (cartEvent) => {
    const beforeVendorUserEvent = vendorUserEventStorage()
    const variantPrice = cartEvent.productList.reduce((total, product) => {
      const variant = cartEvent.variants.find((v) => v.variant_code === product.variant_code)
      return total + (variant ? parseFloat(variant.additional_amount) : 0)
    }, 0)
    eventAtcClick({
      ip: lookContext.ip,
      id: cartEvent.product_id,
      price: Number(cartEvent.productList[0]?.price) + Number(variantPrice),
      type: beforeVendorUserEvent.interfaceType,
      index: beforeVendorUserEvent.displayIndex,
      quantity: 1,
      options: cartEvent.option_value,
    })
    postMessageWeb('callCartEvent', JSON.stringify(cartEvent))
  }
  const closeCart = () => postMessageWeb('closeCartIFrame', '')

  return (
    <div className="cartModalContainer">
      {cafe24Item === null ? (
        <div className="loading">
          <RotatingLines
            visible={true}
            width="35"
            strokeWidth="5"
            strokeColor={colorBlack}
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <ModalCartWrapClient stylesItem={cafe24Item} cartEvent={cartEvent} closeCart={closeCart} />
      )}
    </div>
  )
}
