'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, CardFooter, IconButton, Input } from '@material-tailwind/react'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

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

const BoardTableMobileContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const BoardTableMobileItemContainer = styled.div`
  width: 100%;
  height: 80px;

  border-bottom: 1px solid #ddd;

  padding: 11px 12px 11px 0;
`

const BoardTableMobileItemTitle = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;

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

const BoardTableMobileItemSubContainer = styled.div`
  display: flex;
  color: #999;

  font-size: 12px;
  line-height: 1.8;
`

const BoardTableMobileWriter = styled.div`
  margin-right: 10px;
`

const BoardTableMobileDate = styled.div``

const BoardTable = ({ posts }: { posts: any[] }) => {
  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:768px)',
  })
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })

  return (
    <>
      <BoardSearchContainer>
        <Input
          label="검색"
          icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
          crossOrigin={undefined}
        />
      </BoardSearchContainer>
      {isDesktop && (
        <>
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

                  <BoardTableWriter>
                    <Link href={`/board/userpost/${post?.user_id}`}>
                      {post?.user_id}
                    </Link>
                  </BoardTableWriter>

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
      )}
      {isMobile && (
        <BoardTableMobileContainer>
          {/* <BoardTableMobileItemContainer>
            <BoardTableMobileItemTitle>
              <Link href={`#`}>제목</Link>
            </BoardTableMobileItemTitle>
            <BoardTableMobileItemSubContainer>
              <BoardTableMobileWriter>정현철</BoardTableMobileWriter>
              <BoardTableMobileDate>2023.12.25</BoardTableMobileDate>
            </BoardTableMobileItemSubContainer>
          </BoardTableMobileItemContainer> */}
          {posts.map((post: any, index: number) => (
            <Link href={`/board/${post?.board_id}/${post?.post_id}`}>
              <BoardTableMobileItemContainer key={index}>
                <BoardTableMobileItemTitle>
                  {post?.post_title}
                </BoardTableMobileItemTitle>
                <BoardTableMobileItemSubContainer>
                  <BoardTableMobileWriter>
                    {post?.user_id}
                  </BoardTableMobileWriter>
                  <BoardTableMobileDate>
                    {post?.formattedDate}
                  </BoardTableMobileDate>
                </BoardTableMobileItemSubContainer>
              </BoardTableMobileItemContainer>
            </Link>
          ))}
        </BoardTableMobileContainer>
      )}
    </>
  )
}

export default BoardTable
