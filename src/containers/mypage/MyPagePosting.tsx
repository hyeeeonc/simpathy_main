'use client'

import styled from 'styled-components'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
  ContentBoxClickableContentWrapper,
} from '@/components/ContentBox'

const MyPagePosting = ({
  grade,
  boards,
  replies,
  questions,
}: {
  grade: string
  boards: number
  replies: number
  questions: number
}) => {
  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>활동 보기</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>회원 등급</ContentBoxCellContentTitle>
          <ContentBoxCellContent>{grade}</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>
            내가 작성한 글
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent>{boards}개</ContentBoxCellContent>
        </ContentBoxClickableContentWrapper>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>
            내가 작성한 질문
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent>{questions}개</ContentBoxCellContent>
        </ContentBoxClickableContentWrapper>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>
            내가 작성한 댓글
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent>{replies}개</ContentBoxCellContent>
        </ContentBoxClickableContentWrapper>
        <ContentBoxClickableContentWrapper>
          <ContentBoxCellContentTitle>
            상담 신청 현황
          </ContentBoxCellContentTitle>
          <ContentBoxCellContent></ContentBoxCellContent>
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default MyPagePosting
