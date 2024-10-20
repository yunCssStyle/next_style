'use client'

import Button from '@/components/button/button'
import IconStar from '@/components/icons/icon-start'
import { colorPlaceholderGrey, colorWhite } from '@/constants/theme'
import { useProductFilterStore, setIsBookMark } from '@/stores/product-filter'
import { shallow } from 'zustand/shallow'

export default function ProductBookMarkFilterContainer() {
  // zustand 사용
  const [isBookMark] = useProductFilterStore((state) => [state.isBookMark], shallow)

  return (
    <Button
      paddingLR="0.5rem"
      theme={isBookMark ? 'primary' : 'secondary'}
      onClick={() => {
        setIsBookMark(!isBookMark)
      }}
      aria-label="bookmark"
    >
      <IconStar stroke={isBookMark ? colorWhite : colorPlaceholderGrey} fill={isBookMark ? colorWhite : '#none'} />
    </Button>
  )
}
