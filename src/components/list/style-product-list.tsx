'use client'

import { styled } from 'styled-components'
import Image from 'next/image'
import { getTextColorFromHex, isHexColor, setTextColor } from '@/utils/utils'
import { defaultImage } from '@/constants/constant'
import Label from '../button/label'
import { ProductStyleRecommendDto } from '@/services/generated/managerstore.schemas'

const StyledProductList = styled.div`
  width: 104px;
  height: auto;
  padding: 0.5rem 0.75rem 0.75rem 0.75rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid var(--color-grey);
`

const StyledImg = styled.div`
  width: 80px;
  height: 88px;
  position: relative;
  text-align: center;
`
const StyledInfoCode = styled.div`
  width: 100%;
  font-size: 0.625rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-black);
`

const StyledInfoPrdCategory = styled.div`
  width: 100%;
  font-size: 0.625rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-placeholder-grey);
`
interface StyleProductListProps {
  product: ProductStyleRecommendDto
}
export default function StyleProductList({ product }: StyleProductListProps) {
  // const wish: boolean = false
  // const getDefaultCategory = () => {
  //   if (product.type === 'DEFAULT') {
  //     if (product.categories?.length) {
  //       if (product.categories.length > 1) {
  //         return product.categories[1].name
  //       }
  //       return product.categories[0].name
  //     }
  //     return ''
  //   }
  //   return product.categoryLabel
  // }
  return (
    <StyledProductList>
      <StyledImg>
        <Image
          src={product.mainImageUrl ?? defaultImage}
          width={80}
          height={88}
          alt="product image"
          loading="lazy"
          quality={85}
          style={{ objectFit: 'contain' }}
        />
      </StyledImg>
      <StyledInfoCode>{product.type === 'DEFAULT' ? 'DEFAULT ITEM' : product.code}</StyledInfoCode>
      {/* <StyledInfoPrdCategory>{getDefaultCategory()}</StyledInfoPrdCategory>
      <div className="text_center">
        <Label
          authHeight
          theme="warning"
          width="auto"
          borderRadius="100px"
          paddingLR="0.5rem"
          bgColor={isHexColor(product.colorType ?? '')}
          textColor={setTextColor(getTextColorFromHex(isHexColor(product.colorType ?? '')))}
          lineHeight="0.9"
        >
          {product.colorType}
        </Label>
      </div>
      <div className="text_center">
        {product.patternType ? (
          <Label theme="default" borderRadius="100px" width="auto" authHeight paddingLR="0.5rem" lineHeight="0.9">
            {product.patternType}
          </Label>
        ) : (
          <div
            style={{
              height: '19px',
            }}
          />
        )}
      </div> */}
    </StyledProductList>
  )
}
