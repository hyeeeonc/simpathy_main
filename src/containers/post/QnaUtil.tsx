'use client'

import styled from 'styled-components'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const QnaAnsweredButton = ({ post_id }: { post_id: number }) => {
  const router = useRouter()

  const qnaAnswerHandler = async () => {
    try {
      const response = await fetch('/api/board/qna/answer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id,
        }),
      })

      if (response.ok) {
        alert('답변완료 처리되었습니다.')
        router.refresh()
        router.push(`/board/qna/`)
      } else if (response.status === 403) {
        alert('권한이 없습니다.')
      } else {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } catch (error: any) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginRight: '10px' }}
        onClick={qnaAnswerHandler}
      >
        답변완료
      </Button>
    </>
  )
}

export const QnaReansweredButton = ({
  post_id,
  user_id,
}: {
  post_id: number
  user_id: string
}) => {
  const router = useRouter()

  const qnaAnswerHandler = async () => {
    try {
      const response = await fetch('/api/board/qna/reanswer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id,
          user_id,
        }),
      })

      if (response.ok) {
        alert('재질문 처리되었습니다.')
        router.refresh()
        router.push(`/board/qna/`)
      } else if (response.status === 403) {
        alert('권한이 없습니다.')
      } else {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } catch (error: any) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginRight: '10px' }}
        onClick={qnaAnswerHandler}
      >
        재질문
      </Button>
    </>
  )
}
