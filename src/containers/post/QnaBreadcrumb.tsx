'use client'

import { Breadcrumbs } from '@material-tailwind/react'
import Link from 'next/link'

const QnaBreadcrumb = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <Breadcrumbs>
      <Link href="/" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      {isAdmin ? (
        <Link href="/admin/qna" className="opacity-60">
          <span>질문게시판 아카이브</span>
        </Link>
      ) : (
        <Link href="/board/qna" className="opacity-60">
          <span>질문게시판</span>
        </Link>
      )}
    </Breadcrumbs>
  )
}

export default QnaBreadcrumb
