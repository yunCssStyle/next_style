import { LOOKBOOK_MAX_LENGTH, NICKNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/numbers'
import {
  errEmptyLookBookGroupTitle,
  errFormCertificationNumber,
  errFormEmail,
  errFormPassword,
  errLookBookGroupTitleMaxLength,
  errNickNameMaxLength,
  errNickNameNotSpace,
} from '@/constants/text'
import { regexAccountDelete, regexEmail, regexMinLength, regexPassword } from '@/utils/regex/regex'
import { z } from 'zod'

// 공통
// 이메일 관련
const emailZod = z.string().min(3, { message: errFormEmail }).regex(regexEmail, {
  message: errFormEmail,
})
// 비밀번호 관련
const passwordZod = z.string().min(PASSWORD_MIN_LENGTH, { message: errFormPassword }).regex(regexPassword, {
  message: errFormPassword,
})
// 인증코드 관련
const certificationNumberZod = z.string().min(6, { message: errFormCertificationNumber }).max(6)
// 닉네임 관련
const nickNameZod = z
  .string()
  .min(1, { message: errNickNameMaxLength })
  .max(NICKNAME_MAX_LENGTH, { message: errNickNameMaxLength })
  .refine((value) => !value.includes(' '), errNickNameNotSpace)

// 회원삭제 관련
const withDrawZod = z
  .string()
  .min(7, { message: '계정삭제를 입력해주세요.' })
  .regex(regexAccountDelete, { message: '계정삭제 형식이 아닙니다.' })
// 룩북 제목 관련
const lookBookGroupTitleZod = z
  .string()
  .min(1, { message: errEmptyLookBookGroupTitle })
  .max(LOOKBOOK_MAX_LENGTH, { message: errLookBookGroupTitleMaxLength })
// 룩북 메모 관련
const lookBookTitleZod = z.string().min(1, { message: '룩북메모를 입력해주세요.' })
const lookBookMemoZod = z.string().min(1, { message: '룩북메모를 입력해주세요.' })
// 닉네임 관련
export const NickNameSchema = z.object({
  nickName: nickNameZod,
})
export type NickNameType = z.infer<typeof NickNameSchema>
// 룩북 관련
export const LookBookGroupSchema = z.object({
  lookBookGroup: lookBookGroupTitleZod,
})
export type LookBookGroupType = z.infer<typeof LookBookGroupSchema>
// 룩북 한개 관련 -> 추가 시
export const LookBookSchema = z.object({
  lookBookMemo: lookBookMemoZod,
})
export type LookBookType = z.infer<typeof LookBookSchema>
// 룩북 한개 관련 -> 수정 시
export const LookBookEditSchema = z.object({
  lookBookTitle: lookBookTitleZod,
  lookBookMemo: lookBookMemoZod,
})
export type LookBookTypeEdit = z.infer<typeof LookBookEditSchema>
// 상품 관련
const productCodeZod = z.string().min(1, { message: '상품코드를 입력해주세요.' }).regex(regexMinLength, {
  message: '상품코드를 입력해주세요.',
})
const productUrlZod = z.string().min(1, { message: '상품 페이지 URL를 입력해주세요.' }).regex(regexMinLength, {
  message: '상품 페이지 URL를 입력해주세요.',
})
const productNameZod = z.string().min(1, { message: '상품명를 입력해주세요.' }).regex(regexMinLength, {
  message: '상품명를 입력해주세요.',
})
const productPriceZod = z.string().min(1, { message: '정상 가격을 입력해주세요.' })
const productPriceDiscountZod = z.string()

const productLineZod = z.string().min(1, { message: '상품라인을 입력해주세요.' })
const productYearZod = z.number().min(1, { message: '상품년도를 입력해주세요.' })
const productSeasonZod = z.string().min(1, { message: '상품시즌을 입력해주세요.' })
const prodcutShipmentMonthZod = z.number().min(1, { message: '상품출고월을 입력해주세요.' })
const productShipmentWeekZod = z.number().min(1, { message: '상품출고주를 입력해주세요.' })
const prdocutLotZod = z.string().min(1, { message: '상품로트를 입력해주세요.' })
const prodcutActivated = z.boolean()
// 상품 수정 관련
export const ProductEditSchema = z.object({
  code: productCodeZod,
  url: productUrlZod,
  name: productNameZod,
  price: productPriceZod,
  priceDiscount: productPriceDiscountZod,
  // line: productLineZod,
  // year: productYearZod,
  // seasonType: productSeasonZod,
  // shipmentMonth: prodcutShipmentMonthZod,
  // shipmentWeek: productShipmentWeekZod,
  // lot: prdocutLotZod,
  activated: prodcutActivated,
})
export type ProductEditType = z.infer<typeof ProductEditSchema>
// 비밀번호 변경 관련
export const PasswordChangeSchema = z.object({
  password: passwordZod,
  passwordCheck: passwordZod,
  beforePassword: passwordZod,
})
export type PasswordChangeType = z.infer<typeof PasswordChangeSchema>
// 계정 삭제 관련
export const AccountDeleteSchema = z.object({
  withDraw: withDrawZod,
})
export type AccountDeleteType = z.infer<typeof AccountDeleteSchema>
// 로그인 관련
export const LoginSchema = z.object({
  email: emailZod,
  password: passwordZod,
})
export type LogInType = z.infer<typeof LoginSchema>
// 회원 가입 관련
export const SignUpSchema = z.object({
  email: emailZod,
  certificationNumber: certificationNumberZod,
  password: passwordZod,
  passwordCheck: passwordZod,
})
// .superRefine(({ password, passwordCheck }, ctx) => {
//   if (passwordCheck !== password) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'password not matched',
//       path: ['checkPassword'],
//     })
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'password not matched',
//       path: ['password'],
//     })
//   }
// })
export type SingUpType = z.infer<typeof SignUpSchema>

// input field warning message
export interface InputWarningProps {
  isWarning?: boolean
  warningMessage?: string
}
