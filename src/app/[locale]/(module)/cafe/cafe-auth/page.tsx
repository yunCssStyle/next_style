'use client'

import interceptorClient from '@/services/mutator/interceptorClient'
import { SearchParamProps } from '@/types/props/props'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function CafeAuthPage({ searchParams }: SearchParamProps) {
  const router = useRouter()
  const code = searchParams?.code
  const redirect_uri = `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_CAFE24_AUTH_REDIRECT_URL}`
  if (code === undefined) {
    router.replace('/signin')
  }

  useEffect(() => {
    tokenFunc(code)
  }, [code])

  const tokenFunc = async (code) => {
    const mall_id = localStorage.getItem('mall_id')
    let access_token
    if (mall_id && code) {
      try {
        const response = await interceptorClient.post('/cafe/token', {
          mall_id,
          code,
          redirect_uri,
        })
        access_token = response.data.access_token
        localStorage.setItem('access_token_cafe', response.data.access_token)
        localStorage.setItem('refresh_token_cafe', response.data.refresh_token)
        localStorage.setItem('client_id_cafe', response.data.client_id)
        await addScriptTags(mall_id, response.data.access_token)
      } catch (error) {
        console.error('Error fetching token:', error)
        router.replace('/signin')
      } finally {
        router.replace('/signin')
      }
    }
  }

  const addScriptTags = async (mall_id: string, access_token_cafe: string) => {
    try {
      const mallId = mall_id
      const access_token = access_token_cafe
      await interceptorClient.post('/cafe/scripttags', {
        access_token,
        mallId,
        type: 'custom',
      })
      await interceptorClient.post('/cafe/scripttags', {
        access_token,
        mallId,
        type: 'common',
      })
    } catch (error) {
      console.error('Error fetching scripttags:', error)
    }
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <TailSpin
          visible={true}
          height="50"
          width="50"
          color="#9a00ff"
          strokeWidth="3"
          ariaLabel="tail-spin-loading"
          radius="3"
          wrapperStyle={{ margin: '0 auto 30px', width: '50px' }}
        />
        <div style={{ fontSize: '12px' }}>잠시만 기다려주세요.</div>
      </div>
    </>
  )
}
