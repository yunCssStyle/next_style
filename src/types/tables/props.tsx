import {
  showCheckBox,
  showLinkDownLoadDataFile,
  showDate,
  showProductInfo,
  showShipment,
  showFileStatus,
  showLongText,
  showFileStatusList,
} from '@/components/table/components/table-components'
import { TableHeaderProps } from '../props/props'
// 상품 페이지 관련
export const headerProduct: TableHeaderProps[] = [
  {
    key: ['id', 'checked'],
    className: 'table_fix_small table_center',
    render: showCheckBox(['all', 'false'], () => {}),
    dataRender: showCheckBox,
  },
  {
    key: ['mainImageUrl', 'code', 'id'],
    className: 'table_fix_mid',
    render: '상품 번호',
    dataRender: showProductInfo,
    width: '200px',
    dataEvent: 'selected',
    i18n: 'prod.prod-no-blank',
  },
  {
    key: ['name'],
    width: '15%',
    className: 'table_fix_mid',
    render: '상품명',
    dataRender: null,
    i18n: 'modal.goods-name',
  },
  {
    key: ['categories'],
    width: '15%',
    className: 'table_fix_mid',
    render: '아이템',
    dataRender: null,
    i18n: 'common.item',
  },
  {
    key: ['colorType'],
    className: 'table_fix_mid_s table_center',
    render: '컬러',
    dataRender: null,
    i18n: 'common.color',
  },
  {
    key: ['patternType'],
    className: 'table_fix_mid_s table_center',
    render: '패턴',
    dataRender: null,
    i18n: 'common.pattern',
  },
  {
    key: ['seasonTypes'],
    width: '15%',
    className: 'table_fix_mid table_center',
    render: '시즌',
    dataRender: null,
    i18n: 'common.season',
  },
  {
    key: ['price'],
    className: 'table_fix_mid_s table_center',
    render: '정상가',
    dataRender: null,
    i18n: 'common.price',
  },
  {
    key: ['priceDiscount'],
    className: 'table_fix_mid_s table_center',
    render: '할인가',
    width: '90px',
    dataRender: null,
    i18n: 'common.price-discount',
  },
  {
    key: ['detailSiteUrl'],
    width: '15%',
    className: 'table_fix_mid',
    render: '상품URL',
    dataRender: null,
    i18n: 'common.detail-site-url',
  },
  {
    key: ['brand'],
    width: '120px',
    className: 'table_fix_mid_s table_center',
    render: '브랜드',
    dataRender: null,
    i18n: 'common.brand',
  },
  {
    key: ['genderType'],
    className: 'table_fix_small table_center',
    render: '성별',
    dataRender: null,
    i18n: 'common.gender',
  },
  {
    key: ['activated'],
    className: 'table_fix_mid',
    width: '120px',
    render: '상태',
    dataRender: null,
    i18n: 'common.state',
  },
  {
    key: ['id'],
    className: 'table_fix_small',
    render: '기타',
    dataRender: null,
    dataEvent: 'showModal',
    i18n: 'common.etc',
  },
]
// 상품 검색 모달 관련
export const headerSearchProduct: TableHeaderProps[] = [
  {
    key: ['mainImageUrl', 'code', 'id'],
    className: 'table_big f_over_ellipsis',
    render: '상품 번호',
    dataRender: showProductInfo,
    dataEvent: 'selected',
    i18n: 'prod.prod-no-blank',
  },
  {
    key: ['colorType'],
    className: 'table_fix_mid_s',
    render: '컬러',
    dataRender: null,
    i18n: 'common.color',
  },
  {
    key: ['brand'],
    className: 'table_fix_mid_s',
    render: '브랜드',
    dataRender: null,
    i18n: 'common.brand',
  },
  {
    key: ['line'],
    className: 'table_fix_small',
    render: '라인',
    dataRender: null,
    i18n: 'common.line',
  },
  {
    key: ['categoryType'],
    className: 'table_fix_mid_s',
    render: '아이템',
    dataRender: null,
    i18n: 'common.item',
  },
  {
    key: ['year'],
    className: 'table_fix_small',
    render: '년도',
    dataRender: null,
    i18n: 'common.year',
  },
  {
    key: ['seasonType'],
    className: 'table_fix_small',
    render: '시즌',
    dataRender: null,
    i18n: 'common.season',
  },
  {
    key: ['shipmentMonth', 'shipmentWeek'],
    className: 'table_fix_mid_s',
    render: '출고차순',
    dataRender: showShipment,
  },
]

// 상품 업로드 관련
export const headerProductFile: TableHeaderProps[] = [
  {
    key: ['infoFileName', 'id'],
    className: 'table_big_flex1',
    render: '데이터 파일 명',
    dataRender: showLinkDownLoadDataFile,
    i18n: 'table-file-name',
  },
  {
    key: ['imageZipFileName', 'id'],
    className: 'table_big_flex1',
    render: '이미지 파일 명',
    dataRender: showLinkDownLoadDataFile,
    i18n: 'table-image-name',
  },
  {
    key: ['createdBy'],
    className: 'table_fix_mid',
    render: '등록인',
    dataRender: null,
    i18n: 'table-create-user',
  },
  {
    key: ['createdAt'],
    className: 'table_big_flex1',
    render: '등록일',
    dataRender: (data) => showDate(data, 'MM-DD-YYYY HH:mm'),
    i18n: 'table-create-date',
  },
  {
    key: ['pending', 'done', 'rejected'],
    className: 'table_big_flex1',
    render: '상태',
    dataRender: (data) => showFileStatusList(data),
    i18n: 'cell-reg',
  },
]
// 상품 업로드 상세 관련
export const headerProductFileDetail: TableHeaderProps[] = [
  {
    key: ['imageFileUrl', 'code'],
    className: 'table_big_flex1 justifyContent_start p_l_1 ',
    render: '상품 번호',
    dataRender: showProductInfo,
    i18n: 'prod.prod-no-blank',
  },
  {
    key: ['genderType'],
    className: 'table_fix_mid',
    render: '성별',
    dataRender: null,
    i18n: 'common.gender',
  },
  {
    key: ['color'],
    className: 'table_fix_small',
    render: '컬러',
    dataRender: null,
    width: '100px',
    i18n: 'common.color',
  },
  {
    key: ['brand'],
    width: '15%',
    className: 'table_fix_mid',
    render: '브랜드',
    dataRender: null,
    i18n: 'common.brand',
  },
  {
    key: ['category'],
    className: 'table_fix_mid',
    render: '아이템',
    dataRender: null,
    i18n: 'common.item',
  },
  {
    key: ['season'],
    className: 'table_fix_small',
    render: '시즌',
    dataRender: null,
    width: '300px',
    i18n: 'common.season',
  },
  {
    key: ['createdAt'],
    className: 'table_big_flex1',
    render: '등록일',
    dataRender: (data) => showDate(data, 'MM-DD-YYYY HH:mm'),
    i18n: 'upload.table-create-date',
  },
  {
    key: ['status'],
    className: 'table_fix_mid',
    render: '상태',
    dataRender: (data) => showFileStatus(data),
    i18n: 'common.state',
  },
  {
    key: ['errors'],
    className: 'table_big_flex1',
    render: '비고',
    dataRender: showLongText,
    i18n: 'common.note',
  },
]

export const dataTextI18 = (t: any, data: any) => {
  return data.map((item) => {
    if (item.i18n) {
      return {
        ...item,
        render: t(item.i18n),
      }
    }
    return item
  })
}
