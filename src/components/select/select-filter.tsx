/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useDetectClose from '@/hook/useDetectClose'
import { useI18n } from '@/locales/client'
import { CommonCodeDto } from '@/services/generated/managerstore.schemas'
import { isHexColor } from '@/utils/utils'
import { MutableRefObject } from 'react'
import { styled } from 'styled-components'
import IconArrowDown from '../icons/icon-arrow-down'
import CheckBox from '../input/checkbox'
import UiColorText from '../ui/ui-color-text'

const StyledBox = styled.div`
  position: relative;
  border: 0;
  background-color: transparent;
`
interface StyledSelectProps {
  $isOn: boolean
  $width: string
}
const StyledSelect = styled.button<StyledSelectProps>`
  width: ${(props) => props.$width};
  min-width: 52px;
  padding: 0 0.5rem;
  height: 32px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.$width === 'auto' ? 'center' : 'space-between')};
  align-items: center;
  cursor: pointer;
  border: 1px solid ${(props) => (props.$isOn ? 'var(--color-point)' : 'var(--color-grey)')};
  background-color: ${(props) => (props.$isOn ? 'var(--color-point-select)' : 'var(--color-grey)')};
  p {
    font-size: 0.75rem;
    color: var(--color-black);
    font-weight: 700;
    padding-right: 0.5rem;
  }
`
const setLeft = (position: string) => {
  if (position.includes('left')) {
    return '0'
  }
  return 'auto'
}
const setRight = (position: string) => {
  if (position.includes('right')) {
    return '0'
  }
  return 'auto'
}
const setTop = (position: string) => {
  if (position.includes('bottom')) {
    return '-219px'
  }
  return '36px'
}
// const setBottom = (position: string) => {
//   if (position.indexOf('bottom')) {
//     return '36px'
//   }
//   return 'auto'
// }
interface StyledDropDownProps {
  $showDropdownPosition: 'left' | 'right' | 'bottomleft'
}
const StyledDropDown = styled.div<StyledDropDownProps>`
  position: absolute;
  left: ${(props) => setLeft(props.$showDropdownPosition)};
  right: ${(props) => setRight(props.$showDropdownPosition)};
  top: ${(props) => setTop(props.$showDropdownPosition)};
  z-index: var(--drop-down-level);
`
const StyleDropBox = styled.div`
  position: relative;
  width: auto;
  min-width: 149px;
  height: 100%;
  max-height: 219px;
  background-color: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0.5rem 0;
`
const StyledCheckGroup = styled.div``
const StyleGroupWrap = styled.div``
// 아래 실질적인 필터 호버 영역임
const StyledCheckBoxContainer = styled.div`
  padding: 0.3125rem 0.5rem;
  cursor: pointer;
  &.group {
    padding: 0.3125rem 0.5rem;
  }
  &.child {
    padding: 0.3125rem 0.5rem 0.3125rem 1rem;
  }
  &:hover {
    background-color: var(--color-point-select);
  }
`

interface SelectFilterProps {
  label: string
  gdata: CommonCodeDto[]
  valueKey: string
  labelKey: string
  selectedItem: CommonCodeDto[] | string[]
  width?: string
  showDropdownPosition?: 'left' | 'right' | 'bottomleft'
  labelType?: 'default' | 'color'
  handleAddFilter?: (value: string, type?: string) => void
  locale?: string
}
export default function SelectFilter({
  label, // 라벨들
  gdata, // 데이터들
  valueKey, // 실제 키 - 선택된 id 나 넘겨야 할 값
  labelKey, // 라벨 키 - 눈에 보여지는 거
  selectedItem, // 선택된 값
  width = 'auto', // 넓이 관련
  showDropdownPosition = 'right', // 하단 나오는 위치
  labelType = 'default', // 라벨 렌더링
  handleAddFilter,
  locale,
}: SelectFilterProps) {
  const [isDropDown, dropdownRef, onClickSelect] = useDetectClose(false)

  const names: string[] = []
  gdata.forEach((item) => {
    if (item.children && item.children?.length > 0) {
      item.children.forEach((subItem: CommonCodeDto) => {
        if (selectedItem.includes(subItem[valueKey])) {
          names.push(subItem[labelKey])
        }
      })
    } else if (selectedItem.includes(item[valueKey])) {
      names.push(item[labelKey])
    }
  })
  // 모든 체크박스를 확인 하는 거
  const isAllChecked = (_gdata: CommonCodeDto[]): boolean => {
    const isNotAllCheck = _gdata.filter((item: CommonCodeDto) => {
      if (item.children && item.children?.length > 0) {
        // 자식이 존재하면 해당 자식에서 체크박스 확인
        const isNotCheckData = item.children.filter((child: CommonCodeDto) => !selectedItem.includes(child[valueKey]))
        if (isNotCheckData.length > 0) {
          return true
        }
      } else {
        return !selectedItem.includes(item[valueKey])
      }
      return false
    })
    if (isNotAllCheck.length === 0) {
      // 체크가 안되있는게 없다면 true -> 즉 모두 체크
      return true
    }
    // 체크가 안되있는게 있다면 false -> 일부 체크 안되어 있음
    return false
  }
  // 해당 자식이 체크 되어 있는지 확인하는 거
  const isChildrenAllChecked = (_item: CommonCodeDto): boolean => {
    // 자식 데이터가 모두 체크 되어 있는지 확인
    const isNotCheckData = _item.children!.filter((child: CommonCodeDto) => !selectedItem.includes(child[valueKey]))
    if (isNotCheckData.length === 0) {
      // 체크가 안되있는게 없다면 true -> 즉 자식 모두 체크
      return true
    }
    // 체크가 안되있는게 있다면 false -> 자식 중 일부 체크 안되어 있음
    return false
  }
  const t = useI18n()

  return (
    <StyledBox ref={dropdownRef as MutableRefObject<HTMLDivElement>}>
      <StyledSelect
        onClick={onClickSelect as React.MouseEventHandler<HTMLButtonElement>}
        $width={width}
        $isOn={selectedItem.length > 0}
      >
        <p>
          {selectedItem.length > 0 ? `${label} : ${names[0]}` : label}{' '}
          {names.length > 0 && <span className="tag_label">+{names.length}</span>}
        </p>
        <IconArrowDown />
      </StyledSelect>
      {isDropDown && (
        <StyledDropDown $showDropdownPosition={showDropdownPosition}>
          <StyleDropBox className="dropdown_shadow">
            {/* 모든 체크 박스 여부 */}
            <StyledCheckBoxContainer>
              <CheckBox
                size={14}
                value={label}
                checked={isAllChecked(gdata)}
                labelPadding="0 0 0 0.25rem"
                checkEvent={() => {
                  if (handleAddFilter) {
                    // 부모 로직에 따른 변경
                    if (isAllChecked(gdata)) {
                      // 체크 되어 있을때 -> 부모 해체될 예정 자식들 중 체크 되어 있는것만 해체
                      gdata.forEach((_item: CommonCodeDto) => {
                        if (_item.children && _item.children?.length > 0) {
                          _item.children.forEach((child: CommonCodeDto) => {
                            if (selectedItem.includes(child[valueKey])) {
                              handleAddFilter(child[valueKey], 'colorAllDelete')
                            }
                          })
                        } else {
                          if (selectedItem.includes(_item[valueKey])) {
                            handleAddFilter(_item[valueKey])
                          }
                        }
                      })
                    } else {
                      // 체크 안되어 있을때 -> 부모 체크될 예정 자식들 중 체크 안되어 있는것만 체크
                      gdata.forEach((_item: CommonCodeDto) => {
                        if (_item.children && _item.children?.length > 0) {
                          _item.children.forEach((child: CommonCodeDto) => {
                            if (!selectedItem.includes(child[valueKey])) {
                              handleAddFilter(child[valueKey], 'colorAll')
                            }
                          })
                        } else {
                          if (!selectedItem.includes(_item[valueKey])) {
                            handleAddFilter(_item[valueKey])
                          }
                        }
                      })
                    }
                  }
                }}
              >
                {/* 전체 */}
                <p className="f_bold">{t('common.allSelect')}</p>
              </CheckBox>
            </StyledCheckBoxContainer>
            {/* 실질적인 반복문 */}
            {gdata.map((gitem: any, gindex: number) => (
              <StyledCheckGroup key={`${gitem[valueKey]}_${gindex}`}>
                {/* group parents */}
                {Object.prototype.hasOwnProperty.call(gitem, 'children') &&
                  gitem.children !== null &&
                  gitem.children.length > 0 && (
                    <StyledCheckBoxContainer className="group">
                      <CheckBox
                        size={14}
                        value={gitem[valueKey]}
                        checked={isChildrenAllChecked(gitem)}
                        labelPadding="0 0 0 0.25rem"
                        checkEvent={() => {
                          if (handleAddFilter) {
                            // 부모 로직에 따른 변경
                            if (isChildrenAllChecked(gitem)) {
                              // 체크 되어 있을때 -> 부모 해체될 예정 자식들 중 체크 되어 있는것만 해체
                              gitem.children.forEach((_item: CommonCodeDto) => {
                                if (selectedItem.includes(_item[valueKey])) {
                                  handleAddFilter(_item[valueKey])
                                }
                              })
                            } else {
                              // 체크 안되어 있을때 -> 부모 체크될 예정 자식들 중 체크 안되어 있는것만 체크
                              gitem.children.forEach((_item: CommonCodeDto) => {
                                if (!selectedItem.includes(_item[valueKey])) {
                                  handleAddFilter(_item[valueKey])
                                }
                              })
                            }
                          }
                        }}
                      >
                        {/* 그룹 라벨 랜더링 */}
                        <p className="f_bold">
                          {gitem[labelKey]} {label === '컬러' || label === 'Color' ? '' : t('common.group')}
                          {(label === '아이템' || label === 'Item') && `(${gitem.genderType})`}
                        </p>
                      </CheckBox>
                    </StyledCheckBoxContainer>
                  )}
                <StyleGroupWrap>
                  {
                    // 그룹 일때
                    Object.prototype.hasOwnProperty.call(gitem, 'children') &&
                    gitem.children !== null &&
                    gitem.children.length > 0 ? (
                      gitem.children.map((item: any, index: number) => (
                        <StyledCheckBoxContainer key={`${item}_${index}`} className="child">
                          <CheckBox
                            size={14}
                            value={item[valueKey]}
                            checked={selectedItem.includes(item[valueKey])}
                            labelPadding="0 0 0 0.25rem"
                            checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                              e.stopPropagation()
                              if (handleAddFilter) {
                                handleAddFilter(item[valueKey])
                              }
                            }}
                          >
                            {/* 안에 라벨 랜더링 */}
                            {labelType === 'default' && item[labelKey]}
                            {labelType === 'color' && (
                              <UiColorText color={isHexColor(item[labelKey])} text={item[labelKey]} />
                            )}
                          </CheckBox>
                        </StyledCheckBoxContainer>
                      ))
                    ) : (
                      // 그룹 아닐때
                      <StyledCheckBoxContainer key={`${gitem}_${gindex}`} className="child">
                        <CheckBox
                          size={14}
                          value={gitem[valueKey]}
                          checked={selectedItem.includes(gitem[valueKey])}
                          labelPadding="0 0 0 0.25rem"
                          checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.stopPropagation()
                            if (handleAddFilter) {
                              handleAddFilter(gitem[valueKey])
                            }
                          }}
                        >
                          {locale
                            ? gitem.i18nName.find((item: { locale: string }) => item.locale === locale).translation
                            : gitem[labelKey]}
                        </CheckBox>
                      </StyledCheckBoxContainer>
                    )
                  }
                </StyleGroupWrap>
              </StyledCheckGroup>
            ))}
          </StyleDropBox>
        </StyledDropDown>
      )}
    </StyledBox>
  )
}
