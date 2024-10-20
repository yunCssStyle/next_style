import {
  StyleRecommendResDto,
  UserEventDtoAttributes,
  UserEventDtoEventType,
  UserEventDtoInterfaceType,
  UserEventDtoReferrerInterfaceType,
  UserEventDtoShareType,
  UserEventDtoTriggerType,
  UserEventLog,
} from '@/services/generated/lookstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import lookClient from '@/services/mutator/lookClient'
import { getLocalStorage, getStyleUser, removeLocalStorage, setLocalStorage } from '@/stores/local-storage'
import { setUserEvent } from '@/stores/vendor-user-event'
import postMessageWeb from '@/utils/iframe-utils'
import _ from 'lodash'

export interface UserEventDtoF {
  attributes?: UserEventDtoAttributes
  categoryId?: number
  correlationId?: string
  displayedProductIds?: number[]
  displayIndex?: number
  eventTime?: string
  eventType?: UserEventDtoEventType
  interfaceType?: UserEventDtoInterfaceType
  previousEventId?: string
  productCode?: string
  productId?: number
  productPrice?: number
  quantity?: number
  referrerInterfaceType?: UserEventDtoReferrerInterfaceType
  sessionId?: string
  shareType?: UserEventDtoShareType
  stayTime?: number
  styleId?: number
  styleKeyword?: string
  triggerType?: UserEventDtoTriggerType
  userId?: string
}

// 사용자 이벤트 로그
export const vendorUserEventStorage = () => {
  const vendorUserEvent = getLocalStorage('vendorUserEvent')
  if (vendorUserEvent === null) return null
  const vendorUserEventJSON = JSON.parse(vendorUserEvent)
  return vendorUserEventJSON.state.userEvent
}
// 서버 시간과 세션 차이를 계산하는 헬퍼 함수
const getSessionDifference = async () => {
  const beforeVendorUserEvent = vendorUserEventStorage()
  // 서버에서 타임스탬프와 차이 값을 가져옴
  return interceptorClient
    .get('/server-time', { params: { beforeTime: beforeVendorUserEvent?.eventTime } })
    .then((res) => res.data)
}
// 상품 아이디 가져오는 함수
const getProductId = async (code: string): Promise<number | null> => {
  const storedValue = localStorage.getItem('detailContainer')
  const detailContainer = storedValue ? JSON.parse(storedValue).state.updateItem : null
  const product = _.find(_.flatMap(detailContainer?.styles, 'products'), { code })
  const productId = product ? product.id : null
  return productId
}

// 사용자 세션 아이디 생성 함수
const getStyleSessionId = async (): Promise<string> => {
  const { timestamp, differenceSession, isSameDate } = await getSessionDifference()
  const overTime = 30 * 60 * 1000
  let styleSessionId = getLocalStorage('styleSessionId')

  if (!styleSessionId || styleSessionId === 'null' || differenceSession > overTime || isSameDate === false) {
    removeLocalStorage('vendorUserEvent')
    const createStyleSessionId = () => `${getStyleUser()}_T${timestamp}`
    styleSessionId = createStyleSessionId()
    setLocalStorage('styleSessionId', styleSessionId)
  }
  return styleSessionId ?? 'null'
}

// API 이벤트 처리 함수
export const apiTokenEvent = async ({
  event,
  ip,
  code,
  uri,
}: {
  event: UserEventDtoF
  ip: string
  code?: string
  uri?: string
}) => {
  const sessionId = await getStyleSessionId()
  const commonEvent: UserEventDtoF = {
    eventTime: '',
    userId: getStyleUser(),
    sessionId,
  }
  if (code) {
    const productId = await getProductId(code)
    if (productId) commonEvent.productId = productId
  }
  let data: any = {
    event: {
      ...commonEvent,
      ...event,
    },
  }
  let url = '/api/look/vendor-user-event'
  if (uri) {
    url = '/api/look/vendor-user-event/shared-style'
    data = {
      uri,
      event: {
        ...commonEvent,
        ...event,
      },
    }
  }
  try {
    const result = await lookClient.post<UserEventLog>(url, data, { ip })
    setUserEvent(result as UserEventLog)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 모달/슬라이드 상품 노출
 * @param obj // 선택된 스타일정보와 아이템정보를 담은 객체
 * @param type // 슬라이드인지 모달인지 구분
 * @param triggerType // 이벤트 trigger
 */
export async function eventProductExposure({
  ip,
  obj,
  type,
  triggerType,
}: {
  ip: string
  obj: StyleRecommendResDto
  type: UserEventDtoInterfaceType
  triggerType?: boolean
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.PROD_EXPOS,
    interfaceType: type,
    displayedProductIds: _.compact(
      _.map(
        _.filter(obj?.products, (item) => item.type !== 'DEFAULT'),
        'id',
      ),
    ),
    triggerType: triggerType ? UserEventDtoTriggerType.EXPOSURE : UserEventDtoTriggerType.USER_CLICK,
    styleId: obj?.styleRecommendId,
    styleKeyword: obj?.styleKeywords,
  }
  apiTokenEvent({ event, ip })
}

/**
 * 모달/슬라이드 내 제품 클릭
 * @param id // 해당하는 아이템 아이디
 * @param index // 해당하는 아이템 인덱스
 * @param type // 슬라이드인지 모달인지 구분
 */
export async function eventProductClick({
  ip,
  id,
  index,
  type,
  code,
}: {
  ip: string
  id: number
  index: number
  type: UserEventDtoInterfaceType
  code?: string
}) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.PROD_CLK,
    interfaceType: type,
    productId: id,
    displayIndex: index + 1,
    previousEventId: beforeVendorUserEvent?.eventId,
  }
  if (code) {
    postMessageWeb(
      'customEvent',
      JSON.stringify({
        eventType: 'eventProductClick',
        type,
        productCode: code,
      }),
    )
  }
  apiTokenEvent({ event, ip })
}

/**
 * PDP 조회
 * @param code // 해당하는 아이템 아이디
 */
export async function eventPdpExposure({ ip, code }: { ip: string; code: string }) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.PDP_EXPOS,
    referrerInterfaceType: beforeVendorUserEvent?.interfaceType,
    correlationId: beforeVendorUserEvent?.correlationId,
    previousEventId: beforeVendorUserEvent?.eventId,
    productCode: code,
  }
  apiTokenEvent({ event, ip, code })
}

/**
 * PDP에서 '장바구니 담기' 버튼 클릭
 * @param code // 해당하는 아이템 아이디
 */
export async function eventPdpCartClick({ ip, code }: { ip: string; code: string }) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  const { differenceSession } = await getSessionDifference()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.PDP_CART_CLK,
    stayTime: differenceSession,
    correlationId: beforeVendorUserEvent.correlationId,
    previousEventId: beforeVendorUserEvent?.eventId,
    productCode: code,
  }
  apiTokenEvent({ event, ip, code })
}

/**
 * '썸네일 '장바구니 담기' 버튼 클릭 이벤트
 * @param id // 해당버튼이 클릭된 제품의 ID
 * @param price // 해당버튼이 클릭된 제품의 가격
 * @param index // 해당하는 아이템 인덱스
 * @param type // 슬라이드인지 모달인지 구분
 */
export async function eventAtcOpnClick({
  ip,
  id,
  price,
  index,
  type,
  uri,
}: {
  ip: string
  id: number
  price: number
  index: number
  type: UserEventDtoInterfaceType
  uri?: string
}) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.ATC_OPN_CLK,
    interfaceType: type,
    productId: id,
    productPrice: price,
    displayIndex: index + 1,
    correlationId: beforeVendorUserEvent.correlationId,
  }
  apiTokenEvent({ event, ip, uri })
}
/**
 * 최종 '장바구니 담기' 버튼 클릭
 * @param id // 해당버튼이 클릭된 제품의 ID
 * @param price // 해당버튼이 클릭된 제품의 가격
 * @param type // 슬라이드인지 모달인지 구분
 * @param quantity // 구매 수량
 */
export async function eventAtcClick({
  ip,
  id,
  price,
  type,
  index,
  quantity,
  options,
  uri,
}: {
  ip: string
  id: number
  price: number
  index: number
  type: UserEventDtoInterfaceType
  quantity: number
  options: any
  uri?: string
}) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.ATC_CLK,
    interfaceType: type,
    productId: id,
    productPrice: price,
    correlationId: beforeVendorUserEvent.correlationId,
    displayIndex: index,
    quantity,
    attributes: {
      options,
    },
  }
  apiTokenEvent({ event, ip, uri })
}

/**
 * 구매 완료 이벤트
 * @param code // 해당버튼이 클릭된 제품의 ID
 */
export async function eventPurchaseCompletion({ ip, code }: { ip: string; code: string }) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  const { differenceSession } = await getSessionDifference()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.PROD_PAID,
    stayTime: differenceSession,
    correlationId: beforeVendorUserEvent.correlationId,
    productCode: code,
  }
  apiTokenEvent({ event, ip, code })
}
/**
 * 더보기 이벤트
 * @param code // 해당버튼이 클릭된 제품의 ID
 * @param type // 슬라이드인지 모달인지 구분
 */
export async function eventMoreButtonClick({
  ip,
  code,
  type,
}: {
  ip: string
  code: string
  type: UserEventDtoInterfaceType
}) {
  const beforeVendorUserEvent = vendorUserEventStorage()
  const { differenceSession } = await getSessionDifference()
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.MORE_BTN_CLK,
    interfaceType: type,
    stayTime: differenceSession,
    correlationId: beforeVendorUserEvent.correlationId,
    previousEventId: beforeVendorUserEvent?.eventId,
    productCode: code,
  }
  apiTokenEvent({ event, ip, code })
}
/**
 * 공유하기 버튼 클릭 이벤트
 * @param productId // 공유된 제품의 ID
 * @param styleKeyword // 공유된 스타일의 스타일키워드
 * @param styleId // 공유된 스타일의 넘버
 */
export async function eventShareButtonClick({
  ip,
  productId,
  styleKeyword,
  styleId,
  uri,
}: {
  ip: string
  productId: number
  styleKeyword: string
  styleId: number
  uri?: string
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.SHR_BTN_CLK,
    interfaceType: UserEventDtoInterfaceType.SHARED_STYLE,
    productId,
    styleKeyword,
    styleId,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId
  apiTokenEvent({ event, ip, uri })
}
/**
 * 세부 공유방식 버튼 클릭 이벤트
 * @param productId // 공유된 제품의 ID
 * @param styleKeyword // 공유된 스타일의 스타일키워드
 * @param styleId // 공유된 스타일의 넘버
 * @param shareType // 공유 유형(카카오공유 - KAKAO/링크복사 - DIRECT)
 */
export async function eventDetailShareButtonClick({
  ip,
  productId,
  styleKeyword,
  styleId,
  shareType,
  uri,
}: {
  ip: string
  productId: number
  styleKeyword: string
  styleId: number
  shareType: UserEventDtoShareType
  uri?: string
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.DTL_SHR_BTN_CLK,
    interfaceType: UserEventDtoInterfaceType.SHARED_STYLE,
    productId,
    styleKeyword,
    styleId,
    shareType,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId
  apiTokenEvent({ event, ip, uri })
}
/**
 * 공유 페이지 조회 이벤트
 * @param productId // 공유된 제품의 ID
 * @param shareType // 공유 유형(카카오공유 - KAKAO/링크복사 - DIRECT)
 */
export async function eventSharePageExpos({
  ip,
  productId,
  shareType,
  uri,
}: {
  ip: string
  productId: number
  shareType: UserEventDtoShareType
  uri: string
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.SHR_PAGE_EXPOS,
    productId,
    shareType,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId

  apiTokenEvent({ event, ip, uri })
}
/**
 * 공유 구매하기 클릭 이벤트
 * @param ids // 전체 제품 ID 리스트
 * @param quantity // 전체 제품 수
 * @param productPrice // 전체 제품의 가격
 * @param carts // 장바구니 정보
 */
export async function eventShareButClick({
  ip,
  ids,
  quantity,
  productPrice,
  shareType,
  carts,
  uri,
}: {
  ip: string
  ids: number[]
  quantity: number
  productPrice: number
  shareType: UserEventDtoShareType
  carts: any
  uri: string
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    displayedProductIds: ids,
    eventType: UserEventDtoEventType.SHR_BUY_CLK,
    quantity,
    productPrice,
    interfaceType: UserEventDtoInterfaceType.SHARED_STYLE,
    shareType,
    attributes: {
      carts,
    },
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId

  apiTokenEvent({ event, ip, uri })
}
/**
 * 공유 쇼핑몰로 이동하기 버튼 클릭
 * @param productId // 공유된 제품의 ID
 * @param quantity // 전체 제품 수
 * @param productPrice // 전체 제품의 가격
 * @param shareType // 공유 유형(카카오공유 - KAKAO/링크복사 - DIRECT)
 */
export async function eventShareShopClick({
  ip,
  productId,
  shareType,
  uri,
}: {
  ip: string
  productId: number
  shareType: UserEventDtoShareType
  uri: string
}) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    productId,
    eventType: UserEventDtoEventType.SHR_SHOP_CLK,
    shareType,
    interfaceType: UserEventDtoInterfaceType.SHARED_STYLE,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId

  apiTokenEvent({ event, ip, uri })
}
/**
 * PDP 앵커 버튼 클릭 이벤트
 * @param code // 제품의 code
 */
export async function eventAnchorButtonClick({ ip, code }: { ip: string; code: string }) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.SCRL_ANC_CLK,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId
  apiTokenEvent({ event, ip, code })
}
/**
 * 모달 클릭 이벤트
 * @param code // 제품의 code
 */
export async function eventModalClick({ ip, code }: { ip: string; code: string }) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.MODAL_CLK,
    productCode: code,
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId
  apiTokenEvent({ event, ip })
}

/**
 * 모달 조회 이벤트
 * @param code // 제품의 code
 * @param id // 제품의 id
 */
export async function eventModalExpos({ ip, code, id }: { ip: string; code?: string; id?: number }) {
  // 요청 객체 생성
  const event: UserEventDtoF = {
    eventType: UserEventDtoEventType.MODAL_EXPOS,
  }
  if (id) {
    event.productId = id
  }
  const beforeVendorUserEvent = vendorUserEventStorage()
  if (beforeVendorUserEvent) event.correlationId = beforeVendorUserEvent.correlationId
  apiTokenEvent({ event, ip, code })
}
