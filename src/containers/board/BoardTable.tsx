'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Select, Option, Input, Button } from '@material-tailwind/react'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/navigation'

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

const BoardTable = ({
  posts,
  board_id,
}: {
  posts: any[]
  board_id: number
}) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchType = (e: any) => {
    setSearchType(e)
  }

  const searchSubmit = () => {
    if (search === '' || searchType === '') {
      alert('검색어를 입력해주세요.')
      return
    }
    if (board_id === 0)
      router.push(`/board?search=${search}&searchType=${searchType}`)
    else
      router.push(
        `/board/${board_id}?search=${search}&searchType=${searchType}`,
      )
  }

  const handleKeyPress = (e: any): void => {
    if (e.key === 'Enter') {
      searchSubmit()
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
      <BoardSearchContainer>
        <Select label="검색 범위" onChange={handleSearchType}>
          <Option value="content">글 + 제목</Option>
          <Option value="writer">작성자</Option>
        </Select>
        <Input
          label="검색"
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          icon={
            <MagnifyingGlassIcon
              className="h-5 w-5 cursor-pointer"
              onClick={searchSubmit}
            />
          }
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
                <tr
                  key={index}
                  style={{
                    background: post?.isNotice ? '#f5f5f5' : 'white',
                    color: post?.isNotice ? 'red' : 'black',
                  }}
                >
                  <BoardTableCell>{post?.post_id}</BoardTableCell>

                  <BoardTableCellTitle>
                    <Link href={`/board/${post?.board_id}/${post?.post_id}`}>
                      {post?.post_title}
                    </Link>
                  </BoardTableCellTitle>

                  <BoardTableWriter>
                    <Link
                      href={`/board?search=${post?.user_id}&searchType=writer`}
                    >
                      {post?.user_id}
                    </Link>
                  </BoardTableWriter>

                  <BoardTableCell>{post?.formattedDate}</BoardTableCell>
                </tr>
              ))}
            </tbody>
          </BoardTableContainer>
        </>
      )}
      {isMobile && (
        <BoardTableMobileContainer>
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
