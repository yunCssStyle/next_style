'use client'

interface BorderUiProps {
  border: string
  borderRadius?: string
}

export default function BorderUi({ border, borderRadius = '0px' }: BorderUiProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border,
        borderRadius,
        boxSizing: 'border-box',
      }}
    />
  )
}
