import { redirect } from 'next/navigation'
import StyleClient from '../_client/container'
import DetailStyleModal from '@/containers/modal/modal-detail-style-container'

export default function DetailStylePage({
  params,
  searchParams,
}: {
  params: {
    id: string
  }
  searchParams: Record<string, string> | null | undefined
}) {
  if (!params) {
    redirect(`/notfound`)
  }
  const detailStyle = searchParams?.detailStyle
  return params ? (
    <>
      <StyleClient id={params.id} />
      {detailStyle && <DetailStyleModal />}
    </>
  ) : null
}
