'use client'

import Link from 'next/link'
import styled from 'styled-components'

const LandingLink = styled(Link)`
  width: 33%;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const LandingWebtoonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const LandingWebtoonTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: bold;

  margin-top: 20px;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    margin-top: 10px;
  }
`

const LandingImage = styled.img`
  width: 100%;

  margin-top: 20px;

  @media (max-width: 767px) {
    width: 70%;
`

const LandingWebtoon = () => {
  return (
    <LandingLink href="/intro">
      <LandingWebtoonContainer>
        <LandingImage src="/images/webtoon/thumb.png" />
        <LandingWebtoonTitleContainer>
          학습방법안내서
        </LandingWebtoonTitleContainer>
      </LandingWebtoonContainer>
    </LandingLink>
  )
}

export default LandingWebtoon
