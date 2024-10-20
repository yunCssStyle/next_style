import BackKey from '@/components/button/back-key'
import Scroll from '@/components/scroll/scroll'
import TitleCaption from '@/components/text/title-caption'
import HeaderContainer from '@/containers/layout/header-container'
import { ProductFileResDto } from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import DetailList from '../_client/detail-list'
import DetailTopFilterContainer from '../_client/detail-top-filter-container'

export default async function DetailPage({ params }: { params: { slug: string } }) {
  let pData: ProductFileResDto | undefined

  try {
    pData = await interceptorClient.get(`/productUpload/files?slug=${params.slug}`)
  } catch (err: any) {
    pData = undefined
  }
  return (
    <div className="home_container">
      <div className="home_top_container">
        <HeaderContainer
          title={<BackKey />}
          center={<TitleCaption title={pData?.infoFileName || ''} />}
          right={<div />}
        />
      </div>
      <div className="home_body_container">
        <div className="container">
          <DetailTopFilterContainer params={params.slug} />
          <div className="container_search_result">
            <Scroll>
              <div
                style={{
                  width: '100%',
                }}
              >
                <DetailList params={params.slug} />
              </div>
            </Scroll>
          </div>
        </div>
      </div>
    </div>
  )
}
