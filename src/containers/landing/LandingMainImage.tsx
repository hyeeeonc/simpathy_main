'use client'

import styled from 'styled-components'

const LandingMainImageContainer = styled.div`
  width: 100%;
  overflow: hidden;

  @media (max-width: 1000px) {
    height: 250px;
    padding-top: 60px;
  }

  @media (max-width: 350px) {
    height: 200px;
  }
`

const LandingMainImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (max-width: 1000px) {
    height: 250px;
  }

  @media (max-width: 350px) {
    height: 200px;
  }
`

const LandingMainImage = () => {
  return (
    <LandingMainImageContainer>
      <LandingMainImg src="/images/landing/Head.jpeg" alt="landing" />
    </LandingMainImageContainer>
  )
}

export default LandingMainImage
