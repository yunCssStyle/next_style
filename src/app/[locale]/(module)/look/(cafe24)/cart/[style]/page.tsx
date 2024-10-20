import ModalCartClient from '../_client/modal-cart-client'

export default function ModalCartOptionPage({
  params,
}: {
  params: {
    style: string
  }
}) {
  return <ModalCartClient id={params.style} />
}
