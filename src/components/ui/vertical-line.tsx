'use client'

import { styled } from 'styled-components'

interface StyledVerticalLineProps {
  $height?: string
  $bgColor?: string
  $margin?: string
}
const StyledVerticalLine = styled.div<StyledVerticalLineProps>`
  width: 1px;
  height: ${({ $height }) => $height};
  display: inline-flex;
  background-color: ${({ $bgColor }) => $bgColor};
  box-sizing: border-box;
  margin: ${({ $margin }) => $margin};
`

interface VerticalLineProps {
  height?: string
  bgColor?: string
  margin?: string
}

export default function VerticalLine({
  height = '24px',
  bgColor = 'var(--color-black)',
  margin = '0 1rem',
}: VerticalLineProps) {
  return <StyledVerticalLine $height={height} $bgColor={bgColor} $margin={margin} />
}
