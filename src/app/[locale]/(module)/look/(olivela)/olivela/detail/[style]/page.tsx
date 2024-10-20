import { redirect } from 'next/navigation'
import DetailStyleClient from '../_client/datail-container'

export default function DetailStylePage({
  params,
}: {
  params: {
    style: string
  }
}) {
  if (!params) {
    redirect(`/notfound`)
  }
  return params ? <DetailStyleClient id={params.style} /> : null
}
