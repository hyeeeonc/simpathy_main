'use client'

import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

export const LandingBanner = () => {
  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:768px)',
  })
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })

  return (
    <div
      style={{
        margin: '0 -50vw',
        position: 'relative',
        left: '50%',
        width: '100vw',
      }}
    >
      {isDesktop && (
        <img
          src="/images/landing/banner.jpg"
          style={{ width: '100vw', height: 'auto' }}
        />
      )}
      {isMobile && (
        <img
          src="/images/landing/banner_mobile.jpg"
          style={{ width: '100vw', height: 'auto' }}
        />
      )}
    </div>
  )
}

export const LandingTimetable = () => {
  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:768px)',
  })
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })

  return (
    <div>
      {isDesktop && (
        <img src="/images/landing/timetable.jpg" className="w-full" />
      )}
      {isMobile && (
        <img src="/images/landing/timetable_mobile.jpg" className="w-full" />
      )}
    </div>
  )
}

// export default LandingWindow
