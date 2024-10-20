'use client'

import InputSearch from '@/components/input/input-search'
import { useScopedI18n } from '@/locales/client'
import { useProductFilterStore, setSearchText } from '@/stores/product-filter'

export default function Search() {
  const prod = useScopedI18n('prod')
  // zustand 사용
  const searchText = useProductFilterStore((state) => state.searchText)
  return (
    <div
      style={{
        maxWidth: '179px',
        width: '179px',
      }}
    >
      <InputSearch
        id="prdSearch"
        placeholder={prod('prod-no-search')}
        value={searchText}
        onChangeValue={(value) => setSearchText(value)}
      />
    </div>
  )
}
