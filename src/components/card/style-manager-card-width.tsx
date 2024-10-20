import { defaultImage } from '@/constants/constant'
import { ProductStyleRecommendDto } from '@/services/generated/lookstore.schemas'
import postMessageWeb from '@/utils/iframe-utils'
import { addComma } from '@/utils/string-format'
import Image from 'next/image'

interface StyleManagerCardProps {
  item: ProductStyleRecommendDto
}

export default function StyleManagerCardWidth({ item }: StyleManagerCardProps) {
  return (
    <div
      className="card"
      onClick={() =>
        item.productOption?.detailSiteUrl !== null &&
        postMessageWeb('itemClick', `${item.productOption?.detailSiteUrl}`)
      }
      onKeyDown={() =>
        item.productOption?.detailSiteUrl !== null &&
        postMessageWeb('itemClick', `${item.productOption?.detailSiteUrl}`)
      }
      tabIndex={0}
      role="button"
    >
      <div className="img">
        <Image src={item.mainImageUrl ?? defaultImage} width={180} height={180} alt="Product thum" />
      </div>
      <div className="card_info">
        <p className={'text_brand'}>
          {item.productOption === undefined || item.productOption?.brand === undefined
            ? ''
            : item.productOption?.brand !== null && `[${item.productOption?.brand}]`}
        </p>
        <p className={'text_prod_name'}>{item.name} </p>
        <p className={'text_price'}>
          {addComma({
            price: Number(
              item.productOption?.priceDiscount === null || item.productOption?.priceDiscount === 0
                ? item.productOption?.price
                : item.productOption?.priceDiscount,
            ),
          })}
          {item.productOption?.priceDiscount !== null && item.productOption?.priceDiscount !== 0 && (
            <span>
              {addComma({
                price: Number(item.productOption?.price),
              })}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
