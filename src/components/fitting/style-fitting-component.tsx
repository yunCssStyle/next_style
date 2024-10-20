'use client'

import { defaultAvatar, defaultAvatarMale, genderM } from '@/constants/constant'
import { StyleRecommendRequestGender } from '@/services/generated/lookstore.schemas'
import styles from './style-fitting-component.module.scss'

type ImageUrl = string | undefined

interface StyleFittingComponentProps {
  gender: StyleRecommendRequestGender
  itemsUrl: ImageUrl[]
  mergedImg?: string
}
export default function StyleFittingComponent({ gender, itemsUrl, mergedImg }: StyleFittingComponentProps) {
  // 아바타 랜더링
  const setAvatarImg = () => {
    if (gender === genderM) {
      return defaultAvatarMale
    }
    return defaultAvatar
  }
  // 상품 랜더링
  const setProductImg = () => {
    try {
      return itemsUrl.map((item, index) => {
        return item && <img className={styles.fadeIn} key={`${item}-${index}`} src={item} />
      })
    } catch (e) {
      console.log('error', e)
      return null
    }
  }

  const setMergedImg = () => {
    return <img className={styles.fadeIn} src={`data:image/jpeg;base64,${mergedImg}`} />
  }

  console.log('mergedImg', mergedImg)

  return (
    <div className={styles.fittingContainer}>
      <div className={styles.fittingWrap}>
        <div className={styles.position} />
        <img src={setAvatarImg()} />
        {mergedImg ? setMergedImg() : setProductImg()}
      </div>
    </div>
  )
}
