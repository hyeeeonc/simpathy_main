import '../styles/reset.css'
import '../styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/libs/registry'

import Header from '@/containers/common/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simpathy',
  description: '심찬우의 공감연구소',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <div className="main-container">
            <Header />
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
