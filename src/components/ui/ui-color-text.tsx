import { colorBlack } from '@/constants/theme'
import styles from './ui-color-text.module.scss'

const themeSize = {
  default: '10px',
  onlyColor: '10px',
}
const themeBorder = {
  default: '50%',
  onlyColor: '50%',
}

interface UiColorTextProps {
  color: string
  text: React.ReactNode
  fontSize?: string
  textColor?: string
  isEllipsis?: boolean
  theme?: keyof typeof themeSize
}

export default function UiColorText({
  color,
  text,
  fontSize = '0.75rem',
  textColor = colorBlack,
  isEllipsis = false,
  theme = 'default',
}: UiColorTextProps) {
  return (
    <div className="flex_row flex_center">
      <div
        className={styles.circle}
        style={{
          backgroundColor: color,
          width: themeSize[theme],
          height: themeSize[theme],
          borderRadius: themeBorder[theme],
          border: `1px solid #E9E9E9`,
        }}
      />
      <div
        className={`${styles.color_text} ${isEllipsis ? 'f_over_ellipsis' : ''}`}
        style={{
          paddingLeft: '5px',
          fontSize,
          color: textColor,
        }}
      >
        {text}
      </div>
    </div>
  )
}
