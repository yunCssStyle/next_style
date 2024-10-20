'use client'

import { CommonSkeleton } from '@/app/ui/skeleton'
import ColorPalletComponent from '@/components/color-pallet/color-pallet-component'
import useLook from '@/hook/useLook'
import { useScopedI18n } from '@/locales/client'
import { UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import '@/styles/look-component.scss'
import '@/styles/lookStyle.scss'
import ICON from '@/svg'
import postMessageWeb from '@/utils/iframe-utils'
import { CSSProperties, useEffect, useState } from 'react'
import DetailItemSwiper from './item_swiper'
import LookLogo from './look-logo'
import DetailMainSwiper from './main_swiper'

export default function DetailStyleClient({ id }: { id: string }) {
  const styleLook = useScopedI18n('style-look')
  const common = useScopedI18n('common')
  const [sizeWidth, setSizeWidth] = useState<number>(0)
  const [kakaoInitialized, setKakaoInitialized] = useState(false)
  const {
    isLoading,
    heightRef,
    selectFitting,
    selectColorPallet,
    selectItem,
    initColorPallet,
    setSelectItem,
    more,
    setSelectColorPallet,
    setinitColorPallet,
  } = useLook(id, UserEventDtoInterfaceType.SLIDE)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY)
        setKakaoInitialized(true)
      }
    }
  }, [])

  useEffect(() => {
    let lastWidth = window.innerWidth

    const detailHeight = () => {
      const height = heightRef.current ? heightRef.current.scrollHeight : 0
      const width = heightRef.current ? heightRef.current.scrollWidth : 0
      postMessageWeb('detailHeight', String(height))
      setSizeWidth(width)
    }

    detailHeight()
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth
        detailHeight()
      }
    }
    window.addEventListener('resize', handleResize)
    const observer = new MutationObserver(detailHeight)
    if (heightRef.current) {
      observer.observe(heightRef.current, { childList: true, subtree: true, characterData: true })
    }
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadingComponent = (style?: CSSProperties | undefined) => {
    return (
      <div className="spinner" style={style}>
        <div className="mainItems">
          {Array.from({ length: 5 }, (_, index) => (
            <CommonSkeleton key={index} width="20%" height="400px" minHeight="100px" borderRadius="20px" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={heightRef} className="stylesbot">
      <div className="header">
        <div className="header-title">{styleLook('detail.title')}</div>
      </div>
      {isLoading && selectColorPallet === null ? (
        loadingComponent()
      ) : (
        <>
          {selectFitting.styles.length === 0 ? (
            <div className="empty">{styleLook('empty')}</div>
          ) : (
            <>
              <div className="options">
                {/* 컬러 팔레트 부분 */}
                {selectFitting.colorPallets.length > 0 ? (
                  <ColorPalletComponent
                    className="right"
                    isLoading={isLoading}
                    initColorPallet={initColorPallet}
                    selectFitting={selectFitting}
                    selectColorPallet={selectColorPallet}
                    setSelectColorPallet={setSelectColorPallet}
                    setinitColorPallet={setinitColorPallet}
                  />
                ) : (
                  <div />
                )}
                <div className="more" onClick={more} role="button" tabIndex={0} onKeyPress={() => {}}>
                  <ICON.Refresh />
                  {common('more')}
                </div>
              </div>
              {isLoading ? (
                loadingComponent({
                  marginTop: '20px',
                })
              ) : (
                <>
                  {kakaoInitialized && <DetailMainSwiper selectFitting={selectFitting} setSelectItem={setSelectItem} />}
                  <DetailItemSwiper selectFitting={selectFitting} selectItem={selectItem} sizeWidth={sizeWidth} />
                </>
              )}
            </>
          )}
        </>
      )}

      <LookLogo />
    </div>
  )
}
