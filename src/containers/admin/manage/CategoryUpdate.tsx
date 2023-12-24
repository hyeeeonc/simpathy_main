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
import { Category } from '@/types/board'

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

interface CategoryUpdateProps {
  isOpen: boolean
  category: Category | undefined
  onClose: () => void
  categoryRefresh: () => void
}

const CategoryUpdate: React.FC<CategoryUpdateProps> = ({
  isOpen,
  category,
  onClose,
  categoryRefresh,
}) => {
  const [categoryName, setCategoryName] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!categoryName) {
      alert('이름을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/board/changeCategoryName', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: category?.category_id,
          category_name: categoryName,
        }),
      })

      if (response.ok) {
        alert('정상적으로 반영되었습니다.')
        categoryRefresh()
        onClose()
      } else {
        alert('반영에 실패하였습니다.')
      }
    } catch (error: any) {
      alert('반영에 실패하였습니다.')
    }
  }

  useEffect(() => {
    setCategoryName(category?.category_name || '')
  }, [category])

  return (
    <>
      <AdminBranchUpdateWrapper
        onClick={onClose}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <AdminBranchUpdateContainer onClick={e => e.stopPropagation()}>
          <ContentBoxCellContainer>
            <ContentBoxCellTitle>대분류 수정</ContentBoxCellTitle>
            <ContentBoxCellContentContainer>
              <ContentBoxCellContentWrapper>
                <ContentBoxCellContentTitle>
                  대분류 이름
                </ContentBoxCellContentTitle>
                <ContentBoxCellContent>
                  <Input
                    value={categoryName}
                    onChange={handleChange}
                    label="대분류 이름"
                    crossOrigin={undefined}
                  />
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

export default CategoryUpdate
