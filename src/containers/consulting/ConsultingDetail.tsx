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
import { useState } from 'react'
import { Textarea, Input, Alert } from '@material-tailwind/react'
import Link from 'next/link'

const ConsultingMainContainer = styled.div``

const ConsultingDetail = ({
  id,
  branch_id,
  name,
  branch,
}: {
  id: string | undefined
  branch_id: number | undefined
  name: string | undefined
  branch: string | undefined
}) => {
  return (
    <ConsultingMainContainer>
      <ContentBoxCellContainer>
        <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
        <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
            <ContentBoxCellContent>{name}</ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>지점</ContentBoxCellContentTitle>
            <ContentBoxCellContent>{branch}</ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
            <ContentBoxCellContent>{branch}</ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
        </ContentBoxCellContentContainer>

        <ContentBoxCellTitle>추가 정보</ContentBoxCellTitle>
        <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              <Input
                onChange={handlePhoneChange}
                label="010-XXXX-XXXX"
                crossOrigin={undefined}
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>희망 상담자</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              <Input
                onChange={handleConsultantChange}
                label="희망 상담자"
                crossOrigin={undefined}
              />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle
            style={{
              fontSize: '0.8rem',
              color: '#797b84',
              fontWeight: 'normal',
              paddingLeft: '30px',
            }}
          >
            (ex. 심찬우 선생님)
            <br />* 조교님과의 상담은 수업 전에만 가능합니다.
          </ContentBoxCellContentTitle>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>희망 상담일</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              <Input onChange={handleDateChange} crossOrigin={undefined} />
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle
            style={{
              fontSize: '0.8rem',
              color: '#797b84',
              fontWeight: 'normal',
              paddingLeft: '30px',
            }}
          >
            (신청자 현황에 따라 변동 가능)
            <br />* 수강하시는 지점 수업일에만 상담 가능합니다.
          </ContentBoxCellContentTitle>
        </ContentBoxCellContentContainer>

        <ContentBoxCellTitle>상담 주제</ContentBoxCellTitle>
        <ContentBoxCellContentContainer
          style={{ marginBottom: '40px' }}
        ></ContentBoxCellContentContainer>

        <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
        <ContentBoxCellContentContainer></ContentBoxCellContentContainer>
      </ContentBoxCellContainer>

      <ContentBoxCellContainer>
        <Link href="/consulting/check">
          <ContentBoxClickableContentWrapper
            style={{
              color: '#797b84',
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
            }}
          >
            뒤로가기
          </ContentBoxClickableContentWrapper>
        </Link>
      </ContentBoxCellContainer>
    </ConsultingMainContainer>
  )
}

export default ConsultingMain
