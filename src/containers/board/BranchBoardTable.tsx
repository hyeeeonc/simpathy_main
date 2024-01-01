'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Select, Option, Input } from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const BoardTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: fixed;
`

const BoardSearchContainer = styled.div`
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column;

    padding-bottom: 20px;

    border-bottom: 3px solid #ddd;
  }
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

const BranchBoardTable = ({
  posts,
  branch_id,
  branches,
}: {
  posts: any[]
  branch_id: number | undefined
  branches: any[]
}) => {
  const [showPosts, setShowPosts] = useState<any[]>(posts)

  const handleBranchSearch = (e: any) => {
    if (e === 1) {
      setShowPosts(posts)
    } else {
      const filteredPosts = posts.filter(post => post.branch_id === e)
      setShowPosts(filteredPosts)
    }
  }

  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:768px)',
  })
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })

  return (
    <>
      {branch_id === 1 && (
        <BoardSearchContainer>
          <Select label="지점 선택" onChange={handleBranchSearch}>
            {branches.map(branch => (
              <Option value={branch.branch_id}>{branch.branch_name}</Option>
            ))}
          </Select>
        </BoardSearchContainer>
      )}
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
              {showPosts.map((post: any, index: number) => (
                <tr key={index}>
                  <BoardTableCell>{post?.post_id}</BoardTableCell>

                  <BoardTableCellTitle>
                    <Link href={`/board/branch/${post?.post_id}`}>
                      {post?.post_title}
                    </Link>
                  </BoardTableCellTitle>

                  <BoardTableWriter>{post?.user_id}</BoardTableWriter>

                  <BoardTableCell>{post?.formattedDate}</BoardTableCell>
                </tr>
              ))}
            </tbody>
          </BoardTableContainer>
        </>
      )}
      {isMobile && (
        <BoardTableMobileContainer>
          {showPosts.map((post: any, index: number) => (
            <Link href={`/board/branch/${post?.post_id}`}>
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

export default BranchBoardTable
