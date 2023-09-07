'use client'

import styled from 'styled-components'
import {
  MyPageCellContainer,
  MyPageCellContentContainer,
  MyPageCellTitle,
  MyPageCellContentWrapper,
  MyPageCellContentTitle,
  MyPageCellContent,
} from './MyPageCommon'

const MyPagePostingCellWrapper = styled(MyPageCellContentWrapper)`
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
    <MyPageCellContainer>
      <MyPageCellTitle>활동 보기</MyPageCellTitle>
      <MyPageCellContentContainer>
        <MyPagePostingCellWrapper>
          <MyPageCellContentTitle>가입 일자</MyPageCellContentTitle>
          <MyPageCellContent>2021.01.01</MyPageCellContent>
        </MyPagePostingCellWrapper>
        <MyPagePostingCellWrapper>
          <MyPageCellContentTitle>내가 작성한 질문</MyPageCellContentTitle>
          <MyPageCellContent>0개</MyPageCellContent>
        </MyPagePostingCellWrapper>
        <MyPagePostingCellWrapper>
          <MyPageCellContentTitle>내가 작성한 댓글</MyPageCellContentTitle>
          <MyPageCellContent>0개</MyPageCellContent>
        </MyPagePostingCellWrapper>
        <MyPagePostingCellWrapper>
          <MyPageCellContentTitle>상담 신청 현황</MyPageCellContentTitle>
          <MyPageCellContent></MyPageCellContent>
        </MyPagePostingCellWrapper>
      </MyPageCellContentContainer>
    </MyPageCellContainer>
  )
}

export default MyPagePosting
