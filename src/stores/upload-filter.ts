import {
  CustomPageProductExcelImportResDtoMeta,
  ProductExcelImportQueryStatus,
} from '@/services/generated/managerstore.schemas'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

export const initialUploadFilterValue = {
  code: '', // 상품번호
  state: null as ProductExcelImportQueryStatus | null, // 새로운 룩북 그룹
  isInsert: false as boolean | null, // 룩북 그룹 추가 여부
  excelData: null as CustomPageProductExcelImportResDtoMeta | null, // 엑셀 데이터 수
}

export const useUploadFilterStore = createWithEqualityFn<typeof initialUploadFilterValue>()(
  persist(() => initialUploadFilterValue, {
    name: 'upload-filter',
    storage: createJSONStorage(() => sessionStorage),
    skipHydration: true,
  }),
)

export const setCode = (code: string) => useUploadFilterStore.setState(() => ({ code }))
export const setState = (state: ProductExcelImportQueryStatus | null) =>
  useUploadFilterStore.setState(() => ({ state }))
export const setIsInsert = (isInsert: boolean | null) => useUploadFilterStore.setState(() => ({ isInsert }))
export const setExcelData = (excelData: CustomPageProductExcelImportResDtoMeta | null) =>
  useUploadFilterStore.setState(() => ({ excelData }))
