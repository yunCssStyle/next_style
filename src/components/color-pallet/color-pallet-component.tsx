/* eslint-disable @next/next/no-img-element */
import { useI18n } from '@/locales/client'
import { ProductColorPallet, StyleRecommendationRes } from '@/services/generated/lookstore.schemas'
import styles from './color-pallet-component.module.scss'

interface ColorPalletComponentProps {
  isLoading: boolean
  className?: string
  initColorPallet?: number | null
  selectFitting: StyleRecommendationRes
  selectColorPallet: ProductColorPallet | null
  setSelectColorPallet: (color: ProductColorPallet | null) => void
  setinitColorPallet: (color: number | null) => void
}

export default function ColorPalletComponent({
  isLoading,
  className,
  selectFitting,
  initColorPallet,
  selectColorPallet,
  setSelectColorPallet,
  setinitColorPallet,
}: ColorPalletComponentProps) {
  const t = useI18n()
  return (
    <div className={`${styles.sm_colorPallet} ${className && styles[className]}`}>
      <span>{t('common.select-color')} </span>
      <div className={styles.dots}>
        {selectFitting.colorPallets.map((color) => (
          <div
            key={color.productId}
            className={styles.dotContainer}
            onClick={() => {
              if (!isLoading && color.productId !== initColorPallet) {
                if (color.productId === selectColorPallet?.productId) {
                  setSelectColorPallet(null)
                  return
                }
                setSelectColorPallet(color)
                setinitColorPallet(color.productId)
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            <div className={`${styles.imgItam} ${color.productId === initColorPallet && styles.on}`}>
              <img src={`${color.mainImageUrl}?w=40`} alt="Product thum" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
