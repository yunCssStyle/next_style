'use client'

import { styled } from 'styled-components'

interface TextCaptionProps {
  size?: number
  fontWeight?: number
  children: React.ReactNode
}
interface StyledTextCaptionProps {
  $size: number
  $fontWeight: number
}
const StyledTextCaption = styled.div<StyledTextCaptionProps>`
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.$size}px;
  font-weight: ${(props) => props.$fontWeight};
  color: #4d4d4d;
  string {
    font-weight: 600;
    color: var(--color-point);
  }
`

export default function TextCaption({ size = 14, fontWeight = 300, children }: TextCaptionProps) {
  return (
    <StyledTextCaption
      $size={size}
      $fontWeight={fontWeight}
      dangerouslySetInnerHTML={{ __html: children as string }}
    ></StyledTextCaption>
  )
}
