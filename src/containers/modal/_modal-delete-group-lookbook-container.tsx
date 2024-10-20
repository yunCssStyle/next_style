// 'use client'

// import DeleteGroupLookbookModal from '@/components/modal/_delete-group-lookbook-modal'
// import Modal from '@/components/modal/modal'
// import useLookBookFilterStore from '@/stores/lookbook-filter'
// import { CustomLookBookGroupDto } from '@/types/props/props'
// import { shallow } from 'zustand/shallow'

// export default function ModalDeleteGroupLookbookContainer() {
//   // zustand 사용
//   const { deleteStyleGroup } = useLookBookFilterStore(
//     (store) => ({
//       deleteStyleGroup: store.deleteStyleGroup,
//     }),
//     shallow,
//   )

//   return (
//     <Modal type="popup" isTopClose={false}>
//       {deleteStyleGroup !== null && <DeleteGroupLookbookModal getData={deleteStyleGroup as CustomLookBookGroupDto} />}
//     </Modal>
//   )
// }
