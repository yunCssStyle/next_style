import { StyleRecommendResDto } from '@/services/generated/managerstore.schemas'
import { create } from 'zustand'

const initialSaveStyleValue = {
  selectSaveStyle: null as StyleRecommendResDto | null,
}

export const useSaveStylestore = create<typeof initialSaveStyleValue>()(() => initialSaveStyleValue)

export const setSaveSelectStyle = (Item: StyleRecommendResDto | null) =>
  useSaveStylestore.setState(() => {
    if (Item === null)
      return {
        selectSaveStyle: null,
      }
    else
      return {
        selectSaveStyle: Item,
      }
  })
