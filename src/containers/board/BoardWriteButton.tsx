'use client'

import styled from 'styled-components'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'

const BoardWriteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

const BoardWriteButton = ({ board_id }: { board_id: number }) => {
  return (
    <BoardWriteButtonContainer>
      <Link href={`/editor?board_id=${board_id}`}>
        <Button variant="outlined">글쓰기</Button>
      </Link>
    </BoardWriteButtonContainer>
  )
}

export default BoardWriteButton
