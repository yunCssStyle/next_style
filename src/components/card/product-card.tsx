'use client'

import { defaultImage } from '@/constants/constant'
import { colorPlaceholderGrey, colorPoint, colorTransparent } from '@/constants/theme'
import useHover from '@/hook/useHover'
import { ProductResDto } from '@/services/generated/managerstore.schemas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import IconEdit from '../icons/icon-edit'
import {
  StyledProductCard,
  StyledProductCardActive,
  StyledProductCardEdit,
  StyledProductCardInner,
  StyledProductCardTitle,
  StyledProductCardWish,
} from './card-style'
import IconStar from '../icons/icon-start'
import React from "react"
// import IconStar from '../icons/icon-start'

interface IProductCardProps {
  item: ProductResDto
  select?: boolean
  cursor?: string
  isActive?: boolean
  handleCardClick: (id: number, type: string) => void
}

export default function ProductCard({
  item,
  select = false,
  cursor = 'pointer',
  isActive = false,
  handleCardClick,
}: IProductCardProps) {
  const router = useRouter()
  const [ref, isHover] = useHover()
  const [likeRef, isLike] = useHover()
  const [editRef, isEdit] = useHover()

  const editColor = () => {
    if (isEdit) return colorPoint
    if (isHover) return colorPlaceholderGrey
    return colorTransparent
  }
  const likeColorLine = (wish: boolean | undefined) => {
    if (wish === true) return colorPoint
    if (isLike) return colorPoint
    if (isHover) return colorPlaceholderGrey
    return colorTransparent
  }
  const likeColorFill = (wish: boolean | undefined) => {
    if (wish === true) return colorPoint
    if (isLike) return 'none'
    if (isHover) return 'none'
    return colorTransparent
  }

  return (
    <StyledProductCard ref={ref as React.MutableRefObject<HTMLDivElement | null>} $cursor={cursor}>
      <StyledProductCardInner $select={select}>
        <Image
          src={item.mainImageUrl ?? defaultImage}
          width={80}
          height={88}
          sizes="80px"
          alt="product image"
          quality={85}
          priority
          style={{ objectFit: 'contain' }}
        />
        <StyledProductCardWish
          ref={likeRef as React.MutableRefObject<HTMLDivElement>}
          role="button"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            handleCardClick(item.id ?? 0, 'like')
          }}
        >
          <IconStar fill={likeColorFill(item.myWished)} stroke={likeColorLine(item.myWished)} />
        </StyledProductCardWish>
        {isActive ? (
          <StyledProductCardActive
          // style={{
          //   backgroundColor: item.activated ? 'var(--color-gren)' : 'var(--color-red)',
          // }}
          />
        ) : (
          <StyledProductCardEdit
            ref={editRef as React.MutableRefObject<HTMLDivElement>}
            role="button"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation()
              router.push(`/product?editProd=${item.id}`)
            }}
          >
            <IconEdit stroke={editColor()} />
          </StyledProductCardEdit>
        )}
      </StyledProductCardInner>
      <StyledProductCardTitle>{item.name ?? item.code}</StyledProductCardTitle>
    </StyledProductCard>
  )
}
