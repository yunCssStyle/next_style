'use client'

import DetailSpinner from '@/containers/look/detail/spinner'
import ItemSwiper from '@/containers/look/swiper/item_swiper'
import MainSwiper from '@/containers/look/swiper/main_swiper'
import useLook from '@/hook/useLook'
import { useScopedI18n } from '@/locales/client'
import { UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import '@/styles/olivela-font.scss'
import '@/styles/olivela.scss'
import postMessageWeb from '@/utils/iframe-utils'
import Image from 'next/image'
import { useEffect } from 'react'

export const MAIN_ITEM = 5

export default function DetailStyleClient({ id }: { id: string }) {
  const styleLook = useScopedI18n('style-look')
  const { isLoading, heightRef, selectFitting, selectColorPallet, selectItem, setSelectItem, more } = useLook(
    id,
    UserEventDtoInterfaceType.SLIDE,
  )

  useEffect(() => {
    const rootLayout = document.querySelector('.root-layout') as HTMLElement
    if (rootLayout) {
      rootLayout.style.setProperty('height', 'auto', 'important')
    }

    let lastWidth = window.innerWidth

    const detailHeight = () => {
      const height = heightRef.current ? heightRef.current.scrollHeight : 0
      postMessageWeb('detailHeight', String(height))
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

  return (
    <div ref={heightRef} className="stylesbot">
      {isLoading && selectColorPallet === null ? (
        <DetailSpinner />
      ) : (
        <>
          {selectFitting.styles.length === 0 ? (
            <div className="empty">{styleLook('empty')}</div>
          ) : (
            <>
              <div className="options">
                <div className="header">
                  <p className="title">
                    <Image src="/images/imgs/olivelaIcon.png" width={25} height={19} alt="" /> STYLE LOOK
                  </p>
                </div>
                <div className="commend">
                  <span className="number">
                    {selectItem > MAIN_ITEM - 2 ? (selectItem % MAIN_ITEM) + 1 : selectItem + 1}/{MAIN_ITEM}
                  </span>
                  <span
                    className="refresh"
                    onClick={() => more()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                    aria-label="refresh"
                  >
                    Refresh
                  </span>
                </div>
              </div>
              {selectColorPallet && isLoading ? (
                <DetailSpinner optionsSpinner={false} />
              ) : (
                <>
                  <MainSwiper selectFitting={selectFitting} selectItem={selectItem} setSelectItem={setSelectItem} />
                  <ItemSwiper selectFitting={selectFitting} selectItem={selectItem} />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
