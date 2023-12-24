'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
  ContentBoxClickableContentWrapper,
} from '@/components/ContentBox'
import { Input } from '@material-tailwind/react'
import { Board, Category } from '@/types/board'
import { Grade } from '@/types/auth'

const AdminBranchUpdateWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.8);
  z-index: 50;
`

const AdminBranchUpdateContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 1100px;

  z-index: 51;

  @media (max-width: 1159px) {
    width: calc(100vw - 60px);
  }

  @media (max-width: 767px) {
    width: calc(100vw - 40px);
    padding: 10px;
    border-radius: 5px;
  }
`

interface BoardUpdateProps {
  isOpen: boolean
  board: Board | undefined
  grades: Grade[] | undefined
  categories: Category[] | undefined
  onClose: () => void
  boardRefresh: () => void
}

const BoardUpdate: React.FC<BoardUpdateProps> = ({
  isOpen,
  board,
  grades,
  categories,
  onClose,
  boardRefresh,
}) => {
  const [boardData, setBoardData] = useState<Board>({
    board_id: 1,
    board_name: '',
    board_read_auth: 0,
    board_write_auth: 0,
    category_id: 0,
    board_order: 0,
  })

  useEffect(() => {
    setBoardData(prevData => ({
      ...prevData,
      board_id: board?.board_id || 0,
      board_name: board?.board_name || '',
      board_read_auth: board?.board_read_auth || 0,
      board_write_auth: board?.board_write_auth || 0,
      category_id: board?.category_id || 0,
      board_order: board?.board_order || 0,
    }))
  }, [board])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardData(prevData => ({
      ...prevData,
      board_name: e.target.value,
    }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setBoardData(prevData => ({
      ...prevData,
      [name]: Number(value),
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/board/changeBoard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_id: boardData?.board_id,
          board_name: boardData?.board_name,
          board_read_auth: boardData?.board_read_auth,
          board_write_auth: boardData?.board_write_auth,
          category_id: boardData?.category_id,
        }),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
        boardRefresh()
        onClose()
      } else {
        alert('반영에 실패하였습니다.')
      }
    } catch (error: any) {
      alert('반영에 실패하였습니다.')
    }
  }

  return (
    <>
      <AdminBranchUpdateWrapper
        onClick={onClose}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <AdminBranchUpdateContainer onClick={e => e.stopPropagation()}>
          <ContentBoxCellContainer>
            <ContentBoxCellTitle>게시판 수정</ContentBoxCellTitle>
            <ContentBoxCellContentContainer>
              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  게시판 이름
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    value={boardData.board_name}
                    onChange={handleNameChange}
                    label="대분류 이름"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  읽기 권한
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select
                    name="board_read_auth"
                    value={boardData.board_read_auth}
                    onChange={handleSelectChange}
                  >
                    {grades?.map((grade, index) => (
                      <option key={index} value={grade.grade_id}>
                        {grade.grade_name}
                      </option>
                    ))}
                  </select>
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  쓰기 권한
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select
                    name="board_write_auth"
                    value={boardData.board_write_auth}
                    onChange={handleSelectChange}
                  >
                    {grades?.map((grade, index) => (
                      <option key={index} value={grade.grade_id}>
                        {grade.grade_name}
                      </option>
                    ))}
                  </select>
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>대분류</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select
                    name="category_id"
                    value={boardData.category_id}
                    onChange={handleSelectChange}
                  >
                    {categories?.map((category, index) => (
                      <option key={index} value={category.category_id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxClickableContentWrapper
                style={{
                  color: '#797b84',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={handleSubmit}
              >
                수정하기
              </ContentBoxClickableContentWrapper>
            </ContentBoxCellContentContainer>
          </ContentBoxCellContainer>
        </AdminBranchUpdateContainer>
      </AdminBranchUpdateWrapper>
    </>
  )
}

export default BoardUpdate
