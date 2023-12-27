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
import { Grade, UserNoPw } from '@/types/auth'
import { Branch } from '@/types/branch'

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
  user: UserNoPw | undefined
  grades: Grade[] | undefined
  branches: Branch[] | undefined
  onClose: () => void
}

const UserUpdate: React.FC<BoardUpdateProps> = ({
  isOpen,
  user,
  grades,
  branches,
  onClose,
}) => {
  const [userData, setUserData] = useState<UserNoPw>({
    user_id: '',
    user_name: '',
    user_phone: undefined,
    user_parent_phone: undefined,
    grade_id: 1,
    branch_id: 1,
  })

  useEffect(() => {
    setUserData(prevData => ({
      ...prevData,
      user_id: user ? user.user_id : '',
      user_name: user ? user.user_name : '',
      user_phone: user?.user_phone,
      user_parent_phone: user?.user_parent_phone,
      grade_id: user ? user.grade_id : 1,
      branch_id: user ? user.branch_id : 1,
    }))
  }, [user])

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: Number(value),
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/user/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          user_name: userData.user_name,
          user_phone: userData.user_phone,
          user_parent_phone: userData.user_parent_phone,
          grade_id: userData.grade_id,
          branch_id: userData.branch_id,
        }),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
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
            <ContentBoxCellTitle>{userData.user_id}</ContentBoxCellTitle>
            <ContentBoxCellContentContainer>
              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    value={userData.user_name}
                    onChange={e => {
                      setUserData(prevData => ({
                        ...prevData,
                        user_name: e.target.value,
                      }))
                    }}
                    label="이름"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    value={userData.user_phone}
                    onChange={e => {
                      setUserData(prevData => ({
                        ...prevData,
                        user_phone: e.target.value,
                      }))
                    }}
                    label="010-XXXX-XXXX"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  부모님 연락처
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    value={userData.user_parent_phone}
                    onChange={e => {
                      setUserData(prevData => ({
                        ...prevData,
                        user_parent_phone: e.target.value,
                      }))
                    }}
                    label="010-XXXX-XXXX"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>등급</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select
                    name="grade_id"
                    value={userData.grade_id}
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
                <ContentBoxCellContentTitle>지점</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select
                    name="branch_id"
                    value={userData.branch_id}
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
                수정하기
              </ContentBoxClickableContentWrapper>
            </ContentBoxCellContentContainer>
          </ContentBoxCellContainer>
        </AdminBranchUpdateContainer>
      </AdminBranchUpdateWrapper>
    </>
  )
}

export default UserUpdate
