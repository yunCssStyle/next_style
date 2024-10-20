import { styled } from 'styled-components'
import Image from 'next/image'
import { defaultImage } from '@/constants/constant'
import { isHexColor } from '@/utils/utils'
import UiColorText from '../ui/ui-color-text'

const StyledStyleDetailProductList = styled.div`
  width: 100%;
  height: 50px;
  gap: 0.5rem;
  padding: 0.23rem 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .img_box {
    width: 40px;
    height: 42.5px;
    position: relative;
    margin-right: 0.5rem;
  }
  .code_box {
    flex: 1;
  }
  .category_box {
    width: 80px;
  }
  .color_box {
    width: 80px;
  }
  .check_box {
    width: 80px;
  }
  .text_bold {
    font-weight: 700;
    font-size: 0.75rem;
    color: var(--color-black);
  }
  .text_reg {
    font-size: 0.75rem;
    color: var(--color-black);
  }
`
interface StyleDetailProductListProps {
  item: any
}
export default function StyleDetailProductList({ item }: StyleDetailProductListProps) {
  const defaultItemCategory = (): string => {
    if (item && item.categories && item.categories.length > 0) {
      if (item.categories.length >= 2 && item.categories[1].name) {
        return item.categories[1].name
      }
      if (item.categories[0].name) {
        return item.categories[0].name
      }
    }
    if (item && item.categoryType) {
      return item.categoryType.label
    }
    return ''
  }
  return (
    <StyledStyleDetailProductList>
      <div className="img_box">
        <Image
          src={item.mainImageUrl ?? defaultImage}
          width={40}
          height={42}
          sizes="40px"
          alt="product image"
          loading="lazy"
          quality={85}
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/* 코드 */}
      <div className="code_box f_over_ellipsis text_bold text_center">
        {item.type === 'CUSTOMER' ? item.code : 'DEFAULT'}
      </div>
      {/* 카테고리 */}
      <div className="category_box f_over_ellipsis text_reg text_center">
        {item.type === 'CUSTOMER' ? item.categoryType?.label : defaultItemCategory()}
      </div>
      {/* 컬러 */}
      <div className="color_box f_over_ellipsis text_reg text_center">
        <UiColorText
          isEllipsis
          fontSize="0.75rem"
          color={isHexColor(item.colorType ?? '')}
          text={item.colorType ?? ''}
        />
      </div>
      {/* 패턴 */}
      <div className="check_box f_over_ellipsis text_reg text_center">{item.patternType}</div>
    </StyledStyleDetailProductList>
  )
}
