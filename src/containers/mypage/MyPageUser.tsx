'use client'

import QR from 'qrcode.react'
import styled from 'styled-components'
import 'react-circular-progressbar/dist/styles.css'
import { useEffect, useState } from 'react'

const MyPageUserContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 300px;

  margin-top: 40px;
  padding: 20px;

  color: white;

  border-radius: 20px;

  background: rgb(10, 24, 41);
  background: linear-gradient(
    90deg,
    rgba(10, 24, 41, 1) 0%,
    rgba(27, 89, 158, 1) 50%,
    rgba(63, 118, 176, 1) 100%
  );

  box-shadow: 0 0 5em 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;

    height: 220px;
    border-radius: 10px;
  }
`

const MyPageUserDataContainer = styled.div`
  display: flex;

  padding-left: 10px;

  @media (max-width: 767px) {
    padding-left: 0;
  }
`

const MyPageUserNameWrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`

const MyPageUserNameBold = styled.span`
  font-size: 3rem;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`

const MyPageUserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  margin-left: auto;

  @media (max-width: 767px) {
    align-items: center;
    margin-top: 20px;
  }
`

const MyPageUser = ({
  name,
  email,
  branchName,
}: {
  name: string
  email: string
  branchName: string
}) => {
  const [today, setToday] = useState<string>('')

  useEffect(() => {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    const kstDateTimeString = `${year}.${month}.${day}-${hours}.${minutes}.${seconds}`

    setToday(kstDateTimeString)
  }, [])

  useEffect(() => {
    console.log(today)
  }, [today])

  return (
    <MyPageUserContainer>
      <MyPageUserDataContainer>
        <MyPageUserNameWrapper>
          <MyPageUserNameBold>{name}</MyPageUserNameBold>님, 반갑습니다.
        </MyPageUserNameWrapper>
      </MyPageUserDataContainer>
      <MyPageUserContentContainer>
        <QR
          value={`${today}-${email}`}
          size={110}
          level={'H'}
          includeMargin={false} //QR 테두리 여부
          fgColor={'#fff'} //QR색
          bgColor={'#3f76b0'}
        />
      </MyPageUserContentContainer>
    </MyPageUserContainer>
  )
}

export default MyPageUser
