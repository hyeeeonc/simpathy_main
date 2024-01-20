'use client'

import { ContentBoxClickableContentWrapper } from '@/components/ContentBox'
import Link from 'next/link'

const ConsultingNav = () => {
  return (
    <Link href="/admin/consulting">
      <ContentBoxClickableContentWrapper
        style={{
          color: '#797b84',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
        }}
      >
        목록 보기
      </ContentBoxClickableContentWrapper>
    </Link>
  )
}

export default ConsultingNav
