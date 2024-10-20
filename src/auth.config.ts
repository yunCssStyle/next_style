// /* eslint-disable import/prefer-default-export */
// import type { NextAuthConfig } from 'next-auth'

// export const authConfig = {
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     // error: '/',
//     signIn: '/signin',
//     signOut: '/',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     authorized({ auth }) {
//       const isAuthenticated = !!auth?.user
//       return isAuthenticated
//     },
//     async session({ session, token }: any) {
//       const updatedSession = {
//         ...session,
//         ...token,
//       }
//       return updatedSession
//     },
//     async jwt({ token, user, trigger, session }: any) {
//       if (trigger === 'update') {
//         const updatedSession = {
//           ...session,
//           ...user,
//         }
//         return { ...updatedSession }
//       }
//       const jwtToken = {
//         ...token,
//         ...user,
//       } as any
//       return { ...jwtToken }
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig
