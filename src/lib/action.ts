'use server'

import { AuthenticationRes } from '@/services/generated/managerstore.schemas'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { TOKEN_MAX_AGE, TOKEN_VALID_TIME } from '@/constants/numbers'
import fetchExtended from './base-return-fetch'

// 토큰 저장하기
export const storeToken = async (request: AuthenticationRes) => {
  'use server'

  cookies().set({
    name: 'accessToken',
    value: request.accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  })

  cookies().set({
    name: 'refreshToken',
    value: request.refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
  })

  return request
}
export const setAccessToken = async (accessToken: string) => {
  'use server'

  cookies().set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  })
}
// 언어 가져오기
export const getLanguage = async () => {
  return cookies().get('NEXT_LOCALE')?.value
}

// 토큰 가져오기
export const getAccessToken = async () => {
  return cookies().get('accessToken')?.value
}
// ref 토큰 가져오기
export const getRefreshToken = async () => {
  return cookies().get('refreshToken')?.value
}
// 토큰 삭제하기
export const removeToken = async () => {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')
}
// 토큰 갱신하기
export const fetchAccessToken = async (accToken: string) => {
  'use server'

  try {
    const reponse = await fetchExtended('api/v1/user-auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${accToken}}`,
      },
      body: JSON.stringify({
        refreshToken: cookies().get('refreshToken')?.value,
      }),
    }).then((it) => it.json())
    if (reponse.accessToken) {
      return reponse.accessToken
    }
  } catch (e) {
    console.log(e)
    return null
  }
  console.log('fetchAccessToken delete')
  return null
}
// 토큰 만료기간 확인하기
export const checkTokenExpired = () => {
  if (cookies().get('accessToken') && cookies().get('refreshToken')!.value) {
    const decoded = jwtDecode(cookies().get('accessToken')!.value)
    if (decoded.exp && Date.now() < decoded.exp * 1000 - TOKEN_VALID_TIME) {
      return true // 만료 아님
    }
  }
  return false // 만료
}

export async function setMallIdCookie(mall_id: string, maxAge: number) {
  cookies().set({
    name: 'mall_id',
    value: mall_id,
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: maxAge,
  })
}
