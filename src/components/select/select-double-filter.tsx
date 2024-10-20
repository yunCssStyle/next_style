import { styled } from 'styled-components'
import useDetectClose from '@/hook/useDetectClose'
import { MutableRefObject } from 'react'
import { CommonCodeDto } from '@/services/generated/managerstore.schemas'
import IconArrowDown from '../icons/icon-arrow-down'
import CheckBox from '../input/checkbox'

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
interface StyledDropDownProps {
  $showDropdownPosition: 'left' | 'right'
}
const StyledDropDown = styled.div<StyledDropDownProps>`
  position: absolute;
  left: ${(props) => (props.$showDropdownPosition === 'left' ? '0' : 'auto')};
  right: ${(props) => (props.$showDropdownPosition === 'right' ? '0' : 'auto')};
  top: 36px;
  z-index: var(--drop-down-level);
  display: flex;
  flex-direction: row;
`
const StyleDropBox = styled.div`
  position: relative;
  width: auto;
  min-width: 149px;
  height: 100%;
  max-height: 450px;
  padding: 0.5rem;
  background-color: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`
const StyledCheckGroup = styled.div``
const StyleGroupWrap = styled.div`
  padding: 0.25rem 3px;
`
const StyledCheckBoxContainer = styled.div`
  padding: 0.25rem 0;
`

interface SelectFilterProps {
  label: string
  gdata1: CommonCodeDto[]
  gdata2: CommonCodeDto[]
  valueKey: string
  labelKey: string
  selectedItem1: string[]
  selectedItem2: string[]
  width?: string
  showDropdownPosition?: 'left' | 'right'
  handleAddFilter?: (value: string, index: number) => void
}
export default function SelectDoubleFilter({
  label,
  gdata1,
  gdata2,
  valueKey,
  labelKey,
  selectedItem1,
  selectedItem2,
  width = 'auto',
  showDropdownPosition = 'right',
  handleAddFilter,
}: SelectFilterProps) {
  const [isDropDown, dropdownRef, onClickSelect] = useDetectClose(false)
  // data1
  const names1: string[] = []
  gdata1.forEach((item) => {
    if (item.children && item.children?.length > 0) {
      item.children.forEach((subItem: CommonCodeDto) => {
        if (selectedItem1.includes(subItem[valueKey])) {
          names1.push(subItem[labelKey])
        }
      })
    } else if (selectedItem1.includes(item[valueKey])) {
      names1.push(item[labelKey])
    }
  })
  // data2
  const names2: string[] = []
  gdata2.forEach((item) => {
    if (item.children && item.children?.length > 0) {
      item.children.forEach((subItem: CommonCodeDto) => {
        if (selectedItem2.includes(subItem[valueKey])) {
          names2.push(subItem[labelKey])
        }
      })
    } else if (selectedItem2.includes(item[valueKey])) {
      names2.push(item[labelKey])
    }
  })

  return (
    <StyledBox ref={dropdownRef as MutableRefObject<HTMLDivElement>}>
      <StyledSelect
        onClick={onClickSelect as React.MouseEventHandler<HTMLButtonElement>}
        $width={width}
        $isOn={selectedItem1.length > 0 || selectedItem2.length > 0}
      >
        <p>
          {selectedItem1.length > 0 || selectedItem2.length > 0
            ? `${label} : ${names1[0] ?? ''} ${names2[0] ?? ''}`
            : label}{' '}
          {(names1.length > 0 || names2.length > 0) && (
            <span className="tag_label">+{names1.length + names2.length}</span>
          )}
        </p>
        <IconArrowDown />
      </StyledSelect>
      {isDropDown && (
        <StyledDropDown $showDropdownPosition={showDropdownPosition}>
          <StyleDropBox className="dropdown_shadow">
            {gdata1.map((gitem: CommonCodeDto) => (
              <StyledCheckGroup key={`${gitem.parentCode}_${gitem[valueKey]}`}>
                <StyleGroupWrap>
                  {
                    // 그룹 아닐때
                    <StyledCheckBoxContainer key={`${gitem.parentCode}_${gitem.code}`}>
                      <CheckBox
                        size={12}
                        value={`${gitem.parentCode}_${gitem[valueKey]}`}
                        checked={selectedItem1.includes(gitem[valueKey])}
                        labelPadding="0 0 0 0.25rem"
                        checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation()
                          if (handleAddFilter) {
                            handleAddFilter(gitem[valueKey], 0)
                          }
                        }}
                      >
                        {gitem[labelKey]}
                      </CheckBox>
                    </StyledCheckBoxContainer>
                  }
                </StyleGroupWrap>
              </StyledCheckGroup>
            ))}
          </StyleDropBox>
          {/*  */}
          <StyleDropBox className="dropdown_shadow">
            {gdata2.map((gitem: CommonCodeDto) => (
              <StyledCheckGroup key={`${gitem.parentCode}_${gitem[valueKey]}`}>
                <StyleGroupWrap>
                  {
                    // 그룹 아닐때
                    <StyledCheckBoxContainer key={`${gitem.parentCode}_${gitem.code}`}>
                      <CheckBox
                        size={12}
                        value={`${gitem.parentCode}_${gitem[valueKey]}`}
                        checked={selectedItem2.includes(gitem[valueKey])}
                        labelPadding="0 0 0 0.25rem"
                        checkEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                          e.stopPropagation()
                          if (handleAddFilter) {
                            handleAddFilter(gitem[valueKey], 1)
                          }
                        }}
                      >
                        {gitem[labelKey]}
                      </CheckBox>
                    </StyledCheckBoxContainer>
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
