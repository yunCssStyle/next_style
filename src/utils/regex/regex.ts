// 이메일 정규식
export const regexEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// 비밀번호 정규식 PASSWORD_MIN_LENGTH >>
export const regexPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{10,32}$/
// 인증번호 정규식
export const regexCertificationNumber: RegExp = /^[a-zA-Z0-9]{6}$/
// 파일 첨부
export const regexExcelFile: RegExp = /\.(xlsx|xls|csv)$/
// 최소 1글자 이상
export const regexMinLength: RegExp = /^.{1,}$/
// -1 이 아닌
export const regexNotMinusOne: RegExp = /^[^-1]+$/
// 계정 삭제 관련
export const regexAccountDelete: RegExp = /^계정 삭제하기$/
// 1글자 이상 공백 비허용
export const regexMinLengthNoSpace: RegExp = /^\S+$/
// 공백 있는지 확인
export const regexSpace: RegExp = /\s/
export const regexCheck = (text: string, regex: RegExp): boolean => {
  // 정규식 검사 함수
  try {
    return regex.test(text)
  } catch (error) {
    return false
  }
}

export const formatNumberWithComma = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const removeCommaFromNumber = (value: string): string => {
  return value.replace(/,/g, '')
}
