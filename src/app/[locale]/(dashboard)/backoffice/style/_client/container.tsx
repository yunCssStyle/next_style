'use client'

import FittingRenderList from '@/components/fitting/fitting-renderList'
import { MIDDLE_TIME, PRODUCT_FITTING_LIMIT } from '@/constants/numbers'
import { StyleRecommendRequestProductType, StyleRecommendationRes } from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setSaveSelectStyle } from '@/stores/save-style'
import { showSnakbar } from '@/utils/utils'
import { debounce } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { styled } from 'styled-components'
const StyledContainer = styled.div`
  padding: 20px;
`
const StyledItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: 20px;
`
export default function StyleClient({ id }: { id: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectItem, setSelectItem] = useState<number | null>(null) // 선택 인덱스
  const [selectFitting, setSelectFitting] = useState<StyleRecommendationRes>() // 선택 상품 스타일 추천
  const [isLoading, setIsLoading] = useState<boolean>(true) // 로딩 여부
  const [defaultItem, setDefaultItem] = useState<boolean>(true) // 로딩 여부

  const getData = debounce(async () => {
    setIsLoading(true)
    // 추천 상품 가져오기
    try {
      const result = await interceptorClient.post('/backoffice/style', {
        recommendCount: PRODUCT_FITTING_LIMIT,
        id: {
          productId: Number(id),
        },
        productType: defaultItem ? StyleRecommendRequestProductType.DEFAULT : StyleRecommendRequestProductType.CUSTOMER,
      })
      setSelectFitting(result.data)
    } catch (error: any) {
      showSnakbar('', error.message, null)
    } finally {
      setIsLoading(false)
    }
  }, MIDDLE_TIME)
  useEffect(() => {
    getData()
  }, [id, defaultItem])
  // 드래그를 위한
  const canvasFittingClick = (data: string, item: any) => {
    if (data === 'detail') {
      setSaveSelectStyle(item)
      router.push(`${pathname}?detailStyle=${item.styleRecommendId}`)
    }
  }
  // 스타일 선택 토글
  const toggleSelectStyle = (key: number | undefined) => {
    if (key !== undefined) {
      if (selectItem === key) {
        setSelectItem(null)
      } else {
        setSelectItem(key)
      }
    }
  }

  return (
    <StyledContainer className="flex_column">
      {/* <div
        className="flex_row f_12 c_black f_bold"
        style={{
          width: '130px',
          height: '32px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p>디폴트상품: </p>
        <ToggleSwitchButton value={defaultItem} onChange={setDefaultItem} />
      </div> */}
      <div>
        <StyledItems>
          {selectFitting && selectFitting.styles.length > 0 ? (
            <FittingRenderList
              width={152}
              avatarWidth={106.352}
              avatarHeight={230}
              isWish={false}
              canvasFittingClick={canvasFittingClick}
              getData={getData}
              isLoading={isLoading}
              selectFitting={selectFitting?.styles}
              selectItem={selectItem}
              toggleSelectStyle={toggleSelectStyle}
            />
          ) : (
            <div>
              <RotatingLines
                visible={true}
                width="32"
                strokeWidth="5"
                strokeColor="#9a00ff"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          )}
        </StyledItems>
      </div>
    </StyledContainer>
  )
}
