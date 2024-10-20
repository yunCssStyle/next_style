'use client'

import { PRODICT_FILE_DETAIL_SEARCH_LIMIT } from '@/constants/numbers'
import Paging from '@/components/paginate/paging'
import { stringToNumber } from '@/utils/utils'
import { useEffect } from 'react'
import styles from './container.module.scss'
import useDetailHooks from './useDetailHooks'

export default function DetailList({ params }: { params: string }) {
  const { currentPage, pageTotal, debouncedFilter, fetchData, setCurrentPage, renderView } = useDetailHooks()

  useEffect(() => {
    if (debouncedFilter === true) {
      fetchData(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter, currentPage])

  return (
    <div className={styles.container}>
      <div>{renderView()}</div>
      {/* 페이징 영역 */}
      <Paging
        currentPage={stringToNumber(currentPage ?? '0')}
        totalPage={pageTotal}
        setPage={(page) => setCurrentPage(page.toString())}
        pageSize={PRODICT_FILE_DETAIL_SEARCH_LIMIT}
      />
    </div>
  )
}
