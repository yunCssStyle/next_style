'use client'

import { SearchParamProps } from '@/types/props/props'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CafeAuthLinkPage({ searchParams }: SearchParamProps) {
  const router = useRouter()
  const mall_id = searchParams?.mall_id
  const data = {
    client_id: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID,
    state: 'app_install',
    redirect_uri: `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_CAFE24_AUTH_REDIRECT_URL}`,
    scope:
      'mall.read_category,mall.read_product,mall.read_collection,mall.read_supply,mall.read_order,mall.read_customer,mall.read_promotion,mall.read_privacy,mall.read_application,mall.write_application',
  }
  if (mall_id === undefined) {
    router.replace('/signin')
  }

  useEffect(() => {
    if (mall_id) {
      localStorage.setItem('mall_id', mall_id)
      const url = `https://${mall_id}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=${data.client_id}&state=${data.state}&redirect_uri=${data.redirect_uri}&scope=${data.scope}`
      window.location.href = url
    }
  }, [mall_id])

  return null
}
