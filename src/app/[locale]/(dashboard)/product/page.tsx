import AddProductButton from '@/components/modal/button/add-product-button'
import TitleCaption from '@/components/text/title-caption'
import HeaderContainer from '@/containers/layout/header-container'
import ProductBookMarkFilterContainer from '@/containers/product/components/filter/product-bookmark-filter-container'
import ModalEditContainer from '@/containers/product/modal/edit-container'
import ModalAddProductContainer from '@/containers/upload/modal/add-product-container'
import { getScopedI18n } from '@/locales/server'
import { setStaticParamsLocale } from 'next-international/server'
import { SearchParamProps } from '@/types/props/props'
import ListContainer from './_client/list-container'

export default async function ProductPage({ params, searchParams }: SearchParamProps) {
  setStaticParamsLocale(params.locale)
  const addProd = searchParams?.addProd
  const editProd = searchParams?.editProd
  const prod = await getScopedI18n('prod')
  return (
    <div className="home_container">
      <div className="home_top_container">
        <HeaderContainer
          title={<TitleCaption title={prod('prod-title')} />}
          right={
            <div
              className="flex_row"
              style={{
                gap: '0.5rem',
              }}
            >
              {/* 상품추가하기  */}
              <AddProductButton />
              {/* 북마크  */}
              <ProductBookMarkFilterContainer />
            </div>
          }
        />
      </div>
      <div className="home_body_container">
        {/* 실 컨테이너 */}
        <ListContainer />
      </div>
      {/* modal */}
      {addProd && <ModalAddProductContainer />}
      {editProd && <ModalEditContainer />}
    </div>
  )
}
