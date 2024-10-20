'use client'

/* eslint-disable @typescript-eslint/dot-notation */
import Button from '@/components/button/button'
import UiColorText from '@/components/ui/ui-color-text'
import { colorBlack, colorGreen, colorPlaceholderGrey, colorRed, colorWhite } from '@/constants/theme'
import { useScopedI18n } from '@/locales/client'
import { CustomPageProductExcelImportResDtoMeta } from '@/services/generated/managerstore.schemas'
import { useUploadFilterStore, setState } from '@/stores/upload-filter'
import { shallow } from 'zustand/shallow'

export default function StateFilter() {
  // zustand 사용
  const [state, excelData] = useUploadFilterStore((store) => [store.state, store.excelData], shallow)
  const upload = useScopedI18n('upload')
  return (
    <div>
      <Button
        borderRadius="3px"
        theme={state === 'PENDING' ? 'primary' : 'secondary'}
        paddingLR="1.5rem"
        size="small"
        onClick={() => (state === 'PENDING' ? setState(null) : setState('PENDING'))}
      >
        <UiColorText
          color={colorPlaceholderGrey}
          text={`${upload('cell-reg-ing')}: ${
            excelData === null ? 0 : (excelData as CustomPageProductExcelImportResDtoMeta)['PENDING']
          }`}
          textColor={state === 'PENDING' ? colorWhite : colorBlack}
        />
      </Button>
      <Button
        borderRadius="3px"
        theme={state === 'DONE' ? 'primary' : 'secondary'}
        paddingLR="1.5rem"
        size="small"
        onClick={() => (state === 'DONE' ? setState(null) : setState('DONE'))}
      >
        <UiColorText
          color={colorGreen}
          text={`${upload('cell-reg-ed')}: ${
            excelData === null ? 0 : (excelData as CustomPageProductExcelImportResDtoMeta)['DONE']
          }`}
          textColor={state === 'DONE' ? colorWhite : colorBlack}
        />
      </Button>
      <Button
        borderRadius="3px"
        theme={state === 'REJECTED' ? 'primary' : 'secondary'}
        paddingLR="1.5rem"
        size="small"
        onClick={() => (state === 'REJECTED' ? setState(null) : setState('REJECTED'))}
      >
        <UiColorText
          color={colorRed}
          text={`${upload('cell-reg-fail')}: ${
            excelData === null ? 0 : (excelData as CustomPageProductExcelImportResDtoMeta)['REJECTED']
          }`}
          textColor={state === 'REJECTED' ? colorWhite : colorBlack}
        />
      </Button>
    </div>
  )
}
