import { CartProduct } from '@/types/product'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const initialShareCartValue = {
  uri: '',
  carts: [] as CartProduct[],
}
export const useShareCartStore = create<typeof initialShareCartValue>()(
  persist(() => initialShareCartValue, {
    name: 'shareCart',
    storage: createJSONStorage(() => sessionStorage),
  }),
)
export const setShareCartUri = (uri: string) => {
  useShareCartStore.setState((state) => {
    const { carts, uri: currentUri } = state
    if (currentUri === uri) {
      return {
        ...state,
        carts: [...carts],
      }
    }
    return {
      ...state,
      uri: uri,
      carts: [],
    }
  })
}

// 스토어 추가
export const setAddCart = (items: CartProduct[]) =>
  useShareCartStore.setState((state) => {
    const updatedCarts = state.carts.map((cartItem) => {
      const foundItem = items.find((item) => item.variant_code === cartItem.variant_code)
      if (foundItem) {
        const quantity = cartItem.quantity ? cartItem.quantity + 1 : 1
        return {
          ...cartItem,
          quantity: quantity,
        }
      }
      return cartItem
    })
    const newItems = items.filter(
      (item) => !state.carts.some((cartItem) => cartItem.variant_code === item.variant_code),
    )
    return {
      carts: [...updatedCarts, ...newItems],
    }
  })
// 스토어 삭제
export const setRemoveCart = (item_variants_code: string[]) => {
  useShareCartStore.setState((state) => ({
    carts: state.carts.filter((cartItem) => !item_variants_code.includes(cartItem.variant_code || '')),
  }))
}
// 수량 추가
export const setCartQuantityAdd = (item_variants_code: string) =>
  useShareCartStore.setState((state) => ({
    carts: state.carts.map((cart) => {
      if (cart.variant_code === item_variants_code) {
        const quantity = cart.quantity ? cart.quantity + 1 : 1
        return { ...cart, quantity: quantity }
      }
      return cart
    }),
  }))
// 수량 감소
export const setCartQuantityMinus = (item_variants_code: string) =>
  useShareCartStore.setState((state) => ({
    carts: state.carts.map((cart) => {
      if (cart.variant_code === item_variants_code) {
        const quantity = cart.quantity ? cart.quantity - 1 : 0
        return { ...cart, quantity: quantity }
      }
      return cart
    }),
  }))
// 전체 제품 id
export const getTotalPostIds = () => useShareCartStore.getState().carts.map((cart) => cart.product_no)
// 토탈 수량
export const getTotalQuantity = () =>
  useShareCartStore.getState().carts.reduce((sum, cart) => {
    return sum + (cart.quantity || 0) // Add the quantity or 0 if undefined
  }, 0)
// 토탈 가격
export const getTotalPrice = () =>
  useShareCartStore.getState().carts.reduce((sum, cart) => {
    const itemPrice = parseFloat(cart.price || '0')
    const itemQuantity = cart.quantity || 0
    return sum + itemPrice * itemQuantity
  }, 0)
