'use client'

import Button from '@/components/button/button'
import { getAccessToken } from '@/lib/action'
import { useI18n } from '@/locales/client'
import { ProductFileForDownloadDto } from '@/services/generated/managerstore.schemas'
import interceptorClient from '@/services/mutator/interceptorClient'
import { useUserInfoStore } from '@/stores/user-info'
import { stringToNumber } from '@/utils/utils'
import { ReactNode, useEffect, useState } from 'react'
interface HomeUploadDetailFileDownProps {
  id: number | string
}
export function UploadDetailFileDown({ id }: HomeUploadDetailFileDownProps) {
  const { authorities } = useUserInfoStore()
  const t = useI18n()
  const getId = () => {
    return stringToNumber(`${id}`)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [downloadData, setDownloadData] = useState<ProductFileForDownloadDto | null>(null)
  const [isInit, setIsInit] = useState<boolean>(false)

  useEffect(() => {
    if (!isInit && authorities.length > 0) {
      setIsInit(true)
    }
  }, [authorities, isInit])

  const downLoadFile = async () => {
    try {
      setIsLoading(true)
      const res = await interceptorClient.post('/productUpload/download', {
        id: getId(),
      })
      setDownloadData(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }
  const renderButton = (): ReactNode => {
    if (!isInit) return <></>
    if (
      authorities.length <= 0 &&
      !(authorities.includes('ROLE_BACKOFFICE') || authorities.includes('ROLE_MANAGER')) &&
      getAccessToken() === null
    ) {
      return null
    }
    if (
      authorities.length > 0 &&
      (authorities.includes('ROLE_BACKOFFICE') || authorities.includes('ROLE_MANAGER')) &&
      getId() !== 0 &&
      downloadData === null
    )
      return (
        <Button
          borderRadius="3px"
          theme="primary"
          paddingLR="0.5rem"
          size="small"
          loading={isLoading}
          disabled={isLoading}
          onClick={() => {
            downLoadFile()
          }}
        >
          {t('download.file')}
        </Button>
      )
    if (downloadData)
      return (
        <>
          {downloadData.imageZipFile && downloadData.imageZipFile.url && (
            <Button
              borderRadius="3px"
              theme="primary"
              paddingLR="0.5rem"
              size="small"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => {
                const link = document.createElement('a')
                link.href = downloadData.imageZipFile?.url ?? ''
                link.download = downloadData.imageZipFile?.uuid ?? ''
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              {t('download.image')}
            </Button>
          )}
          {downloadData.infoFile.url && (
            <Button
              borderRadius="3px"
              theme="primary"
              paddingLR="0.5rem"
              size="small"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => {
                const link = document.createElement('a')
                link.href = downloadData.infoFile.url
                link.download = downloadData.infoFile.uuid
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              {t('download.excel')}
            </Button>
          )}
        </>
      )
  }
  return renderButton()
}
