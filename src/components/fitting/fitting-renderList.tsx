import { ProductInSkeleton } from '@/app/ui/skeleton'
import { PRODUCT_FITTING_LIMIT } from '@/constants/numbers'
import { notSelectRecommendStyle } from '@/constants/text'
import { StyleRecommendResDto } from '@/services/generated/lookstore.schemas'
import { Fragment } from 'react'
import CanvasFittingComponent from './canvas-fitting-component'
import styles from './fitting-list.module.scss'

interface FittingRenderListProps {
  canvasFittingClick: (data: string, item: any) => void
  getData: () => void
  isLoading: boolean
  isWish: boolean
  selectFitting: StyleRecommendResDto[]
  selectItem: number | null
  toggleSelectStyle: (key: number | undefined) => void
  width?: number // 넓이 px 로 되어 있음 <<< canvas 최적화를 위해 width, height 를 px 로 받아옴
  avatarWidth?: number // 실질적인 아바타에 뿌려지는 이미지의 넓이
  avatarHeight?: number // 실질적인 아바타에 뿌려지는 이미지의 높이
}

export default function FittingRenderList({
  canvasFittingClick,
  getData,
  isLoading,
  isWish,
  selectFitting,
  selectItem,
  toggleSelectStyle,
  width = 120,
  avatarWidth = 84.1568,
  avatarHeight = 182,
}: FittingRenderListProps) {
  if (isLoading) {
    return Array(PRODUCT_FITTING_LIMIT + 1)
      .fill(0)
      .map((cRow: number, cIndex: number) => (
        <Fragment key={`prod_fitting_sk_${cRow + cIndex}`}>
          <ProductInSkeleton width={width + 'px'} height={avatarHeight + 'px'} />
        </Fragment>
      ))
  }
  if (selectFitting.length === 0) {
    return <div className={styles.empty_fitting}>{notSelectRecommendStyle}</div>
  }
  if (selectFitting.length > 0 && selectFitting[0].products && selectFitting[0].products.length > 0) {
    return (
      <>
        <div
          className={styles.fitting_item}
          role="button"
          tabIndex={0}
          onClick={() => getData()}
          onKeyDown={() => getData()}
          aria-label="Click to get recommend style"
        >
          <CanvasFittingComponent
            width={width}
            avatarWidth={avatarWidth}
            avatarHeight={avatarHeight}
            borderRadius="4px"
            items={selectFitting[0].products ?? []}
            gender={selectFitting[0].products[0].genderType ?? 'F'}
            more
          />
        </div>
        {selectFitting.map((item, index) => {
          return (
            <Fragment key={`prod_fitting_${item.styleRecommendId}`}>
              <div
                className={styles.fitting_item}
                role="button"
                tabIndex={index + 1}
                onClick={() => {
                  if (item.styleRecommendId !== undefined) {
                    toggleSelectStyle(item.styleRecommendId)
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    if (item.styleRecommendId !== undefined) {
                      toggleSelectStyle(item.styleRecommendId)
                    }
                  }
                }}
              >
                {/*  */}
                <CanvasFittingComponent
                  key={`canvas_${item.styleRecommendId}`}
                  width={width}
                  avatarWidth={avatarWidth}
                  avatarHeight={avatarHeight}
                  borderRadius="4px"
                  items={item.products ?? []}
                  more={false}
                  isShow={true}
                  isWish={isWish}
                  onClick={(data) => canvasFittingClick(data, item)}
                  gender={(item.products && item.products[0].genderType) ?? 'F'}
                />
              </div>
            </Fragment>
          )
        })}
      </>
    )
  }
  return null
}
