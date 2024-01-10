'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { ImageResize } from 'quill-image-resize-module-ts'
import { Button, Textarea } from '@material-tailwind/react'

const StyledVideo = styled.div`
  margin-bottom: 20px;

  @media (max-width: 767px) {
    margin-bottom: 15px;
  }
`

interface EditorComponentProps {
  post_id?: number
  origin_id?: number | null
}

const QnaReplyEditor = ({ post_id, origin_id }: EditorComponentProps) => {
  const [contents, setContents] = useState('') // 내용

  const inputHandler = (e: any) => {
    setContents(e.target.value)
  }

  const handleSubmit = async () => {
    if (contents === '') {
      alert('내용을 입력해주세요')
      return
    }
    if (!origin_id) {
      try {
        const response = await fetch('/api/reply/qna/writeReply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id,
            reply_content: contents,
          }),
        })

        if (response.ok) {
          alert('댓글이 등록되었습니다.')
          window.location.reload()
          // Handle success, e.g., redirect or show a success message
        } else {
          alert('댓글 등록에 실패하였습니다.')
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('댓글 등록에 실패하였습니다.')
      }
    } else {
      try {
        const response = await fetch('/api/reply/qna/writeSubReply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id,
            reply_content: contents,
            origin_id,
          }),
        })

        if (response.ok) {
          alert('답글이 등록되었습니다.')
          window.location.reload()
          // Handle success, e.g., redirect or show a success message
        } else {
          alert('답글 등록에 실패하였습니다.')
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('답글 등록에 실패하였습니다.')
      }
    }
  }

  return (
    <>
      <StyledVideo>
        <Textarea label="댓글을 입력하세요" onChange={inputHandler} />
      </StyledVideo>
      <Button
        onClick={handleSubmit}
        color="blue-gray"
        size="md"
        variant="outlined"
        fullWidth
      >
        등록하기
      </Button>
    </>
  )
}

export default QnaReplyEditor
