import { UserResDto, UserResDtoAuthoritiesItem, VendorDto } from '@/services/generated/managerstore.schemas'
import { signOut } from 'next-auth/react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const defaultImage = '/images/avatar/3.png'
const initialUserValue = {
  id: 0, // 유저 아이디
  profile: defaultImage, // 프로필 이미지
  email: '', // 이메일
  nickName: null as null | string, // 닉네임
  authorities: [] as UserResDtoAuthoritiesItem[], // 권한
  vendor: null as null | VendorDto, // 벤더 정보
}

export const useUserInfoStore = create<typeof initialUserValue>()(
  persist(() => initialUserValue, {
    name: 'user-info',
    storage: createJSONStorage(() => sessionStorage),
    skipHydration: true,
  }),
)

export const addUserInfo = (userInfo: UserResDto) =>
  useUserInfoStore.setState(() => ({
    id: userInfo.id,
    profile: userInfo.profileImageUrl ?? defaultImage,
    email: userInfo.email,
    nickName: userInfo.name,
    authorities: userInfo.authorities,
    vendor: userInfo.vendor,
  }))

export const setProfile = (profile: string) => useUserInfoStore.setState(() => ({ profile }))
export const setNickName = (nickName: string) => useUserInfoStore.setState(() => ({ nickName }))
export const logOut = async () => {
  await signOut()
  sessionStorage.clear()
}
