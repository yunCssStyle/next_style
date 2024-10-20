'use client'

import StyleLookCard from '@/components/card/style-look-card'
import { StyleRecommendationRes, UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import ButtonSwiper from './button_swiper'

interface ItemSwiperProps {
  selectFitting: StyleRecommendationRes
  selectItem: number
  sizeWidth: number
}

export default function DetailItemSwiper({ selectFitting, selectItem, sizeWidth }: ItemSwiperProps) {
  const itemsRef = useRef<SwiperClass>() // 아이템 슬라이드
  const [smBtnDisabled, setSmBtnDisabled] = useState<string>('')
  const [itemLength, setItemLength] = useState<number>(0)
  const [showSwiperBut, setShowSwiperBut] = useState<boolean>(true)

  // 메인 아이템 클릭 및 좌우버튼 클릭 시 슬라이드 이동 및 아이템 슬라이드 초기화
  const swiperItemClick = (types: string) => {
    if (types === 'next') {
      itemsRef.current?.slideTo(itemLength)
      setSmBtnDisabled('next')
    }
    if (types === 'prev') {
      itemsRef.current?.slideTo(0)
      setSmBtnDisabled('prev')
    }
  }

  useEffect(() => {
    const filteredProducts = selectFitting.styles[selectItem].products?.filter(
      (item) => item.type !== 'DEFAULT' && item.productOption !== null,
    )
    const length = filteredProducts?.length || 0 // 조건을 만족하는 항목들의 개수
    setItemLength(length ?? 0)
    itemsRef.current?.slideTo(0)
  }, [selectFitting, selectItem])

  useEffect(() => {
    setShowSwiperBut(false)
    setSmBtnDisabled('prev')
    const itemWidth = 150 * itemLength + 10 * (itemLength - 1) + 100
    if (sizeWidth < itemWidth) {
      itemsRef.current?.slideTo(0)
      setShowSwiperBut(true)
    } else {
      setShowSwiperBut(false)
    }
  }, [sizeWidth, itemLength, selectItem])

  return (
    <div className="items">
      {showSwiperBut && <ButtonSwiper type="prev" smBtnDisabled={smBtnDisabled} swiperItemClick={swiperItemClick} />}
      <Swiper
        slidesPerView="auto"
        className="sm_item_p"
        spaceBetween={10}
        // autoHeight={true}
        touchRatio={1}
        onSwiper={(swiper: SwiperClass) => {
          itemsRef.current = swiper
          setSmBtnDisabled('prev')
        }}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            setSmBtnDisabled('next')
          } else {
            if (swiper.activeIndex === 0) {
              setSmBtnDisabled('prev')
            } else {
              setSmBtnDisabled('')
            }
          }
        }}
      >
        {selectFitting.styles[selectItem].products?.map((item, index) => {
          if (item.type !== 'DEFAULT' && item.productOption !== null) {
            return (
              <SwiperSlide className="sm_item" key={item.id} tabIndex={item.id}>
                <StyleLookCard item={item} type={UserEventDtoInterfaceType.SLIDE} index={index} />
              </SwiperSlide>
            )
          }
          return null
        })}
      </Swiper>
      {showSwiperBut && <ButtonSwiper type="next" smBtnDisabled={smBtnDisabled} swiperItemClick={swiperItemClick} />}
      <div className="sm_item_m">
        {selectFitting.styles[selectItem].products?.map((item, index) => {
          if (item.type !== 'DEFAULT' && item.productOption !== null) {
            return (
              <div className="sm_item" key={item.id} tabIndex={item.id}>
                <StyleLookCard item={item} type={UserEventDtoInterfaceType.SLIDE} index={index} />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
