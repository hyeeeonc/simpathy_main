'use client'

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
import { ChangeEvent, useEffect, useState } from 'react'
import { Board, Category } from '@/types/board'
import { Grade } from '@/types/auth'
import { Input } from '@material-tailwind/react'

const CategoryItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;

  border-top: 2px double black;
  border-bottom: 2px double black;

  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`

const BoardItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px 10px;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`

const BoardTitle = styled.div`
  display: flex;
  align-items: center;

  height: 40px;

  svg {
    margin: 0 5px;
  }

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`

const OrderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 45px;

  margin-right: 10px;

  svg {
    cursor: pointer;
  }
`

const BoardManage = () => {
  const [categories, setCategories] = useState<Category[]>()
  const [boards, setBoards] = useState<Board[]>()
  const [grades, setGrades] = useState<Grade[]>()

  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [newBoard, setNewBoard] = useState<Board>({
    board_id: 1,
    board_name: '',
    board_read_auth: 1,
    board_write_auth: 1,
    category_id: 1,
    board_order: 1,
  })

  const getCategoryData = async () => {
    const res = await fetch(`/api/board/getCategory`)
    const data = await res.json()
    data.sort((a: Category, b: Category) => a.category_order - b.category_order)

    setCategories(data)
  }

  const getBoardData = async () => {
    const res = await fetch(`/api/board/getBoard`)
    const data = await res.json()
    data.sort((a: Board, b: Board) => {
      if (a.category_id === b.category_id) {
        return a.board_order - b.board_order
      }
      return a.category_id - b.category_id
    })
    setBoards(data)
  }

  const getGradeData = async () => {
    const res = await fetch(`/api/user/grade/getUserGradeAll`)
    const data = await res.json()
    setGrades(data)
  }

  useEffect(() => {
    getCategoryData()
    getBoardData()
    getGradeData()
  }, [])

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value)
  }

  const addCategory = async () => {
    if (!newCategoryName) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }

    const maxOrder = findMaxCategoryOrder()

    if (maxOrder === null) {
      alert('카테고리 추가에 실패했습니다.')
      return
    }

    const res = await fetch(`/api/board/addCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_name: newCategoryName,
        category_order: maxOrder + 1,
      }),
    })

    if (res.ok) {
      alert('카테고리 추가가 완료되었습니다.')
      getCategoryData() // 데이터를 업데이트하는 함수 호출
      setNewCategoryName('')
    } else {
      alert('카테고리 추가에 실패했습니다.')
    }
  }

  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBoard(prevData => ({
      ...prevData,
      board_name: e.target.value,
    }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewBoard(prevData => ({
      ...prevData,
      [name]: Number(value),
    }))
  }

  const findMaxBoardOrder = (category_id: number) => {
    if (!boards || boards.length === 0) {
      return null
    }

    const filteredBoards = boards.filter(
      board => board.category_id === category_id,
    )

    if (filteredBoards.length === 0) {
      return null
    }

    const maxBoardOrder = Math.max(
      ...filteredBoards.map(board => board.board_order),
    )

    return maxBoardOrder
  }

  const addBoard = async () => {
    if (
      Object.entries(newBoard).some(
        ([key, value]) => key !== 'board_id' && key !== 'board_order' && !value,
      )
    ) {
      alert('모든 값을 입력해주세요.')
      return
    }

    const maxOrder = findMaxBoardOrder(newBoard.category_id)

    if (maxOrder === null) {
      alert('게시판 추가에 실패했습니다.')
      return
    }

    setNewBoard(prevData => ({
      ...prevData,
      board_order: maxOrder + 1,
    }))

    const res = await fetch(`/api/board/addBoard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    })

    if (res.ok) {
      alert('게시판 추가가 완료되었습니다.')
      getBoardData() // 데이터를 업데이트하는 함수 호출
      setNewBoard({
        board_id: 1,
        board_name: '',
        board_read_auth: 1,
        board_write_auth: 1,
        category_id: 1,
        board_order: 1,
      })
    } else {
      alert('게시판 추가에 실패했습니다.')
    }
  }

  const findMaxCategoryOrder = () => {
    if (!categories || categories.length === 0) {
      return null
    }

    const maxCategoryOrder = Math.max(
      ...categories.map(category => category.category_order),
    )

    return maxCategoryOrder
  }

  const changeCategoryOrder = async (
    id: number,
    order: number,
    change: number,
  ) => {
    const maxOrder = findMaxCategoryOrder()
    if ((order == 0 && change == -1) || (order == maxOrder && change == 1)) {
      return
    }

    const res = await fetch(`/api/board/changeCategoryOrder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_id: id,
        change: change,
      }),
    })

    if (res.ok) {
      alert('카테고리 순서 변경이 완료되었습니다.')
      getCategoryData() // 데이터를 업데이트하는 함수 호출
    } else {
      alert('카테고리 순서 변경에 실패했습니다.')
    }
  }

  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle style={{ width: '100%' }}>
        게시판 관리
      </ContentBoxCellTitle>

      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>게시판 편집</ContentBoxCellContentTitle>
        </ContentBoxCellContentWrapper>
        <div style={{ padding: '20px' }}>
          {categories?.map((category, index) => (
            <>
              <CategoryItems key={index}>
                {category.category_name}
                <OrderButtonContainer>
                  <svg
                    onClick={() =>
                      changeCategoryOrder(
                        category.category_id,
                        category.category_order,
                        1,
                      )
                    }
                    width="16" // 변경된 너비
                    height="16" // 변경된 높이
                    viewBox="0 0 24 24" // viewBox 추가 및 설정
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
                  </svg>
                  <svg
                    onClick={() =>
                      changeCategoryOrder(
                        category.category_id,
                        category.category_order,
                        -1,
                      )
                    }
                    width="16" // 변경된 너비
                    height="16" // 변경된 높이
                    viewBox="0 0 24 24" // viewBox 추가 및 설정
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
                  </svg>
                </OrderButtonContainer>
              </CategoryItems>
              {boards?.map((board, index) => (
                <>
                  {board.category_id === category.category_id && (
                    <BoardItems>
                      <BoardTitle key={index}>
                        ┕
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 22v-16h14v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-5.362zm16-7.614v-10.386h-18v20h8.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-4v-1h4v1zm6-4h-10v1h10v-1zm0-3h-10v1h10v-1zm1-7h-17v19h-2v-21h19v2z" />
                        </svg>
                        {board.board_name}
                      </BoardTitle>
                      <OrderButtonContainer>
                        <svg
                          onClick={() =>
                            changeCategoryOrder(
                              category.category_id,
                              category.category_order,
                              1,
                            )
                          }
                          width="16" // 변경된 너비
                          height="16" // 변경된 높이
                          viewBox="0 0 24 24" // viewBox 추가 및 설정
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
                        </svg>
                        <svg
                          onClick={() =>
                            changeCategoryOrder(
                              category.category_id,
                              category.category_order,
                              -1,
                            )
                          }
                          width="16" // 변경된 너비
                          height="16" // 변경된 높이
                          viewBox="0 0 24 24" // viewBox 추가 및 설정
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
                        </svg>
                      </OrderButtonContainer>
                    </BoardItems>
                  )}
                </>
              ))}
            </>
          ))}
        </div>
        <ContentBoxClickableContentWrapper
          style={{
            color: '#797b84',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          변경사항 저장
        </ContentBoxClickableContentWrapper>

        <ContentBoxCellContentWrapper style={{ marginTop: '40px' }}>
          <ContentBoxCellContentTitle>
            새 대분류 등록
          </ContentBoxCellContentTitle>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              type="text"
              label="대분류 이름"
              onChange={handleCategoryNameChange}
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <BoardItems>
          <input />
        </BoardItems>
        <ContentBoxClickableContentWrapper
          onClick={addCategory}
          style={{
            color: '#797b84',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          대분류 추가
        </ContentBoxClickableContentWrapper>

        <ContentBoxCellContentWrapper style={{ marginTop: '40px' }}>
          <ContentBoxCellContentTitle>
            새 게시판 등록
          </ContentBoxCellContentTitle>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              type="text"
              label="게시판 이름"
              onChange={handleBoardNameChange}
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>읽기 권한</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <select
              name="board_read_auth"
              value={newBoard.board_read_auth}
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
          <ContentBoxCellContentTitle>쓰기 권한</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <select
              name="board_write_auth"
              value={newBoard.board_write_auth}
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
              value={newBoard.category_id}
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
          onClick={addBoard}
        >
          게시판 추가
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default BoardManage
