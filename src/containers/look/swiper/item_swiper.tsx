import StyleCard from '@/components/card/style-card'
import CanvasFittingComponent from '@/components/fitting/canvas-fitting-component'
import {
  StyleRecommendResDto,
  StyleRecommendationRes,
  UserEventDtoInterfaceType,
} from '@/services/generated/lookstore.schemas'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import 'swiper/css'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

interface ItemSwiperProps {
  selectFitting: StyleRecommendationRes
  selectItem: number
  selectStyle?: StyleRecommendResDto | null
  type?: UserEventDtoInterfaceType
}

export default function ItemSwiper({
  selectFitting,
  selectItem,
  type = UserEventDtoInterfaceType.SLIDE,
  selectStyle,
}: ItemSwiperProps) {
  const itemsRef = useRef<SwiperClass>() // 아이템 슬라이드
  return (
    <>
      <div className="items">
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          autoHeight
          touchRatio={1}
          breakpoints={{
            768: {
              slidesPerView: 'auto',
              touchRatio: 1,
            },
            // 470: {
            //   slidesPerView: 3.5,
            //   touchRatio: 1,
            // },
            // 330: {
            //   slidesPerView: 2.5,
            //   touchRatio: 1,
            // },
          }}
          onSwiper={(swiper: SwiperClass) => {
            itemsRef.current = swiper
          }}
        >
          {selectFitting.styles[selectItem].products?.map((item, index) => {
            if (item.type !== 'DEFAULT' && item.productOption !== null) {
              return (
                <SwiperSlide className="sm_item" key={item.id} tabIndex={item.id}>
                  <StyleCard item={item} type={type} index={index} />
                </SwiperSlide>
              )
            }
            return null
          })}
        </Swiper>
      </div>
      {type === UserEventDtoInterfaceType.MODAL && selectStyle != null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          key="overlay"
          style={{
            width: '100%',
          }}
          className="overlay"
        >
          <motion.div layoutId={String(selectStyle.styleRecommendId)}>
            <div className="item_style">
              <CanvasFittingComponent
                width={240}
                avatarWidth={240}
                borderRadius="4px"
                gender={
                  selectStyle.products && selectStyle.products?.length > 0 ? selectStyle.products[0].genderType : 'F'
                }
                items={selectStyle.compositeImage ?? selectStyle.products ?? ''}
                seasonTypes={selectStyle.seasonTypes}
              />
            </div>
            <div className="items_list">
              {selectStyle.products?.map((item, index) => {
                if (item.type !== 'DEFAULT' && item.productOption !== null) {
                  return (
                    <div key={item.id}>
                      <StyleCard item={item} type={type} index={index} />
                    </div>
                  )
                }
                return null
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
