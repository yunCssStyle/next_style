/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleRecommendationRes } from '@/services/generated/lookstore.schemas'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const initialdatailContainerValue = {
  updateItem: {
    styles: [],
    colorPallets: [],
  } as StyleRecommendationRes,
}

export const useDetailContainerStore = create<typeof initialdatailContainerValue>()(
  persist(() => initialdatailContainerValue, {
    name: 'detailContainer',
    storage: createJSONStorage(() => localStorage),
  }),
)

export const setUpdateItem = (Item: StyleRecommendationRes) =>
  useDetailContainerStore.setState(() => ({ updateItem: Item }))
