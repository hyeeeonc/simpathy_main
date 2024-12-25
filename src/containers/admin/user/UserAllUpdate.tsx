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
import { Input, Button } from '@material-tailwind/react'
import { Board, Category } from '@/types/board'
import { Grade, UserNoPw } from '@/types/auth'
import { Branch } from '@/types/branch'
import { parse } from 'path'

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

const AdminBoardButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

interface BoardUpdateProps {
  isOpen: boolean
  users: Set<string> | undefined
  grades: Grade[] | undefined
  branches: Branch[] | undefined
  onClose: () => void
}

const UserAllUpdate: React.FC<BoardUpdateProps> = ({
  isOpen,
  users,
  grades,
  branches,
  onClose,
}) => {
  const [grade, setGrade] = useState(0)
  const [branch, setBranch] = useState(0)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name == 'grade') {
      setGrade(parseInt(value))
    } else if (name == 'branch') {
      setBranch(parseInt(value))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (users) {
      const user_ids = Array.from(users)

      // API로 전송할 데이터 준비
      const data = {
        user_ids, // 여러 user_id
        grade_id: grade, // 선택된 grade_id
        branch_id: branch, // 선택된 branch_id
      }

      // API 요청 보내기
      const res = await fetch('/api/user/updateUserAll', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert('사용자 정보가 업데이트되었습니다.')
        onClose() // 업데이트 완료 후 모달 닫기
        window.location.reload() // 페이지 새로고침
      } else {
        alert('사용자 정보 업데이트 실패.')
      }
    }
  }

  const handleUserDelete = async () => {
    if (users) {
      const user_ids = Array.from(users)

      // API로 전송할 데이터 준비
      const data = {
        user_ids, // 여러 user_id
      }

      // API 요청 보내기
      const res = await fetch('/api/user/deleteUserAll', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert('사용자 정보가 삭제되었습니다.')
        onClose() // 삭제 완료 후 모달 닫기
        window.location.reload() // 페이지 새로고침
      } else {
        alert('사용자 정보 삭제 실패.')
      }
    }
  }
  // const handleUserDelete = async () => {
  //   try {
  //     const response = await fetch('/api/user/deleteUser', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user_id: userData.user_id,
  //       }),
  //     })

  //     if (response.ok) {
  //       alert('정상적으로 반영되었습니다.')
  //       onClose()
  //     } else if (response.status === 403) {
  //       alert('권한이 없습니다.')
  //     } else {
  //       alert('반영에 실패하였습니다.')
  //     }
  //   } catch (error: any) {
  //     alert('반영에 실패하였습니다.')
  //   }
  // }

  return (
    <>
      <AdminBranchUpdateWrapper
        onClick={onClose}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <AdminBranchUpdateContainer onClick={e => e.stopPropagation()}>
          <ContentBoxCellContainer>
            <ContentBoxCellTitle>{users?.size}명 수정</ContentBoxCellTitle>
            <br />
            <span style={{ color: 'red', fontSize: '12px' }}>
              등급과 지점이 모두 변하므로 반드시 둘 다 올바른 값으로 선택해야 함
            </span>
            <ContentBoxCellContentContainer>
              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>등급</ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <select name="grade" onChange={handleSelectChange}>
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
                  <select name="branch" onChange={handleSelectChange}>
                    {branches?.map((branch, index) => (
                      <option key={index} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <AdminBoardButtonContainer style={{ marginTop: '20px' }}>
                <Button
                  style={{ marginRight: '10px' }}
                  color="blue"
                  onClick={handleSubmit}
                >
                  수정하기
                </Button>
                <Button color="red" onClick={handleUserDelete}>
                  전체 삭제
                </Button>
              </AdminBoardButtonContainer>
            </ContentBoxCellContentContainer>
          </ContentBoxCellContainer>
        </AdminBranchUpdateContainer>
      </AdminBranchUpdateWrapper>
    </>
  )
}

export default UserAllUpdate
