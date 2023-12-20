'use client'

import QuillNoSSRWrapper from './WysiwygEditor'
import ReactQuill, { Quill } from 'react-quill'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageResize } from 'quill-image-resize-module-ts'
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

const EditorHeaderConatier = styled.div`
  margin-bottom: 20px;
`
const EditorHeaderSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const EditorComponent = () => {
  const [boardType, setBoardType] = useState(0)

  const [qnaType, setQnaType] = useState('문학')

  const quillInstance = useRef<ReactQuill>(null)
  const [contents, setContents] = useState('')
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ align: [] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],

      ['link', 'image', 'video'],
    ],
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

  const boardTypeHandler = (type: number) => {
    setBoardType(type)
  }

  const qnaTypeHandler = (type: string) => {
    setQnaType(type)
  }

  return (
    <>
      <EditorHeaderConatier>
        <div className="flex h-[45px] w-max gap-4 mb-[10px]">
          <Button
            variant={boardType === 0 ? 'filled' : 'outlined'}
            onClick={() => {
              boardTypeHandler(0)
            }}
          >
            일반 게시판
          </Button>
          <Button
            variant={boardType === 1 ? 'filled' : 'outlined'}
            onClick={() => {
              boardTypeHandler(1)
            }}
          >
            질문 게시판
          </Button>
        </div>
        {boardType === 1 && (
          <div className="flex h-[45px] w-max gap-4 mb-[10px]">
            <Button
              variant={qnaType === '문학' ? 'filled' : 'outlined'}
              onClick={() => {
                qnaTypeHandler('문학')
              }}
            >
              문학
            </Button>
            <Button
              variant={qnaType === '독서' ? 'filled' : 'outlined'}
              onClick={() => {
                qnaTypeHandler('독서')
              }}
            >
              독서
            </Button>
            <Button
              variant={qnaType === '기타' ? 'filled' : 'outlined'}
              onClick={() => {
                qnaTypeHandler('기타')
              }}
            >
              기타
            </Button>
          </div>
        )}
        <EditorHeaderSelectorContainer>
          {boardType === 0 && (
            <Select size="lg" label="게시판 선택">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          )}
          {boardType === 1 && (
            <>
              <Select size="lg" label="출제년도">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Select size="lg" label="문항">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </>
          )}
        </EditorHeaderSelectorContainer>
        <Input size="lg" label="제목" crossOrigin={undefined} />
      </EditorHeaderConatier>
      <StyledVideo>
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
      <Button color="blue-gray" size="lg" variant="outlined" fullWidth>
        제출하기
      </Button>
    </>
  )
}

export default EditorComponent
