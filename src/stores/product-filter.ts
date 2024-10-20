import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

const filterValue = {
  item: [] as string[], // 아이템 리스트
  color: [] as string[], // 컬러 리스트
  season: [] as string[], // 시즌 리스트
  pattern: [] as string[], // 패턴 리스트
  gender: undefined as undefined | string, // 성별 리스트
  brand: [] as string[], // 브랜드 리스트
  activated: undefined as undefined | boolean, // 브랜드 리스트
  vendorId: undefined as undefined | number, // 선택 벤더 아이디
}

export const initialProductValue = {
  viewType: 'simply',
  isBookMark: false, // 북마크 여부
  searchText: '', // 코드 검색어
  activeFun: true, // 활성화 여부 함수 실행
  ...filterValue,
}

export const useProductFilterStore = createWithEqualityFn<typeof initialProductValue>()(
  persist(() => initialProductValue, {
    name: 'product-filter',
    storage: createJSONStorage(() => sessionStorage),
    skipHydration: true,
  }),
)

export const setViewType = (viewType: string) => useProductFilterStore.setState(() => ({ viewType }))
export const setIsBookMark = (isBookMark: boolean) => useProductFilterStore.setState(() => ({ isBookMark }))
export const setSearchText = (searchText: string) => useProductFilterStore.setState(() => ({ searchText }))
export const setItem = (item: string) =>
  useProductFilterStore.setState((state) => {
    if (state.item.includes(item)) {
      const stateBefore = state.item.filter((t) => t !== item)
      return { item: [...stateBefore] }
    }
    return { item: [...state.item, item] }
  })
export const resetItems = () => useProductFilterStore.setState(() => ({ item: [] }))
export const setColor = (color: string, type?: string) =>
  useProductFilterStore.setState((state) => {
    if (state.color.includes(color) && type !== 'colorAll') {
      const stateBefore = state.color.filter((t) => t !== color)
      return { color: [...stateBefore] }
    }
    if (type === 'colorAllDelete') {
      return { color: [] }
    }
    return { color: [...state.color, color] }
  })
export const setPattern = (pattern: string) =>
  useProductFilterStore.setState((state) => {
    if (state.pattern.includes(pattern)) {
      const stateBefore = state.pattern.filter((t) => t !== pattern)
      return { pattern: [...stateBefore] }
    }
    return { pattern: [...state.pattern, pattern] }
  })
export const setSeason = (season: string) =>
  useProductFilterStore.setState((state) => {
    if (state.season.includes(season)) {
      const stateBefore = state.season.filter((t) => t !== season)
      return { season: [...stateBefore] }
    }
    return { season: [...state.season, season] }
  })
export const setGender = (gender: string | undefined) =>
  useProductFilterStore.setState(() => {
    return { gender }
  })

export const setBrand = (brand: string) =>
  useProductFilterStore.setState((state) => {
    if (state.brand.includes(brand)) {
      const stateBefore = state.brand.filter((t) => t !== brand)
      return { brand: [...stateBefore] }
    }
    return { brand: [...state.brand, brand] }
  })
export const clearBrand = () => useProductFilterStore.setState(() => ({ brand: [] }))
export const setActivated = (activated: boolean | undefined) => useProductFilterStore.setState(() => ({ activated }))
export const setVendorId = (vendorId: number | undefined) =>
  useProductFilterStore.setState(() => {
    return { vendorId }
  })

export const resetFilter = () => useProductFilterStore.setState(() => ({ ...filterValue }))
