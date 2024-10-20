import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

interface AddCommaProps {
  price: number
  currency?: string
}
// 숫자에 콤마를 추가하는 함수
export const addComma = ({ price, currency = '원' }: AddCommaProps): string => {
  try {
    if (Number.isNaN(price)) {
      return ''
    }
    const returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${currency === '$' ? '$' : ''}${returnString}${currency === '원' ? '원' : ''}`
  } catch (error) {
    return `${price}`
  }
}
// 날짜를 원하는 형식으로 변환하는 함수
export const formatDate = (date: Date, format: string): string => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.locale('ko')
  dayjs.extend(relativeTime)
  dayjs.tz.setDefault('Asia/Seoul')
  return dayjs(date).add(9, 'hours').format(format) // 서버에서 받은 시간은 UTC 시간이므로 9시간을 더해준다.
}
