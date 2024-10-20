'use client'

import Button from '@/components/button/button'
import IconCloseXThin from '@/components/icons/icon-close-x-thin'
import IconLeft from '@/components/icons/icon-left'
import { colorBlack } from '@/constants/theme'
import DetailSpinner from '@/containers/look/detail/spinner'
import ItemSwiper from '@/containers/look/swiper/item_swiper'
import MainSwiper from '@/containers/look/swiper/main_swiper'
import { LookContext } from '@/contexts/look-context'
import useLook from '@/hook/useLook'
import { eventModalExpos } from '@/lib/vendor-user-event'
import { useScopedI18n } from '@/locales/client'
import { UserEventDtoInterfaceType } from '@/services/generated/lookstore.schemas'
import '@/styles/olivela-font.scss'
import '@/styles/olivela.scss'
import postMessageWeb from '@/utils/iframe-utils'
import { LayoutGroup } from 'framer-motion'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { MAIN_ITEM } from '../../detail/_client/datail-container'

export default function ModalStyleClient({ id }: { id: string }) {
  const lookContext = useContext(LookContext)
  const styleLook = useScopedI18n('style-look')
  const {
    isLoading,
    heightRef,
    selectFitting,
    selectColorPallet,
    selectItem,
    selectStyle,
    setStyleManager,
    setSelectItem,
    more,
  } = useLook(id, UserEventDtoInterfaceType.MODAL)

  const [viewportWidth, setViewportWidth] = useState(0)
  useEffect(() => {
    const resizeViewportWidth = () => {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeViewportWidth)
    return () => {
      window.removeEventListener('resize', resizeViewportWidth)
    }
  }, [])

  useEffect(() => {
    if (viewportWidth > 720) {
      setStyleManager(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!isLoading && selectColorPallet === null) {
      eventModalExpos({ ip: lookContext.ip, code: id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectColorPallet, isLoading])

  return (
    <div ref={heightRef} className="stylesbot stylesbotModal">
      <div className="headerclose">
        {selectStyle !== null && (
          <Button theme="none" size="smallF" paddingLR="0px" onClick={() => setStyleManager(null)}>
            <IconLeft width={24} height={24} viewBox="0 0 12 12" stroke={colorBlack} />
          </Button>
        )}
        <p className="title">{selectStyle === null ? '' : 'Look'}</p>
        <div className="closeXThin">
          <Button theme="none" size="smallF" paddingLR="0px" onClick={() => postMessageWeb('close', '')}>
            <IconCloseXThin width={24} height={24} viewBox="0 0 12 12" stroke="#2F2F30" />
          </Button>
        </div>
      </div>
      {isLoading && selectColorPallet === null ? (
        <DetailSpinner />
      ) : (
        <>
          {selectFitting.styles.length === 0 ? (
            <div className="empty">{styleLook('empty')}</div>
          ) : (
            <>
              {selectStyle === null && (
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
              )}
              {selectColorPallet && isLoading ? (
                <DetailSpinner optionsSpinner={false} />
              ) : (
                <div className={`body ${selectStyle === null ? 'view' : ''}`}>
                  <LayoutGroup>
                    <MainSwiper
                      selectFitting={selectFitting}
                      selectItem={selectItem}
                      setSelectItem={setSelectItem}
                      setStyleManager={(item) => setStyleManager(item)}
                      type={UserEventDtoInterfaceType.MODAL}
                    />
                    <ItemSwiper
                      selectFitting={selectFitting}
                      selectItem={selectItem}
                      selectStyle={selectStyle}
                      type={UserEventDtoInterfaceType.MODAL}
                    />
                  </LayoutGroup>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
