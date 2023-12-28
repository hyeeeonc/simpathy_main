'use client'

import { Branch } from '@/types/branch'
import { useEffect, useState } from 'react'
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
import AdminBranchUpdate from './AdminBranchUpdate'

const AdminMainContainer = styled.div``

const AdminMainItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(25% - 20px);
  margin: 10px;
  height: 200px;

  border: 1px solid black;

  cursor: pointer;
`

const AdminMenuConatiner = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  border-bottom: 2px solid lightgray;
`

const AdminMenuItems = styled.div`
  color: black;
  font-size: 1rem;
  cursor: pointer;
  margin: 20px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(30 58 138);
    box-shadow: 0px 2px 0px 0px rgb(30 58 138);
  }
`

const AdminBranch = () => {
  const [branches, setBranches] = useState<Branch[]>()
  const [modalBranch, setModalBranch] = useState<Branch>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const getBranchData = async () => {
    const res = await fetch(`/api/branch/getBranchAll`, { cache: 'no-store' })
    const data = await res.json()
    const filteredData = data.filter(
      (item: Branch) => item.branch_name !== '운영자',
    )
    setBranches(filteredData)
  }

  const onClose = () => {
    setIsOpen(false)
    getBranchData()
  }

  const modalHandler = (branch: Branch) => {
    setModalBranch(branch)
    setIsOpen(true)
  }

  useEffect(() => {
    getBranchData()
  }, [])

  return (
    <AdminMainContainer>
      {branches?.map((branch, index) => (
        <ContentBoxCellContainer>
          <ContentBoxCellTitle>{branch.branch_name}</ContentBoxCellTitle>
          <ContentBoxCellContentContainer>
            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>현재 교재</ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_textbook}
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>
                총 페이지 수
              </ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_textbook_total}p
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>
                진도 페이지
              </ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_textbook_now}p
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>
                예습 페이지
              </ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_textbook_preview}p
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>진도 지문</ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_text_now}
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxCellContentWrapper>
              <ContentBoxCellContentTitle>예습 지문</ContentBoxCellContentTitle>
              <ContentBoxCellContent>
                {branch.branch_text_preview}
              </ContentBoxCellContent>
            </ContentBoxCellContentWrapper>

            <ContentBoxClickableContentWrapper
              style={{
                color: '#797b84',
                display: 'flex',
                justifyContent: 'center',
              }}
              onClick={() => modalHandler(branch)}
            >
              수정하기
            </ContentBoxClickableContentWrapper>
          </ContentBoxCellContentContainer>
        </ContentBoxCellContainer>
      ))}
      <AdminBranchUpdate
        onClose={onClose}
        branch={modalBranch}
        isOpen={isOpen}
      />
    </AdminMainContainer>
  )
}

export default AdminBranch
