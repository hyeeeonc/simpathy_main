'use client'

import styled from 'styled-components'
import { Select, Option, Input } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, useEffect, useState } from 'react'

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

const BranchBoardSearch = ({ branches }: { branches: any[] }) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchType = (e: any) => {
    setSearchType(e)
  }

  const handleBranchSearch = (e: any) => {
    setSearch(e)
  }

  const searchSubmit = () => {
    if (search === '' || searchType === '') {
      alert('검색어를 입력해주세요.')
      return
    }
    router.push(`/board/branch?search=${search}&searchType=${searchType}`)
  }

  const handleKeyPress = (e: any): void => {
    if (e.key === 'Enter') {
      searchSubmit()
    }
  }

  return (
    <BoardSearchContainer>
      <Select label="검색 범위" onChange={handleSearchType}>
        <Option value="content">글 + 제목</Option>
        <Option value="writer">지점</Option>
      </Select>
      {searchType === 'writer' && (
        <Select label="지점 선택" onChange={handleBranchSearch}>
          {branches.map(branch => (
            <Option value={branch.branch_id}>{branch.branch_name}</Option>
          ))}
        </Select>
      )}
      {searchType === 'content' && (
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
      )}
    </BoardSearchContainer>
  )
}

export default BranchBoardSearch
