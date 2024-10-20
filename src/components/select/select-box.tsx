'use client'

import useDetectClose from '@/hook/useDetectClose'
import { CommonCodeDto } from '@/services/generated/managerstore.schemas'
import { MouseEventHandler, MutableRefObject, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { styled } from 'styled-components'
import IconArrowDown from '../icons/icon-arrow-down'
import IconTriangleDown from '../icons/icon-triangle-down'

interface StyledSelectProps {
  $noneView: boolean
  $width?: string
}
const StyledSelect = styled.div<StyledSelectProps>`
  display: ${(props) => (props.$noneView ? 'block' : 'flex')};
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.$width !== undefined ? props.$width : 'auto')};
  position: relative;
`
const SelectButton = styled.button<{
  $theme: ThemeType
}>`
  width: 100%;
  display: flex;
  align-items: center;
  height: ${(props) => (props.$theme === 'basket' ? '35px' : '32px')};
  background-color: ${(props) =>
    props.$theme === 'primary' || props.$theme === 'basket' ? 'var(--color-white)' : 'var(--color-grey)'};
  border-radius: ${(props) => (props.$theme === 'primary' ? '3px' : props.$theme === 'basket' ? '8px' : '5px')};
  border: ${(props) => (props.$theme === 'basket' ? '1px solid #CDC9CF' : '1px solid var(--color-grey)')};
  padding-inline: 0px;
  cursor: pointer;
  position: relative;
`

const Select = styled.div<{
  $isThemeSelected: boolean
  $fontSize: string
  $theme: ThemeType
  $labelColor?: string
}>`
  width: 100%;
  outline: none;
  border: none;
  color: ${(props) => (props.$labelColor ? props.$labelColor : 'var(--color-placeholder-grey)')};
  font-size: ${(props) => props.$fontSize};
  text-align: left;
  padding: ${(props) => (props.$theme === 'basket' ? '0.5rem 13px' : '0 29px 0 0.5rem;')};
  font-weight: ${(props) => (props.$theme === 'primary' ? 'unset' : props.$theme === 'basket' ? '400' : '700')};
`

const DropDown = styled.div<{
  $position: string
  $top: string
  $right: string
  $bottom: string
  $width?: string
  $theme?: ThemeType
}>`
  position: ${(props) => props.$position};
  width: ${(props) => (props.$width !== undefined ? props.$width : '100%')};
  max-height: ${(props) => (props.$theme === 'basket' ? '255px' : 'auto')};
  min-width: 89px;
  border-radius: 5px;
  background-color: var(--color-white);
  padding: 0.5rem 0;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  bottom: ${(props) => props.$bottom};
  overflow-y: auto;
  scrollbar-width: thin;
  @keyframes dropdown {
    0% {
      transform: ${(props) => (props.$top === 'unset' ? 'translateY(5%)' : 'translateY(-5%)')};
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 0.4s ease;
`
interface OptionProps {
  $fontSize: string
  $active: boolean
  $theme?: ThemeType
}
const Option = styled.button<OptionProps>`
  width: 100%;
  color: var(--color-black);
  background-color: ${(props) => (props.$active ? 'var(--color-point-select)' : 'var(--color-white)')};
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => (props.$theme === 'basket' ? 400 : 500)};
  height: 30px;
  border: none;
  text-align: left;
  padding-left: 10px;
  white-space: noWrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: var(--color-point-select);
    cursor: pointer;
  }
`
interface SelectButtonProps {
  $width?: string
}
const StyledButton = styled.button<SelectButtonProps>`
  width: ${(props) => (props.$width !== undefined ? props.$width : 'auto')};
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`

type ThemeType = 'primary' | 'secondary' | 'basket'
interface SelectBoxProps {
  theme?: ThemeType
  labelColor?: string
  fontSize?: string
  position?: string
  top?: string
  right?: string
  bottom?: string
  width?: string
  showArrow?: boolean
  children?: React.ReactNode
  datas: CommonCodeDto[]
  selectedValue?: string
  onClickOptionValue: (data: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formRegister?: UseFormRegisterReturn<any>
  labelRender?: React.ReactNode
  defaultString?: string
  locale?: string
}
export default function SelectBox({
  theme = 'primary',
  labelColor = 'var(--color-placeholder-grey)',
  fontSize = '0.875rem',
  position = 'absolute',
  showArrow = false,
  top = '50px',
  bottom = 'unset',
  right = 'auto',
  width = undefined,
  children = null,
  datas,
  selectedValue = '',
  onClickOptionValue,
  formRegister,
  labelRender = null,
  defaultString,
  locale,
}: SelectBoxProps) {
  const [selectedLabel, setSelectedLabel] = useState('')
  const [hiddenValue, setHiddenValue] = useState('')
  const [isDropDown, dropdownRef, onClickSelect] = useDetectClose(false)

  const onClickOption = (data: string) => {
    onClickOptionValue(data)
  }
  const getName = (data: string): string => {
    const selectItem = datas.find((findItem) => findItem.code === data || findItem.name === data)
    if (selectItem && locale) {
      return (
        selectItem.i18nName?.find((item: { locale: string }) => item.locale === locale)?.translation || selectItem.name
      )
    } else if (selectItem) {
      return selectItem ? selectItem.name : ''
    }
    return ''
  }
  const showRenderLabel = (): React.ReactNode => {
    if (labelRender === null) {
      return selectedValue === '' ? defaultString || '선택' : getName(selectedValue)
    }
    return labelRender
  }

  return (
    <StyledSelect $noneView={children !== null} $width={width}>
      {children === null ? (
        <SelectButton
          $theme={theme}
          ref={dropdownRef as MutableRefObject<HTMLButtonElement>}
          type="button"
          aria-label="selectbox"
          onClick={onClickSelect as MouseEventHandler<HTMLButtonElement>}
        >
          <Select $isThemeSelected={selectedLabel !== ''} $labelColor={labelColor} $fontSize={fontSize} $theme={theme}>
            {showRenderLabel()}
            {showArrow && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '10px',
                }}
              >
                {theme === 'basket' ? <IconTriangleDown /> : <IconArrowDown />}
              </div>
            )}
          </Select>
        </SelectButton>
      ) : (
        <StyledButton
          $width={width}
          ref={dropdownRef as MutableRefObject<HTMLButtonElement>}
          onClick={onClickSelect as MouseEventHandler<HTMLButtonElement>}
        >
          {children}
        </StyledButton>
      )}

      {isDropDown && datas.length > 0 && (
        <DropDown
          className="dropdown_shadow_dark"
          style={{
            zIndex: 'var(--drop-down-level)',
          }}
          $position={position}
          $top={top}
          $right={right}
          $bottom={bottom}
          $width={width}
          $theme={theme}
        >
          {datas.map((data: CommonCodeDto) => (
            <Option
              $active={selectedValue !== '' && (selectedValue === data.code || selectedValue === data.name)}
              value={data.code}
              key={data.code}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                setSelectedLabel(data.name)
                onClickOption(data.code)
                setHiddenValue(data.code)
              }}
              $fontSize={fontSize}
              $theme={theme}
            >
              {locale
                ? data.i18nName?.find((item: { locale: string }) => item.locale === locale)?.translation || data.name
                : data.name}
            </Option>
          ))}
        </DropDown>
      )}
      {/* hidden */}
      {formRegister && (
        <input
          ref={formRegister.ref}
          onChange={formRegister.onChange}
          onBlur={formRegister.onBlur}
          name={formRegister.name}
          value={hiddenValue}
          type="text"
          style={{ display: 'none' }}
        />
      )}
    </StyledSelect>
  )
}
