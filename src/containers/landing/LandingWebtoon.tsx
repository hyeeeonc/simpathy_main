'use client'

import Link from 'next/link'
import styled from 'styled-components'

const LandingWebtoonContainer = styled.div`
  display: flex;
  align-items: center;
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
    font-size: 0.6rem;

    margin-top: 10px;
  }
`

const LandingWebtoon = () => {
  return (
    <Link href="/intro" className="w-1/3">
      <LandingWebtoonContainer>
        <img src="/images/webtoon/thumb.png" className="w-full" />
        <LandingWebtoonTitleContainer>
          학습방법안내서
        </LandingWebtoonTitleContainer>
      </LandingWebtoonContainer>
    </Link>
  )
}

export default LandingWebtoon
