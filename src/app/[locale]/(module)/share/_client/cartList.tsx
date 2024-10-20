'use client'

/* eslint-disable @next/next/no-img-element */

import CheckBox from '@/components/input/checkbox'
import { LookContext } from '@/contexts/look-context'
import { eventShareButClick } from '@/lib/vendor-user-event'
import { useScopedI18n } from '@/locales/client'
import {
  SharedStyleCartCreate,
  SharedStyleCartDto,
  SharedStyleDto,
  UserEventDtoShareType,
} from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import ICON from '@/svg'
import { addComma } from '@/utils/string-format'
import { useSearchParams } from 'next/navigation'
import { useContext, useState } from 'react'
import {
  getTotalPostIds,
  getTotalPrice,
  getTotalQuantity,
  setCartQuantityAdd,
  setCartQuantityMinus,
  setRemoveCart,
  useShareCartStore,
} from './store'

export default function ShareCartListClient({
  isCarts,
  setIsCarts,
  detailSiteUrl,
  uri,
  styleItem,
}: {
  isCarts: boolean
  setIsCarts: (isCarts: boolean) => void
  detailSiteUrl: string
  uri: string
  styleItem: SharedStyleDto
}) {
  const share = useScopedI18n('share')
  const lookContext = useContext(LookContext)
  const styleLook = useScopedI18n('common')
  const carts = useShareCartStore((state) => state.carts)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const params = useSearchParams()
  const shareType = params.get('shareType')
  // 전체선택
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allItemCodes = carts.map((cart) => cart.variant_code).filter((code): code is string => !!code)
      setSelectedItems(allItemCodes)
    } else {
      setSelectedItems([])
    }
  }
  // 개별선택
  const handleCheckboxChange = (productCode: string) => {
    if (selectedItems.includes(productCode)) {
      setSelectedItems(selectedItems.filter((code) => code !== productCode))
    } else {
      setSelectedItems([...selectedItems, productCode])
    }
  }
  // 선택삭제
  const handleRemoveCart = () => {
    setRemoveCart(selectedItems)
    setSelectedItems([])
  }
  // 구매하기
  const orderCartItem = async () => {
    if (carts.length > 0) {
      try {
        const newWindow = window.open('about:blank', '_blank')
        const sharedStyleCartCreate: SharedStyleCartCreate = {
          attributes: {
            carts,
          },
          sharedStyleUri: uri,
        }
        const result = await lookClient.post<SharedStyleCartDto>(
          '/api/look/share/cart',
          { sharedStyleCartCreate },
          { ip: lookContext.ip },
        )
        if (newWindow) {
          const urlObj = new URL(detailSiteUrl)
          const url = `https://${urlObj.hostname}/order/basket.html?lookShare=${result.code}`
          newWindow.location.href = url
        }
        const totalPostCodes = getTotalPostIds()
        const productsObj = styleItem.style.products
        const totalPostIds = productsObj
          ?.filter((item) => item.code !== undefined && totalPostCodes.includes(item.code))
          .map((item) => item.id)
          .filter((id): id is number => id !== undefined)
        eventShareButClick({
          ip: lookContext.ip,
          uri,
          productPrice: getTotalPrice(),
          ids: totalPostIds ?? [],
          quantity: getTotalQuantity(),
          shareType: shareType === 'kakao' ? UserEventDtoShareType.KAKAO : UserEventDtoShareType.DIRECT,
          carts,
        })
      } catch (error) {
        console.error('GraphQL Error:', error)
      }
    }
  }

  return (
    <div className={`share_cart ${isCarts && 'open'}`}>
      <div className="cart_title">
        {share('cart.title')}
        <span onClick={() => setIsCarts(false)} role="button" tabIndex={0} onKeyDown={() => {}} aria-label="setIsCarts">
          <ICON.ShareCartCartListDel />
        </span>
      </div>
      {carts.length !== 0 && (
        <div className="cart_option">
          <CheckBox
            value="all"
            checked={selectedItems.length === carts.length && carts.length > 0}
            checkEvent={handleSelectAll}
          >
            {share('cart.all')}
          </CheckBox>
          <div
            className="all_delete"
            onClick={handleRemoveCart}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
            aria-label="all_delete"
          >
            {share('cart.delete')}
          </div>
        </div>
      )}
      <div className="cart_list">
        <ul>
          {carts.map(
            (cart) =>
              cart.variant_code && (
                <li key={cart.variant_code}>
                  <CheckBox
                    key={`checkbox_${cart.variant_code}`}
                    value={cart.variant_code}
                    checked={selectedItems.includes(cart.variant_code)}
                    checkEvent={() => handleCheckboxChange(cart.variant_code!)}
                  >
                    {null}
                  </CheckBox>
                  <div className="cart_item">
                    <div className="img">
                      <img src={cart.imageUrl} alt="" />
                    </div>
                    <div className="info">
                      <div
                        className="delete"
                        onClick={() => setRemoveCart([cart.variant_code ?? ''])}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => {}}
                        aria-label="setRemoveCart"
                      >
                        <ICON.ShareCartDelete />
                      </div>
                      <div className="name">{cart.name}</div>
                      <div className="option">
                        {share('cart.options')}: {cart.option_value}
                      </div>
                      <div className="price">
                        <strong>
                          {addComma({
                            price: Number(cart.price) * (cart.quantity ?? 1),
                            currency: styleLook('money'),
                          })}
                        </strong>
                        <div className="quantity">
                          <s
                            onClick={() => (cart.quantity ?? 1) > 1 && setCartQuantityMinus(cart.variant_code ?? '')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={() => {}}
                            aria-label="setCartQuantityAdd"
                          >
                            <ICON.ShareCartMinus />
                          </s>
                          <span>{cart.quantity}</span>
                          <s
                            onClick={() => setCartQuantityAdd(cart.variant_code ?? '')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={() => {}}
                            aria-label="setCartQuantityAdd"
                          >
                            <ICON.ShareCartAdd />
                          </s>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ),
          )}
          {carts.length === 0 && <li className="empty">{share('cart.empty')}</li>}
        </ul>
      </div>
      <div className="cart_total">
        <span>{share('cart.payment')}</span>
        <strong>
          {addComma({
            price: getTotalPrice(),
            currency: styleLook('money'),
          })}
        </strong>
      </div>
      <div
        className={`cart_button ${carts.length === 0 && 'inactive'}`}
        onClick={orderCartItem}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        aria-label="cart_button"
      >
        {share('cart.purchase')}
      </div>
    </div>
  )
}
