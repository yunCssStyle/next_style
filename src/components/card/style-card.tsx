import { defaultImage } from '@/constants/constant'
import { LookContext } from '@/contexts/look-context'
import { eventAtcClick, eventProductClick, vendorUserEventStorage } from '@/lib/vendor-user-event'
import { useScopedI18n } from '@/locales/client'
import { UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import ICON from '@/svg'
import postMessageWeb from '@/utils/iframe-utils'
import { addComma } from '@/utils/string-format'
import { useContext, useEffect, useState } from 'react'

interface StyleCardProps {
  item: any
  index: number
  type: UserEventDtoInterfaceType
}

export default function StyleCard({ item, type, index }: StyleCardProps) {
  const lookContext = useContext(LookContext)
  const styleLook = useScopedI18n('common')
  const [loader, setLoader] = useState(false)

  const product = item.productVendor
  const hasProduct = product !== undefined
  const imageUrl = hasProduct ? product.images?.edges[0].node.src : item.mainImageUrl ?? defaultImage
  const detailUrl = item.productOption?.detailSiteUrl ?? ''

  const brand = hasProduct ? product.vendor : item.productOption?.brand || ''
  const name = hasProduct ? product.title : item.name
  const priceData =
    hasProduct && product.variants?.edges?.length
      ? {
          price: product.variants?.edges[0]?.node.price.amount,
          compareAtPrice: product.variants.edges[0].node.compareAtPrice,
        }
      : {
          price: item.productOption?.priceDiscount || item.productOption?.price,
          compareAtPrice: item.productOption?.price ?? 0,
        }

  const isVariants = hasProduct ? product.variants.edges?.length > 1 : false
  const isAllUnavailable =
    hasProduct && product.variants?.edges?.length
      ? product.variants.edges.every((edge) => {
          return edge.node.quantityAvailable === 0
        })
      : false
  const optionClick = (option) => {
    const variantId = option.id.replace('gid://shopify/ProductVariant/', '')
    const productId = product.id.replace('gid://shopify/Product/', '')
    const beforeVendorUserEvent = vendorUserEventStorage()
    const cartData = {
      clientId: '',
      correlationId: beforeVendorUserEvent?.correlationId,
      product_id: item.id,
      productList: [
        {
          product_no: productId,
          variant_code: variantId,
        },
      ],
    }
    postMessageWeb('callCartEvent', JSON.stringify(cartData))
    setLoader(true)
    eventAtcClick({
      ip: lookContext.ip,
      id: item?.id ?? 0,
      price: Number(option.price.amount),
      type,
      quantity: 1,
      options: {
        product_no: productId,
        variant_code: variantId,
        value: option.title,
      },
      index: index + 1,
    })
  }

  useEffect(() => {
    const handleMessage = (ev: MessageEvent<{ type: string; data: string; from: string }>) => {
      if (!ev.data.type || !ev.data.from || typeof ev.data !== 'object') return
      if (ev.data.from === 'styleLookWebUser' && ev.data.type === 'cartActionResult') {
        console.log(`result: ${ev.data.data}`)
        setLoader(false)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('touchstart', function () {}, true)
    return () => {
      document.removeEventListener('touchstart', function () {}, true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('touchstart', function () {}, true)
    return () => {
      document.removeEventListener('touchstart', function () {}, true)
    }
  }, [])

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
          {/* <Image src={imageUrl} width={180} height={180} alt="Product thum" /> */}
          <div className={`productImg ${hasProduct ? '' : 'nullProduct'}`}>
            <img src={imageUrl} width={180} height={180} alt="Product thum" />
          </div>
          {hasProduct && product.variants?.edges?.length && product.images.edges[1] && (
            <img
              className="hoverImage"
              src={product.images.edges[1].node.src}
              width={180}
              height={180}
              alt="Product thum"
            />
          )}
        </div>
        {hasProduct && !isAllUnavailable && (
          <div
            className={`quick_buy ${isVariants && 'opt'}`}
            onClick={() => {
              if (product.variants.edges.length == 1) {
                optionClick(product.variants.edges[0].node)
              }
            }}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <ICON.OlivelaQuickbuy />
            {isVariants && (
              <div className="option">
                <ul>
                  {product.variants.edges.map(
                    (option: any, index: number) =>
                      option.node.quantityAvailable !== 0 && (
                        <li key={index} onClick={() => optionClick(option.node)}>
                          {option.node.selectedOptions[0].value}
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}
            {loader && (
              <div className="loading">
                <div className="loader" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="info">
        <a
          className="infoa"
          target="parent"
          href={detailUrl}
          onClick={(event) => {
            if (!detailUrl) event.preventDefault()
            eventProductClick({
              ip: lookContext.ip,
              id: item.productOption?.id ?? 0,
              index: index,
              type,
              code: item.code,
            })
          }}
        >
          <p className="text_brand">{brand}</p>
          <p className="text_prod_name">{name} </p>
          {priceData && (
            <p className="text_price">
              {priceData.price != null &&
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
          )}
        </a>
      </div>
    </div>
  )
}
