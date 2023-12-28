'use client'

import styled from 'styled-components'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PostUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  margin: 10px 0;
`

const PostUtil = ({
  post_id,
  board_id,
}: {
  post_id: number
  board_id: number
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

  return (
    <PostUtilContainer>
      {/* <Button variant="outlined" style={{ marginRight: '10px' }}>
        수정
      </Button> */}
      <Button onClick={handleOpen} variant="gradient">
        삭제
      </Button>
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
    </PostUtilContainer>
  )
}

export default PostUtil
