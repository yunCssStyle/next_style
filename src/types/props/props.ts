import { UserResDto } from '@/services/generated/managerstore.schemas'

export interface SvgProps {
  width?: number
  height?: number
  viewBox?: string
  fill?: string
  bgColor?: string
  stroke?: string
  stroke1?: string
  transform?: string
}

export interface CanvasProps {
  x: number // 그리기 시작점 x
  y: number // 그리기 시작점 y
  w: number // 그리기 너비
  h: number // 그리기 높이
}
// worker canvas 관련
export interface WorkerCanvasProps {
  canvas: OffscreenCanvas
  image: string
  isAnim: boolean
  isMask: boolean
  maskSrc: string
  width: number
  height: number
  devicePixelRatio: number
}

// 로그인 폼 타입
export type FormSignInValues = {
  email: string
  password: string
}
// 비밀번호찾기, 회원가입 폼 타입
export type FormSignUpValues = {
  email: string
  password: string
  passwordCheck: string
  certificationNumber: string
}
// 닉네임 변경 폼 타입
export type FormNickNameValues = {
  nickName: string
}
// 비밀번호 변경 폼 타입
export type FormPasswordValues = {
  password: string
  passwordCheck: string
  beforePassword: string
}
// 회원 탈퇴
export type FormWithDrawValues = {
  withDraw: string
}
// 상품 검색 폼
export type ProductSearchValues = {
  searchText: string
  brand: string[]
}
// 상품 추가 폼
export type ProductFileValues = {
  excelFile: File | null
  zipFile: File | null
}
// 테이블 관련
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyFunctionType = (
  value: any[],
  handleSetData?: (id: number[], keys: any[], values: any[]) => void, // 부모 트리 구조 데이터 변경 함수
) => React.ReactNode
export interface TableHeaderProps {
  key: string[] // 데이터 매핑 키값 (컬럼 이름)
  className?: string // 추가할 className
  width?: string // 컬럼 너비
  render: React.ReactNode // 헤더에 들어갈 컴포넌트
  dataRender: MyFunctionType | null // 자식 컴포넌트에 들어갈 데이터 그대로 노출 시키려면 null 주입
  dataEvent?: string // 자식 컴포넌트에 이벤트 주입 여부
  i18n?: string // i18n 키값
}
// 모달 관련
export interface ModalProps {
  getData?: any
  groupId?: number
}
// 파라미터 관련
export type SearchParamProps = {
  params: { slug: string; locale: string }
  searchParams: Record<string, string> | null | undefined
}

export interface UserInfoProps {
  myProfile: UserResDto
}
