import { redirect } from 'next/navigation'
import ModalStyleClient from '../_client/modal-container'

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
  return <ModalStyleClient id={params.style} />
}
