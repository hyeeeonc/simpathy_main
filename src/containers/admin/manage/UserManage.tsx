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
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from 'react'
import { Grade, User, UserNoPw } from '@/types/auth'
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
  const [user, setUser] = useState<User>({
    user_id: '',
    user_pw: '1111',
    user_name: '',
    user_phone: '',
    user_parent_phone: '',
    grade_id: 1,
    branch_id: 1,
  })

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'grade_id' || name === 'branch_id') {
      setUser(prevData => ({
        ...prevData,
        [name]: Number(value),
      }))
      return
    }
    setUser(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'grade_id' || name === 'branch_id') {
      setUser(prevData => ({
        ...prevData,
        [name]: Number(value),
      }))
      return
    }
    setUser(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (
      Object.entries(user).some(
        ([key, value]) => key !== 'user_parent_phone' && !value,
      )
    ) {
      alert('모든 값을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
      } else {
        console.error('Error creating branch:', response.statusText)
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error: any) {
      console.error('Error creating branch:', error.message)
    }
  }

  useEffect(() => {
    getGradeData()
    getBranchData()
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

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
              <input
                name="user_id"
                value={user.user_id}
                onChange={handleChange}
                type="text"
                placeholder="년도 지점 이름"
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input
                name="user_name"
                value={user.user_name}
                onChange={handleChange}
                type="text"
                placeholder="이름"
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input
                name="user_phone"
                value={user.user_phone}
                onChange={handleChange}
                type="text"
                placeholder="010-XXXX-XXXX"
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              부모님 연락처
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <input
                name="user_parent_phone"
                value={user.user_parent_phone}
                onChange={handleChange}
                type="text"
                placeholder="010-XXXX-XXXX"
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>회원 등급</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <select
                name="grade_id"
                value={user.grade_id}
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
            <ContentBoxCellContentTitle>등록 지점</ContentBoxCellContentTitle>
            <ContentBoxCellContent style={{ fontWeight: 'normal' }}>
              <select
                name="branch_id"
                value={user.branch_id}
                onChange={handleSelectChange}
              >
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
            onClick={handleSubmit}
          >
            유저 등록
          </ContentBoxClickableContentWrapper>
        </ContentBoxCellContentContainer>
      </ContentBoxCellContainer>
    </>
  )
}

export default UserManage
