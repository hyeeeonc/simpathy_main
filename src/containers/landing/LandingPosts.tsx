'use client'

import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
} from '@/components/ContentBox'
import { styled } from 'styled-components'

const LandingPostsCellContentTitle = styled(ContentBoxCellContentTitle)`
  color: black;
`

const LandingPostsCellContent = styled(ContentBoxCellContent)`
  color: #797b84;

  font-weight: 500;
`

const LandingPosts = () => {
  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>최근 공지</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <LandingPostsCellContentTitle>
            [필독] 영상을 무단으로 다운로드, 공유를 하는 행위는 불법입니다.
          </LandingPostsCellContentTitle>
          <LandingPostsCellContent>2023/09/08</LandingPostsCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <LandingPostsCellContentTitle>
            [필독] 카페 활용 체크리스트
          </LandingPostsCellContentTitle>
          <LandingPostsCellContent>2023/09/08</LandingPostsCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <LandingPostsCellContentTitle>
            [2024] 6월 모의평가 해설
          </LandingPostsCellContentTitle>
          <LandingPostsCellContent>2023/09/08</LandingPostsCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <LandingPostsCellContentTitle>
            [공지] 단과 수업 결석생 보강 규정 안내
          </LandingPostsCellContentTitle>
          <LandingPostsCellContent>2023/09/08</LandingPostsCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <LandingPostsCellContentTitle>
            [공지] 닉네임 설정과 등업
          </LandingPostsCellContentTitle>
          <LandingPostsCellContent>2023/09/08</LandingPostsCellContent>
        </ContentBoxCellContentWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default LandingPosts
