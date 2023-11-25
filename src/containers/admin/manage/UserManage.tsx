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
import { useEffect, useReducer, useState } from 'react'
import { Category } from '@/types/board'
import { Grade, UserNoPw } from '@/types/auth'
import { Branch } from '@/types/branch'
import UserList from './UserList'

const BoardItems = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 15px 20px;

  margin: 5px 0;
`

const UserManage = () => {
  const [grades, setGrades] = useState<Grade[]>()
  const [branches, setBranches] = useState<Branch[]>()

  const getGradeData = async () => {
    const res = await fetch(`/api/user/grade/getUserGradeAll`)
    const data = await res.json()
    setGrades(data)
  }

  const getBranchData = async () => {
    const res = await fetch(`/api/branch/getBranchAll`)
    const data = await res.json()
    setBranches(data)
  }

  useEffect(() => {
    getGradeData()
    getBranchData()
  }, [])

  useEffect(() => {
    console.log(branches)
  }, [branches])

  return (
    <>
      <ContentBoxCellContainer>
        <ContentBoxCellTitle style={{ width: '100%' }}>
          유저 관리
        </ContentBoxCellTitle>
      </ContentBoxCellContainer>
      <UserList grades={grades} branches={branches} />

      <ContentBoxCellContainer>
        <ContentBoxCellTitle style={{ width: '100%' }}>
          신규 유저 등록
        </ContentBoxCellTitle>
        <ContentBoxCellContentContainer>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>계정</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input type="text" placeholder="년도 지점 이름" />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input type="text" placeholder="이름" />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input type="text" placeholder="010-XXXX-XXXX" />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              부모님 연락처
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input type="text" placeholder="010-XXXX-XXXX" />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>회원 등급</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <select>
                {grades?.map((grade, index) => (
                  <option key={index} value={grade.grade_id}>
                    {grade.grade_name}
                  </option>
                ))}
              </select>
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>등록 지점</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <select>
                {branches?.map((branch, index) => (
                  <option key={index} value={branch.branch_id}>
                    {branch.branch_name}
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
          >
            유저 등록
          </ContentBoxClickableContentWrapper>
        </ContentBoxCellContentContainer>
      </ContentBoxCellContainer>
    </>
  )
}

export default UserManage
