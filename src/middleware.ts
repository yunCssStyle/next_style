import { getToken } from 'next-auth/jwt'
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'

export const i18n = {
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
} as const

// matcher에 매칭되는 경로로 접근하는 경우, middleware 실행
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}

const ALLOWED_MODULE_PATHS = ['/look', '/share']
const CAFE24_AUTH_LINK = ['/cafe/cafe-auth', '/cafe/cafe-auth-link']
const DASHBOARD = 'dashboard'
const MODULE = 'module'
const DOMAIN_NAME = 'stylelook.app'
const SIGNIN = 'signin'
const PRODUCT = 'product'

const secret = process.env.NEXTAUTH_SECRET
const locales: string[] = i18n.locales.map((locale) => `/${locale}`)
const cafe24Paths = CAFE24_AUTH_LINK.flatMap((path) => [path, ...locales.map((locale) => `${locale}${path}`)])
const modulePaths = ALLOWED_MODULE_PATHS.flatMap((path) => [path, ...locales.map((locale) => `${locale}${path}`)])
const signinPaths = [`/${SIGNIN}`, ...locales.map((locale) => `${locale}/${SIGNIN}`)]

const I18nMiddleware = createI18nMiddleware({
  ...i18n,
  urlMappingStrategy: 'rewriteDefault',
})

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const { pathname, hostname } = nextUrl
  const isLocalePath = locales.some((locale) => pathname.startsWith(locale))

  try {
    assertDashboardPathname(hostname, pathname)
    assertModulePathname(hostname, pathname)
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 })
  }

  if (isModulePath(pathname)) {
    return isLocalePath ? NextResponse.next() : I18nMiddleware(req)
  }

  if (isCafe24Path(pathname)) {
    return NextResponse.next()
  }

  const session = await getToken({ req, secret, raw: true })
  const localePrefix = isLocalePath ? locales.find((locale) => pathname.startsWith(locale)) : ''

  if (session === null && !isSigninPath(pathname)) {
    return Response.redirect(new URL(`${localePrefix}/${SIGNIN}`, nextUrl))
  }
  if (session !== null && isSigninPath(pathname)) {
    return Response.redirect(new URL(`${localePrefix}/${PRODUCT}`, nextUrl))
  }
  if (isRootPath(pathname)) {
    return Response.redirect(new URL(`${localePrefix}/${PRODUCT}`, nextUrl))
  }
  return I18nMiddleware(req)
}

function correctDomainName(hostname: string, subDomain: string) {
  return hostname.startsWith(subDomain) && hostname.endsWith(DOMAIN_NAME)
}

function isModulePath(pathname: string) {
  return modulePaths.some((path) => pathname.startsWith(path))
}

function isCafe24Path(pathname: string) {
  return cafe24Paths.some((path) => {
    return pathname.startsWith(path)
  })
}

function isSigninPath(pathname: string) {
  return signinPaths.some((path) => pathname.startsWith(path))
}

function isRootPath(pathname: string) {
  return pathname === '/' || locales.includes(pathname)
}

function assertDashboardPathname(hostname: string, pathname: string) {
  if (correctDomainName(hostname, `${DASHBOARD}.`) && isModulePath(pathname)) {
    throw new Error()
  }
}

function assertModulePathname(hostname: string, pathname: string) {
  if (correctDomainName(hostname, `${MODULE}.`) && !isModulePath(pathname)) {
    throw new Error()
  }
}
