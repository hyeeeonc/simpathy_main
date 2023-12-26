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
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import { useState } from 'react'

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

const ConsultingCheckDetailContainer = styled.div`
  width: 100%;
  color: black;
  opacity: 1;
  font-weight: normal;
  word-break: break-all;

  padding: 0 25px 20px 25px;
  box-sizing: border-box;
`

const ConsultingCheck = ({
  consulting,
  branch,
  notChecked,
  checked,
  finished,
}: {
  consulting: any
  branch: string | undefined
  notChecked: any
  checked: any
  finished: any
}) => {
  const [notCheckedOpen, setNotCheckedOpen] = useState(0)
  const [checkedOpen, setCheckedOpen] = useState(0)
  const [finishedOpen, setFinishedOpen] = useState(0)

  const handlenotCheckedOpen = (value: number) =>
    setNotCheckedOpen(notCheckedOpen === value ? 0 : value)

  const handleCheckedOpen = (value: number) =>
    setCheckedOpen(checkedOpen === value ? 0 : value)

  const handleFinishedOpen = (value: number) =>
    setFinishedOpen(finishedOpen === value ? 0 : value)

  const handleDelete = (id: number) => {}

  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>확인 대기 상담</ContentBoxCellTitle>
      <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
        {notChecked.map((consult: any, idx: number) => (
          <Accordion
            style={{ margin: '20px 5px' }}
            open={notCheckedOpen === idx + 1}
            icon={<Icon id={idx + 1} open={notCheckedOpen} />}
          >
            <AccordionHeader
              style={{ fontSize: '1rem' }}
              onClick={() => handlenotCheckedOpen(idx + 1)}
            >
              {consult.consulting_time ? consult.consulting_time : '미정'} -{' '}
              {consult.consulting_detail}
            </AccordionHeader>
            <AccordionBody>
              <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.user_id}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>지점</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>{branch}</ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    연락처
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_phone}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담자
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_consultant}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담일
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_wishdate}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 주제
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_tag}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 시간
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_time ? consult.consulting_time : '미정'}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>
              </ContentBoxCellContentContainer>

              <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    현재 국어 공부를 어떻게 하고 있나요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_content}
                </ConsultingCheckDetailContainer>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    구체적인 고민은 무엇인가요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_detail}
                </ConsultingCheckDetailContainer>
              </ContentBoxCellContentContainer>
            </AccordionBody>
          </Accordion>
        ))}
        {notChecked.length === 0 && (
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              대기 중인 상담이 없습니다.
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent></ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
        )}
      </ContentBoxCellContentContainer>

      <ContentBoxCellTitle>예정된 상담</ContentBoxCellTitle>
      <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
        {checked.map((consult: any, idx: number) => (
          <Accordion
            open={checkedOpen === idx + 1}
            icon={<Icon id={idx + 1} open={checkedOpen} />}
          >
            <AccordionHeader
              style={{ fontSize: '1rem' }}
              onClick={() => handleCheckedOpen(idx + 1)}
            >
              {consult.consulting_time ? consult.consulting_time : '미정'} -{' '}
              {consult.consulting_detail}
            </AccordionHeader>
            <AccordionBody>
              <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.user_id}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>지점</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>{branch}</ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    연락처
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_phone}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담자
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_consultant}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담일
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_wishdate}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 주제
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_tag}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 시간
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_time ? consult.consulting_time : '미정'}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>
              </ContentBoxCellContentContainer>

              <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    현재 국어 공부를 어떻게 하고 있나요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_content}
                </ConsultingCheckDetailContainer>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    구체적인 고민은 무엇인가요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_detail}
                </ConsultingCheckDetailContainer>
              </ContentBoxCellContentContainer>
            </AccordionBody>
          </Accordion>
        ))}
        {checked.length === 0 && (
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              예정된 상담이 없습니다.
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent></ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
        )}
      </ContentBoxCellContentContainer>

      <ContentBoxCellTitle>완료된 상담</ContentBoxCellTitle>
      <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
        {finished.map((consult: any, idx: number) => (
          <Accordion
            style={{ margin: '20px 5px' }}
            open={finishedOpen === idx + 1}
            icon={<Icon id={idx + 1} open={finishedOpen} />}
          >
            <AccordionHeader
              style={{ fontSize: '1rem' }}
              onClick={() => handleFinishedOpen(idx + 1)}
            >
              {consult.consulting_time ? consult.consulting_time : '미정'} -{' '}
              {consult.consulting_detail}
            </AccordionHeader>
            <AccordionBody>
              <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.user_id}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>지점</ContentBoxCellContentTitle>
                  <ContentBoxCellContent>{branch}</ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    연락처
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_phone}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담자
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_consultant}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    희망 상담일
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_wishdate}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 주제
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_tag}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 시간
                  </ContentBoxCellContentTitle>
                  <ContentBoxCellContent>
                    {consult.consulting_time ? consult.consulting_time : '미정'}
                  </ContentBoxCellContent>
                </ContentBoxCellContentWrapper>
              </ContentBoxCellContentContainer>

              <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    현재 국어 공부를 어떻게 하고 있나요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_content}
                </ConsultingCheckDetailContainer>

                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    구체적인 고민은 무엇인가요?
                  </ContentBoxCellContentTitle>
                </ContentBoxCellContentWrapper>
                <ConsultingCheckDetailContainer>
                  {consult.consulting_detail}
                </ConsultingCheckDetailContainer>
              </ContentBoxCellContentContainer>
            </AccordionBody>
          </Accordion>
        ))}
        {finished.length === 0 && (
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              완료된 상담이 없습니다.
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent></ContentBoxCellContent>
          </ContentBoxCellContentWrapper>
        )}
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default ConsultingCheck
