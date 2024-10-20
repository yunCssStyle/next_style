import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import styles from './paginate.module.scss'
import IconCaratLeft from '../icons/icon-carat-left'

interface PaginateProps {
  currentPage: number
  total: number
  pageSize: number
  marginTop?: string
  range?: number
  onPageChange: (page: number) => void
}
export default function Paginate({
  currentPage,
  total,
  pageSize,
  range = 3,
  marginTop = '50px',
  onPageChange,
}: PaginateProps) {
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    setTotalPages(Math.max(0, Math.ceil(total / pageSize)))
  }, [total, pageSize])
  return (
    <div
      style={{
        width: '100%',
        marginTop,
        paddingBottom: '50px',
      }}
    >
      {totalPages !== 0 && (
        <ReactPaginate
          forcePage={Math.max(0, currentPage - 1)}
          nextLabel={
            <div className={styles.next_pre}>
              <IconCaratLeft transform="rotate(180)" />
            </div>
          }
          onPageChange={(selectedItem: { selected: number }) => onPageChange(selectedItem.selected)}
          pageRangeDisplayed={range}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel={
            <div className={styles.next_pre}>
              <IconCaratLeft />
            </div>
          }
          pageClassName={styles.page_item}
          pageLinkClassName={styles.page_link}
          previousClassName={styles.page_item}
          previousLinkClassName={styles.page_link}
          nextClassName={styles.page_item}
          nextLinkClassName={styles.page_link}
          breakLabel="..."
          breakClassName={styles.page_item}
          breakLinkClassName={styles.page_link}
          containerClassName={styles.page_container}
          activeClassName={styles.active}
          renderOnZeroPageCount={null}
          disabledClassName={styles.disabled}
        />
      )}
    </div>
  )
}
