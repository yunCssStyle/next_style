'use client'

import Button from '@/components/button/button'
import CanvasFittingComponent from '@/components/fitting/canvas-fitting-component'
import { LookContext } from '@/contexts/look-context'
import { eventProductExposure } from '@/lib/vendor-user-event'
import {
  StyleRecommendResDto,
  StyleRecommendationRes,
  UserEventDtoInterfaceType,
} from '@/services/generated/lookstore.schemas'
import ICON from '@/svg'
import { motion } from 'framer-motion'
import { useContext, useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

interface MainSwiperProps {
  selectFitting: StyleRecommendationRes
  selectItem: number
  setSelectItem: (number: number) => void
  setStyleManager?: (item: StyleRecommendResDto) => void
  type?: UserEventDtoInterfaceType
}

export default function MainSwiper({
  selectFitting,
  selectItem,
  setSelectItem,
  setStyleManager,
  type = UserEventDtoInterfaceType.SLIDE,
}: MainSwiperProps) {
  const lookContext = useContext(LookContext)
  const swiperRef = useRef<SwiperClass>() // 메인 아이템 슬라이드
  const [smBtnDisabled, setSmBtnDisabled] = useState<string>('')

  // 메인 아이템 클릭 및 좌우버튼 클릭 시 슬라이드 이동 및 아이템 슬라이드 초기화
  const handleMainItemClick = (types: string) => {
    const mainSwiper = swiperRef.current
    if (types === 'next') mainSwiper?.slideNext()
    if (types === 'prev') mainSwiper?.slidePrev()
    if (types === 'click') {
      const index = Number(mainSwiper?.clickedSlide.dataset.swiperSlideIndex)
      setSelectItem(index)
      mainSwiper?.slideToLoop(index)
    }
  }
  // 슬라이드 좌우 버튼
  const smBtn = (btnType: string) => {
    return (
      <span
        className={`sm_${btnType} ${smBtnDisabled === btnType ? 'sm_disabled' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => handleMainItemClick(btnType)}
        onKeyDown={() => handleMainItemClick(btnType)}
        aria-label="detail page"
      >
        <Button theme="none" size="smallF" paddingLR="0px">
          <ICON.Left />
        </Button>
      </span>
    )
  }

  return (
    <>
      <div className="mainItems">
        {smBtn('prev')}
        <Swiper
          className="sm_mainItemSwiper"
          spaceBetween={10}
          slidesPerView={2}
          centeredSlides
          loop
          touchRatio={1}
          breakpoints={{
            768: {
              slidesPerView: 5,
              touchRatio: 1,
              initialSlide: 1,
            },
            440: {
              slidesPerView: 3,
              touchRatio: 1,
              initialSlide: 2,
            },
          }}
          initialSlide={selectFitting.styles.length > 3 ? 3 : selectFitting.styles.length - 1}
          onSwiper={(swiper: SwiperClass) => {
            swiperRef.current = swiper
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            if (swiper?.touches.currentX !== 0) {
              eventProductExposure({
                ip: lookContext.ip,
                obj: selectFitting.styles[swiper.realIndex],
                type,
              })
            }
          }}
          onSlideChange={(swiper) => {
            setSelectItem(swiper.realIndex)
            // 메인 아이템 슬라이드 변경 시 아이템 슬라이드 초기화
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
          {selectFitting.styles.map((item, index) => (
            <SwiperSlide
              key={`lookbook_detail_${item.styleRecommendId}_${String(index)}`}
              onClick={() => handleMainItemClick('click')}
              className={`${selectItem === index ? 'active' : ''}`}
            >
              <div className="box">
                <CanvasFittingComponent
                  width={160}
                  avatarWidth={160}
                  borderRadius="4px"
                  gender={item.products && item.products?.length > 0 ? item.products[0].genderType : 'F'}
                  items={item.compositeImage ?? item.products ?? ''}
                  seasonTypes={item.seasonTypes}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {smBtn('next')}
      </div>
      {type === UserEventDtoInterfaceType.MODAL && (
        <div className="mainItems_modal">
          <ul>
            {selectFitting.styles.slice(0, 5).map((item, index) => (
              <li key={`lookbook_detail_${item.styleRecommendId}_${String(index)}`}>
                <motion.div
                  key={item.styleRecommendId}
                  layoutId={String(item.styleRecommendId)}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (setStyleManager) {
                      setStyleManager(item)
                    }
                    eventProductExposure({
                      ip: lookContext.ip,
                      obj: item,
                      type,
                    })
                  }}
                  aria-label="detail page"
                  className="mainItems_modal_item"
                >
                  <CanvasFittingComponent
                    width={160}
                    avatarWidth={160}
                    borderRadius="4px"
                    gender={item.products && item.products?.length > 0 ? item.products[0].genderType : 'F'}
                    items={item.compositeImage ?? item.products ?? ''}
                    seasonTypes={item.seasonTypes}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
