import { CommonCodeDto } from '@/services/generated/managerstore.schemas'

// 라디오 버튼 그룹 props
export interface RadioProps {
  label: string
  name: string
  value: string
}
// 스타일 시즌 필터
export const styleSeasonFilter: CommonCodeDto[] = [
  {
    code: 'SPRING',
    parentCode: 'styleSeason',
    name: 'SPRING',
    children: [],
  },
  {
    code: 'SUMMER',
    parentCode: 'styleSeason',
    name: 'SUMMER',
    children: [],
  },
  {
    code: 'FALL',
    parentCode: 'styleSeason',
    name: 'FALL',
    children: [],
  },
  {
    code: 'WINTER',
    parentCode: 'styleSeason',
    name: 'WINTER',
    children: [],
  },
]
// 년도 필터
export const yearFilter: CommonCodeDto[] = [
  {
    code: '2022',
    parentCode: 'year',
    name: '22년',
    children: [],
  },
  {
    code: '2023',
    parentCode: 'year',
    name: '23년',
    children: [],
  },
  {
    code: '2024',
    parentCode: 'year',
    name: '24년',
    children: [],
  },
  { code: '2025', parentCode: 'year', name: '25년', children: [] },
  { code: '2026', parentCode: 'year', name: '26년', children: [] },
  { code: '2027', parentCode: 'year', name: '27년', children: [] },
]
// 활성화, 비활성화 필터
export const activatedFilter: CommonCodeDto[] = [
  {
    code: 'true',
    parentCode: 'activated',
    name: '활성화',
    children: [],
  },
  {
    code: 'false',
    parentCode: 'activated',
    name: '비활성',
    children: [],
  },
]
// 주문 월 필터
export const shipmentMonthFilter: CommonCodeDto[] = [
  {
    code: '1',
    parentCode: 'shipmentMonth',
    name: '1월',
    children: [],
  },
  {
    code: '2',
    parentCode: 'shipmentMonth',
    name: '2월',
    children: [],
  },
  {
    code: '3',
    parentCode: 'shipmentMonth',
    name: '3월',
    children: [],
  },
  { code: '4', parentCode: 'shipmentMonth', name: '4월', children: [] },
  { code: '5', parentCode: 'shipmentMonth', name: '5월', children: [] },
  { code: '6', parentCode: 'shipmentMonth', name: '6월', children: [] },
  { code: '7', parentCode: 'shipmentMonth', name: '7월', children: [] },
  { code: '8', parentCode: 'shipmentMonth', name: '8월', children: [] },
  { code: '9', parentCode: 'shipmentMonth', name: '9월', children: [] },
  { code: '10', parentCode: 'shipmentMonth', name: '10월', children: [] },
  { code: '11', parentCode: 'shipmentMonth', name: '11월', children: [] },
  { code: '12', parentCode: 'shipmentMonth', name: '12월', children: [] },
]
// 주문 주 필터
export const shipmentWeekFilter: CommonCodeDto[] = [
  {
    code: '1',
    parentCode: 'shipmentWeek',
    name: '1주',
    children: [],
  },
  {
    code: '2',
    parentCode: 'shipmentWeek',
    name: '2주',
    children: [],
  },
  {
    code: '3',
    parentCode: 'shipmentWeek',
    name: '3주',
    children: [],
  },
  {
    code: '4',
    parentCode: 'shipmentWeek',
    name: '4주',
    children: [],
  },
  {
    code: '5',
    parentCode: 'shipmentWeek',
    name: '5주',
    children: [],
  },
  // {
  //   code: '6',
  //   parentCode: 'shipmentWeek',
  //   name: '6차',
  //   children: [],
  // },
  // {
  //   code: '7',
  //   parentCode: 'shipmentWeek',
  //   name: '7차',
  //   children: [],
  // },
  // {
  //   code: '8',
  //   parentCode: 'shipmentWeek',
  //   name: '8차',
  //   children: [],
  // },
  // {
  //   code: '9',
  //   parentCode: 'shipmentWeek',
  //   name: '9차',
  //   children: [],
  // },
  // {
  //   code: '0',
  //   parentCode: 'shipmentWeek',
  //   name: '0차',
  //   children: [],
  // },
  // {
  //   code: 'A',
  //   parentCode: 'shipmentWeek',
  //   name: 'A차',
  //   children: [],
  // },
  // {
  //   code: 'B',
  //   parentCode: 'shipmentWeek',
  //   name: 'B차',
  //   children: [],
  // },
  // {
  //   code: 'C',
  //   parentCode: 'shipmentWeek',
  //   name: 'C차',
  //   children: [],
  // },
  // {
  //   code: 'D',
  //   parentCode: 'shipmentWeek',
  //   name: 'D차',
  //   children: [],
  // },
  // {
  //   code: 'E',
  //   parentCode: 'shipmentWeek',
  //   name: 'E차',
  //   children: [],
  // },
  // {
  //   code: 'F',
  //   parentCode: 'shipmentWeek',
  //   name: 'F차',
  //   children: [],
  // },
  // {
  //   code: 'G',
  //   parentCode: 'shipmentWeek',
  //   name: 'G차',
  //   children: [],
  // },
  // {
  //   code: 'H',
  //   parentCode: 'shipmentWeek',
  //   name: 'H차',
  //   children: [],
  // },
  // {
  //   code: 'I',
  //   parentCode: 'shipmentWeek',
  //   name: 'I차',
  //   children: [],
  // },
  // {
  //   code: 'J',
  //   parentCode: 'shipmentWeek',
  //   name: 'J차',
  //   children: [],
  // },
  // {
  //   code: 'K',
  //   parentCode: 'shipmentWeek',
  //   name: 'K차',
  //   children: [],
  // },
  // {
  //   code: 'L',
  //   parentCode: 'shipmentWeek',
  //   name: 'L차',
  //   children: [],
  // },
  // {
  //   code: 'M',
  //   parentCode: 'shipmentWeek',
  //   name: 'M차',
  //   children: [],
  // },
  // {
  //   code: 'N',
  //   parentCode: 'shipmentWeek',
  //   name: 'N차',
  //   children: [],
  // },
  // {
  //   code: 'O',
  //   parentCode: 'shipmentWeek',
  //   name: 'O차',
  //   children: [],
  // },
  // {
  //   code: 'P',
  //   parentCode: 'shipmentWeek',
  //   name: 'P차',
  //   children: [],
  // },
  // {
  //   code: 'Q',
  //   parentCode: 'shipmentWeek',
  //   name: 'Q차',
  //   children: [],
  // },
  // {
  //   code: 'R',
  //   parentCode: 'shipmentWeek',
  //   name: 'R차',
  //   children: [],
  // },
  // {
  //   code: 'S',
  //   parentCode: 'shipmentWeek',
  //   name: 'S차',
  //   children: [],
  // },
]
