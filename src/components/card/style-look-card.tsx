'use client'

/* eslint-disable @next/next/no-img-element */

import { defaultImage } from '@/constants/constant'
import { LookContext } from '@/contexts/look-context'
import { eventAtcClick, eventAtcOpnClick, eventProductClick, vendorUserEventStorage } from '@/lib/vendor-user-event'
import { useCurrentLocale, useScopedI18n } from '@/locales/client'
import { UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import ICON from '@/svg'
import { CartEvent } from '@/types/product'
import postMessageWeb from '@/utils/iframe-utils'
import { addComma } from '@/utils/string-format'
import { useContext } from 'react'

interface StyleCardProps {
  item: any
  index: number
  type: UserEventDtoInterfaceType
  shareCart?: (item) => void
  isLink?: boolean
}

export default function StyleLookCard({ item, type, index, shareCart, isLink = true }: StyleCardProps) {
  const lookContext = useContext(LookContext)
  const styleLook = useScopedI18n('common')
  const styleLookTx = useScopedI18n('style-look')
  const locale = useCurrentLocale()
  const product = item.productVendor
  const hasProduct = product !== undefined
  const imageUrl = hasProduct ? product.detail_image : item.mainImageUrl ?? defaultImage
  let detailUrl = ''
  if (isLink) {
    if (hasProduct) {
      detailUrl = product?.sold_out === 'T' ? '' : item.productOption?.detailSiteUrl ?? ''
    }
  }
  const brand = hasProduct ? product.vendor : null
  const name = hasProduct ? product.product_name : item.name
  const category = item.categoryLabels?.find((label) => label.locale === locale)?.translation ?? ''

  const priceData = hasProduct
    ? {
        price: product.price,
        compareAtPrice: product.retail_price,
      }
    : {
        price: item.productOption?.priceDiscount || item.productOption?.price,
        compareAtPrice: item.productOption?.price ?? 0,
      }
  const optionClick = () => {
    const beforeVendorUserEvent = vendorUserEventStorage()
    if (product.sold_out === 'F') {
      if (product.options.has_option === 'T') {
        postMessageWeb('cartIFrame', product.product_no ?? '')
        eventAtcOpnClick({
          ip: lookContext.ip,
          id: item.productOption?.id ?? 0,
          price: Number(priceData.price),
          index,
          type,
        })
      } else {
        if (product.variants.length > 0) {
          const cartData: CartEvent = {
            clientId: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID ?? '',
            correlationId: beforeVendorUserEvent.correlationId,
            productList: [
              {
                quantity: 1,
                product_no: product.product_no,
                variant_code: product.variants[0].variant_code,
              },
            ],
          }
          postMessageWeb('callCartEvent', JSON.stringify(cartData))
          eventAtcClick({
            ip: lookContext.ip,
            id: item?.id ?? 0,
            price: Number(priceData.price),
            type,
            index: index + 1,
            quantity: 1,
            options: { variant_code: product.variants[0].variant_code },
          })
        }
      }
    }
  }
  return (
    <div className="itemCard">
      <div className="img">
        <div
          className="imga"
          onClick={(event) => {
            if (!detailUrl) event.preventDefault()
            window.open(detailUrl, '_blank')
            eventProductClick({
              ip: lookContext.ip,
              id: item.id ?? 0,
              index,
              type,
            })
          }}
          onKeyDown={() => {}}
          role="button"
          style={{ cursor: 'pointer' }}
          tabIndex={0}
        >
          <span>{category}</span>
          {/* <Image src={imageUrl} width={180} height={180} alt="Product thum" /> */}
          <div className={hasProduct ? '' : 'nullProduct'}>
            <img src={imageUrl} width={180} height={180} alt="Product thum" />
          </div>
        </div>
      </div>
      <div className="info">
        <div
          onClick={(event) => {
            if (!detailUrl) event.preventDefault()
            window.open(detailUrl, '_blank')
            eventProductClick({
              ip: lookContext.ip,
              id: item.id ?? 0,
              index,
              type,
            })
          }}
          style={{ cursor: 'pointer' }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          {brand !== null && brand !== undefined && <p className="text_brand">{brand}</p>}
          <p className="text_prod_name">{name} </p>
          <p className="text_price">
            {priceData.price !== null &&
              priceData.price !== 0 &&
              addComma({
                price: Number(priceData.price),
                currency: styleLook('money'),
              })}
            {priceData.compareAtPrice != null && priceData.compareAtPrice !== 0 && (
              <span>
                {addComma({
                  price: Number(priceData.compareAtPrice),
                  currency: styleLook('money'),
                })}
              </span>
            )}
          </p>
        </div>
      </div>
      {hasProduct ? (
        <div
          className={`cart ${product?.sold_out === 'T' && 'sold_out'}`}
          onClick={() => (shareCart ? shareCart(item) : optionClick())}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          aria-label="add to cart"
        >
          <ICON.ShoppingCart />
          {product?.sold_out === 'T' ? (
            styleLookTx('cart.sold-out')
          ) : (
            <>
              <span className="web">{styleLookTx('cart.add-cart')}</span>
              <span className="mobile">{styleLookTx('cart.add')}</span>
            </>
          )}
        </div>
      ) : (
        <div className="cart sold_out">
          <ICON.ShoppingCart />
          {styleLookTx('cart.sold-out')}
        </div>
      )}
    </div>
  )
}
