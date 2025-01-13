import '../styles/reset.css'
import '../styles/global.css'
import 'react-quill/dist/quill.snow.css'

import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import StyledComponentsRegistry from '@/libs/registry'

import Header from '@/containers/common/Header'
import NavBarProvider from '@/containers/common/NavBar/NavBarProvider'
import Footer from '@/containers/common/Footer'
import Head from 'next/head'

// Noto Sans KR 폰트 설정
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://simchanwoo.com'),
  title: '심찬우의 공감연구소',
  description: '정도를 걷는다, 때를 기다린다.',
  openGraph: {
    title: '심찬우의 공감연구소',
    description: '정도를 걷는다, 때를 기다린다.',
    images: {
      url: '/images/common/openg.png',
    },
  },
  twitter: {
    title: '심찬우의 공감연구소',
    description: '정도를 걷는다, 때를 기다린다.',
    images: {
      url: '/images/common/openg.png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate" />
      </Head>
      <body className={notoSansKr.className}>
        <StyledComponentsRegistry>
          <div className="total-container">
            <div className="main-container">
              <Header />
              {children}
              <Footer />
            </div>
            <NavBarProvider />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
