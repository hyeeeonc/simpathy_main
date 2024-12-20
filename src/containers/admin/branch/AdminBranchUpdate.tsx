'use client'

import { Branch } from '@/types/branch'
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
    overflow-y: scroll;
    height: 60vh;
    padding: 10px;
    border-radius: 5px;
  }
`

interface AdminBranchUpdateProps {
  isOpen: boolean
  branch: Branch | undefined
  onClose: () => void
}

const AdminBranchUpdate: React.FC<AdminBranchUpdateProps> = ({
  isOpen,
  branch,
  onClose,
}) => {
  const [branchData, setBranchData] = useState<Branch>({
    branch_id: branch ? branch.branch_id : 0,
    branch_name: branch ? branch.branch_name : '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (
      name === 'branch_textbook_total' ||
      name === 'branch_textbook_now' ||
      name === 'branch_textbook_preview'
    ) {
      setBranchData(prevData => ({
        ...prevData,
        [name]: Number(value),
      }))
      return
    }
    setBranchData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (Object.values(branchData).some(value => !value)) {
      alert('모든 값을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/branch/updateBranch', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branchData),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
        onClose()
        // Handle success, e.g., redirect or show a success message
      } else {
        console.error('Error creating branch:', response.statusText)
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error: any) {
      console.error('Error creating branch:', error.message)
    }
  }

  useEffect(() => {
    setBranchData(prevData => ({
      ...prevData,
      branch_id: branch ? branch.branch_id : 0,
      branch_name: branch ? branch.branch_name : '',
    }))
  }, [branch])

  return (
    <>
      <AdminBranchUpdateWrapper
        onClick={onClose}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <AdminBranchUpdateContainer onClick={e => e.stopPropagation()}>
          <ContentBoxCellContainer>
            <ContentBoxCellTitle>지점 정보 수정</ContentBoxCellTitle>
            <ContentBoxCellContentContainer>
              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  지점 이름
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_name"
                    value={branchData.branch_name}
                    onChange={handleChange}
                    label="지점 이름"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              {/* <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  교재 이름
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_textbook"
                    value={branchData.branch_textbook}
                    onChange={handleChange}
                    label="교재 이름"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  총 페이지 수
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_textbook_total"
                    value={branchData.branch_textbook_total}
                    onChange={handleChange}
                    label="총 페이지 수"
                    type="number"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  진도 페이지
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_textbook_now"
                    value={branchData.branch_textbook_now}
                    onChange={handleChange}
                    label="진도 페이지"
                    type="number"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  예습 페이지
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_textbook_preview"
                    value={branchData.branch_textbook_preview}
                    onChange={handleChange}
                    label="예습 페이지"
                    type="number"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  진도 지문
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_text_now"
                    value={branchData.branch_text_now}
                    onChange={handleChange}
                    label="지문명"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper>

              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  예습 지문
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    name="branch_text_preview"
                    value={branchData.branch_text_preview}
                    onChange={handleChange}
                    label="지문명"
                    crossOrigin={undefined}
                  />
                </ContentBoxCellContent>
              </ContentBoxCellContentWrapper> */}

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

export default AdminBranchUpdate
