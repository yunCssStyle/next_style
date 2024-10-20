'use client'

import ShareStyle from '@/app/[locale]/(module)/share/_client/share'
import StyleFittingComponent from '@/components/fitting/style-fitting-component'
import { defaultProductItems, genderF } from '@/constants/constant'
import { LookContext } from '@/contexts/look-context'
import { eventProductExposure } from '@/lib/vendor-user-event'
import { StyleRecommendationRes, UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import postMessageWeb from '@/utils/iframe-utils'
import { useContext, useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import ButtonSwiper from './button_swiper'

interface MainSwiperProps {
  selectFitting: StyleRecommendationRes
  setSelectItem: (number: number) => void
  type?: UserEventDtoInterfaceType
}

export default function DetailMainSwiper({
  selectFitting,
  setSelectItem,
  type = UserEventDtoInterfaceType.SLIDE,
}: MainSwiperProps) {
  const lookContext = useContext(LookContext)
  const swiperRef = useRef<SwiperClass>() // 메인 아이템 슬라이드
  const [smBtnDisabled, setSmBtnDisabled] = useState<string>('')
  const [parentUrl, setParentUrl] = useState('')

  // 메인 아이템 클릭 및 좌우버튼 클릭 시 슬라이드 이동 및 아이템 슬라이드 초기화
  const swiperItemClick = (types: string) => {
    const mainSwiper = swiperRef.current
    if (types === 'next') mainSwiper?.slideNext()
    if (types === 'prev') mainSwiper?.slidePrev()
    if (types === 'click') {
      const index = Number(mainSwiper?.clickedSlide.dataset.swiperSlideIndex)
      setSelectItem(index)
      mainSwiper?.slideToLoop(index)
    }
  }

  useEffect(() => {
    postMessageWeb('parentUrl', '')
    const handleMessage = (ev: MessageEvent<{ type: string; data: string; from: string }>) => {
      if (!ev.data.type || !ev.data.from || !ev.data.data) return
      if (ev.data.from === 'styleLookWebUser' && ev.data.type === 'parentUrl') {
        setParentUrl(ev.data.data)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])
  return (
    <div className="mainItems">
      <ButtonSwiper type="prev" smBtnDisabled={smBtnDisabled} swiperItemClick={swiperItemClick} />
      <Swiper
        className="sm_mainItemSwiper"
        spaceBetween={10}
        centeredSlides
        slidesPerView={1}
        loop
        touchRatio={1}
        breakpoints={{
          818: {
            slidesPerView: 5,
            touchRatio: 1,
            initialSlide: 3,
          },
          638: {
            slidesPerView: 3,
            touchRatio: 1,
            initialSlide: 2,
          },
          480: {
            slidesPerView: 2.6,
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
          <SwiperSlide key={`logbook_detail_${item.styleRecommendId}_${String(index)}`}>
            <div className="look_style_wrap">
              <ShareStyle
                index={index}
                styleItem={item}
                productId={selectFitting.productId ?? null}
                parentUrl={parentUrl}
              />
              <div
                onClick={() => swiperItemClick('click')}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                aria-label="swiperItemClick"
              >
                <StyleFittingComponent
                  gender={item.products && item.products?.length > 0 ? item.products[0].genderType ?? genderF : genderF}
                  itemsUrl={item.products?.map((product) => product.putOnImageUrl) ?? defaultProductItems}
                  mergedImg={item.compositeImage ? item.compositeImage : undefined}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonSwiper type="next" smBtnDisabled={smBtnDisabled} swiperItemClick={swiperItemClick} />
    </div>
  )
}
