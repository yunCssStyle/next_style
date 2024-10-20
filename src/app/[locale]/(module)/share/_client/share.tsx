'use client'

import { metaDescription, metaTitle } from '@/constants/text'
import { colorBlack } from '@/constants/theme'
import { LookContext } from '@/contexts/look-context'
import { eventDetailShareButtonClick, eventShareButtonClick } from '@/lib/vendor-user-event'
import { useScopedI18n } from '@/locales/client'
import {
  SharedStyleCreate,
  SharedStyleDto,
  StyleRecommendResDto,
  UserEventDtoShareType,
} from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import ICON from '@/svg'
import postMessageWeb from '@/utils/iframe-utils'
import { useContext, useEffect, useRef, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function ShareStyle({
  index,
  styleItem,
  productId,
  shareValue = null,
  image,
  parentUrl = '',
  isClipboard = false,
  handleShowTost,
  uriCode,
}: {
  index: number
  styleItem: StyleRecommendResDto
  productId: number | null
  shareValue?: string | null
  image?: string
  parentUrl?: string
  isClipboard?: boolean
  handleShowTost?: (text: string) => void
  uriCode?: string
}) {
  const share = useScopedI18n('share')
  const lookContext = useContext(LookContext)
  const [uri, setUri] = useState<string>('')
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([])
  const shareBoxRefs = useRef<(HTMLElement | null)[]>([])
  const [sharedStyle, setSharedStyle] = useState<SharedStyleDto | null>(null)

  // 공유 정보 api 호출
  const postShare = async () => {
    try {
      // const parentUrl = window.parent.location.href ?? ''
      const productIds = styleItem.products?.map((product) => product.id!) || []
      const sharedStyleCreate: SharedStyleCreate = {
        style: {
          styleRecommendId: styleItem.styleRecommendId!,
          productIds,
        },
        detailSiteUrl: parentUrl,
        productId: productId ?? 0,
        attributes: {
          styleItem,
        },
      }
      const result = await lookClient.post<SharedStyleDto>(
        '/api/look/share',
        { sharedStyleCreate },
        { ip: lookContext.ip },
      )
      setSharedStyle(result)
      setUri(result.uri)
    } catch (error) {
      console.error('GraphQL Error:', error)
    }
  }

  // 공유 박스 토글
  const hideAllShareBoxes = () => {
    setVisibleBoxes(visibleBoxes.map(() => false))
  }
  // 공유 박스 토글
  const handleClickOutside = (event: MouseEvent) => {
    if (!shareBoxRefs.current.some((ref) => ref?.contains(event.target as Node))) {
      hideAllShareBoxes()
    }
  }

  // 클립보드에 복사
  const copyToClipboard = async () => {
    if (isClipboard) {
      try {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_MODULE_URL}/share/${uri}`)
        if (handleShowTost) {
          const text = share('cart.clipboard')
          handleShowTost(text)
        }
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    } else {
      postMessageWeb('clipboard', `${process.env.NEXT_PUBLIC_MODULE_URL}/share/${uri}?shareType=direct`)
    }
    hideAllShareBoxes()
    eventDetailShareButtonClick({
      ip: lookContext.ip,
      productId: productId ?? 0,
      styleKeyword: styleItem.styleKeywords ?? '',
      styleId: styleItem.styleRecommendId ?? 0,
      shareType: UserEventDtoShareType.DIRECT,
      uri: uriCode,
    })
  }

  // 공유 박스 열기
  const toggleShareBox = async () => {
    eventShareButtonClick({
      ip: lookContext.ip,
      productId: productId ?? 0,
      styleKeyword: styleItem.styleKeywords ?? '',
      styleId: styleItem.styleRecommendId ?? 0,
      uri: uriCode,
    })
    setVisibleBoxes((prev) => {
      const updated = [...prev]
      updated[index] = !updated[index]
      return updated
    })
    if (shareValue !== null) {
      setUri(shareValue)
    } else {
      postShare()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBoxes])
  //
  const handleShare = () => {
    const { Kakao } = window
    const shareUrl = `${process.env.NEXT_PUBLIC_MODULE_URL}/share/${uri}?shareType=kakao`
    const imageUrl = image !== undefined ? image : sharedStyle?.style.imageUrl
    try {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: metaTitle,
          description: metaDescription,
          imageUrl: `${imageUrl}?w=600&h=300&fo=ct`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      })
      // hideAllShareBoxes()
      // eventDetailShareButtonClick({
      //   ip: lookContext.ip,
      //   productId: productId ?? 0,
      //   styleKeyword: styleItem.styleKeywords ?? '',
      //   styleId: styleItem.styleRecommendId ?? 0,
      //   shareType: UserEventDtoShareType.KAKAO,
      //   uri: uriCode,
      // })
    } catch (error) {
      console.error('Kakao Error:', error)
    }
  }
  return (
    <div className="share">
      <div
        className="button"
        onClick={toggleShareBox}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        aria-label="toggleShareBox"
      >
        {shareValue === null ? <ICON.Share /> : <ICON.Share1 />}
      </div>
      {visibleBoxes[index] && (
        <div
          className="share_box"
          ref={(el: HTMLDivElement | null) => {
            shareBoxRefs.current[index] = el
          }}
        >
          <ul>
            {uri !== '' ? (
              <>
                <li>
                  <div onClick={handleShare} role="button" tabIndex={0} onKeyDown={() => {}} aria-label="handleShare">
                    <ICON.ShareKakao />
                  </div>
                </li>
                <li>
                  <div
                    onClick={copyToClipboard}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => {}}
                    aria-label="copyToClipboard"
                  >
                    <ICON.ShareClip />
                  </div>
                </li>
              </>
            ) : (
              <li>
                <ThreeDots visible height="40" width="40" radius="2" color={colorBlack} />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
