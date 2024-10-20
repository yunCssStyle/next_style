import ModalStyleClient from '@/app/[locale]/(module)/look/(cafe24)/modal/_client/modal-container'
import { redirect } from 'next/navigation'

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
