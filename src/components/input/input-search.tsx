'use client'

import styled from 'styled-components'
import { colorBlack } from '@/constants/theme'
import IconSearch from '../icons/icon-search'
import IconCloseX from '../icons/icon-close-x'
import { StyledInput } from './input-style'

const StyledIconBox = styled.div`
  width: 41px;
  height: 32px;
  position: absolute;
  top: 0;
  right: 0;
  justify-content: center;
  display: flex;
  align-items: center;
`

interface InputSearchProps {
  id: string
  value: string
  placeholder?: string
  required?: boolean
  color?: string
  type?: string
  onChangeValue: (value: string) => void
}
export default function InputSearch({
  id,
  placeholder = '',
  value = '',
  required = false,
  type = 'text',
  color = colorBlack,
  onChangeValue,
}: InputSearchProps) {
  // const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value)
  }
  const removeText = () => {
    onChangeValue('')
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        autoComplete="off"
        onChange={handleInputChange}
        $color={color}
        $height="32px"
        $paddLeft="1.125rem"
        $paddRight="2.6875rem"
      />
      <div />
      <StyledIconBox onClick={removeText}>
        {value.length > 0 ? <IconCloseX width={16} height={16} stroke={colorBlack} /> : <IconSearch />}
      </StyledIconBox>
    </div>
  )
}
