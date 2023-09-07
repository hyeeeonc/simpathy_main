'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
} from '@/components/ContentBox'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const MyPageProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 60px;
  width: 100%;
  margin: 30px 0 15px 0;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`
const Progress = styled.div`
  width: 100%;
  height: 10px;
  background-color: #dddddd;

  border-radius: 10px;
`
const Dealt = styled.div<{ dealt: number }>`
  background: rgb(40, 69, 105);
  background: linear-gradient(
    90deg,
    rgba(40, 69, 105, 1) 0%,
    rgba(43, 187, 190, 1) 50%,
    rgba(72, 183, 245, 1) 100%
  );
  width: ${props => props.dealt + '%'};
  height: 100%;

  border-radius: 10px;
`

const MyPageProgress = ({
  branchName,
  branchProgress,
  textbook,
}: {
  branchName: string
  branchProgress: number
  textbook: string
}) => {
  const page = 100
  const nowPage = 20
  const dealt =
    Math.floor((nowPage / page) * 100) <= 100
      ? Math.floor((nowPage / page) * 100)
      : 100

  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>{branchName} 진도 현황</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>교재</ContentBoxCellContentTitle>
          <ContentBoxCellContent>{textbook}</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>진도</ContentBoxCellContentTitle>
          <ContentBoxCellContent>21p. 디지털 통신 시스템</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>예습 범위</ContentBoxCellContentTitle>
          <ContentBoxCellContent>24p. 사단법인</ContentBoxCellContent>
        </ContentBoxCellContentWrapper>

        <MyPageProgressWrapper>
          <Progress>
            <Dealt dealt={dealt} />
          </Progress>
        </MyPageProgressWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default MyPageProgress
