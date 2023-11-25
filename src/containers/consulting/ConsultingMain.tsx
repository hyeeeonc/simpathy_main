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
import { useRouter } from 'next/router'

const CONSULTING_TAG = [
  '화법과 작문',
  '언어와 매체',
  '독서',
  '문학',
  '공부에 대한 동기부여',
  '타 과목과의 밸런스',
  '시험장에서의 태도',
  '시험 시간 관리',
  '막연한 불안감',
  '기타',
]

const Selected = {
  backgroundColor: '#1E3A8A',
  color: '#FFFFFF',
}

const Unselected = {
  backgroundColor: '#FFFFFF',
  color: 'black',
}

const ConsultingMainContainer = styled.div``

const ConsultingMainTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ConsultingMainTagBox = styled.div`
  margin: 10px;
  padding: 10px;

  border: 1px solid #e5e7eb;
  border-radius: 5px;

  transition: color, background-color 0.2s linear;

  cursor: pointer;

  @media (max-width: 767px) {
    margin: 5px;
    padding: 5px;

    font-size: 13px;
  }
`

const ConsultingMain = ({
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
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [content, setContent] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [consultant, setConsultant] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showOkAlert, setShowOkAlert] = useState<boolean>(false)

  const handleCheckboxChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const HandleTextarea = (e: any) => {
    setContent(e.target.value)
  }

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value)
  }

  const handleConsultantChange = (e: any) => {
    setConsultant(e.target.value)
  }

  const handleDateChange = (e: any) => {
    setDate(e.target.value)
  }

  const handleDetailChange = (e: any) => {
    setDetail(e.target.value)
  }

  const closeAlert = () => {
    setShowAlert(false)
  }

  const SubmitHandler = async () => {
    if (
      phone === '' ||
      consultant === '' ||
      date === '' ||
      detail === '' ||
      selectedTags.length === 0 ||
      content === ''
    ) {
      setShowAlert(true)
      return
    }
    const data = {
      user_id: id,
      branch_id: branch_id,
      consulting_tag: selectedTags.join(', '),
      consulting_content: content,
      consulting_detail: detail,
      consulting_phone: phone,
      consulting_consultant: consultant,
      consulting_wishdate: date,
      consulting_checked: 0,
    }

    try {
      const response = await fetch('/api/consulting/newConsulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(response)

      if (response.ok) {
        setShowOkAlert(true)
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      } else {
        console.error('Failed to submit consulting')
      }
    } catch (error) {
      console.log('???????????')
      console.error('Error submitting consulting:', error)
    }
  }

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
        <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
          <ConsultingMainTagContainer>
            {CONSULTING_TAG.map(tag => (
              <ConsultingMainTagBox
                style={selectedTags.includes(tag) ? Selected : Unselected}
                onClick={() => {
                  handleCheckboxChange(tag)
                }}
              >
                {tag}
              </ConsultingMainTagBox>
            ))}
          </ConsultingMainTagContainer>
        </ContentBoxCellContentContainer>

        <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
        <ContentBoxCellContentContainer>
          <Textarea
            label="현재 국어 공부를 어떻게 하고 있나요?"
            onChange={HandleTextarea}
            style={{ marginBottom: '30px' }}
          />
          <Textarea
            label="구체적인 고민은 무엇인가요?"
            onChange={handleDetailChange}
          />
        </ContentBoxCellContentContainer>
      </ContentBoxCellContainer>

      <ContentBoxCellContainer>
        <ContentBoxClickableContentWrapper
          onClick={SubmitHandler}
          style={{
            color: '#797b84',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
          }}
        >
          상담 신청하기
        </ContentBoxClickableContentWrapper>
      </ContentBoxCellContainer>
      {showAlert && (
        <Alert onClose={closeAlert} color="red">
          모든 항목을 입력해주세요.
        </Alert>
      )}
      {showOkAlert && (
        <Alert onClose={closeAlert} color="green">
          상담 신청이 완료되었습니다.
        </Alert>
      )}
    </ConsultingMainContainer>
  )
}

export default ConsultingMain
