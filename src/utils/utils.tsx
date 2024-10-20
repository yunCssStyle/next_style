import SnackBar from '@/components/snackbar/snackbar'
import { colorTextBlack, colorWhite } from '@/constants/theme'
import { CommonCodeDto, UserResDtoAuthoritiesItem, VendorResDto } from '@/services/generated/managerstore.schemas'
import { toast } from 'react-toastify'
// 관리자 인지 확인하는 함수
export const isAdmin = (role: UserResDtoAuthoritiesItem[]): boolean => {
  if (role.includes('ROLE_ADMIN')) {
    return true
  }
  return false
}
// 전체 선택 추가 함수
export const addAllCommonCode = (data: CommonCodeDto[], title: string): CommonCodeDto[] => {
  return [{ code: 'ALL', name: title }, ...data]
}
// 기본 밴더 추가 함수
export const addDefaultVendor = (data: VendorResDto[]): VendorResDto[] => {
  const defaultVendor = [
    { id: -1, name: '벤더' },
    { id: 0, name: '디폴트' },
  ]
  return [...defaultVendor, ...data]
}
// 밴더를 공통코드로 변환하는 함수
export const vendorToCommonCode = (data: VendorResDto[]): CommonCodeDto[] => {
  return data.map((item) => {
    return {
      code: `${item.id}`,
      name: item.name,
    }
  })
}
// 숫자인지 확인 하는 함수
export const isNumber = (num: string): boolean => {
  if (Number.isNaN(Number(num))) {
    return false
  }
  return true
}
export const stringToNumber = (num: string): number => {
  if (!isNumber(num)) {
    return 0
  }
  return Number(num)
}
// 스낵바 노출 함수
export const showSnakbar = (title: string, message: string, image: string | null) => {
  return toast(<SnackBar title={title} content={message} image={image} />, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
    // transition: Bounce,
  })
}
// 헥사값을 통한 밝기 여부 확인 하기 true -> 밝음, false -> 어두움
export const getTextColorFromHex = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}
export const setTextColor = (isBrightness: boolean) => {
  if (isBrightness) {
    return colorTextBlack
  }
  return colorWhite
}
// 컬러 헥사값 확인 함수
export const isHexColor = (data: string): string => {
  const value = data.toUpperCase()
  switch (value) {
    case 'WHITE':
      return '#ffffff'
    case 'GREY':
      return '#bebebe'
    case 'CHARCOAL':
      return '#707070'
    case 'BLACK':
      return '#000000'
    case 'IVORY':
      return '#fffff0'
    case 'BEIGE':
      return '#cdb48c'
    case 'SKY BLUE':
      return '#9fd3ff'
    case 'BLUE':
      return '#1601ff'
    case 'NAVY':
      return '#06008c'
    case 'BROWN':
      return '#673301'
    case 'CAMEL':
      return '#be7e29'
    case 'WINE':
      return '#6f0028'
    case 'KHAKI':
      return '#597248'
    case 'LIGHT PINK':
      return '#f5dbe0'
    case 'PINK':
      return '#ff99cc'
    case 'RED':
      return '#ff0002'
    case 'ORANGE':
      return '#fc6600'
    case 'SALMON':
      return '#faa994'
    case 'YELLOW':
      return '#fff164'
    case 'LAVENDER':
      return '#d6bffe'
    case 'PURPLE':
      return '#9701cb'
    case 'MINT':
      return '#a2f8ca'
    case 'LIGHT GREEN':
      return '#a7d840'
    case 'GREEN':
      return '#298c2b'
    case 'SILVER':
      return '#c0c0c0'
    case 'GOLD':
      return '#ffd700'
    default:
      return '#ffffff'
  }
}

const seasonTranslations = {
  SUMMER: '여름',
  SPRING: '봄',
  FALL: '가을',
  WINTER: '겨울',
}

export const translateSeason = (seasonTypes) => {
  const seasons = seasonTypes.split(',').map((season) => season.trim())
  return seasons.map((season) => <li key={season}>{seasonTranslations[season.toUpperCase()] || season}</li>)
}
export const translateSeasonSpan = (seasonTypes, locale = 'ko') => {
  const seasons = seasonTypes.split(',').map((season) => season.trim())
  if (locale === 'en') {
    return seasons.join(', ')
  }
  return seasons.map((season) => seasonTranslations[season.toUpperCase()] || season).join(', ')
}

export const isBorderColorChange = (color: string) => {
  return color.toUpperCase() === 'WHITE' || color.toUpperCase() === 'IVORY'
}

const keywordsTranslations = {
  FEMININE: '여성적인',
  SEXY: '섹시한',
  MANNISH: '남성적인',
  UNISEX: '유니섹스',
  CONTEMPORARY: '컨템포러리',
  MODERN: '현대적인',
  OFFICE: '오피스',
  SPORTY: '스포티',
  CASUAL: '캐주얼',
  CLASSIC: '클래식한',
  SIMPLE_BASIC: '기본적인',
  UNIQUE: '유니크',
  GIRLISH: '걸리시',
  PREPPY: '프레피 룩',
  DANDY: '댄디한',
  CHIC: '시크한',
  TRADITIONAL: '트래디셔널',
  BOYISH: '보이시',
}

export const translateKeyword = (keyword: string, lang: string): string | undefined => {
  if (lang === 'en') {
    return keyword
  }
  return keywordsTranslations[keyword] || undefined
}
