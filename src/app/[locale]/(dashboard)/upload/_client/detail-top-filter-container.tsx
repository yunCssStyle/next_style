'use client'

/* eslint-disable @typescript-eslint/dot-notation */
import VerticalLine from '@/components/ui/vertical-line'
import { colorPlaceholderGrey } from '@/constants/theme'
import { useI18n } from '@/locales/client'
import { CustomPageProductExcelImportResDtoMeta } from '@/services/generated/managerstore.schemas'
import { useUploadFilterStore } from '@/stores/upload-filter'
import { UploadDetailFileDown } from '../[slug]/components/upload-detail-file-down'
import Search from './search'
import StateFilter from './state-filter'

export default function DetailTopFilterContainer({ params }: { params: string }) {
  const excelData = useUploadFilterStore((state) => state.excelData)
  const t = useI18n()
  return (
    <div className="flex_row filterContainer">
      <div className="left_box">
        {/* 좌측 */}
        <p className="f_12 c_black f_bold">
          {t('common.totals')}{' '}
          {excelData === null
            ? 0
            : Number((excelData as CustomPageProductExcelImportResDtoMeta)['PENDING']) +
              Number((excelData as CustomPageProductExcelImportResDtoMeta)['REJECTED']) +
              Number((excelData as CustomPageProductExcelImportResDtoMeta)['DONE'])}
          {t('common.cnt')}
        </p>
        <VerticalLine bgColor={colorPlaceholderGrey} />
        <StateFilter />
        <UploadDetailFileDown id={params} />
      </div>
      <div className="right_box">
        {/* 우측 */}
        <div
          style={{
            maxWidth: '179px',
            width: '179px',
          }}
        >
          <Search />
        </div>
      </div>
    </div>
  )
}
