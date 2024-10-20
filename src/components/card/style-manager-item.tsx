import { defaultProductItems, genderF } from '@/constants/constant'
import { StyleRecommendResDto } from '@/services/generated/lookstore.schemas'
import '@/styles/look-component.scss'
import { translateSeason } from '@/utils/utils'
import StyleFittingComponent from '../fitting/style-fitting-component'
import { StyledManagerCard } from './card-style'

interface StyleManagerItemProps {
  item: StyleRecommendResDto
  isTitle?: boolean
  isBorder?: boolean
  seasonTypes?: string
}
export default function StyleManagerItem({
  item,
  isTitle = true,
  isBorder = true,
  seasonTypes,
}: StyleManagerItemProps) {
  return (
    <StyledManagerCard $isBorder={isBorder}>
      {isTitle && (
        <div className="style_manager_styles">
          <span>
            {item.styleKeywords
              ?.split(',')[0]
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')}
          </span>{' '}
          style
        </div>
      )}
      <div className="look_style_wrap">
        {seasonTypes && <ul className="look_season">{translateSeason(seasonTypes)}</ul>}
        <StyleFittingComponent
          gender={item.products && item.products?.length > 0 ? item.products[0].genderType ?? genderF : genderF}
          itemsUrl={item.products?.map((product) => product.putOnImageUrl) ?? defaultProductItems}
          mergedImg={item.compositeImage ? item.compositeImage : undefined}
        />
      </div>
      {/* <div className="style_manager_colors">
        <div className="color_container">
          {item.products?.map((product) => {
            return (
              <UiColorText key={product.id} color={isHexColor(product.colorType ?? '')} text="" theme="onlyColor" />
            )
          })}
        </div>
      </div> */}
    </StyledManagerCard>
  )
}
