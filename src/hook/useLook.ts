import { useDetailContainerStore } from '@/app/[locale]/(module)/look/(cafe24)/detail/_client/store'
import { MIDDLE_TIME } from '@/constants/numbers'
import { LookContext } from '@/contexts/look-context'
import { eventMoreButtonClick, eventProductExposure } from '@/lib/vendor-user-event'
import {
  ProductColorPallet,
  StyleRecommendRequest,
  StyleRecommendRequestProductType,
  StyleRecommendResDto,
  StyleRecommendationRes,
  UserEventDtoInterfaceType,
} from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import { setUpdateItem } from '@/stores/look-detail'
import postMessageWeb from '@/utils/iframe-utils'
import { debounce } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

export const MAIN_ITEM = 5

export default function useLook(id: string, type: UserEventDtoInterfaceType, loop: boolean = true) {
  const lookContext = useContext(LookContext)
  const searchParams = useSearchParams()
  const isApi = searchParams.get('api')
  const heightRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true) // 로딩 여부
  const [selectItem, setSelectItem] = useState<number>(2) // 선택 인덱스
  const [selectStyle, setStyleManager] = useState<StyleRecommendResDto | null>(null)
  const [initColorPallet, setinitColorPallet] = useState<number | null>(null)
  const [selectColorPallet, setSelectColorPallet] = useState<ProductColorPallet | null>(null)
  const [selectFitting, setSelectFitting] = useState<StyleRecommendationRes>({
    styles: [],
    colorPallets: [],
  }) // 선택 상품 스타일 추천

  const updateItem = useDetailContainerStore((state) => state.updateItem)
  const getData = debounce(async (productId?) => {
    setIsLoading(true)
    // 추천 상품 가져오기
    try {
      const recommendParams: StyleRecommendRequest = {
        merged: false,
        recommendCount: MAIN_ITEM,
        mono: false,
        productType: StyleRecommendRequestProductType.DEFAULT,
      }

      // Set the appropriate parameters based on whether productId is provided
      if (productId) {
        recommendParams.id = { productId }
      } else {
        recommendParams.id = { productCode: id }
      }
      const result = await lookClient.post<StyleRecommendationRes>(
        '/api/look/stylerecommend',
        { recommendParams },
        { ip: lookContext.ip },
      )
      // 컬러 선택이 되어 있지 않고 데이터가 없을 경우
      if (selectColorPallet === null && result.styles.length === 0) {
        postMessageWeb('lookError', 'empty')
        return
      }
      const repeatedStyles = loop ? Array(3).fill(result.styles).flat() : result.styles
      result.styles = repeatedStyles
      if (result.styles.length > 0) {
        // 스타일 갯수에 따라 기본 선택값 설정
        setSelectItem(result.styles.length > 3 ? 2 : result.styles.length - 1)
      }
      if (selectColorPallet === null) {
        setUpdateItem(result)
      }
      setSelectFitting(result)
      setinitColorPallet(result.styles[0].products?.find((item) => item.code === id)?.id ?? null)

      if (window.innerWidth > 768 && type === UserEventDtoInterfaceType.MODAL) {
        eventProductExposure({
          ip: lookContext.ip,
          obj: result.styles[selectItem],
          type,
          triggerType: true,
        })
      }
      if (type === UserEventDtoInterfaceType.SLIDE) {
        eventProductExposure({
          ip: lookContext.ip,
          obj: result.styles[selectItem],
          type,
          triggerType: true,
        })
      }
    } catch (error) {
      console.error('GraphQL Error:', error)
      postMessageWeb('lookError', '401')
    } finally {
      setIsLoading(false)
    }
  }, MIDDLE_TIME)

  // 컬러 변경 시
  useEffect(() => {
    if (selectColorPallet) {
      getData(selectColorPallet.productId)
    } else {
      if (isApi) {
        setSelectFitting(updateItem)
        return
      }
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectColorPallet])

  const more = () => {
    eventMoreButtonClick({ ip: lookContext.ip, code: id, type })
    if (selectColorPallet) {
      getData(selectColorPallet.productId)
    } else {
      getData()
    }
  }

  // 초기 데이터 가져오기
  useEffect(() => {
    // 재호출 방지로 파라미터가 api일 경우에는 데이터를 가져오지 않음
    if (isApi) {
      setIsLoading(false)
      return
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApi])

  useEffect(() => {
    setSelectFitting(updateItem)
  }, [updateItem])

  return {
    heightRef,
    isLoading,
    selectItem,
    selectFitting,
    updateItem,
    getData,
    selectColorPallet,
    selectStyle,
    initColorPallet,
    setStyleManager,
    setSelectItem,
    setSelectColorPallet,
    more,
    setinitColorPallet,
  }
}
