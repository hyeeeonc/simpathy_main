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

const AdminMainContainer = styled.div``

const AdminBranchAdd = () => {
  const [branchData, setBranchData] = useState<Branch>({
    branch_id: 1,
    branch_name: '',
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
      const response = await fetch('/api/branch/addBranch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branchData),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
        location.reload()
        // Handle success, e.g., redirect or show a success message
      } else {
        alert('서버 오류로 인해 반영에 실패하였습니다. 다시 시도해주세요.')
        // Handle errors, e.g., show an error message to the user
      }
    } catch (error: any) {
      alert('서버 오류로 인해 반영에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return (
    <AdminMainContainer>
      <ContentBoxCellContainer>
        <ContentBoxCellTitle>지점 추가</ContentBoxCellTitle>
        <ContentBoxCellContentContainer>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>지점 이름</ContentBoxCellContentTitle>
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
            <ContentBoxCellContentTitle>교재 이름</ContentBoxCellContentTitle>
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
            <ContentBoxCellContentTitle>진도 페이지</ContentBoxCellContentTitle>
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
            <ContentBoxCellContentTitle>예습 페이지</ContentBoxCellContentTitle>
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
            <ContentBoxCellContentTitle>진도 지문</ContentBoxCellContentTitle>
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
            <ContentBoxCellContentTitle>예습 지문</ContentBoxCellContentTitle>
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
            지점 생성
          </ContentBoxClickableContentWrapper>
        </ContentBoxCellContentContainer>
      </ContentBoxCellContainer>
    </AdminMainContainer>
  )
}

export default AdminBranchAdd
