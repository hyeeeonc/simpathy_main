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
        <Link href="/admin/manage">
          <ContentBoxClickableContentWrapper>
            <ContentBoxCellContentTitle>게시판 관리</ContentBoxCellContentTitle>
          </ContentBoxClickableContentWrapper>
        </Link>

        <Link href="/admin/user">
          <ContentBoxClickableContentWrapper>
            <ContentBoxCellContentTitle>회원 관리</ContentBoxCellContentTitle>
          </ContentBoxClickableContentWrapper>
        </Link>

        <Link href="/admin/branch">
          <ContentBoxClickableContentWrapper>
            <ContentBoxCellContentTitle>지점 관리</ContentBoxCellContentTitle>
          </ContentBoxClickableContentWrapper>
        </Link>

        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>출석 관리</ContentBoxCellContentTitle>
        </ContentBoxClickableContentWrapper>

        {/* <Link href="/admin/consulting">
          <ContentBoxClickableContentWrapper>
            <ContentBoxCellContentTitle>상담 관리</ContentBoxCellContentTitle>
          </ContentBoxClickableContentWrapper>
        </Link> */}
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default MyPageAdmin
