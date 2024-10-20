import Paginate from '@/components/paginate/paginate'

interface PagingProps {
  currentPage: number
  totalPage: number
  pageSize: number
  setPage: (page: number) => void
  marginTop?: string
}
export default function Paging({ currentPage, totalPage, pageSize, setPage, marginTop = '50px' }: PagingProps) {
  return (
    <Paginate
      currentPage={currentPage + 1}
      total={totalPage}
      pageSize={pageSize}
      onPageChange={setPage}
      marginTop={marginTop}
    />
  )
}
