'use client'

import styled from 'styled-components'
import Link from 'next/link'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxClickableContentWrapper,
} from '@/components/ContentBox'

const MyPageAdmin = () => {
  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>관리자 페이지</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <Link href="/admin">
          <ContentBoxClickableContentWrapper>
            <ContentBoxCellContentTitle>
              홈페이지 관리
            </ContentBoxCellContentTitle>
          </ContentBoxClickableContentWrapper>
        </Link>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>출석 관리</ContentBoxCellContentTitle>
        </ContentBoxClickableContentWrapper>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>상담 관리</ContentBoxCellContentTitle>
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default MyPageAdmin
