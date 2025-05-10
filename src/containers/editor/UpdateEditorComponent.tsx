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
import dynamic from 'next/dynamic'
import QnaNotice from '../post/QnaNotice'

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

interface UpdateEditorComponentProps {
  user_id?: string
  grade_id?: number
  boards?: Board[]
  branches?: any[]
  board_id?: number
  post?: any
  board_type?: number
}

const UpdateEditorComponent = ({
  user_id = '',
  grade_id = 0,
  boards = [],
  branches = [],
  board_id = 0,
  post = {},
  board_type = 0,
}: UpdateEditorComponentProps) => {
  const [boardType, setBoardType] = useState(board_type)

  const quillInstance = useRef<ReactQuill>(null)

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
        // handlers: {
        //   image: imageHandler,
        // },
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

  // 글 작성 관련
  const router = useRouter() // 페이지 이동
  const [selectedBoard, setSelectedBoard] = useState<number>(post.board_id) // 게시판
  const [title, setTitle] = useState<string>(post.post_title) // 제목
  const [contents, setContents] = useState(post.post_contents) // 내용
  const [offButton, setOffButton] = useState<boolean>(false) // 버튼 활성화 여부

  const boardHandler = (e: any) => {
    setSelectedBoard(Number(e))
  }

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  // board 선택자
  useEffect(() => {
    if (board_id > 0) setSelectedBoard(board_id)
  }, [])

  // 파일 업로드 관련
  const [beforeFiles, setBeforeFiles] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [deleteFiles, setDeleteFiles] = useState<File[]>([])

  useEffect(() => {
    setBeforeFiles(post.files)
  }, [])

  const handleRemoveBeforeFile = (index: number) => {
    setDeleteFiles(prevFiles => [...prevFiles, beforeFiles[index]])
    setBeforeFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const handleRemoveFile = (index: number) => {
    // 선택 목록에서 파일 제거
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const FileHandler = async (post_id: number) => {
    try {
      // AWS S3 설정
      AWS.config.update({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      })

      const s3 = new AWS.S3()

      // 삭제된 파일 처리
      if (deleteFiles.length > 0) {
        // S3에서 파일 삭제
        const deleteS3Promises = deleteFiles.map((file: any) => {
          const key = file.file_addr.split('/').pop() // URL에서 파일명 추출
          return s3.deleteObject({
            Bucket: `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}`,
            Key: `files/${key}`,
          }).promise()
        })

        await Promise.all(deleteS3Promises)

        if (boardType === 0) {
          try {
            const response = await fetch('/api/editor/deleteFiles', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                files: deleteFiles,
                post_id: post_id,
              }),
            });

            if (!response.ok) {
              throw new Error('파일 삭제에 실패했습니다.');
            }
          } catch (error) {
            console.error('파일 삭제 중 오류 발생:', error);
            throw error;
          }
        } else if (boardType === 2) {
          try {
            const response = await fetch('/api/editor/branch/deleteFiles', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                files: deleteFiles,
                post_id: post_id,
              }),
            });

            if (!response.ok) {
              throw new Error('파일 삭제에 실패했습니다.');
            }
          } catch (error) {
            console.error('파일 삭제 중 오류 발생:', error);
            throw error;
          }
        }
      }

      // 새로운 파일 업로드
      const uploadedUrls = []
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]

        // 파일명 생성 로직 수정
        const originalName = file.name
        const timestamp = Date.now()
        const newFileName = `${timestamp}_${originalName}`
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: 'public-read',
            Bucket: `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}`,
            Key: `files/${newFileName}`,
            Body: file,
          },
        })
        //이미지 업로드 후
        //곧바로 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then(res => res.Location)
        uploadedUrls.push({ name: originalName, url: IMG_URL })
      }

      if (uploadedUrls.length > 0) {
        if (boardType === 0) {
          try {
            const response = await fetch('/api/editor/addFiles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                files: uploadedUrls,
                post_id: post_id,
              }),
            })

            if (response.ok) {
              alert('파일 업로드가 완료되었습니다.')
            } else {
              alert('파일 업로드에 실패하였습니다.')
              // Handle errors, e.g., show an error message to the user
            }
          } catch (error: any) {
            alert('파일 업로드에 실패하였습니다.')
          }
        } else if (boardType === 2) {
          try {
            const response = await fetch('/api/editor/branch/addFiles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                files: uploadedUrls,
                post_id: post_id,
              }),
            })

            if (response.ok) {
              alert('파일 업로드가 완료되었습니다.')
            } else {
              alert('파일 업로드에 실패하였습니다.')
              // Handle errors, e.g., show an error message to the user
            }
          } catch (error: any) {
            alert('파일 업로드에 실패하였습니다.')
          }
        }
      }
    } catch (error) {
      alert('파일 업로드에 실패하였습니다.')
    }
  }

  // 질문게시판 관련
  const [qnaType, setQnaType] = useState('문학')
  const [qnaTarget, setQnaTarget] = useState('강의')

  const qnaTypeHandler = (type: string) => {
    setQnaType(type)
    setQnaTarget('')
  }

  const qnaTargetHandler = (e: any) => {
    setQnaTarget(e)
  }

  // 최종 제출 핸들러
  const handleSubmit = async () => {
    setOffButton(true)

    if (!title) {
      alert('제목을 입력해주세요.')
      setOffButton(false)
      return
    }

    if (!contents) {
      alert('내용을 입력해주세요.')
      setOffButton(false)
      return
    }

    if (boardType === 0) {
      if (!selectedBoard) {
        alert('게시판을 선택해주세요.')

        setOffButton(false)
        return
      }
      try {
        const response = await fetch('/api/editor/updatePost', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: post.post_id,
            board_id: selectedBoard,
            post_title: title,
            post_contents: contents,
          }),
        })

        if (response.ok) {
          const responseData = await response.json()
          const { post_id, board_id } = responseData // post_id 추출

          // 파일 업로드
          await FileHandler(post_id)
          alert('수정이 완료되었습니다.')
          setSelectedBoard(0)
          setTitle('')
          setContents('')
          // 새로운 경로로 이동
          router.push(`/board/${board_id}/${post_id}`)
        } else {
          alert('수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
          setOffButton(false)
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
        setOffButton(false)
      }
    } else if (boardType === 2) {
      if (!selectedBoard) {
        alert('게시판을 선택해주세요.')

        setOffButton(false)
        return
      }
      try {
        const response = await fetch('/api/editor/branch/writePost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branch_id: selectedBoard,
            user_id: user_id,
            post_title: title,
            post_contents: contents,
          }),
        })

        if (response.ok) {
          const responseData = await response.json()
          const { post_id } = responseData // post_id 추출

          // 파일 업로드
          await FileHandler(post_id)
          alert('작성이 완료되었습니다.')
          setSelectedBoard(0)
          setTitle('')
          setContents('')
          // 새로운 경로로 이동
          router.push(`/board/branch`)
        } else {
          alert('작성에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
          setOffButton(false)
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('작성에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
        setOffButton(false)
      }
    } else if (boardType === 1) {
      // 질문게시판
      if (!qnaType) {
        alert('질문 유형을 선택해주세요.')

        setOffButton(false)
        return
      }

      if (!qnaTarget) {
        alert('질문 대상을 선택해주세요.')

        setOffButton(false)
        return
      }

      try {
        const response = await fetch('/api/editor/qna/updatePost', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: post.post_id,
            post_qnatype: qnaType,
            post_qnatarget: qnaTarget,
            post_title: title,
            post_contents: contents,
          }),
        })

        if (response.ok) {
          const responseData = await response.json()
          const { post_id } = responseData // post_id 추출

          // 파일 업로드
          await FileHandler(post_id)
          alert('수정이 완료되었습니다.')
          setSelectedBoard(0)
          setTitle('')
          setContents('')
          // 새로운 경로로 이동
          router.refresh()
          router.push(`/board/qna/${post_id}`)
          setOffButton(false)
        } else {
          alert('수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
          setOffButton(false)
          // Handle errors, e.g., show an error message to the user
        }
      } catch (error: any) {
        alert('수정에 실패하였습니다. 잠시 후 다시 시도해 주세요.')
        setOffButton(false)
      }
    }
  }

  useEffect(() => {
    if (boardType === 1) {
      setQnaType(post.post_qnatype)
      setQnaTarget(post.post_qnatarget)
    }
  }, [])

  return (
    <>
      <EditorHeaderConatier>
        {/* {grade_id >= 5 && ( */}
        <div className="flex h-[45px] w-max gap-4 mb-[10px]">
          <Button variant={boardType === 0 ? 'filled' : 'outlined'}>
            {boardType === 0 ? '일반' : boardType === 1 ? '질문' : '지점별'}
          </Button>
        </div>
        {boardType === 1 && (
          <>
            <QnaNotice />
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
          </>
        )}
        <EditorHeaderSelectorContainer>
          {boardType === 0 && (
            <Select
              value={board_id.toString()}
              onChange={boardHandler}
              size="lg"
              label="게시판 선택"
            >
              {boards.map((board, idx) => (
                <Option key={idx} value={board.board_id.toString()}>
                  {board.board_name}
                </Option>
              ))}
            </Select>
          )}
          {boardType === 1 && (
            <>
              <Select
                value={qnaTarget}
                size="lg"
                label="질문사항"
                onChange={qnaTargetHandler}
              >
                <Option value="강의">강의</Option>
                <Option value="교재(강의교재)">교재(강의교재)</Option>
                <Option value="교재(학습자료)">
                  교재(학습자료 - 복습시트, 에필로그 등)
                </Option>
                <Option value="기출문제">평가원 기출</Option>
                <Option value="학습법">학습법</Option>
                <Option value="기타">기타</Option>
              </Select>

              {/* <Select size="lg" label="문항">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select> */}
            </>
          )}
          {boardType === 2 && (
            <Select onChange={boardHandler} size="lg" label="지점 선택">
              {branches.map((branch, idx) => (
                <Option key={idx} value={branch.branch_id.toString()}>
                  {branch.branch_name}
                </Option>
              ))}
            </Select>
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
      {(boardType === 0 || boardType === 2) && (
        <>
          <MyComponent setSelectedFiles={setSelectedFiles} />

          <div className="my-[20px]">
            <div className="mb-[10px] text-lg font-bold">첨부파일</div>
            
            {beforeFiles.map((file, index) => (
              <div key={index} className="flex items-center mb-[5px]">
                <div>{file.file_name}</div>
                
                <svg
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleRemoveBeforeFile(index)}
                  width={20}
                  height={20}
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>

                
              </div>
            ))}
            

            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center mb-[5px]">
                <div>{file.name}</div>
                
                <svg
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleRemoveFile(index)}
                  width={20}
                  height={20}
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>

                
              </div>
            ))}
          </div>
        </>
      )}
      <Button
        onClick={handleSubmit}
        color="blue-gray"
        size="lg"
        variant="outlined"
        fullWidth
        disabled={offButton}
      >
        제출하기
      </Button>
    </>
  )
}

export default UpdateEditorComponent

const MyComponent = ({
  setSelectedFiles,
}: {
  setSelectedFiles: (value: File[] | ((prevValue: File[]) => File[])) => void
}) => {
  const [inputKey, setInputKey] = useState<number>(Date.now())

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      // FileList를 배열로 변환하여 기존 목록에 추가
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)])
      // 선택된 파일들을 input에서 제거 (재선택을 위해)
      setInputKey(Date.now())
    }
  }

  // MyComponent 내에서 handleDroppedFiles 함수를 추가합니다.
  const handleDroppedFiles = (droppedFiles: FileList) => {
    // FileList를 배열로 변환하여 기존 목록에 추가
    setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(droppedFiles)])
    // 선택된 파일들을 input에서 제거 (재선택을 위해)
    setInputKey(Date.now())
  }

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
    </>
  )
}
