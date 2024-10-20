import { PRODUCT_SEARCH_LIMIT } from '@/constants/numbers'
import styles from './skeleton.module.scss'
/*
실제 연결된 컴퍼넌트
*/
// 공통으로 앞으로 쓰일꺼
interface CommonSkeletonProps {
  width?: string
  height?: string
  minHeight?: string
  borderRadius?: string
  children?: React.ReactNode
}
export function CommonSkeleton({
  width = '100%',
  height = '100%',
  minHeight = '100%',
  borderRadius = '0.25rem',
  children = null,
}: CommonSkeletonProps) {
  return (
    <div
      className={styles.commonSkeleton}
      style={{
        width,
        height,
        minHeight,
        borderRadius,
      }}
    >
      <div className={styles.skeleton}>{children}</div>
    </div>
  )
}
// 룩북 그룹 스켈레톤
interface LookBookGroupSkeletonProps {
  width?: string
  height?: string
  minHeight?: string
  borderRadius?: string
}
export function LookBookGroupSkeleton({
  width = '100%',
  height = 'auto',
  minHeight = '202px',
  borderRadius = '0.25rem',
}: LookBookGroupSkeletonProps) {
  return (
    <div
      className={styles.lookBookGroupSkeleton}
      style={{
        width,
        height,
        minHeight,
        borderRadius,
      }}
    >
      {/* 이미지 영역 */}
      <div className={styles.imageWrap}>
        <div className={styles.skeleton} />
      </div>
      <div className={styles.rightWrap}>
        <div className={styles.icon}>
          {' '}
          <div
            className={styles.skeleton}
            style={{
              borderRadius: '100px',
            }}
          />
        </div>
        {/* 제목 */}
        <div style={{ height: '40px' }}>
          <div
            className={styles.skeleton}
            style={{
              width: '100px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
        </div>
        {/* 시즌 */}
        <div className={styles.rows}>
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
        </div>
        {/* 스타일 */}
        <div className={styles.rows}>
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
          <div
            className={styles.skeleton}
            style={{
              width: '60px',
              height: '20px',
              borderRadius: '100px',
            }}
          />
        </div>
        {/* 하단 */}
        <div className={styles.bottoms}>
          <div
            className={styles.cols}
            style={{
              width: '33%',
            }}
          >
            <div
              className={styles.skeleton}
              style={{
                width: '40px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
            <div
              className={styles.skeleton}
              style={{
                width: '70px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
          </div>
          <div
            className={styles.cols}
            style={{
              width: '33%',
            }}
          >
            <div
              className={styles.skeleton}
              style={{
                width: '40px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
            <div
              className={styles.skeleton}
              style={{
                width: '70px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
          </div>
          <div
            className={styles.cols}
            style={{
              width: '33%',
            }}
          >
            <div
              className={styles.skeleton}
              style={{
                width: '40px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
            <div
              className={styles.skeleton}
              style={{
                width: '70px',
                height: '14.5px',
                borderRadius: '100px',
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className={styles.skeleton} /> */}
    </div>
  )
}
// 프로필 부분
export function UserProfileSkeleton() {
  return (
    <div className={` ${styles.userProfilSkeleton}`}>
      <div className={`${styles.skeleton} ${styles.nickName}`} />
      <div className={`${styles.skeleton} ${styles.avatar}`} />
    </div>
  )
}
// 상품리스트 스켈레톤
export function ProductListSkeleton() {
  return (
    // <div className={styles.productListSkeleton}>
    // <div className={styles.flexWrap}>
    <>
      {Array(PRODUCT_SEARCH_LIMIT)
        .fill(0)
        .map((row: number, index: number) => (
          <div key={`pdSkeleton_${String(index)}`} className={`${styles.productCardSkeleton}`}>
            <div
              className={styles.skeleton}
              style={{
                width: '80px',
                height: '88px',
                padding: '8px 12px',
                borderRadius: '0.25rem',
              }}
            />
            <div
              className={styles.skeleton}
              style={{
                width: '80px',
                height: '15px',
                borderRadius: '100px',
                margin: '8px auto 0 auto',
              }}
            />
          </div>
        ))}
    </>
  )
}
// 상품리스트 table 스켈레톤
interface ProductTableSkeletonProps {
  searchNum: number
}
export function TableSkeleton({ searchNum = 10 }: ProductTableSkeletonProps) {
  return (
    <div className={styles.tableSkeleton}>
      {Array(searchNum)
        .fill(0)
        .map((row: number, index: number) => (
          <div className={styles.tableSkeletonWrap} key={`tb_${row}_sk_col_${String(index)})`}>
            <div className={styles.tableRowCheck}>
              <div className={styles.skeleton} />
            </div>
            <div className={styles.tableRowPic}>
              <div className={styles.skeleton} />
            </div>
            {Array(8)
              .fill(0)
              .map((cRow: number, cIndex: number) => (
                <div className={styles.tableRow} key={`tb_${cRow}_sk_row_${String(cIndex)}`}>
                  <div className={styles.skeleton} />
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}

// 스타일 추천 스켈레톤
interface ProductInSkeletonProps {
  width?: string
  height?: string
}
export function ProductInSkeleton({ width = '120px', height = '192px' }: ProductInSkeletonProps) {
  return (
    <div
      className={styles.productInSkeleton}
      style={{
        width,
        minWidth: width,
        height,
      }}
    >
      <div className={styles.skeleton} />
    </div>
  )
}
interface InputFieldSkeletonProps {
  width?: string
  height?: string
}
// 인풋필드 스켈레톤
export function InputFieldSkeleton({ height = '32px', width = '100%' }: InputFieldSkeletonProps) {
  return (
    <div
      className={styles.inputFieldSkeleton}
      style={{
        width,
        height,
      }}
    >
      <div
        className={styles.skeleton}
        style={{
          width,
          height,
        }}
      />
    </div>
  )
}
