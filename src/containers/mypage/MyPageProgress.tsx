'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  MyPageCellContainer,
  MyPageCellContentContainer,
  MyPageCellTitle,
  MyPageCellContentWrapper,
  MyPageCellContentTitle,
  MyPageCellContent,
} from './MyPageCommon'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const MyPageProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 60px;
  width: 100%;
  margin: 10px 0 15px 0;

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
  const dealt = Math.floor((nowPage / page) * 100)
  return (
    <MyPageCellContainer>
      <MyPageCellTitle>{branchName} 진도 현황</MyPageCellTitle>
      <MyPageCellContentContainer>
        <MyPageCellContentWrapper>
          <MyPageCellContentTitle>교재</MyPageCellContentTitle>
          <MyPageCellContent>{textbook}</MyPageCellContent>
        </MyPageCellContentWrapper>

        <MyPageCellContentWrapper>
          <MyPageCellContentTitle>진도</MyPageCellContentTitle>
          <MyPageCellContent>21p, 디지털 통신 시스템</MyPageCellContent>
        </MyPageCellContentWrapper>

        <MyPageProgressWrapper>
          <Progress>
            <Dealt dealt={dealt} />
          </Progress>
        </MyPageProgressWrapper>

        <MyPageCellContentWrapper>
          <MyPageCellContentTitle>예습 범위</MyPageCellContentTitle>
          <MyPageCellContent>24p, 사단법인</MyPageCellContent>
        </MyPageCellContentWrapper>
      </MyPageCellContentContainer>
    </MyPageCellContainer>
  )
}

export default MyPageProgress
