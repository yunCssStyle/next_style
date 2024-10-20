import AddProductButton from '@/components/modal/button/add-product-button'
import { useScopedI18n } from '@/locales/client'

export default function FilterContainer({ data }: { data: number }) {
  const upload = useScopedI18n('upload')
  return (
    <div
      className="flex_row filterContainer"
      style={{
        padding: '0 0 1rem 0',
      }}
    >
      <div className="left_box">
        {/* 좌측 */}
        <span
          className="f_12 f_m"
          style={{
            paddingRight: '0.6rem',
          }}
        >
          {upload('table-reg-files')} ({data})
        </span>
      </div>
      <div className="right_box">
        {/* 우측 */}
        {/* 상품추가하기  */}
        <AddProductButton />
      </div>
    </div>
  )
}
