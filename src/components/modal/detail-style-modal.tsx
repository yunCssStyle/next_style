import { ModalProps } from '@/types/props/props'
import { useRouter } from 'next/navigation'
import Button from '../button/button'
import CanvasFittingComponent from '../fitting/canvas-fitting-component'
import StyleProductList from '../list/style-product-list'
import styles from './modal.module.scss'
import { setSaveSelectStyle, useSaveStylestore } from '@/stores/save-style'
import InformationSection from '@/containers/product/components/filter/information-section'

export default function DetailStyleModal({ getData }: ModalProps) {
  const router = useRouter()
  // zustand 사용 - 선택된 스타일
  const { selectSaveStyle } = useSaveStylestore((state) => ({
    selectSaveStyle: state.selectSaveStyle,
  }))
  // 로딩
  return (
    <div className={styles.modal_grid}>
      <div className={styles.grid_header}>
        <p className="f_18 f_bold">스타일 보기</p>
      </div>
      <div
        className={styles.grid_list}
        style={{
          width: '301.4848px ',
        }}
      >
        {selectSaveStyle !== null && getData && selectSaveStyle.products && (
          <CanvasFittingComponent
            width={301.4848}
            avatarWidth={301.4848}
            avatarHeight={652}
            borderRadius="0px"
            items={selectSaveStyle.products!}
            isShow={false}
            isWish={false}
            gender={selectSaveStyle.products![0].genderType!}
          />
        )}
      </div>
      <div
        className={styles.grid_main}
        style={{
          width: '475px',
        }}
      >
        <div
          className={styles.grid_main_box}
          style={{
            height: '620px',
          }}
        >
          {selectSaveStyle !== null && (
            <div
              style={{
                height: 'auto',
                overflowY: 'auto',
                padding: '1rem 0 1rem 1rem',
              }}
            >
              {/* <InformationSection
                title="계절 정보"
                description={(selectSaveStyle.seasonTypes ?? '').split(',')}
              /> */}
              <InformationSection title="스타일 정보" description={(selectSaveStyle.styleKeywords ?? '').split(',')} />
              <p
                className="f_12 f_bold"
                style={{
                  marginBottom: '0.75rem',
                }}
              >
                스타일 구성 아이템
              </p>
              <div
                style={{
                  display: 'grid',
                  gap: '0.5rem 0.5rem',
                  gridTemplateColumns: '104px 104px 104px 104px',
                  gridTemplateRows: 'auto',
                }}
              >
                {selectSaveStyle.products?.map((product) => {
                  return (
                    <StyleProductList key={`${selectSaveStyle.styleRecommendId}_${product.id}`} product={product} />
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className={styles.grid_bottom}>
          <div
            className="flex_row"
            style={{
              justifyContent: 'end',
              width: '100%',
              gap: '0.5rem',
              padding: '0',
            }}
          >
            <div>
              <Button
                size="medium"
                theme="secondary"
                onClick={() => {
                  setSaveSelectStyle(null)
                  router.back()
                }}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
