'use client'

import { CommonSkeleton } from '@/app/ui/skeleton'
import Button from '@/components/button/button'
import StyleManagerCard from '@/components/card/style-manager-card'
import StyleManagerItem from '@/components/card/style-manager-item'
import ColorPalletComponent from '@/components/color-pallet/color-pallet-component'
import IconCloseXThin from '@/components/icons/icon-close-x-thin'
import IconLeft from '@/components/icons/icon-left'
import Scroll from '@/components/scroll/scroll'
import { MIDDLE_TIME, MODAL_PRODUCT_FITTING_LIMIT } from '@/constants/numbers'
import { colorBlack } from '@/constants/theme'
import { LookContext } from '@/contexts/look-context'
import { eventModalExpos, eventMoreButtonClick, eventProductExposure } from '@/lib/vendor-user-event'
import { useI18n, useScopedI18n } from '@/locales/client'
import {
  ProductColorPallet,
  StyleRecommendRequest,
  StyleRecommendResDto,
  StyleRecommendationRes,
  UserEventDtoInterfaceType,
} from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import '@/styles/look-component.scss'
import styles from '@/styles/stylemanager-modal.module.scss'
import ICON from '@/svg'
import postMessageWeb from '@/utils/iframe-utils'
import { LayoutGroup, motion } from 'framer-motion'
import { debounce } from 'lodash'
import { LegacyRef, useContext, useEffect, useRef, useState } from 'react'
import { useDetailContainerStore } from '../../detail/_client/store'

export default function ModalStyleClient({ id }: { id: string }) {
  const lookContext = useContext(LookContext)
  const styleLook = useScopedI18n('style-look')
  const t = useI18n()
  const [selectStyle, setStyleManager] = useState<StyleRecommendResDto | null>(null)
  const defaultStyle = {
    styles: [],
    colorPallets: [],
  }
  const [styleColorList, setStyleColorList] = useState<StyleRecommendationRes>(defaultStyle)
  const [styleMonoList, setStyleMonoList] = useState<StyleRecommendationRes>(defaultStyle)
  const [loadData, setLoadData] = useState(true)
  // 사이즈 변경에 따른 반응형 처리
  const headerRef: LegacyRef<HTMLDivElement> | undefined | null = useRef(null)
  const filterRef: LegacyRef<HTMLDivElement> | undefined | null = useRef(null)
  const [headerH, setHeaderH] = useState(0) // 헤더 높이
  const [filterH, setFilterH] = useState(0) // 필터 높이
  // 선택된 컬러값
  const [selectColorPallet, setSelectColorPallet] = useState<ProductColorPallet | null>(null)
  const [initColorPallet, setinitColorPallet] = useState<number | null>(null)
  const updateItem = useDetailContainerStore((state) => state.updateItem)

  // 데이터 갱신 로직
  const getData = debounce(async () => {
    // 추천 상품 가져오기
    try {
      const recommendParams: StyleRecommendRequest = {
        merged: false,
        recommendCount: MODAL_PRODUCT_FITTING_LIMIT,
        mono: false,
      }
      if (selectColorPallet !== null) {
        recommendParams.id = { productId: selectColorPallet.productId }
      } else {
        recommendParams.id = { productCode: id }
      }

      const result = await lookClient.post<StyleRecommendationRes>(
        '/api/look/stylerecommend',
        { recommendParams },
        { ip: lookContext.ip },
      )
      setinitColorPallet(result.styles[0].products?.find((item) => item.code === id)?.id ?? null)
      if (selectColorPallet === null && result.productId !== updateItem.productId) {
        eventModalExpos({ ip: lookContext.ip, id: result.productId })
      }
      setStyleColorList(result)
    } catch (error) {
      console.log('Recommend Error')
    } finally {
      setLoadData(false)
    }
  }, MIDDLE_TIME)
  // 스타일 클릭 했을때
  const handleClick = (item: StyleRecommendResDto) => {
    setStyleManager(item)
    eventProductExposure({
      ip: lookContext.ip,
      obj: item,
      type: UserEventDtoInterfaceType.MODAL,
    })
  }
  // 랜더링 되는 높이 계산
  const renderMaxHeight = (): string => {
    if (selectStyle === null) {
      return `calc(100vh - ${headerH}px - ${filterH}px)`
    }
    return `calc(100vh - ${headerH}px)`
  }
  // 초기화
  const handleClearData = () => {
    setStyleMonoList(defaultStyle)
    setLoadData(true)
  }

  const renderView = () => {
    if (loadData) {
      return Array(MODAL_PRODUCT_FITTING_LIMIT)
        .fill(null)
        .map((val, index) => {
          return (
            <CommonSkeleton
              key={`modal_loading_${val}_${String(index)}`}
              width="100%"
              height="450px"
              minHeight="38px"
              borderRadius="0.5rem"
            />
          )
        })
    }
    return styleColorList.styles.map((item) => (
      <motion.div
        key={item.styleRecommendId}
        layoutId={String(item.styleRecommendId)} // Fix: Use the styleRecommendId property of the item object
        onClick={() => handleClick(item)}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        aria-label="detail page"
      >
        <StyleManagerItem item={item} seasonTypes={item.seasonTypes} />
      </motion.div>
    ))
  }
  useEffect(() => {
    if (loadData) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData])
  // 컬러 변경 시
  useEffect(() => {
    handleClearData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectColorPallet])
  // 스크롤 영역 계산
  useEffect(() => {
    if (headerRef.current && filterRef.current) {
      setHeaderH(headerRef.current.offsetHeight)
      setFilterH(filterRef.current.offsetHeight)
    }
  }, [])

  return (
    <div className={styles.modalContainer}>
      {/* 헤더 */}
      <div ref={headerRef} className={styles.headerContainer}>
        {selectStyle !== null ? (
          <Button theme="none" size="smallF" paddingLR="0px" onClick={() => setStyleManager(null)}>
            <IconLeft width={24} height={24} viewBox="0 0 12 12" stroke={colorBlack} />
          </Button>
        ) : (
          <div />
        )}
        <div>
          {selectStyle === null ? (
            <span>{styleLook('modal.title')}</span>
          ) : (
            (
              <>
                <span>
                  {selectStyle.styleKeywords
                    ?.split(',')[0]
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')}
                </span>{' '}
                style
              </>
            ) ?? <span>{styleLook('modal.title')}</span>
          )}
        </div>
        <Button theme="none" size="smallF" paddingLR="0px" onClick={() => postMessageWeb('close', '')}>
          <IconCloseXThin width={24} height={24} viewBox="0 0 12 12" stroke={colorBlack} />
        </Button>
      </div>
      <div className={styles.container}>
        {/* 필터 부분 */}
        {selectStyle !== null || (styleColorList.colorPallets.length === 0 && !loadData) ? null : (
          <div ref={filterRef} className={styles.filter_container}>
            {/* 컬러 팔레트 부분 */}
            <ColorPalletComponent
              isLoading={loadData}
              initColorPallet={initColorPallet}
              selectFitting={styleColorList}
              selectColorPallet={selectColorPallet}
              setSelectColorPallet={setSelectColorPallet}
              setinitColorPallet={setinitColorPallet}
            />
            <div className={styles.btn}>
              {/* 더보기 부분 */}
              <Button
                size="medium"
                theme="none"
                borderRadius="0px"
                paddingLR="0"
                onClick={() => {
                  eventMoreButtonClick({ ip: lookContext.ip, code: id, type: UserEventDtoInterfaceType.MODAL })
                  if (styleColorList.styles.length > 0) {
                    handleClearData()
                  }
                }}
              >
                <div className={styles.btn_container}>
                  <ICON.Refresh />
                  <span style={{ padding: 0 }}>{t('common.more')}</span>
                </div>
              </Button>
            </div>
          </div>
        )}
        {/* 바디 부분 */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            maxHeight: renderMaxHeight(),
          }}
        >
          <LayoutGroup>
            <Scroll>
              <>
                <div className={styles.grid}>{renderView()}</div>
                {/* 모달-상세 */}
                {selectStyle !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key="overlay"
                    style={{
                      width: '100%',
                    }}
                  >
                    <div className={styles.overlay}>
                      <motion.div layoutId={String(selectStyle.styleRecommendId)}>
                        <div className={styles.bg}>
                          <StyleManagerItem
                            item={selectStyle}
                            isTitle={false}
                            isBorder={false}
                            seasonTypes={selectStyle.seasonTypes}
                          />
                        </div>
                        <div className={`${styles.grid} ${styles.grid3}`}>
                          {selectStyle.products?.map(
                            (item, index) =>
                              item.type !== 'DEFAULT' &&
                              item.productOption !== null && (
                                <div key={item.id} className={styles.modalCardView}>
                                  <StyleManagerCard
                                    item={item}
                                    key={item.id}
                                    index={index}
                                    type={UserEventDtoInterfaceType.MODAL}
                                  />
                                </div>
                              ),
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </>
            </Scroll>
            {styleColorList.styles.length === 0 && styleMonoList.styles.length === 0 && !loadData && (
              <div className={styles.empty}>{styleLook('empty')}</div>
            )}
          </LayoutGroup>
        </div>
      </div>
    </div>
  )
}
