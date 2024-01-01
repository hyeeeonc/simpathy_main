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

export const BranchPostDeleteButton = ({ post_id }: { post_id: number }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const postDeleteHandler = async () => {
    try {
      const response = await fetch('/api/editor/branch/deletePost', {
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
        router.push(`/board/branch`)
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
    <>
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
    </>
  )
}
