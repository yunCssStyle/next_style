/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
// data 안에는 여러 타입이 들어갈 수 있으므로 any로 설정
import { useScopedI18n } from '@/locales/client'
import { TableHeaderProps } from '@/types/props/props'
import { formatNumberWithComma } from '@/utils/regex/regex'
import React, { ReactNode } from 'react'
import CheckBox from '../input/checkbox'

interface TableProps {
  isCheckbox?: boolean // 체크박스 여부
  allCheck?: boolean // 전체 체크 여부
  header: TableHeaderProps[] // 헤더 프롭스
  data: any // 실 데이터
  selectItem: number | null // 선택된 아이템
  isExpandRow?: boolean // 확장 행 여부
  expandRender?: React.ReactNode // 확장 행 랜더링
  rowHeight?: string // 행 높이
  onSelected?: (id: number, type: string) => void // 선택 이벤트
  handleSetData?: (id: number[], keys: any[], values: any[]) => void // 데이터 변경 이벤트
}

interface RenderHeaderProps {
  render: React.ReactNode
  key: any
  keyDepth?: any
}

const showRenderHeader = ({ render, key, keyDepth }: RenderHeaderProps): ReactNode => {
  if (render === null) {
    return <p>{key}</p>
  }
  return render
}

export default function Table({
  isCheckbox = false,
  allCheck = false,
  header,
  data,
  selectItem,
  onSelected,
  expandRender,
  isExpandRow = false,
  rowHeight = '60px',
  handleSetData,
}: TableProps) {
  const common = useScopedI18n('common')
  return (
    <div className="table">
      <div className="table_header f_m f_12">
        {/* 헤더 영역 */}
        {header.map((item, tIndex: number) => (
          <div
            key={`tHeader_${item.key}_${tIndex}`}
            className={`top_table_cell ${item.className}`}
            style={{
              width: `${item.width ?? ''}`,
            }}
          >
            {/* 헤더 노출 */}
            {/* 체크박스 보여지는거면 index 0때 헤더 노출 */}
            {isCheckbox && tIndex === 0 && (
              <CheckBox
                value="all"
                checked={allCheck}
                checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (handleSetData) {
                    handleSetData([0], [], [e.target.checked])
                  }
                }}
              >
                {null}
              </CheckBox>
            )}
            {!(isCheckbox && tIndex === 0) && showRenderHeader({ render: item.render, key: item.key })}
          </div>
        ))}
      </div>
      <div className="table_body">
        {/* 실 데이터 row */}
        {/* 데이터가 없을때 */}
        {data.length === 0 && <div className="empty_table">{common('empty')}</div>}
        {/* 데이터 있을때 */}
        {data.length > 0 &&
          data.map((dRow: any, dIndex: number) => (
            <div key={`tBody_${dRow.id}_${dIndex}`} className="table_body_expand">
              <div
                className={`table_body_row ${
                  // 선택 여부에 따른 class 추가
                  selectItem !== null && selectItem === dRow.id ? 'select' : ''
                }`}
                style={{
                  height: `${rowHeight}`,
                }}
              >
                {header.map((hRaw: TableHeaderProps, hIndex: number) => (
                  <div
                    className={`table_cell ${hRaw.className}`}
                    key={`tBody__cell_${dRow.id}_${hRaw.key}_${dIndex}_${hIndex}`}
                    style={{
                      width: `${hRaw.width ?? ''}`,
                    }}
                  >
                    {
                      // 이벤트 있을때 노출
                      hRaw.dataRender !== null && (hRaw.dataEvent ?? '') !== '' && (
                        <div
                          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault()
                            if (onSelected) {
                              onSelected(dRow.id, hRaw.dataEvent ?? '')
                            }
                          }}
                          onKeyDown={(event) => {
                            event.preventDefault()
                            if (event.key === 'Enter' || event.key === ' ') {
                              if (onSelected) {
                                onSelected(dRow.id, hRaw.dataEvent ?? '')
                              }
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          style={{
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          {hRaw.dataRender(
                            hRaw.key.map((kOne) => dRow[kOne]),
                            handleSetData,
                          )}
                        </div>
                      )
                    }
                    {
                      // 헤더 랜더 함수가 없으면 그대로 노출
                      (hRaw.dataEvent ?? '') === '' && hRaw.dataRender === null && (
                        <p>
                          {hRaw.key.map((kOne, i) => {
                            if (kOne === 'brand') {
                              return dRow.productOption[kOne]
                            }
                            if (kOne === 'detailSiteUrl') {
                              return (
                                <a
                                  href={dRow.productOption[kOne]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  key={`k_${i}`}
                                >
                                  {dRow.productOption[kOne]}
                                </a>
                              )
                            }
                            if (kOne === 'price' || kOne === 'priceDiscount') {
                              return formatNumberWithComma(String(dRow.productOption[kOne]))
                            }
                            if (kOne === 'categories') {
                              return dRow[kOne].map((item: { name: any }) => item.name).join(' > ')
                            }
                            if (kOne === 'productOption') {
                              return null
                            }
                            return dRow[kOne]
                          })}
                        </p>
                      )
                    }
                    {
                      // 랜더가 있으면 랜더 노출
                      (hRaw.dataEvent ?? '') === '' &&
                        hRaw.dataRender !== null &&
                        hRaw.dataRender(
                          hRaw.key.map((kOne) => dRow[kOne]),
                          handleSetData,
                        )
                      // [hRaw.key]
                    }
                  </div>
                ))}
              </div>
              {isExpandRow && selectItem !== undefined && selectItem === dRow.id && expandRender}
            </div>
          ))}
      </div>
    </div>
  )
}
