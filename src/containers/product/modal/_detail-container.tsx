// 'use client'

// import CanvasFittingComponent from '@/components/fitting/canvas-fitting-component'
// import Modal from '@/components/modal/modal'
// import { StyleRecommendResDto } from '@/services/generated/managerstore.schemas'
// import { useSearchParams } from 'next/navigation'

// export default function ModalDetailStyleContainer() {
//   const params = useSearchParams()
//   return (
//     params &&
//     params.get('detailStyle') && (
//       <Modal type="listBox">
//         <div className={styles.modal_grid}>
//           <div className={styles.grid_header}>
//             <p className="f_18 f_bold">스타일 보기</p>
//           </div>
//           <div
//             className={styles.grid_list}
//             style={{
//               width: '301.4848px ',
//             }}
//           >
//             <CanvasFittingComponent
//               width={301.4848}
//               // height={652}
//               avatarWidth={301.4848}
//               avatarHeight={652}
//               // bgColor={colorWhite}
//               borderRadius="0px"
//               items={
//                 (selectSaveStyle as StyleRecommendResDto).compositeImage ??
//                 (selectSaveStyle as StyleRecommendResDto).products ??
//                 ''
//               }

//               // showWish={false}
//               // logger
//             />
//             ,
//           </div>
//           <div
//             className={styles.grid_main}
//             style={{
//               width: '475px',
//             }}
//           >
//             <div
//               className={styles.grid_main_box}
//               style={{
//                 height: '620px',
//               }}
//             >
//               {selectSaveStyle !== null && (
//                 <div
//                   style={{
//                     height: 'auto',
//                     overflowY: 'auto',
//                     padding: '1rem 0 1rem 1rem',
//                   }}
//                 >
//                   <InformationSection
//                     title="계절 정보"
//                     description={((selectSaveStyle as StyleRecommendResDto).seasonTypes ?? '').split(',')}
//                   />
//                   <InformationSection
//                     title="스타일 정보"
//                     description={((selectSaveStyle as StyleRecommendResDto).styleKeywords ?? '').split(',')}
//                   />
//                   <p
//                     className="f_12 f_bold"
//                     style={{
//                       marginBottom: '0.75rem',
//                     }}
//                   >
//                     스타일 구성 아이템
//                   </p>
//                   <div
//                     style={{
//                       display: 'grid',
//                       gap: '0.5rem 0.5rem',
//                       gridTemplateColumns: '104px 104px 104px 104px',
//                       gridTemplateRows: 'auto',
//                     }}
//                   >
//                     {(selectSaveStyle as StyleRecommendResDto).products?.map((product) => {
//                       return (
//                         <StyleProductList
//                           key={`${(selectSaveStyle as StyleRecommendResDto).styleRecommendId}_${product.id}`}
//                           product={product}
//                         />
//                       )
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className={styles.grid_bottom}>
//               <div
//                 className="flex_row"
//                 style={{
//                   justifyContent: 'end',
//                   width: '100%',
//                   gap: '0.5rem',
//                   padding: '0',
//                 }}
//               >
//                 <div>
//                   <Button
//                     size="medium"
//                     theme="secondary"
//                     onClick={() => {
//                       setSaveSelectStyle(null)
//                       router.back()
//                     }}
//                   >
//                     닫기
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     )
//   )
// }
