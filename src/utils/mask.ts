// import { CategoryFemale, CategoryMan } from '@/constants/category'
// import { lineMask, maskLongM, topHighMask, topLowMask, topMaskM, vestMaskWide } from '@/constants/constant'
// import { ProductStyleRecommendDto } from '@/services/generated/lookstore.schemas'
// // 성별 타입
// type GenderType = 'F' | 'M'
// // 상품 interface
// interface ProductAddCategory extends ProductStyleRecommendDto {
//   category: CategoryFemale | CategoryMan
// }
// // 상품 카테고리 설정
// export const categoryType = (item: ProductStyleRecommendDto, { gender = 'F' }: { gender?: GenderType }) => {
//   const categories = item.categories ?? []
//   if (gender === 'F') {
//     // 여자
//     if (categories.some((category) => category.id === 1) && categories.some((category) => category.id === 11)) {
//       return CategoryFemale.vest
//     }
//     if (categories.some((category) => category.id === 1)) {
//       return CategoryFemale.outer
//     }
//     if (categories.some((category) => category.id === 4)) {
//       return CategoryFemale.dress
//     }
//     if (categories.some((category) => category.id === 3)) {
//       return CategoryFemale.top
//     }
//     if (categories.some((category) => category.id === 13)) {
//       return CategoryFemale.pants
//     }
//     if (categories.some((category) => category.id === 14)) {
//       return CategoryFemale.skirt
//     }
//     if (categories.some((category) => category.id === 21)) {
//       return CategoryFemale.bag
//     }
//     if (categories.some((category) => category.id === 22)) {
//       return CategoryFemale.shoes
//     }
//     if (categories.some((category) => category.id === 23)) {
//       return CategoryFemale.accHat
//     }
//     if (categories.some((category) => category.id === 24)) {
//       return CategoryFemale.accGlasses
//     }
//     if (categories.some((category) => category.id === 25)) {
//       return CategoryFemale.accScarf
//     }
//     if (categories.some((category) => category.id === 26)) {
//       return CategoryFemale.accMuffler
//     }
//     if (categories.some((category) => category.id === 27)) {
//       return CategoryFemale.accSocks
//     }
//     if (categories.some((category) => category.id === 28)) {
//       return CategoryFemale.accGloves
//     }
//   } else if (gender === 'M') {
//     // 남자
//     if (categories.some((category) => category.id === 361) && categories.some((category) => category.id === 369)) {
//       return CategoryMan.vest
//     }
//     if (categories.some((category) => category.id === 361)) {
//       return CategoryMan.outer
//     }
//     if (categories.some((category) => category.id === 371)) {
//       return CategoryMan.pants
//     }
//     if (categories.some((category) => category.id === 363)) {
//       return CategoryMan.top
//     }
//     if (categories.some((category) => category.id === 364) && categories.some((category) => category.id === 456)) {
//       return CategoryMan.suitjacket
//     }
//     if (categories.some((category) => category.id === 364) && categories.some((category) => category.id === 455)) {
//       return CategoryMan.suitshirts
//     }
//     if (categories.some((category) => category.id === 364) && categories.some((category) => category.id === 458)) {
//       return CategoryMan.suitvest
//     }
//     if (categories.some((category) => category.id === 364) && categories.some((category) => category.id === 457)) {
//       return CategoryMan.suitpants
//     }
//     if (categories.some((category) => category.id === 364)) {
//       return CategoryMan.suit
//     }
//     if (categories.some((category) => category.id === 377)) {
//       return CategoryMan.shoes
//     }
//     //
//     if (categories.some((category) => category.id === 376)) {
//       return CategoryMan.bag
//     }
//     if (categories.some((category) => category.id === 378)) {
//       return CategoryMan.accHat
//     }
//     if (categories.some((category) => category.id === 381)) {
//       return CategoryMan.accMuffler
//     }
//     if (categories.some((category) => category.id === 380)) {
//       return CategoryMan.accScarf
//     }
//     if (categories.some((category) => category.id === 382)) {
//       return CategoryMan.accSocks
//     }
//     return CategoryMan.random
//   }
//   return CategoryFemale.random
// }
// // 계절 정보 가져오기
// export const isOnlySummer = (item: ProductAddCategory) => {
//   if (item && item.seasonTypes && item.seasonTypes.toUpperCase() === 'SUMMER') {
//     // 여름만 있다면...
//     return true
//   }
//   return false
// }
// // 최상단 입혀지는 옷 찾기
// export const findTopClosetIndex = (items: ProductAddCategory[], gender: string) => {
//   if (gender === 'M') {
//     return items.findLastIndex(
//       (item) =>
//         item.category === CategoryMan.outer ||
//         item.category === CategoryMan.vest ||
//         item.category === CategoryMan.suitvest ||
//         item.category === CategoryMan.suitjacket ||
//         item.category === CategoryMan.suitshirts ||
//         item.category === CategoryMan.top,
//     )
//   }
//   return items.findLastIndex(
//     (item) =>
//       item.category === CategoryFemale.outer ||
//       item.category === CategoryFemale.vest ||
//       item.category === CategoryFemale.dress ||
//       item.category === CategoryFemale.top,
//   )
// }
// // 최 상단 아우터 인덱스 찾기
// export const findOuterIndex = (items: ProductAddCategory[], gender: string) => {
//   if (gender === 'M') {
//     return items.findLastIndex((item) => item.category === CategoryMan.outer)
//   }
//   return items.findLastIndex((item) => item.category === CategoryFemale.outer)
// }
// // hood 여부 확인하기
// export const isHoodProduct = (item: ProductAddCategory) => {
//   const categories = item.categories ?? []
//   if (
//     categories.some((category) => category.id === 133) ||
//     categories.some((category) => category.id === 138) ||
//     categories.some((category) => category.id === 140)
//   ) {
//     return true
//   }
//   return false
// }
// // top 마스크가 인덱스 찾기
// export const isNeedTopMask = (items: ProductAddCategory[], gender: string) => {
//   if (gender === 'M') {
//     if (items.filter((item) => item.category === CategoryMan.top).length > 1) {
//       return items.findLastIndex((item) => item.category === CategoryMan.top)
//     }
//   }
//   if (items.filter((item) => item.category === CategoryFemale.top).length > 1) {
//     return items.findLastIndex((item) => item.category === CategoryFemale.top)
//   }
//   return -1
// }
// // vest 마스크 찾기
// export const isVestMask = (items: ProductAddCategory[], gender: string) => {
//   if (gender === 'M') {
//     if (
//       items.filter((item) => item.category === CategoryMan.vest || item.category === CategoryMan.suitvest).length > 1
//     ) {
//       return items.findLastIndex((item) => item.category === CategoryMan.vest || item.category === CategoryMan.suitvest)
//     }
//   }
//   return -1
// }
// // top 마스크가 라인 탑인지 확인하기
// export const isLineTop = (item: ProductAddCategory) => {
//   const lineMaskingIds: number[] = [19, 120, 134, 139, 144]
//   if (item.category.length === 0) {
//     return false
//   }
//   return (item.categories ?? []).filter((x) => lineMaskingIds.includes(x.id)).length > 0
// }
// // dress && top 마스크 찾기
// export const isNeedDressTopMask = (items: ProductAddCategory[]) => {
//   return (
//     items.filter((element) => element.category === CategoryFemale.top).length > 0 && // top 검색
//     items.filter((element) => element.category === CategoryFemale.dress).length > 0 && // dress 검색
//     // dress 가 top보다 위에 위치 할때
//     items.findLastIndex((element) => element.category === CategoryFemale.top) <
//       items.findLastIndex((element) => element.category === CategoryFemale.dress)
//   )
// }
// // dress && top 마스크 종류 구분
// export const kindDressTopMask = (items: ProductAddCategory[]) => {
//   const useDressMasking: number[] = [146, 149]
//   // dress 는 최대 2개만 입을 수 있으니 변수로 설정..
//   let isDress: number = 0
//   const dressLength: number = items.filter((element) => element.category === CategoryFemale.dress).length
//   const fD: ProductAddCategory = items[items.findIndex((element) => element.category === CategoryFemale.dress)]
//   if (dressLength > 1) {
//     // 1개 보다 크면 마지막 값이 dress 마스킹 처리 해야하는지 구분함
//     const lD: ProductAddCategory = items[items.findLastIndex((element) => element.category === CategoryFemale.dress)]
//     if (
//       lD &&
//       lD.category === CategoryFemale.dress &&
//       (lD.categories ?? []).filter((x) => useDressMasking.includes(x.id)).length === 0
//     ) {
//       return 2
//     }
//     isDress = 1
//   }
//   // 첫번째 dress 마스킹 처리 해야하는지 구분
//   if (
//     fD &&
//     fD.category === CategoryFemale.dress &&
//     (fD.categories ?? []).filter((x) => useDressMasking.includes(x.id)).length === 0
//   ) {
//     return 2
//   }
//   isDress = 1

//   return isDress
// }

// // 마스크 파일 있는지 확인 하는 함수
// export const getMaskFile = (
//   items: ProductStyleRecommendDto[],
//   index: number,
//   { gender = 'F' }: { gender: GenderType },
// ) => {
//   // 상품 카테고리 일괄 설정
//   const itemAddCate: ProductAddCategory[] = items.map((item) => {
//     return {
//       ...item,
//       category: categoryType(item, { gender }),
//     }
//   })
//   const cateType = itemAddCate[index].category
//   if (gender === 'M') {
//     // 남자 마스크 이미지 확인
//     if (
//       cateType === CategoryMan.random ||
//       cateType === CategoryMan.pants ||
//       cateType === CategoryMan.suitpants ||
//       cateType === CategoryMan.suit ||
//       cateType === CategoryMan.shoes ||
//       cateType === CategoryMan.bag ||
//       cateType === CategoryMan.accHat ||
//       cateType === CategoryMan.accGlasses ||
//       cateType === CategoryMan.accMuffler ||
//       cateType === CategoryMan.accScarf ||
//       cateType === CategoryMan.accSocks
//     ) {
//       // 마스킹 필요 없는 파일 분별 작업
//       return undefined
//     }
//     // 최상단 입은 옷 마스킹 제외
//     const lastClosetIndex = findTopClosetIndex(itemAddCate, gender)
//     if (lastClosetIndex === index) {
//       return undefined
//     }
//     // 최 상단 아우터 인덱스 찾기
//     const lastOuterIndex = findOuterIndex(itemAddCate, gender)
//     if (lastOuterIndex > -1) {
//       // 아우터가 있을 경우
//       if (!isOnlySummer(itemAddCate[lastOuterIndex])) {
//         return topMaskM
//       }
//       return topMaskM
//     }
//     // 아우터 없을 경우
//     // top 마스크 로직
//     const topMaskIndex = isNeedTopMask(itemAddCate, gender)
//     if (topMaskIndex > -1) {
//       if (index < topMaskIndex) {
//         return maskLongM
//       }
//     }
//     // vest 마스크
//     const vestMaskIndex = isVestMask(itemAddCate, gender)
//     if (vestMaskIndex > -1) {
//       if (index < vestMaskIndex) {
//         return vestMaskWide
//       }
//     }
//   }
//   // 여자 마스크!!!!!
//   if (
//     cateType === CategoryFemale.random ||
//     cateType === CategoryFemale.accGlasses ||
//     cateType === CategoryFemale.accGloves ||
//     cateType === CategoryFemale.accHat ||
//     cateType === CategoryFemale.accMuffler ||
//     cateType === CategoryFemale.accScarf ||
//     cateType === CategoryFemale.accSocks ||
//     cateType === CategoryFemale.shoes ||
//     cateType === CategoryFemale.bag ||
//     cateType === CategoryFemale.skirt ||
//     cateType === CategoryFemale.pants
//   ) {
//     // 마스킹 필요 없는 파일 분별 작업
//     return undefined
//   }
//   // 최상단 입은 옷 마스킹 제외
//   const lastClosetIndex = findTopClosetIndex(itemAddCate, gender)
//   if (lastClosetIndex === index) {
//     return undefined
//   }
//   // 최 상단 아우터 인덱스 찾기
//   const lastOuterIndex = findOuterIndex(itemAddCate, gender)
//   if (lastOuterIndex > -1) {
//     // 아우터가 있을 경우
//     if (index < lastOuterIndex) {
//       // 아우터일 경우
//       if (isHoodProduct(itemAddCate[index])) {
//         // console.log('outer hood mask!', index, lastOuterIndex)
//         // 후드 아이템일 경우
//         if (!isOnlySummer(itemAddCate[lastOuterIndex])) {
//           return topLowMask
//         }
//         return topHighMask
//       }
//       // 그 외 아우터들..
//       if (!isOnlySummer(itemAddCate[lastOuterIndex])) {
//         // ㄱㅔ절이 겨울일 경우
//         // console.log('outer winter mask!', index, lastOuterIndex)
//         return topLowMask
//       }
//       // console.log('outer summer mask!', index, lastOuterIndex)
//       return topHighMask
//     }
//   } else {
//     // 아우터가 없을 경우
//     // top 마스크 로직
//     const topMaskIndex = isNeedTopMask(itemAddCate, gender)
//     if (topMaskIndex > -1) {
//       if (index < topMaskIndex) {
//         if (isLineTop(itemAddCate[topMaskIndex])) {
//           // 라인 일 경우 옆에 살리는 마스크
//           // console.log('top & top line mask!', index)
//           return lineMask
//         }
//         if (!isOnlySummer(itemAddCate[topMaskIndex])) {
//           // ㄱㅔ절이 겨울일 경우
//           // console.log('top & top winter mask!', index)
//           return topLowMask
//         }
//         // console.log('top & top summer mask!', index)
//         return topHighMask
//       }
//       return undefined
//     }
//     // 드레스 && 탑 인 경우
//     const dressTopIndex = isNeedDressTopMask(itemAddCate)
//     if (dressTopIndex) {
//       // 드레스 & 탑 마스킹 필요한 경우!
//       if (kindDressTopMask(itemAddCate) === 1) {
//         // 라인 마스크
//         return lineMask
//       }
//       // console.log('top & dress top mask!', index)
//       if (!isOnlySummer(itemAddCate[topMaskIndex])) {
//         // ㄱㅔ절이 겨울일 경우
//         return topLowMask
//       }
//       return topHighMask
//     }
//     //
//   }
//   // 그 외 상황...
//   return undefined
// }
