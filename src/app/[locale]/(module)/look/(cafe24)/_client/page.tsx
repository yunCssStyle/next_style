'use client'

import { LookContext } from '@/contexts/look-context'
import { eventAnchorButtonClick, eventModalClick, eventPdpCartClick, eventPdpExposure } from '@/lib/vendor-user-event'
import { AuthenticationRes, ProductCodeResDto, SharedStyleCartDto } from '@/services/generated/lookstore.schemas'
import lookClient from '@/services/mutator/lookClient'
import { transformAddToCart } from '@/utils/cafe24-utils'
import postMessageWeb from '@/utils/iframe-utils'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function StylePage() {
  const lookContext = useContext(LookContext)
  const [codes, setCodes] = useState<string[]>([])
  const [token, setToken] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const searchKey = searchParams.get('key')
  // 토큰 발급
  const initStyleLook = async () => {
    if (searchKey) {
      try {
        const result = await lookClient.post<AuthenticationRes>(
          '/api/look/token',
          { authKey: searchKey },
          { isToken: false, ip: lookContext.ip },
        )
        localStorage.setItem('platformType', result.platformType ?? '')
        localStorage.setItem('styleLookToken', result.accessToken)
        setToken(result.accessToken)
      } catch (error) {
        console.log('Token Error')
      }
    }
  }
  // 상품 조회
  const activedProduct = async () => {
    try {
      const resultProdList = await lookClient.post<ProductCodeResDto>(
        '/api/look/active',
        { codes },
        { ip: lookContext.ip },
      )
      postMessageWeb('goodsNos', resultProdList.code.join(','))
    } catch (error) {
      console.log('Actived Error')
    }
  }
  // 공유 장바구니 조회
  const sharedCart = async (data: string) => {
    try {
      const result = await axios
        .get<SharedStyleCartDto>(`/api/look/share/cart?lookShare=${data}`, {
          headers: { 'X-Sb-Forwarded-For': lookContext.ip },
        })
        .then((res) => res.data)
      postMessageWeb('sharedCarts', transformAddToCart(result))
    } catch (error) {
      console.log('SharedCart Error')
    }
  }
  useEffect(() => {
    if (codes.length > 0 && token !== null) activedProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codes, token])
  useEffect(() => {
    if (token === null) initStyleLook()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    setToken(localStorage.getItem('styleLookToken'))
    postMessageWeb('loaded', '')
    // function
    const handleMessasge = (ev: MessageEvent<{ type: string; data: string; from: string }>) => {
      if (!ev.data.type || !ev.data.from || typeof ev.data !== 'object') return
      if (ev.data.from === 'styleLookWebUser') {
        if (ev.data.type === 'goodsNos') {
          setCodes(ev.data.data.split(','))
        } else if (ev.data.type === 'cartClick') {
          eventPdpCartClick({ ip: lookContext.ip, code: ev.data.data })
        } else if (ev.data.type === 'PdpExposure') {
          eventPdpExposure({ ip: lookContext.ip, code: ev.data.data })
        } else if (ev.data.type === 'sendLookShareData') {
          if (ev.data.data && ev.data.data !== '') {
            sharedCart(ev.data.data)
          }
        } else if (ev.data.type === 'clickAnchorEvent' && ev.data.data !== '') {
          // 앵커 이벤트 data의 경우 코드값임
          eventAnchorButtonClick({ ip: lookContext.ip, code: ev.data.data })
        } else if (ev.data.type === 'clickModalOpenEvent' && ev.data.data !== '') {
          eventModalClick({ ip: lookContext.ip, code: ev.data.data })
        }
      }
    }
    window.addEventListener('message', handleMessasge)
    // 클린업 함수에서 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener('message', handleMessasge)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
