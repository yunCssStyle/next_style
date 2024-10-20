'use client'

import { TableSkeleton } from '@/app/ui/skeleton'
import { showFileStatus } from '@/components/table/components/table-components'
import Table from '@/components/table/table'
import { PRODICT_FILE_DETAIL_SEARCH_LIMIT, SEARCH_TIME } from '@/constants/numbers'
import { useI18n } from '@/locales/client'
import { ProductExcelImportQuery, ProductExcelImportResDto } from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import { useUploadFilterStore, setExcelData } from '@/stores/upload-filter'
import { useUserInfoStore } from '@/stores/user-info'
import { headerProductFileDetail, dataTextI18 } from '@/types/tables/props'
import { showSnakbar, stringToNumber } from '@/utils/utils'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export default function useDetailHooks() {
  // zustand 사용 - 유저 정보
  const profile = useUserInfoStore((state) => state.profile)
  const code = useUploadFilterStore((state) => state.code)
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useUploadFilterStore((state) => state.state)
  const t = useI18n()
  const [currentPage, setCurrentPage] = useQueryState('page')
  const [totalItems, setTotalItems] = useState<ProductExcelImportResDto[]>([]) // 검색한 전체 아이템
  const [pageTotal, setPageTotal] = useState<number>(0) // 전체 페이지
  // 검색 시 적용
  const [loading, setLoading] = useState<boolean>(true) // 로딩
  const [debouncedFilter, setDebouncedFilter] = useState<boolean>(false) // 필터 변경 시 디바운스 값 설정

  // 네트워크 통신 - 상품 리스트 조회
  const fetchData = async (params: string) => {
    setLoading(true)
    const filter: ProductExcelImportQuery = {
      orderBy: 'CREATED_AT',
      direction: 'DESC',
      page: stringToNumber(currentPage ?? '0'),
      size: PRODICT_FILE_DETAIL_SEARCH_LIMIT,
      // status: 'DONE',
    }
    if (code.trim() !== '') filter.code = code.trim()
    if (state) filter.status = state
    setExcelData(null)
    try {
      const data = await interceptorClient.post('/productUpload/imports', {
        id: stringToNumber(params),
        params: filter,
      })
      if (data.data.content) {
        setTotalItems(data.data.content)
      }
      if (data.data.meta) {
        setExcelData(data.data.meta)
      }
      if (data.data.totalElements) {
        setPageTotal(data.data.totalElements)
      } else {
        setPageTotal(0)
      }
    } catch (error: any) {
      setTotalItems([])
      setPageTotal(0)
      setExcelData(null)
      showSnakbar('', error.message, profile)
    } finally {
      setLoading(false)
    }
  }

  // 필터 변경 시 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('0')
      return setDebouncedFilter(true)
    }, SEARCH_TIME)
    return () => {
      setDebouncedFilter(false) // 검색 시간이 지나면 디바운스 값 false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, state])

  const renderView = (): React.ReactNode => {
    if (loading) {
      return <TableSkeleton searchNum={PRODICT_FILE_DETAIL_SEARCH_LIMIT} />
    }

    const headerProductDetail = dataTextI18(t, headerProductFileDetail)
    // console.log('totalItems', totalItems)
    return (
      <Table
        header={headerProductDetail.map((item) => {
          if (item.i18n === 'common.state') {
            return {
              ...item,
              dataRender: (data: any) => {
                let dataText: string
                switch (data[0].value) {
                  case 'PENDING':
                    dataText = t('upload.cell-reg-ing')
                    break
                  case 'DONE':
                    dataText = t('upload.cell-reg-ed')
                    break
                  case 'REJECTED':
                    dataText = t('upload.cell-reg-fail')
                    break
                  default:
                    dataText = ''
                    break
                }
                return showFileStatus(data, dataText)
              },
            }
          }
          return item
        })}
        data={totalItems}
        selectItem={null}
        rowHeight="auto"
      />
    )
  }

  return {
    currentPage,
    pageTotal,
    debouncedFilter,
    fetchData,
    setCurrentPage,
    renderView,
  }
}
