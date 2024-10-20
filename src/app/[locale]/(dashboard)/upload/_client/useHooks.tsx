'use client'

import { TableSkeleton } from '@/app/ui/skeleton'
import { showFileStatusList } from '@/components/table/components/table-components'
import Table from '@/components/table/table'
import { PRODICT_FILE_SEARCJ_LIMIT, SEARCH_TIME } from '@/constants/numbers'
import { ProductFileResDto } from '@/services/generated/managerstore.schemas'
import { useScopedI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { useUploadFilterStore, setIsInsert } from '@/stores/upload-filter'
import { useUserInfoStore } from '@/stores/user-info'
import { headerProductFile, dataTextI18 } from '@/types/tables/props'
import { showSnakbar, stringToNumber } from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

export default function useHooks() {
  const router = useRouter()
  const upload = useScopedI18n('upload')
  const [currentPage, setCurrentPage] = useQueryState('page')
  const [totalItems, setTotalItems] = useState<ProductFileResDto[]>([]) // 검색한 전체 아이템
  const [pageTotal, setPageTotal] = useState<number>(0) // 전체 페이지
  // 검색 시 적용
  const [loading, setLoading] = useState<boolean>(true) // 로딩
  const [debouncedFilter, setDebouncedFilter] = useState<boolean>(false) // 필터 변경 시 디바운스 값 설정

  const isInsert = useUploadFilterStore((state) => state.isInsert)
  const profile = useUserInfoStore((state) => state.profile)

  const fetchData = async () => {
    if (currentPage === null) return
    setLoading(true)
    const filter = {
      page: stringToNumber(currentPage ?? '0'),
      direction: 'DESC',
      orderBy: 'CREATED_AT',
      size: PRODICT_FILE_SEARCJ_LIMIT,
    }
    try {
      const data = await interceptorClient.put('/productUpload', { params: filter })
      if (data.data.content) {
        setTotalItems(data.data.content)
      }
      if (data.data.totalElements) {
        setPageTotal(data.data.totalElements)
      } else {
        setPageTotal(0)
      }
    } catch (error: any) {
      console.log('error', error)
      setTotalItems([])
      setPageTotal(0)
      showSnakbar('', error.message, profile)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentPage === null) return
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])
  // 필터 변경 시 디바운스
  useEffect(() => {
    if (debouncedFilter && isInsert) {
      // debouncedFilter 값이 true일 때만 실행
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter])
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('0')
      setIsInsert(false)
      return setDebouncedFilter(true)
    }, SEARCH_TIME)
    return () => {
      setIsInsert(false)
      setDebouncedFilter(false) // 검색 시간이 지나면 디바운스 값 false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInsert])

  // table 클릭 이벤트 관련
  const handleSetData = (id: number[], keys: any[]) => {
    if (keys[0] === 'click') {
      router.push(`/upload/${id[0]}`)
    }
  }

  const renderView = (): React.ReactNode => {
    if (loading) {
      return <TableSkeleton searchNum={PRODICT_FILE_SEARCJ_LIMIT} />
    }
    const headerProduct = dataTextI18(upload, headerProductFile)
    return (
      <Table
        header={headerProduct.map((item) => {
          if (item.i18n === 'cell-reg') {
            return {
              ...item,
              dataRender: (data) =>
                showFileStatusList(data, [upload('cell-reg-ing'), upload('cell-reg-ed'), upload('cell-reg-fail')]),
            }
          }
          return item
        })}
        data={totalItems}
        selectItem={null}
        handleSetData={handleSetData}
      />
    )
  }

  return {
    pageTotal,
    currentPage,
    setCurrentPage,
    renderView,
  }
}
