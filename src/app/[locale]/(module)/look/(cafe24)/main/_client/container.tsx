'use client'

import StyleManagerCardWidth from '@/components/card/style-manager-card-width'
import CanvasFittingComponent from '@/components/fitting/canvas-fitting-component'
import { MIDDLE_TIME } from '@/constants/numbers'
import { colorBlack } from '@/constants/theme'
import { useScopedI18n } from '@/locales/client'
import { StyleRecommendRequest, StyleRecommendationRes } from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import '@/styles/look-component.scss'
import '@/styles/look.scss'
import postMessageWeb from '@/utils/iframe-utils'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { LineWave } from 'react-loader-spinner'

export default function StyleMain() {
  const styleLook = useScopedI18n('style-look')
  const heightRef = useRef<HTMLDivElement | null>(null)
  const [isError, setIsError] = useState<boolean>(false) // 에러
  const [isLoading, setIsLoading] = useState<boolean>(true) // 로딩 여부
  const [selectFitting, setSelectFitting] = useState<StyleRecommendationRes>({
    styles: [],
    colorPallets: [],
  }) // 선택 상품 스타일 추천
  const [hoveredIndex, setHoveredIndex] = useState(1)

  const handleMouseEnter = (index) => {
    setHoveredIndex(index)
  }

  const getData = debounce(async () => {
    // 추천 상품 가져오기
    try {
      setIsLoading(true)
      const recommendParams: StyleRecommendRequest = {
        merged: false,
        recommendCount: 3,
        productType: 'CUSTOMER',
        mono: false,
      }

      const result = await lookClient.post<StyleRecommendationRes>('/api/look/stylerecommend', { recommendParams })
      if (result.styles.length === 0) {
        postMessageWeb('lookError', '401')
        return
      }
      // setSelectFitting(result)
      setSelectFitting(result)
      setIsError(false)
    } catch (error) {
      postMessageWeb('lookError', '401')
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, MIDDLE_TIME)
  // 초기 데이터 가져오기
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const mainHeight = () => {
      const height = heightRef.current ? heightRef.current.scrollHeight : 0
      postMessageWeb('mainHeight', String(height))
    }

    mainHeight()
    window.addEventListener('resize', mainHeight)

    const observer = new MutationObserver(mainHeight)
    if (heightRef.current) {
      observer.observe(heightRef.current, { childList: true, subtree: true, characterData: true })
    }

    return () => {
      window.removeEventListener('resize', mainHeight)
      observer.disconnect()
    }
  }, [])

  if (isError)
    return (
      <div ref={heightRef} id="mainStyle" className="sm_main sm_error">
        {styleLook('detail.style-error')}
      </div>
    ) // 에러 발생 시 렌더링 안함
  return (
    <div ref={heightRef} id="mainStyle" className="sm_main">
      {isLoading ? (
        <div className="sm_spinner">
          <LineWave visible height="100" width="100" color={colorBlack} />
        </div>
      ) : (
        <>
          {selectFitting.styles.map((item, index) => (
            <div
              className={`sm_mainItems ${hoveredIndex === index ? 'action' : ''}`}
              key={`lookbook_detail_${item.styleRecommendId}_${String(index)}`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="sm_mainItems_box">
                <div className="mainItem_main">
                  <CanvasFittingComponent
                    width={180}
                    avatarWidth={180}
                    avatarHeight={388}
                    borderRadius="4px"
                    gender={item.products && item.products?.length > 0 ? item.products[0].genderType : 'F'}
                    items={item.compositeImage ?? item.products ?? ''}
                  />
                </div>
                <div className="card_items">
                  {selectFitting.styles[index].products?.map(
                    (item) =>
                      item.type !== 'DEFAULT' &&
                      item.productOption !== null && <StyleManagerCardWidth item={item} key={item.id} />,
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
