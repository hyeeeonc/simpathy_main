'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, CardFooter, IconButton, Input } from '@material-tailwind/react'
import Link from 'next/link'

const BoardTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: fixed;
`

const BoardSearchContainer = styled.div`
  width: 300px;
  margin-bottom: 20px;
`

const BoardTableHeader = styled.thead`
  border-top: 2px solid lightgray;
  height: 40px;
  line-height: 40px;
`

const BoardTableHead = styled.th`
  border-bottom: 1px solid lightgray;
  text-align: center;
`

const BoardTableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const BoardTableWriter = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const BoardTableCellTitle = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const BoardTable = ({ posts }: { posts: any[] }) => {
  return (
    <>
      <BoardSearchContainer>
        <Input
          label="검색"
          icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
          crossOrigin={undefined}
        />
      </BoardSearchContainer>
      <BoardTableContainer>
        <BoardTableHeader>
          <tr>
            <BoardTableHead style={{ width: '5%' }}>번호</BoardTableHead>
            <BoardTableHead style={{ width: '60%' }}>제목</BoardTableHead>
            <BoardTableHead>작성자</BoardTableHead>
            <BoardTableHead>게시일</BoardTableHead>
          </tr>
        </BoardTableHeader>
        <tbody>
          {posts.map((post: any, index: number) => (
            <tr key={index}>
              <BoardTableCell>{post?.post_id}</BoardTableCell>

              <BoardTableCellTitle>
                <Link href={`/board/${post?.board_id}/${post?.post_id}`}>
                  {post?.post_title}
                </Link>
              </BoardTableCellTitle>

              <BoardTableWriter>{post?.user_id}</BoardTableWriter>
              <BoardTableCell>{post?.formattedDate}</BoardTableCell>
            </tr>
          ))}
        </tbody>
      </BoardTableContainer>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="text" size="sm">
          &lt; 이전
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="text" size="sm">
          다음 &gt;
        </Button>
      </CardFooter>
    </>
  )
}

export default BoardTable
