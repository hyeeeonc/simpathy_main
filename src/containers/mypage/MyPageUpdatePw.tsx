'use client'

import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
  ContentBoxClickableContentWrapper,
} from '@/components/ContentBox'
import Link from 'next/link'
import { Input } from '@material-tailwind/react'
import { ChangeEvent, useState } from 'react'

const MyPageUpdatePw = () => {
  const [beforePw, setBeforePw] = useState<string>('')
  const [newPw, setNewPw] = useState<string>('')
  const [checkPw, setCheckPw] = useState<string>('')

  const beforeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBeforePw(e.target.value)
  }

  const newHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPw(e.target.value)
  }

  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value)
  }

  const submitHandler = () => {
    if (!beforePw || !newPw || !checkPw) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    if (newPw !== checkPw) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    const data = {
      before_pw: beforePw,
      new_pw: newPw,
    }

    fetch('/api/user/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 200) {
          alert('비밀번호가 변경되었습니다.')
          window.location.href = '/mypage'
        } else if (res.status === 401) {
          alert('기존 비밀번호를 확인해 주세요.')
        } else {
          alert('오류가 발생했습니다.')
        }
      })
      .catch(err => {
        alert('오류가 발생했습니다.')
      })
  }

  return (
    <>
      <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>기존 비밀번호</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              type="password"
              onChange={beforeHandler}
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>새 비밀번호</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              type="password"
              onChange={newHandler}
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>비밀번호 확인</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              type="password"
              onChange={checkHandler}
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentTitle
          style={{
            fontSize: '0.8rem',
            color: '#797b84',
            fontWeight: 'normal',
            paddingLeft: '30px',
          }}
        >
          * 비밀번호 조회는 불가능하며, 비밀번호를 분실한 경우 조교에게 초기화를
          요청하시기 바랍니다.
        </ContentBoxCellContentTitle>
      </ContentBoxCellContentContainer>
      <ContentBoxCellContainer>
        <ContentBoxClickableContentWrapper
          style={{
            color: '#797b84',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
          }}
          onClick={submitHandler}
        >
          비밀번호 변경하기
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContainer>
    </>
  )
}

export default MyPageUpdatePw
