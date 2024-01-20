import '../styles/reset.css'
import '../styles/global.css'
import 'react-quill/dist/quill.snow.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/libs/registry'

import Header from '@/containers/common/Header'
import NavBarProvider from '@/containers/common/NavBar/NavBarProvider'
import Footer from '@/containers/common/Footer'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '심찬우의 공감연구소',
  description: '심찬우의 공감연구소',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate" />
      </Head>
      <body className={inter.className}>
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
