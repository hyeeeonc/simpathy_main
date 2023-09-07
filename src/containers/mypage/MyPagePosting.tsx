'use client'

import styled from 'styled-components'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
} from '@/components/ContentBox'

const MyPagePostingCellWrapper = styled(ContentBoxCellContentWrapper)`
  cursor: pointer;

  transition: all 0.5s ease-in-out;
  &:hover {
    background: rgba(238, 238, 238, 0.6);
    backdrop-filter: blur(5px);
    border-radius: 10px;
  }
`

const MyPagePosting = () => {
  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>활동 보기</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>회원 등급</ContentBoxCellContentTitle>
          <ContentBoxCellContent>단과 수강생</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>가입 일자</ContentBoxCellContentTitle>
          <ContentBoxCellContent>2021.01.01</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <MyPagePostingCellWrapper>
          <ContentBoxCellContentTitle>
            내가 작성한 질문
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent>0개</ContentBoxCellContent>
        </MyPagePostingCellWrapper>
        <MyPagePostingCellWrapper>
          <ContentBoxCellContentTitle>
            내가 작성한 댓글
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent>0개</ContentBoxCellContent>
        </MyPagePostingCellWrapper>
        <MyPagePostingCellWrapper>
          <ContentBoxCellContentTitle>
            상담 신청 현황
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent></ContentBoxCellContent>
        </MyPagePostingCellWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default MyPagePosting
