'use client'

import QuillNoSSRWrapper from './WysiwygEditor'
import ReactQuill, { Quill } from 'react-quill'
import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ImageResize } from 'quill-image-resize-module-ts'
import {
  Input,
  Select,
  Option,
  Button,
  ButtonGroup,
} from '@material-tailwind/react'
import { User } from '@/types/auth'
import { Board } from '@/types/board'
import { useRouter } from 'next/navigation'
import AWS from 'aws-sdk'

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

const EditorQnaNoticeContainer = styled.div`
  width: 100%;

  padding: 15px;
  margin: 10px 0;

  line-height: 24px;

  font-size: 14px;
  background: #f9f9fa;
  color: #323232;

  border: 1px solid #ebecef;
`

interface EditorComponentProps {
  user_id?: string
  grade_id?: number
  boards?: Board[]
}

const EditorComponent = ({
  user_id = '',
  grade_id = 0,
  boards = [],
}: EditorComponentProps) => {
  const [boardType, setBoardType] = useState(0)
  const [qnaType, setQnaType] = useState('문학')

  const quillInstance = useRef<ReactQuill>(null)

  // 이미지 서버
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
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
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

  const boardTypeHandler = (type: number) => {
    setBoardType(type)
  }

  const qnaTypeHandler = (type: string) => {
    setQnaType(type)
  }

  // 글 작성 관련
  const router = useRouter() // 페이지 이동
  const [selectedBoard, setSelectedBoard] = useState<number>(0) // 게시판
  const [title, setTitle] = useState<string>('') // 제목
  const [contents, setContents] = useState('') // 내용

  const boardHandler = (e: any) => {
    setSelectedBoard(Number(e))
  }

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    if (!selectedBoard) {
      alert('게시판을 선택해주세요.')
      return
    }

    if (!title) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!contents) {
      alert('내용을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/editor/writePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_id: selectedBoard,
          user_id: user_id,
          post_title: title,
          post_contents: contents,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        const { post_id, board_id } = responseData // post_id 추출
        alert('작성이 완료되었습니다.')
        setSelectedBoard(0)
        setTitle('')
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
          <EditorQnaNoticeContainer>
            질문 게시판 운영에 관한 공지
            <br />
            ① 질문 게시판은 강의, 교재, 평가원 기출에 한해서만 질문 받습니다.
            <br />
            → 그 외에는 질문을 하셔도 답변하지 않습니다.
            <br />
            → 강의와 교재를 정확하게 적시해주셔야 정확한 답변을 받으실 수
            있습니다.
            <br />② 예의를 지키지 않는 질문은 답변하지 않습니다.
            <br />③ 질문의 내용은 '정확'해야 합니다.
            <br />→ 추상적인 질문, 떼쓰는 식의 질문은 답변하기가 참 어렵습니다.
            <br />→ 충분히 여러번 읽어 본 이후 질문을 해주시기 바랍니다.
            <br />④ 재질문은 '답글쓰기' 혹은 '새 게시글'로 다시 올려주세요.
            <br />→ 기존 게시글에 그냥 댓글을 다시면 알람이 저희에게 뜨지
            않습니다.
            <br />
            그러므로 만약 댓글로 재질문 하실 경우, 저희가 답변드린 댓글에
            '답글쓰기'로 남겨주세요.
            <br />* 댓글로 재질문을 하신 경우 간혹 누락되는 경우가 있습니다.
            오랫동안 답글이 달리지 않는 경우, 새 게시글로 질문 부탁드립니다.
          </EditorQnaNoticeContainer>
        )}
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
            <Select onChange={boardHandler} size="lg" label="게시판 선택">
              {boards.map((board, idx) => (
                <Option key={idx} value={board.board_id.toString()}>
                  {board.board_name}
                </Option>
              ))}
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
        <Input
          onChange={titleHandler}
          value={title}
          size="lg"
          label="제목"
          crossOrigin={undefined}
        />
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
      <MyComponent />
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

export default EditorComponent

const MyComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [inputKey, setInputKey] = useState<number>(Date.now())

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    const files = event.target.files

    if (files) {
      // FileList를 배열로 변환하여 기존 목록에 추가
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)])
      // 선택된 파일들을 input에서 제거 (재선택을 위해)
      setInputKey(Date.now())
    }
  }

  const handleRemoveFile = (index: number) => {
    // 선택 목록에서 파일 제거
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  // MyComponent 내에서 handleDroppedFiles 함수를 추가합니다.
  const handleDroppedFiles = (droppedFiles: FileList) => {
    // FileList를 배열로 변환하여 기존 목록에 추가
    setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(droppedFiles)])
    // 선택된 파일들을 input에서 제거 (재선택을 위해)
    setInputKey(Date.now())
  }

  useEffect(() => {
    console.log(selectedFiles)
  }, [selectedFiles])

  return (
    <>
      <div
        className="flex items-center justify-center w-full mb-10"
        onDragEnter={e => {
          e.preventDefault()
          // 드래그 진입 시 추가 스타일링 (필요시)
        }}
        onDragOver={e => {
          e.preventDefault()
          // 드래그 중일 때 추가 스타일링 (필요시)
        }}
        onDragLeave={e => {
          e.preventDefault()
          // 드래그 떠날 때 추가 스타일링 제거 (필요시)
        }}
        onDrop={e => {
          e.preventDefault()
          handleDroppedFiles(e.dataTransfer.files)
        }}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            key={inputKey}
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {selectedFiles.map((file, index) => (
        <div key={index}>
          {file.name}
          <button onClick={() => handleRemoveFile(index)}>Remove</button>
        </div>
      ))}
    </>
  )
}
