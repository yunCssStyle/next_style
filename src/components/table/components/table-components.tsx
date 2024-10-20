import React from 'react'
import CheckBox from '@/components/input/checkbox'
import Image from 'next/image'
import { addComma, formatDate } from '@/utils/string-format'
import { CommonCodeWithI18nDto, productTableMenu } from '@/constants/menu'
import SelectBox from '@/components/select/select-box'
import IconMore from '@/components/icons/icon-more'
import UiColorText from '@/components/ui/ui-color-text'
import { defaultImage } from '@/constants/constant'
import { colorGreen, colorPlaceholderGrey, colorRed } from '@/constants/theme'
import styles from './table-components.module.scss'
import { EnumProp, ProductExcelImportQueryStatus } from '@/services/generated/managerstore.schemas'

// 체크박스 랜더링
export const showCheckBox = (
  id: string[],
  handleSetData?: (ids: number[], keys: string[], values: boolean[]) => void,
): React.ReactNode => {
  const checkedState = !!id[1] // 체크 박스 상태
  return (
    <CheckBox
      key={`checkbox_${id[0]}`}
      value={id[0]}
      checked={checkedState}
      checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleSetData) {
          handleSetData([Number(id[0])], ['checked'], [e.target.checked])
        }
      }}
    >
      {null}
    </CheckBox>
  )
}
// 상품이미지 상품명 랜더링
export const showProductInfo = (data: string[]): React.ReactNode => {
  return (
    <div className={`table_left ${styles.image_container}`}>
      <div className={styles.image_box}>
        <Image
          src={data[0] === '' || data[0] === null || data[0] === undefined ? defaultImage : data[0]}
          width={40}
          height={40}
          sizes="40px"
          alt="product image"
          quality={85}
          priority
          style={{ objectFit: 'contain', width: '40px', height: '40px' }}
        />
      </div>
      {/* <div className={styles.text_box}> */}
      <p className="f_12 c_black d_inline">{data[1] === null ? '' : data[1]}</p>
      {/* </div> */}
    </div>
  )
}
// 더보기 아이콘 랜더링
export const showMoreIcon = (
  data: string[],
  textData?: CommonCodeWithI18nDto[],
  handleSetData?: (ids: number[], keys: string[], values: string[]) => void,
): React.ReactNode => {
  return (
    <SelectBox
      width="100%"
      datas={textData !== undefined ? textData : productTableMenu}
      onClickOptionValue={(value) => {
        if (value === 'editProduct') {
          if (handleSetData) {
            handleSetData([Number(data[0])], ['pageMove'], [data[0]])
          }
        } else if (value === 'wishProduct') {
          if (handleSetData) {
            handleSetData([Number(data[0])], ['wishProduct'], [data[0]])
          }
        }
      }}
      top="40px"
      right="0px"
    >
      <IconMore />
    </SelectBox>
  )
}
// 상태 디스플레이 랜더링
export const showStatus = (data: boolean[], text?: string): React.ReactNode => {
  let statusText = ''
  if (text !== undefined) {
    statusText = text
  } else {
    statusText = data[0] ? '활성화' : '비활성'
  }

  return <UiColorText color={data[0] ? 'var(--color-gren)' : 'var(--color-red)'} text={statusText} />
}
// 날짜 랜더링 'YYYY-DD-MM'
export const showDate = (data: Date[], format: string): React.ReactNode => {
  return <div className={styles.table_text}>{formatDate(data[0], format)}</div>
}
// 숫자 콤마 랜더링
export const showComma = (data: number[]): React.ReactNode => {
  return <div className={styles.table_text}>{addComma({ price: data[0] })}</div>
}
// 상품 - 년도 랜더링
// export const showProductYear = (data: ProductResDtoYear[] | string): React.ReactNode => {
//   if (data[0] === null) {
//     return <div className={styles.table_text} />
//   }
//   return <div className={styles.table_text}>{typeof data[0] === 'string' ? data[0].valueOf() : data[0].value}</div>
// }
// 상품 - 출고 차수
export const showShipment = (data: number[]): React.ReactNode => {
  const monthText = data[0] !== null ? `${data[0]}월` : ''
  const weekText = data[1] !== null ? `${data[1]}주` : ''
  return <div className={styles.table_text}>{`${monthText}${weekText}`}</div>
}
// 파일 데이터 링크 연결
export const showLinkDownLoadDataFile = (
  data: string[],
  handleSetData?: (ids: number[], keys: string[], values: string[]) => void,
): React.ReactNode => {
  if (data[0] === null) return '-'
  return (
    <div className={styles.table_text}>
      <div
        // href={`/home/upload/${data[1]}`}
        className={styles.link}
        onClick={() => {
          if (handleSetData) {
            handleSetData([Number(data[1])], ['click'], [data[1]])
          }
        }}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {data[0]}
      </div>
    </div>
  )
}
// 파일 상세 데이터 링크 연결
export const showFileStatusList = (data: EnumProp[], dataText?: Array<any>): React.ReactNode => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        width: '100%',
      }}
    >
      <UiColorText
        color={colorPlaceholderGrey}
        text={
          <div className="d_flex">
            {dataText ? dataText[0] : '등록중'}:<p className="f_bold">{data[0].toString()}</p>
          </div>
        }
      />
      <UiColorText
        color={colorGreen}
        text={
          <div className="d_flex">
            {dataText ? dataText[1] : '등록완료'}:<p className="f_bold">{data[1].toString()}</p>
          </div>
        }
      />
      <UiColorText
        color={colorRed}
        text={
          <div className="d_flex">
            {dataText ? dataText[2] : '등록불가'}:<p className="f_bold">{data[2].toString()}</p>
          </div>
        }
      />
    </div>
  )
}
// 파일 status 화면 랜더링 -> 파일 상세
export const showFileStatus = (data: EnumProp[], label?: string): React.ReactNode => {
  let color = colorPlaceholderGrey
  if (data[0].value === ProductExcelImportQueryStatus.DONE) {
    color = colorGreen
  } else if (data[0].value === ProductExcelImportQueryStatus.REJECTED) {
    color = colorRed
  }
  return <UiColorText color={color} text={label || data[0].label} />
}
// 비고 긴 텍스트...
export const showLongText = (data: string[]): React.ReactNode => {
  // const textSplit = data[0].split(',')
  return (
    <div className={styles.table_text}>
      {Array.isArray(data[0]) &&
        data[0].map((text) => {
          return (
            <React.Fragment key={text}>
              <p>{text}</p>
              <br />
            </React.Fragment>
          )
        })}
    </div>
  )
}
