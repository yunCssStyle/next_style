import TitleCaption from '@/components/text/title-caption'
import HeaderContainer from '@/containers/layout/header-container'
import { SearchParamProps } from '@/types/props/props'
import { getScopedI18n } from '@/locales/server'
import { setStaticParamsLocale } from 'next-international/server'
import ModalAddProductContainer from '@/containers/upload/modal/add-product-container'
import UploadContainer from './_client/container'

export default async function HomeUploadPage({ params, searchParams }: SearchParamProps) {
  setStaticParamsLocale(params.locale)
  const addProd = searchParams?.addProd
  const upload = await getScopedI18n('upload')
  return (
    <div className="home_container">
      <div className="home_top_container">
        <HeaderContainer title={<TitleCaption title={upload('title')} />} right={null} />
      </div>
      <div className="home_body_container">
        <UploadContainer />
      </div>
      {/* modal */}
      {addProd && <ModalAddProductContainer />}
    </div>
  )
}
