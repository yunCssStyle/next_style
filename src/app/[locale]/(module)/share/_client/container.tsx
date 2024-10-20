'use client'

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */

import StyleLookCard from '@/components/card/style-look-card'
import { colorBlack } from '@/constants/theme'
import { LookContext } from '@/contexts/look-context'
import {
  eventAtcClick,
  eventAtcOpnClick,
  eventSharePageExpos,
  eventShareShopClick,
  vendorUserEventStorage,
} from '@/lib/vendor-user-event'
import { useCurrentLocale, useScopedI18n } from '@/locales/client'
import {
  SharedStyleDto,
  StyleRecommendResDto,
  UserEventDtoInterfaceType,
  UserEventDtoShareType,
} from '@/services/generated/lookstore.schemas'
import '@/styles/lookBasket.scss'
import '@/styles/lookShare.scss'
import { CartEvent, ShopStyleRecommendationRes } from '@/types/product'
import { translateKeyword, translateSeasonSpan } from '@/utils/utils'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner'
import ModalCartWrapClient from '../../look/(cafe24)/cart/_client/modal-cart-wrap-client'
import LookLogo from '../../look/(cafe24)/detail/_client/look-logo'
import ShareBannersClient from './banners'
import ShareCartListClient from './cartList'
import ShareStyle from './share'
import { getTotalQuantity, setAddCart, setShareCartUri } from './store'

export default function ShareStyleClient({ uri, styleItem }: { uri: string; styleItem: SharedStyleDto }) {
  const share = useScopedI18n('share')
  const locale = useCurrentLocale()
  const lookContext = useContext(LookContext)
  const [cafe24Item, setCafe24Item] = useState<ShopStyleRecommendationRes | null>(null)
  const [isShareCart, setIsShareCart] = useState<boolean>(false)
  const [isCarts, setIsCarts] = useState<boolean>(false)
  const [kakaoInitialized, setKakaoInitialized] = useState(false)
  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [isVisible, setIsVisible] = useState('')
  const params = useSearchParams()
  const shareType = params.get('shareType')
  const shareCart = (item, index) => {
    setIsShareCart(true)
    setCafe24Item(item)
    eventAtcOpnClick({
      ip: lookContext.ip,
      id: item.product_id,
      price: Number(item.productVendor.price),
      index: index,
      type: UserEventDtoInterfaceType.SHARED_STYLE,
      uri,
    })
  }
  const cartEvent = (event: CartEvent) => {
    if (event.productList.length === 0) {
      handleShowTost(share('err.cart'))
    } else {
      handleShowTost(share('succ.cart'))
      setAddCart(event.productList)
      const beforeVendorUserEvent = vendorUserEventStorage()

      const productsObj = styleItem.style.products
      const postId = productsObj
        ?.filter((item) => item.code !== undefined && event.productList[0].product_no === item.code)
        .map((item) => item.id)[0]
      eventAtcClick({
        ip: lookContext.ip,
        id: postId ?? 0,
        price: Number(event.productList[0].price),
        type: UserEventDtoInterfaceType.SHARED_STYLE,
        index: beforeVendorUserEvent?.displayIndex ?? 0,
        quantity: event.productList[0].quantity ?? 1,
        options: event.productList[0].option_value,
        uri,
      })
    }
    setIsShareCart(false)
    setCafe24Item(null)
  }
  //  토스트 메시지  보이기
  const handleShowTost = (text) => {
    setIsVisible(text)
    setTimeout(() => {
      setIsVisible('')
    }, 2000)
  }

  useEffect(() => {
    setShareCartUri(styleItem.uri)
  }, [styleItem])

  useEffect(() => {
    eventSharePageExpos({
      ip: lookContext.ip,
      shareType: shareType === 'kakao' ? UserEventDtoShareType.KAKAO : UserEventDtoShareType.DIRECT,
      productId: styleItem.productId ?? 0,
      uri,
    })
    setShareCartUri(styleItem.uri)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleItem])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY)
        setKakaoInitialized(true)
      }
    }
  }, [])

  useEffect(() => {
    let lastHeight = window.innerHeight
    const handleResize = () => {
      lastHeight = window.innerHeight
      setInnerHeight(lastHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    innerHeight > 0 && (
      <>
        <div className="share_wrap" style={{ height: `${innerHeight}px` }}>
          <ShareBannersClient />
          <div className="share_style">
            <div className="share_style_wrap">
              <div className="wrap">
                <LookLogo />
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: `${share('title', { value: translateKeyword(styleItem.style.styleKeywords ?? '', locale) })} 👗?`,
                  }}
                />
                <div
                  className="season"
                  dangerouslySetInnerHTML={{
                    __html: `${share('season', { value: translateSeasonSpan(styleItem.style.seasonTypes, locale) })}`,
                  }}
                />
                <div className="main_img">
                  <img src={styleItem.style.imageUrl} alt="" />
                </div>
                <div className="items">
                  <ul>
                    {styleItem.attributes?.styleItem.products
                      ?.filter((product) => product.productVendor)
                      ?.map((product, index) => (
                        <li key={product.id} className="item">
                          <StyleLookCard
                            item={product}
                            type={UserEventDtoInterfaceType.SHARED_STYLE}
                            index={index}
                            shareCart={() => shareCart(product, index)}
                            isLink={false}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`overlay_tost ${isVisible !== '' ? 'open' : ''}`}>
              <div className="layer">{isVisible}</div>
            </div>
            {kakaoInitialized && (
              <div className="share_buttons">
                <ShareStyle
                  index={0}
                  styleItem={styleItem.attributes?.styleItem as StyleRecommendResDto}
                  productId={styleItem.productId ?? null}
                  shareValue={uri}
                  image={styleItem.style.imageUrl}
                  isClipboard
                  handleShowTost={handleShowTost}
                  uriCode={uri}
                />
                <div className="share_btn">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setIsCarts(true)}
                    onKeyDown={() => setIsCarts(true)}
                    className={`cartButton ${getTotalQuantity() > 0 && 'inactive'}`}
                  >
                    {share('cart')}({getTotalQuantity()})
                  </div>
                  <a
                    target="parent"
                    href={styleItem.detailSiteUrl}
                    onClick={() =>
                      eventShareShopClick({
                        ip: lookContext.ip,
                        shareType: shareType === 'kakao' ? UserEventDtoShareType.KAKAO : UserEventDtoShareType.DIRECT,
                        productId: styleItem.productId ?? 0,
                        uri,
                      })
                    }
                  >
                    {share('shopping')}
                  </a>
                </div>
              </div>
            )}
            <ShareCartListClient
              isCarts={isCarts}
              setIsCarts={setIsCarts}
              detailSiteUrl={styleItem.detailSiteUrl ?? ''}
              uri={uri}
              styleItem={styleItem}
            />
          </div>
        </div>
        {isShareCart && (
          <>
            <div className="cartModalContainerBg" />
            <div className="cartModalContainer">
              {cafe24Item === null ? (
                <div className="loading">
                  <LineWave visible height="100" width="100" color={colorBlack} />
                </div>
              ) : (
                <ModalCartWrapClient
                  stylesItem={cafe24Item}
                  cartEvent={cartEvent}
                  closeCart={() => {
                    setIsShareCart(false)
                    setCafe24Item(null)
                  }}
                />
              )}
            </div>
          </>
        )}
      </>
    )
  )
}
