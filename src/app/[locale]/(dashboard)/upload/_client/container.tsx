'use client'

import Scroll from '@/components/scroll/scroll'
import { PRODICT_FILE_SEARCJ_LIMIT } from '@/constants/numbers'
import { stringToNumber } from '@/utils/utils'
import Paging from '@/components/paginate/paging'
import useHooks from './useHooks'
import styles from './container.module.scss'
import FilterContainer from './filter-container'

export default function UploadContainer() {
  const { pageTotal, currentPage, setCurrentPage, renderView } = useHooks()
  return (
    <div className="container">
      <div className="container_search_result">
        <Scroll>
          <div
            style={{
              width: '100%',
            }}
          >
            <div className={styles.container}>
              <FilterContainer data={pageTotal} />
              {renderView()}
              {/* 페이징 영역 */}
              <Paging
                currentPage={stringToNumber(currentPage ?? '0')}
                totalPage={pageTotal}
                setPage={(page) => setCurrentPage(page.toString())}
                pageSize={PRODICT_FILE_SEARCJ_LIMIT}
              />
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  )
}
