export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/mypage/:path*', '/admin/:path*', '/editor/:path*'],
}
