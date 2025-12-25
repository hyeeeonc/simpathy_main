'use client'

import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
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
  content?: string
}

const QnaReplyEditor = ({ post_id, origin_id, content }: EditorComponentProps) => {
  const [contents, setContents] = useState('') // 내용
  const textareaContainerRef = useRef<HTMLDivElement>(null)
  const [offButton, setOffButton] = useState<boolean>(false) // 버튼 활성화 여부

  const handleResizeHeight = () => {
    if (textareaContainerRef.current) {
      const textarea = textareaContainerRef.current.querySelector('textarea')
      if (textarea) {
        textarea.style.height = 'auto' // 높이 초기화
        textarea.style.height = `${textarea.scrollHeight}px` // 내용에 맞춰 늘리기
      }
    }
  }

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value)
    handleResizeHeight()
  }

  const handleSubmit = async () => {
    if (contents === '') {
      alert('내용을 입력해주세요')
      return
    }

    setOffButton(true)
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
          setOffButton(false)
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('댓글 등록에 실패하였습니다.')
        setOffButton(false)
      }
    } else {
      try {
        const response = await fetch('/api/reply/qna/updateReply', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id,
            reply_content: contents,
            reply_id: origin_id,
          }),
        })

        if (response.ok) {
          alert('답글이 수정되었습니다.')
          window.location.reload()
        } else if (response.status === 401) {
          alert('권한이 없습니다.')
          setOffButton(false)
        } else {
          alert('답글 수정에 실패하였습니다.')
          setOffButton(false)
        }
      } catch (error: any) {
        alert('답글 수정에 실패하였습니다.')
        setOffButton(false)
      }
    }
  }

  useEffect(() => {
    if (origin_id && content) {
      setContents(content)
      setTimeout(handleResizeHeight, 0)
    }
  }, [content])

  return (
    <>
      <StyledVideo>
        <Textarea 
          label={origin_id ? "댓글을 수정합니다" : "댓글을 입력하세요"} 
          value={contents}
          onChange={inputHandler}
          ref={textareaContainerRef} 
          className="min-h-[100px] resize-none overflow-hidden" 
          containerProps={{
            className: "grid h-full",
          }}
        />  
      </StyledVideo>
      <Button
        onClick={handleSubmit}
        color="blue-gray"
        size="md"
        variant="outlined"
        disabled={offButton}
        fullWidth
      >
        {origin_id ? "수정하기" : "등록하기"}
      </Button>
    </>
  )
}

export default QnaReplyEditor
