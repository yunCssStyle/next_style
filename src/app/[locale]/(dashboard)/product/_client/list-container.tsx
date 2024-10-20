'use client'

import Paging from '@/components/paginate/paging'
import Scroll from '@/components/scroll/scroll'
import { PRODUCT_SEARCH_LIMIT } from '@/constants/numbers'
import { useScopedI18n } from '@/locales/client'
import Filter from './filter'
import styles from './list-container.module.scss'
import Search from './search'
import useHooks from './useHooks'
import View from './viewer'

export default function ListContainer() {
  const {
    dataFilter,
    dataBrand,
    dataVendorList,
    ref,
    viewType,
    pageTotal,
    currentPage,
    setCurrentPage,
    renderList,
    renderTable,
    handleChangedActive,
  } = useHooks()
  const prod = useScopedI18n('prod')
  return (
    <div className="container">
      <div className="flex_row filterContainer">
        <div className="left_box">
          {/* 좌측 */}
          <span
            className="f_12 f_m"
            style={{
              paddingRight: '0.6rem',
            }}
          >
            {prod('viewer')}:
          </span>
          {/* 테이블 뷰 */}
          <View handleActive={(active) => handleChangedActive(active)} />
        </div>
        <div className="right_box">
          <Filter data={dataFilter} dataVendorList={dataVendorList} dataBrand={dataBrand} />
          <Search />
        </div>
      </div>
      <div className="container_search_result">
        <Scroll>
          <div
            style={{
              width: '100%',
            }}
          >
            <div className={styles.container}>
              {viewType === 'simply' ? (
                <div className={styles.flexWrap} ref={ref}>
                  {renderList()}
                </div>
              ) : (
                <>{renderTable()}</>
              )}
              {/* 페이징 영역 */}
              <Paging
                currentPage={currentPage}
                totalPage={pageTotal}
                setPage={setCurrentPage}
                pageSize={PRODUCT_SEARCH_LIMIT}
              />
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  )
}
