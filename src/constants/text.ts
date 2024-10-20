import { LOOKBOOK_MAX_LENGTH, NICKNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './numbers'

// common
export const errUnknown = '알 수 없는 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.'
export const errView = '화면을 불러오는데 실패했습니다.'
export const errApiCall = 'API 호출에 실패했습니다.'
// form error
export const errFormEmail = '올바른 이메일 형식이 아닙니다.'
export const errFormPassword = `${PASSWORD_MIN_LENGTH}자 이상의 영문+숫자 조합을 입력해주세요.`
export const errFormCertificationNumber = '6자리 인증코드를 입력해주세요.'
export const errNickNameMaxLength = `닉네임은 ${NICKNAME_MAX_LENGTH}자 이내로 입력해주세요.` // add
export const errNickNameNotSpace = '닉네임으로 공백은 입력할 수 없습니다.' // 로그인 화면
// 로그인 화면
export const errNotMatchEmailOrPassword =
  '이메일 주소 또는 비밀번호가 일치하지 않습니다.\n입력한 내용을 다시 확인해 주세요.'
export const errNotMatchCertificationNumber =
  '입력하신 인증 코드가 일치하지 않습니다.\n입력한 내용을 다시 확인해 주세요.'
export const errNotMatchPassword = '입력하신 비밀번호가 일치하지 않습니다.\n입력한 내용을 다시 확인해 주세요.'
export const errLogin = '아이디 혹은 비밀번호를 확인해 주세요.'
// 회원가입 화면 / 비밀번호 변경 화면
export const succSendEmail = '입력하신 이메일로 인증코드를 발급 했습니다.'
export const succVerCode = '이메일 인증이 완료 되었습니다.'
export const succSignUp = '계정을 성공적으로 생성했습니다.'
export const succPasswrordChange = '비밀번호를 성공적으로 변경했습니다.'
export const errNotSamePassword = '비밀번호가 일치하지 않습니다.'
// 상품 페이지
export const errUploadLink = '파일 업로드 링크 생성에 실패했습니다. 다시 시도해 주세요.'
export const errUploadLength = '파일 업로드가 일부 실패했습니다. 다시 시도해 주세요.'
export const errUploadDB = '파일 업로드 후 데이터베이스 저장에 실패했습니다. 다시 시도해 주세요.'
export const succUploadFile = '파일 업로드에 성공했습니다.'
export const notSelectRecommendStyle = '선택한 상품으로 생성할 수 있는 스타일이 없습니다.'
export const activeFalseRecommendStyle = '비활성화된 상품은 스타일을 생성할 수 없습니다.'
export const succActiveState = '상품의 활성화 상태를 변경했습니다.'
export const errActiveState = '상품의 활성화 상태 변경에 실패했습니다.'
export const succWishState = '상품의 즐겨찾기 상태를 변경했습니다.'
export const errNotSelecteProduct = '선택된 상품이 없습니다.'
export const succEditProduct = '상품 정보 수정을 완료했습니다.'
// 룩북
export const succCopyLookbookLink = '클립보드에 공유링크를 복사했습니다.'
export const errCopyLookbookLink = '공유링크 복사에 실패하였습니다'
export const errAddLookBookGroup = '룩북 생성에 실패했습니다.'
export const errEmptyLookBookGroupTitle = '룩북 제목을 입력해주세요.'
export const errLookBookGroupTitleMaxLength = `룩북 제목은 ${LOOKBOOK_MAX_LENGTH}자 이내로 입력해주세요.`
export const succAddLookBookGroup = '새로운 룩북이 추가되었습니다.'
export const succDeleteLookBookGroup = '룩북 삭제에 성공했습니다.'
export const errDeleteLookBookGroup = '룩북 삭제에 실패했습니다.'
export const warDeleteLookBookGroup = '룩북은 최소 1개 이상 존재해야 합니다.'
export const errCopyLookBookGroup = '룩북 복제에 실패했습니다.'
export const succCopyLookBookGroup = '룩북 복제에 성공했습니다.'
export const errFavoriteLookBookGroup = '룩북 즐겨찾기에 실패했습니다.'
export const succFavoriteLookBookGroup = '룩북 즐겨찾기에 성공했습니다.'
export const errEditTitleLookBookGroup = '룩북 제목을 수정하지 못했습니다.'
export const succEditTitleLookBookGroup = '룩북 제목을 성공적으로 수정했습니다.'
export const myFirstLookBook = '나의 첫 룩북'
export const errAddLookBook = '스타일 저장에 실패했습니다.'
export const succAddLookBook = '스타일이 저장되었습니다.'
export const errDeleteLookBook = '스타일 삭제에 실패했습니다.'
export const succDeleteLookBook = '스타일을 성공적으로 삭제했습니다.'
export const errEmptyLookBookTitle = '스타일 제목을 입력해 주세요.'
export const errLookBookTitleMaxLength = `스타일 제목은 ${LOOKBOOK_MAX_LENGTH}자 이내로 입력해주세요.`
export const errEmptyLookBookMemo = '스타일 메모를 입력해 주세요.'
export const succLookBook = '스타일을 성공적으로 수정했습니다.'
export const errLookBook = '스타일 수정에 실패했습니다.'
export const errCopyLookBook = '스타일 복제에 실패했습니다.'
export const succCopyLookBook = '스타일을 성공적으로 복제했습니다.'
export const errSelectGroupMoveLookBook = '스타일을 이동할 룩북을 선택해 주세요.'
export const errMoveLookBookGroup = '스타일 이동에 실패했습니다.'
export const succMoveLookBookGroup = '스타일을 성공적으로 이동했습니다.'
export const lookbookGroupPlaceholder = '스타일 제목을 입력해주세요'
// mypage
export const succEditProfil = '아바타를 성공적으로 변경했습니다.'
export const succEditName = '닉네임을 성공적으로 변경했습니다.'
export const succEditPassword = '비밀번호를 성공적으로 변경했습니다.'
export const errEditPassword = '신규 비밀번호가 맞지 않습니다.'
export const succDeleteAccount = '계정을 성공적으로 삭제했습니다. 로그인페이지로 이동합니다.'
export const errNickName = `닉네임은 ${NICKNAME_MAX_LENGTH}자 이내로 입력해주세요.` // add

export const metaTitle = '추천 스타일 보기'
export const metaDescription = '이런 스타일로 입어보면 어떨까?'
