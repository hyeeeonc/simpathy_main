'use client'

import styled from 'styled-components'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const PostUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  margin: 10px 0;
`

export const PostDeleteButton = ({
  post_id,
  board_id,
  board_type,
  can_edit,
}: {
  post_id: number
  board_id: number
  board_type: number
  can_edit: boolean
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const postDeleteHandler = async () => {
    try {
      const response = await fetch('/api/editor/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id,
        }),
      })

      if (response.ok) {
        alert('글이 삭제되었습니다.')
        router.refresh()
        router.push(`/board/${board_id}`)
      } else if (response.status === 401) {
        alert('권한이 없습니다.')
        // Handle errors, e.g., show an error message to the user
      } else {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } catch (error: any) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const handleUpdate = () => {
    router.push(`/editor/update/${board_type}/${post_id}`)
  }

  return (
    <>
      {can_edit && (
        <Button
          onClick={handleUpdate}
          variant="outlined"
          style={{ marginRight: '10px' }}
        >
          수정
        </Button>
      )}
      {board_type !== 1 && (
        <Button onClick={handleOpen} variant="gradient">
          삭제
        </Button>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogBody style={{ color: 'black', fontWeight: 'bold' }}>
          삭제된 게시물은 복구할 수 없습니다.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>취소</span>
          </Button>
          <Button variant="gradient" color="red" onClick={postDeleteHandler}>
            <span>삭제</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export const PostNoticeButton = ({
  post_id,
  board_id,
  isNotice,
}: {
  post_id: number
  board_id: number
  isNotice: boolean | null
}) => {
  const postNoticeHandler = async () => {
    if (isNotice === true) {
      try {
        const response = await fetch('/api/board/deleteNotice', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id,
          }),
        })

        if (response.ok) {
          alert('공지에서 해제되었습니다.')
          location.reload()
        } else {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
        }
      } catch (error: any) {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } else {
      try {
        const response = await fetch('/api/board/addNotice', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id,
          }),
        })

        if (response.ok) {
          alert('공지로 등록되었습니다.')
          location.reload()
        } else {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
        }
      } catch (error: any) {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginRight: '10px' }}
        onClick={postNoticeHandler}
      >
        {isNotice ? '공지 해제' : '공지 설정'}
      </Button>
    </>
  )
}
