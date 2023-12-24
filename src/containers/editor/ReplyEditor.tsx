'use client'

import QuillNoSSRWrapper from './WysiwygEditor'
import ReactQuill, { Quill } from 'react-quill'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageResize } from 'quill-image-resize-module-ts'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

Quill.register('modules/ImageResize', ImageResize)

const StyledVideo = styled.div`
  margin-bottom: 60px;

  .quill {
    box-sizing: border-box;
    .ql-toolbar {
      border: 1px solid rgb(176 190 197);
      border-radius: 8px;
    }
    .ql-container {
      padding: 10px;
      border: 1px solid rgb(176 190 197);
      border-radius: 8px;
    }
  }

  iframe {
    width: 100%;
    height: calc(1068px / 16 * 9);
  }

  @media (max-width: 1159px) {
    iframe {
      height: calc((100vw - 93px) * 9 / 16);
    }
  }

  @media (max-width: 767px) {
    margin-bottom: 80px;
    iframe {
      height: calc((100vw - 73px) * 9 / 16);
    }
  }
`

interface EditorComponentProps {
  user_id?: string
}

const ReplyEditor = ({ user_id = '' }: EditorComponentProps) => {
  const quillInstance = useRef<ReactQuill>(null)

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ align: [] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],

        ['link'],
      ],
      history: {
        delay: 1000,
        maxStack: 500,
        userOnly: true,
      },
    }
  }, [])

  // 글 작성 관련
  const router = useRouter() // 페이지 이동
  const [contents, setContents] = useState('') // 내용

  const handleSubmit = async () => {
    if (!contents) {
      alert('내용을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/editor/writeReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply_contents: contents,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        const { post_id, board_id } = responseData // post_id 추출
        alert('작성이 완료되었습니다.')
        setContents('')
        // 새로운 경로로 이동
        router.push(`/board/${board_id}/${post_id}`)
      } else {
        alert('작성에 실패하였습니다.')
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error: any) {
      alert('작성에 실패하였습니다.')
    }
  }

  return (
    <>
      <StyledVideo>
        <QuillNoSSRWrapper
          style={{ height: '200px' }}
          forwardedRef={quillInstance}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </StyledVideo>
      <Button
        onClick={handleSubmit}
        color="blue-gray"
        size="lg"
        variant="outlined"
        fullWidth
      >
        등록하기
      </Button>
    </>
  )
}

export default ReplyEditor
