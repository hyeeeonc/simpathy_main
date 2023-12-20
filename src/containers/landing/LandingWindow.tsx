'use client'

import styled from 'styled-components'

const LandingWindowTitle = styled.div`
  font-weight: bold;
  font-size: 2.25rem;
  line-height: 2.5rem;

  margin: 1rem 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2rem;

    margin: 1rem 0 1rem 0;
  }
`

const LandingWindow = () => {
  return (
    // <div className="w-full aspect-video mt-[40px] rounded-[10px] flex items-center justify-center overflow-hidden">
    //   <img
    //     src="/images/landing/main.png"
    //     className="w-full h-full object-cover"
    //     alt="landing"
    //   />
    // </div>
    <div className="w-full flex flex-col justify-center align-center p-4 mt-[50px] md:mt-[100px] mb-[50px] md:mb-[100px] rounded-[10px] overflow-hidden">
      <LandingWindowTitle className="font-bold text-4xl mt-4 mb-6">
        심찬우의 공감연구소
      </LandingWindowTitle>
      <div className="text-lg">&lt; DRAMATIC EXIT &rt;</div>
    </div>
  )
}

export default LandingWindow
