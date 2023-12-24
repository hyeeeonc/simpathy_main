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

const PostUtilContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  margin: 10px 0;
`

const PostUtil = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <PostUtilContainer>
      <Button variant="outlined" style={{ marginRight: '10px' }}>
        수정
      </Button>
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
          <Button variant="gradient" color="red" onClick={handleOpen}>
            <span>삭제</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </PostUtilContainer>
  )
}

export default PostUtil
