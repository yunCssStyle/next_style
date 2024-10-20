import { defaultImage } from '@/constants/constant'
import { LookContext } from '@/contexts/look-context'
import { eventProductClick } from '@/lib/vendor-user-event'
import { ProductStyleRecommendDto, UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import Image from 'next/image'
import { useContext } from 'react'
import styles from './style-manager-card.module.scss'

interface StyleManagerCardProps {
  item: ProductStyleRecommendDto
  type?: UserEventDtoInterfaceType
  index: number
}

export default function StyleManagerCard({ item, type, index }: StyleManagerCardProps) {
  const lookContext = useContext(LookContext)
  return (
    // <div
    //   className={styles.style_manager_card}
    //   // onClick={() =>
    //   //   item.productOption?.detailSiteUrl !== null &&
    //   //   postMessageWeb('itemClick', `${item.productOption?.detailSiteUrl}`)
    //   // }
    //   tabIndex={0}
    //   role="button"
    // >
    <a
      className={styles.style_manager_card}
      target="parent"
      href={
        item.productOption?.detailSiteUrl !== null ? item.productOption?.detailSiteUrl + '&lookCorrelation=ture' : ''
      }
      onClick={(event) => {
        eventProductClick({
          ip: lookContext.ip,
          id: item.id ?? 0,
          index: index,
          type: type ?? UserEventDtoInterfaceType.SLIDE,
        })
        if (!item.productOption?.detailSiteUrl) {
          event.preventDefault()
        }
      }}
    >
      <div>
        <Image src={item.mainImageUrl ?? defaultImage} width={180} height={180} alt="Product thum" />
      </div>
      <p className={styles.text_brand}>
        {item.productOption === undefined || item.productOption?.brand === undefined
          ? ''
          : item.productOption?.brand !== null && `[${item.productOption?.brand}]`}
      </p>
      <p className={styles.text_prod_name}>{item.name} </p>
      {/* <p className={styles.text_price}>
        {addComma(
          Number(
            item.productOption?.priceDiscount === null || item.productOption?.priceDiscount === 0
              ? item.productOption?.price
              : item.productOption?.priceDiscount,
          ),
        )}
        {item.productOption?.priceDiscount !== null && item.productOption?.priceDiscount !== 0 && (
          <span>{addComma(Number(item.productOption?.price))}</span>
        )}
      </p> */}
    </a>
    // </div>
  )
}
