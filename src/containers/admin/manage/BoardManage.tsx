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
import { useEffect, useState } from 'react'
import { Category } from '@/types/board'
import { Grade } from '@/types/auth'

const BoardItems = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 15px 20px;

  margin: 5px 0;
`

const BoardManage = () => {
  const [categorys, setCategorys] = useState<Category[]>()
  const [grades, setGrades] = useState<Grade[]>([
    {
      grade_id: 0,
      grade_name: '비활성화',
    },
  ])

  const getBoardData = async () => {
    const res = await fetch(`/api/category/getBoardCategoryAll`)
    const data = await res.json()
    setCategorys(data)
  }

  const getGradeData = async () => {
    const res = await fetch(`/api/user/grade/getUserGradeAll`)
    const data = await res.json()
    data.push({
      grade_id: 0,
      grade_name: '비활성화',
    })
    setGrades(data)
  }

  useEffect(() => {
    getBoardData()
    getGradeData()
  }, [])

  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle style={{ width: '100%' }}>
        게시판 관리
      </ContentBoxCellTitle>

      <ContentBoxCellContentContainer>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>
            게시판 조회 및 삭제
          </ContentBoxCellContentTitle>
        </ContentBoxCellContentWrapper>
        <div style={{ padding: '20px' }}>
          {categorys?.map((category, index) => (
            <BoardItems>
              <ContentBoxCellContentTitle
                style={{
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
                key={index}
              >
                {category.category_name}
              </ContentBoxCellContentTitle>
              <ContentBoxCellContentTitle>
                권한 -
                <select>
                  {grades?.map((grade, index) => (
                    <option
                      key={index}
                      value={grade.grade_id}
                      selected={
                        grade.grade_id === category.category_auth ? true : false
                      }
                    >
                      {grade.grade_name}
                    </option>
                  ))}
                </select>
              </ContentBoxCellContentTitle>
            </BoardItems>
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
            새 게시판 등록
          </ContentBoxCellContentTitle>
        </ContentBoxCellContentWrapper>
        <BoardItems>
          <input type="text" placeholder="게시판 이름" />
          <ContentBoxCellContentTitle>
            권한 -
            <select>
              {grades?.map((grade, index) => (
                <option key={index} value={grade.grade_id}>
                  {grade.grade_name}
                </option>
              ))}
            </select>
          </ContentBoxCellContentTitle>
        </BoardItems>
        <ContentBoxClickableContentWrapper
          style={{
            color: '#797b84',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          게시판 추가
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default BoardManage
