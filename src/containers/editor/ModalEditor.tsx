'use client'

import QuillNoSSRWrapper from './WysiwygEditor'
import ReactQuill, { Quill } from 'react-quill'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageResize } from 'quill-image-resize-module-ts'
import AWS from 'aws-sdk'
import {
  Input,
  Select,
  Option,
  Button,
  ButtonGroup,
} from '@material-tailwind/react'

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

interface ModalEditorProps {
  modal: any
}

const ModalEditor = ({ modal = {} }: ModalEditorProps) => {
  const quillInstance = useRef<ReactQuill>(null)
  const [contents, setContents] = useState(modal.modal_contents)
  const [modalEndTime, setModalEndTime] = useState('')

  // Helper: Convert UTC to Local
  const convertUTCToLocal = (utcDate: string): string => {
    console.log('utc data', utcDate)
    const date = new Date(utcDate)
    console.log('date', date)
    console.log('data getHours', date.getHours())
    date.setHours(date.getHours()) // UTC+9 시간대로 조정
    return date.toISOString().slice(0, 16) // `YYYY-MM-DDTHH:mm` 형식 반환
  }

  // Helper: Convert Local to UTC
  const convertLocalToUTC = (localDateTime: string): string => {
    const localDate = new Date(localDateTime)
    return new Date(
      localDate.getTime() + localDate.getTimezoneOffset() * 60000,
    ).toISOString()
  }

  useEffect(() => {
    if (modal.modal_endtime) {
      console.log('modal.modal_endtime', modal.modal_endtime)
      const localTime = convertUTCToLocal(modal.modal_endtime)
      console.log('localTime', localTime)
      setModalEndTime(localTime)
    }
  }, [modal.modal_endtime])

  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.addEventListener('change', async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0]
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now()
        //생성한 s3 관련 설정들
        AWS.config.update({
          region: process.env.NEXT_PUBLIC_AWS_REGION,
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        })
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: 'public-read',
            Bucket: `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}`,
            Key: `upload/${name}`,
            Body: file,
          },
        })
        //이미지 업로드 후
        //곧바로 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then(res => res.Location)
        //useRef를 사용해 에디터에 접근한 후
        //에디터의 현재 커서 위치에 이미지 삽입
        const editor = quillInstance?.current?.getEditor()
        if (!editor) return
        const range = editor.getSelection()
        if (!range) return
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, 'image', IMG_URL)
      } catch (error) {
        console.log(error)
      }
    })
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          ['bold', 'underline', 'strike'], // toggled buttons
          [{ align: [] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme

          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],

          ['link', 'image', 'video'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      history: {
        delay: 1000,
        maxStack: 500,
        userOnly: true,
      },
    }
  }, [])

  const handleSubmit = async () => {
    if (contents === '') {
      alert('내용을 입력해주세요')
      return
    }
    try {
      const response = await fetch('/api/modal/updateModal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: contents,
        }),
      })

      if (response.ok) {
        alert('공지가 등록되었습니다.')
        window.location.reload()
        // Handle success, e.g., redirect or show a success message
      } else {
        alert('공지 등록에 실패하였습니다.')
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error: any) {
      alert('공지 등록에 실패하였습니다.')
    }
  }

  return (
    <>
      <StyledVideo>
        <Input
          label="만료 시간"
          id="modalEndTime"
          type="datetime-local"
          value={modalEndTime}
          onChange={e => setModalEndTime(e.target.value)}
          crossOrigin={undefined}
          style={{ width: '100%' }}
        />

        <QuillNoSSRWrapper
          style={{ height: '600px' }}
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
        제출하기
      </Button>
    </>
  )
}

export default ModalEditor
