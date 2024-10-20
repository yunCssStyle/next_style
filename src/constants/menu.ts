import { CommonCodeDto } from '@/services/generated/managerstore.schemas'

export interface ITopMenu {
  name: string
  path: string
  badge: string
}
// 상단 메뉴 리스트
export const topMenu: ITopMenu[] = [
  // {
  //   name: 'style',
  //   path: '/style',
  //   badge: 'AI',
  // },
  {
    name: 'prod',
    path: '/product',
    badge: '',
  },
  {
    name: 'reg-prod',
    path: '/upload',
    badge: '',
  },
]
// 프로필 누를때 메뉴 리스트
// export const profilMenu: CommonCodeDto[] = [
//   {
//     name: '마이페이지',
//     code: 'mypage',
//     parentCode: 'profilMenu',
//     i18n: 'menu.my-page',
//   },
//   {
//     name: '로그아웃',
//     code: 'logout',
//     parentCode: 'profilMenu',
//     i18n: 'menu.logout',
//   },
// ]
export interface CommonCodeWithI18nDto extends CommonCodeDto {
  i18n?: string
}
// 상품 더보기 아이콘 메뉴
export const productTableMenu: CommonCodeWithI18nDto[] = [
  {
    name: '편집',
    code: 'editProduct',
    parentCode: 'productTableMenu',
    i18n: 'menu.edit',
  },
  {
    name: '즐겨찾기',
    code: 'wishProduct',
    parentCode: 'productTableMenu',
    i18n: 'menu.wish',
  },
]
// 스타일 룩북 메뉴 리스트
export const styleLookbookMenu: CommonCodeDto[] = [
  {
    name: '복제',
    code: 'copy',
    parentCode: 'styleLookbookMenu',
  },
  {
    name: '공유',
    code: 'share',
    parentCode: 'styleLookbookMenu',
  },
  {
    name: '삭제',
    code: 'delete',
    parentCode: 'styleLookbookMenu',
  },
]
// 스타일 룩북 메뉴 리스트
export const styleLookbookDetailMenu: CommonCodeDto[] = [
  {
    name: '복제',
    code: 'copy',
    parentCode: 'styleLookbookDetailMenu',
  },
  {
    name: '이동',
    code: 'move',
    parentCode: 'styleLookbookDetailMenu',
  },
  {
    name: '삭제',
    code: 'delete',
    parentCode: 'styleLookbookDetailMenu',
  },
]
export const dataMenuTextI18 = (t: any, data: any) => {
  return data.map((item) => {
    if (item.i18n) {
      return {
        ...item,
        name: t(item.i18n),
      }
    }
    return item
  })
}
