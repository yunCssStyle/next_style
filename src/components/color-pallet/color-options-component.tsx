import { useI18n } from '@/locales/client'
import { ProductColorPallet, StyleRecommendationRes } from '@/services/generated/lookstore.schemas'
import { isBorderColorChange, isHexColor } from '@/utils/utils'
import { motion } from 'framer-motion'

interface ColorOptionsComponentProps {
  isLoading: boolean
  className?: string
  selectFitting: StyleRecommendationRes
  selectColorPallet: ProductColorPallet | null
  setSelectColorPallet: (color: ProductColorPallet | null) => void
}

export default function ColorOptionsComponent({
  isLoading,
  className,
  selectFitting,
  selectColorPallet,
  setSelectColorPallet,
}: ColorOptionsComponentProps) {
  const t = useI18n()
  return (
    <div className={`sm_colorPallet ${className && className}`}>
      <span>{t('common.select-color')} </span>
      <div className={'dots'}>
        {selectFitting.colorPallets.map((color) => {
          let colorTypeId = 0
          selectFitting.styles[0].products?.map((product) => {
            if (product.id === color.productId) {
              colorTypeId = product.id
            }
          })
          const borderStyle = isBorderColorChange(color.color)
            ? '1px solid #e0e0e0'
            : `1px solid ${isHexColor(color.color)}`
          return (
            <div
              key={color.productId}
              className={'dotContainer'}
              onClick={() => {
                if (!isLoading) {
                  if (color.productId === selectColorPallet?.productId) {
                    setSelectColorPallet(null)
                    return
                  }
                  setSelectColorPallet(color)
                }
              }}
            >
              <motion.div
                className={`dot ${isLoading && 'loading'}`}
                style={{
                  backgroundColor: `${isHexColor(color.color)}`,
                  border: borderStyle,
                }}
              >
                {color.productId === colorTypeId && (
                  <motion.div
                    className={'dotHighlight'}
                    layoutId="highlight"
                    transition={{
                      ease: 'linear',
                      duration: 0.5,
                      backgroundColor: { duration: 1 },
                    }}
                    style={{
                      backgroundColor: `${isHexColor(color.color)}`,
                      border: borderStyle,
                    }}
                  />
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
