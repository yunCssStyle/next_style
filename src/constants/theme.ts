export type EnumTheme =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'none'
  | 'lookbook'
  | 'mypage'
  | 'delete'
  | 'tag'
  | 'borderBtn'
  | 'lookDisabled'

export const colorWhite = '#fff'
export const colorPoint = '#9a00ff'
export const colorHoverPoint = 'rgba(154, 0, 255, 0.1)'
export const colorTextBlack = '#000'
export const colorBlack = '#595959'
export const colorPlaceholderGrey = '#a0a6b0'
export const colorGreen = '#20e300'
export const colorRed = '#ff001f'
export const colorGrey = '#f2f0f4'
export const colorTransparent = 'transparent'
export const colorHexf5f5f5 = '#f5f5f5'
export const colorHexa9a9a9 = '#a9a9a9'
export const colorHexB3AFB6 = '#B3AFB6'

export const themeBg = {
  primary: colorPoint,
  secondary: colorGrey,
  disabled: '#eaeaea',
  none: colorTransparent,
  lookbook: colorGrey,
  mypage: colorGrey,
  delete: colorGrey,
  tag: colorGrey,
  borderBtn: colorWhite,
  lookDisabled: colorHexB3AFB6,
}
export const themeColor = {
  primary: colorWhite,
  secondary: colorPlaceholderGrey,
  disabled: '#B3B3B3',
  none: colorWhite,
  lookbook: colorPoint,
  mypage: colorBlack,
  delete: colorRed,
  tag: colorBlack,
  borderBtn: colorPoint,
  lookDisabled: colorWhite,
}
