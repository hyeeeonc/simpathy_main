'use client'

import styled from 'styled-components'

const LandingMainImageContainer = styled.div`
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
    padding-top: 40px;
  }

  @media (max-width: 350px) {
    height: 150px;
  }
`

const LandingMainImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    width: auto;
    height: 160px;
  }

  @media (max-width: 350px) {
    height: 150px;
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
