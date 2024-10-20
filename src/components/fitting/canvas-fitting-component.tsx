'use client'

import { defaultAvatar, defaultAvatarMale } from '@/constants/constant'
import { AVATARRATIO } from '@/constants/numbers'
import { ProductStyleRecommendDto } from '@/services/generated/lookstore.schemas'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import BorderUi from '../ui/border-ui'
import useHover from '@/hook/useHover'
import { colorPlaceholderGrey, colorPoint, colorTransparent } from '@/constants/theme'
import IconReadingGlasses from '../icons/icon-reading-glasses'
import { translateSeason } from '@/utils/utils'
import { useScopedI18n } from '@/locales/client'

interface StyledCanvasFittingComponentProps {
  $width: number
  $borderRadius: string
}
const StyledSeason = styled.ul`
  position: absolute;
  width: 100%;
  top: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 12;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 2px;
  li {
    font-size: 11px;
    border-radius: 8px;
    border: 1px solid #e2e2e2;
    padding: 4px 8px;
    background-color: #fff;
  }
`

const StyledCanvasBox = styled.div<StyledCanvasFittingComponentProps>`
  width: ${(props) => props.$width}px;
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  display: flex !important;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${(props) => props.$borderRadius};
  transition: background-color 0.5s ease-in-out;
  padding-top: 22px;
`
interface StyledCanvasBoxInnerProps {
  $width: number
  $height: number
}
const StyledCanvasBoxInner = styled.div<StyledCanvasBoxInnerProps>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  position: relative;
  aspect-ratio: 1 / 2.162629757785467;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
`
const StyledCanvasMoreBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 0, 47, 0.48);
  z-index: var(--more-bg-level);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-white);
    line-height: 1.2;
    text-align: center;
  }
`
const StyledCanvasMoreText = styled.div`
  position: absolute;
  z-index: var(--more-text-level);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex !important;
  justify-content: center;
  align-items: center;
  p {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-white);
    line-height: 1.2;
    text-align: center;
  }
`

interface CanvasFittingComponentProps {
  width: number // 넓이 px 로 되어 있음 <<< canvas 최적화를 위해 width, height 를 px 로 받아옴
  avatarWidth: number // 실질적인 아바타에 뿌려지는 이미지의 넓이
  avatarHeight?: number // 실질적인 아바타에 뿌려지는 이미지의 높이
  items: string | ProductStyleRecommendDto[] // 아바타에 뿌려질 이미지들 put_on_image_url
  borderRadius?: string // 아바타에 뿌려질 이미지들 border-radius
  gender?: string // 아바타에 뿌려질 이미지들 genderType
  isShow?: boolean
  isWish?: boolean
  more?: boolean // 더보기 버튼
  showWish?: boolean
  select?: boolean
  iconSize?: number // 아이콘 사이즈
  onClick?: (data: string) => void // 더보기 버튼 클릭시 이벤트
  styleWidth?: string
  seasonTypes?: string
}

export default function CanvasFittingComponent({
  width,
  avatarWidth,
  avatarHeight = avatarWidth * AVATARRATIO,
  items,
  styleWidth,
  borderRadius = '0px',
  gender = 'F',
  more = false,
  showWish = false,
  isShow = false,
  isWish = false,
  select = false,
  iconSize = 24,
  seasonTypes,
  onClick,
}: CanvasFittingComponentProps) {
  const styleLook = useScopedI18n('common')
  const [ref, isHover] = useHover()
  const [detailRef, isDetailHover] = useHover()
  const [opacity, setOpacity] = useState(0)
  const [loadedItems, setLoadedItems] = useState({})

  const detailColor = () => {
    if (isDetailHover) return colorPoint
    if (isHover) return colorPlaceholderGrey
    return colorTransparent
  }

  useEffect(() => {
    if (typeof items !== 'string' && items.length > 0) {
      items.forEach((item, index) => {
        const img = new Image()
        img.src = item.putOnImageUrl ?? defaultAvatar
        img.onload = () => setLoadedItems((prev) => ({ ...prev, [item.id ?? 0 + index]: true }))
      })
    } else {
      setOpacity(1)
    }
  }, [items])

  const setAvatarImg = () => {
    if (gender === 'M') {
      return defaultAvatarMale
    }
    return defaultAvatar
  }

  const avatar = setAvatarImg() // 아바타 이미지

  const renderItems = () => {
    if (typeof items === 'string') {
      return (
        <div
          className="canvasAb"
          style={{
            width: `${Math.floor(avatarWidth)}px`,
            height: `${Math.floor(avatarHeight)}px`,
            backgroundImage: `url(data:image/png;base64,${items})`,
            backgroundSize: `${Math.floor(avatarWidth)}px ${Math.floor(avatarHeight)}px`,
            opacity,
            transition: 'opacity 1.25s ease-in-out',
          }}
        />
      )
    }
    try {
      return items.map((item, index) => {
        return (
          <div
            key={item.id ?? 0 + index}
            style={{
              width: `${Math.floor(avatarWidth)}px`,
              height: `${Math.floor(avatarHeight)}px`,
              position: 'absolute',
              left: '50%',
              top: '0',
              right: '0',
              bottom: '0',
              transform: 'translateX(-50%)',
              backgroundImage: `url(${item.putOnImageUrl ?? avatar})`,
              backgroundSize: `${Math.floor(avatarWidth)}px ${Math.floor(avatarHeight)}px`,
              opacity: loadedItems[item.id ?? 0 + index] ? 1 : 0,
              transition: 'opacity 1.25s ease-in-out',
            }}
          />
        )
      })
    } catch (e) {
      console.log('error', e)
      return <div />
    }
  }

  return (
    <StyledCanvasBox $width={width} $borderRadius={borderRadius} style={styleWidth ? { width: styleWidth } : {}}>
      <StyledCanvasBoxInner $width={Math.floor(avatarWidth)} $height={Math.floor(avatarHeight)}>
        {/* 아바타 */}
        <div
          className="canvasAb"
          style={{
            width: `${Math.floor(avatarWidth)}px`,
            height: `${Math.floor(avatarHeight)}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundImage: `url(${avatar})`,
            backgroundSize: `${Math.floor(avatarWidth)}px ${Math.floor(avatarHeight)}px`,
          }}
        />
        {/* 상품 */}
        {seasonTypes && <StyledSeason>{translateSeason(seasonTypes)}</StyledSeason>}
        {renderItems()}
      </StyledCanvasBoxInner>

      {/* 더보기 영역 */}
      {more && (
        <StyledCanvasMoreBG>
          <p>{styleLook('style')}</p>
          <p>{styleLook('more')}</p>
        </StyledCanvasMoreBG>
      )}
      {/* {more && (
        <StyledCanvasMoreText>
          <p>스타일</p>
          <p>더보기</p>
        </StyledCanvasMoreText>
      )} */}
      {/* 호버 영역 */}
      <div className="canvasAb" ref={isShow ? (ref as React.MutableRefObject<HTMLDivElement>) : null}>
        <BorderUi
          border={`1px solid ${select ? 'var(--color-point)' : colorTransparent}`}
          borderRadius={borderRadius}
        />
        {isShow && (
          <div
            ref={detailRef as React.MutableRefObject<HTMLDivElement>}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              position: 'absolute',
              left: '4px',
              top: '4px',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (onClick) onClick('detail')
            }}
            onKeyDown={() => {
              if (onClick) onClick('detail')
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to detail button"
          >
            <IconReadingGlasses width={iconSize} height={iconSize} stroke={detailColor()} />
          </div>
        )}
      </div>
    </StyledCanvasBox>
  )
}
