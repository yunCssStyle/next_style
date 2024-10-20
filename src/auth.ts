// import NextAuth from 'next-auth'
// import axios from 'axios'
// import Credentials from 'next-auth/providers/credentials'
// import { authConfig } from './auth.config'

// const signin = async (email: string, password: string) => {
//   try {
//     const auth = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user-auth/signin`, {
//       email,
//       password,
//     })
//     return {
//       id: '1',
//       accessToken: auth.data.accessToken,
//       refreshToken: auth.data.refreshToken,
//       email,
//     }
//   } catch (e) {
//     console.error('signin error', e)
//     return null
//   }
// }

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
//   unstable_update: sessionUpdate,
// } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'email', type: 'text' },
//         password: { label: 'password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const user = await signin(credentials.email as string, credentials.password as string)
//         return user ?? null
//       },
//     }),
//   ],
// })
