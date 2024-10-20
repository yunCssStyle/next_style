import ProductDTO from '@/types/product'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialProductValue = {
  updateItem: [] as ProductDTO[],
}

export const useProductStore = create<typeof initialProductValue>()(
  persist(() => initialProductValue, {
    name: 'product',
    storage: createJSONStorage(() => sessionStorage),
    skipHydration: true,
  }),
)

export const setUpdateItem = (Item: ProductDTO[]) => useProductStore.setState(() => ({ updateItem: Item }))
