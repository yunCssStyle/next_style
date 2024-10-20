'use client'

import { StyledCheckbox, StyledLabel } from './input-style'

interface CheckBoxProps {
  children: React.ReactNode
  checkEvent: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  classname?: string
  checked?: boolean
  size?: number
  labelPadding?: string
}

export default function CheckBox({
  children,
  checkEvent,
  value,
  classname,
  checked = false,
  size = 24,
  labelPadding = '0',
}: CheckBoxProps) {
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    checkEvent(e)
  }

  return (
    <StyledLabel
      htmlFor={value}
      onClick={(e: React.MouseEvent<HTMLLabelElement>) => {
        e.stopPropagation()
      }}
    >
      <StyledCheckbox
        type="checkbox"
        id={value}
        value={value || ''}
        onChange={handleChangeEvent}
        checked={checked}
        className={classname}
        $size={size}
        $labelPadding={labelPadding}
      />
      <span>{children}</span>
    </StyledLabel>
  )
}
