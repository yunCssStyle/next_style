import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string | null
      accessToken: string | null
      refreshToken: string | null
    }
  }
}

export type SessionType = {
  user: {
    email: string
    refreshToken: string
    accessToken: string
    id: string
  }
}

const signin = async (email: string, password: string) => {
  try {
    const auth = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/user-auth/signin`, {
      email,
      password,
    })
    return {
      id: '1',
      accessToken: auth.data.accessToken,
      refreshToken: auth.data.refreshToken,
      email,
    }
  } catch (e) {
    // console.error('signin error', e)
    return null
  }
}

export const authOption: AuthOptions = {
  //   cookies: {
  //     pkceCodeVerifier: {
  //       name: 'next-auth.pkce.code_verifier',
  //       options: {
  //         httpOnly: true,
  //         sameSite: 'none',
  //         path: '/',
  //         secure: true,
  //       },
  //     },
  //   },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await signin(credentials?.email as string, credentials?.password as string)
        return user ?? null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 * 2,
  },
  callbacks: {
    async session({ session, token }: any) {
      const updatedSession = {
        ...session,
        ...token,
      }
      return updatedSession
    },
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update') {
        const updatedSession = {
          ...session,
          ...user,
        }
        return { ...updatedSession }
      }
      const jwtToken = {
        ...token,
        ...user,
      } as any
      return { ...jwtToken }
    },
  },
  pages: {
    error: '/signin',
    signIn: '/signin',
    // signOut: '/',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export const auth = async (req: any, res: any) => {
  return NextAuth(req, res, authOption)
}
