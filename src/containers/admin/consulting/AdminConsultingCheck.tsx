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
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

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

const AdminConsultingCheck = ({
  consulting,
  notChecked,
  checked,
  finished,
  branch,
}: {
  consulting: any
  notChecked: any
  checked: any
  finished: any
  branch: any
}) => {
  const [notCheckedOpen, setNotCheckedOpen] = useState(0)
  const [checkedOpen, setCheckedOpen] = useState(0)
  const [finishedOpen, setFinishedOpen] = useState(0)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())

  const handlenotCheckedOpen = (value: number) =>
    setNotCheckedOpen(notCheckedOpen === value ? 0 : value)

  const handleCheckedOpen = (value: number) =>
    setCheckedOpen(checkedOpen === value ? 0 : value)

  const handleFinishedOpen = (value: number) =>
    setFinishedOpen(finishedOpen === value ? 0 : value)

  const handleDelete = (id: number) => {}

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = new Date(e.target.value + 'Z')
    setSelectedDateTime(newDateTime)
  }

  const checkConsulting = async (id: number) => {
    if (!selectedDateTime) return alert('상담 일자를 선택해주세요')

    const response = await fetch(`/api/consulting/checkConsulting`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consulting_id: id,
        consulting_time: selectedDateTime,
      }),
    })

    if (response.ok) {
      alert('상담이 등록되었습니다.')
    } else {
      console.error('Failed to update consulting record')
    }
  }

  const FinishConsulting = async (id: number) => {
    const response = await fetch(`/api/consulting/finishConsulting`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consulting_id: id,
      }),
    })

    if (response.ok) {
      alert('상담 완료 처리가 되었습니다.')
    } else {
      console.error('Failed to update consulting record')
    }
  }

  // useEffect(() => {
  //   for (const consult of notChecked)
  //     if (consult.consulting_time !== null) {
  //       // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
  //       const uploadTime = new Date(consult.consulting_time)

  //       // UTC+0 기준의 날짜 및 시간을 문자열로 변환
  //       const formattedDate =
  //         `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
  //           .toString()
  //           .padStart(2, '0')}.${uploadTime
  //           .getUTCDate()
  //           .toString()
  //           .padStart(2, '0')} ` +
  //         `${uploadTime.getUTCHours().toString().padStart(2, '0')}.${uploadTime
  //           .getUTCMinutes()
  //           .toString()
  //           .padStart(2, '0')}`

  //       consult.consulting_time = formattedDate
  //     } else consult.consulting_time = '미정'

  //   for (const consult of checked)
  //     if (consult.consulting_time !== null) {
  //       // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
  //       const uploadTime = new Date(consult.consulting_time)

  //       // UTC+0 기준의 날짜 및 시간을 문자열로 변환
  //       const formattedDate =
  //         `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
  //           .toString()
  //           .padStart(2, '0')}.${uploadTime
  //           .getUTCDate()
  //           .toString()
  //           .padStart(2, '0')} ` +
  //         `${uploadTime.getUTCHours().toString().padStart(2, '0')}.${uploadTime
  //           .getUTCMinutes()
  //           .toString()
  //           .padStart(2, '0')}`

  //       consult.consulting_time = formattedDate
  //     } else consult.consulting_time = '미정'

  //   for (const consult of finished)
  //     if (consult.consulting_time !== null) {
  //       // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
  //       const uploadTime = new Date(consult.consulting_time)

  //       // UTC+0 기준의 날짜 및 시간을 문자열로 변환
  //       const formattedDate =
  //         `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
  //           .toString()
  //           .padStart(2, '0')}.${uploadTime
  //           .getUTCDate()
  //           .toString()
  //           .padStart(2, '0')} ` +
  //         `${uploadTime.getUTCHours().toString().padStart(2, '0')}.${uploadTime
  //           .getUTCMinutes()
  //           .toString()
  //           .padStart(2, '0')}`

  //       consult.consulting_time = formattedDate
  //     } else consult.consulting_time = '미정'
  // }, [notChecked, checked, finished])

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
              {consult.user_id}
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
                  <ContentBoxCellContent>
                    {branch[consult.branch_id].branch_name}
                  </ContentBoxCellContent>
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

              <ContentBoxCellTitle>상담 등록하기</ContentBoxCellTitle>
              <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
                <ContentBoxCellContentWrapper>
                  <ContentBoxCellContentTitle>
                    상담 일자 선택
                  </ContentBoxCellContentTitle>
                  <input
                    type="datetime-local"
                    style={{ color: 'black', opacity: 1 }}
                    value={selectedDateTime.toISOString().slice(0, 16)}
                    onChange={handleDateTimeChange}
                  />
                </ContentBoxCellContentWrapper>

                <ContentBoxClickableContentWrapper
                  onClick={() => checkConsulting(consult.consulting_id)}
                  style={{
                    color: '#797b84',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                  }}
                >
                  등록
                </ContentBoxClickableContentWrapper>
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
        {checked.map((consult: any, idx: number) => {
          let time = '미정'
          if (consult.consulting_time !== null) {
            // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
            const uploadTime = new Date(consult.consulting_time)

            // UTC+0 기준의 날짜 및 시간을 문자열로 변환
            const formattedDate =
              `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
                .toString()
                .padStart(2, '0')}.${uploadTime
                .getUTCDate()
                .toString()
                .padStart(2, '0')} ` +
              `${uploadTime
                .getUTCHours()
                .toString()
                .padStart(2, '0')}.${uploadTime
                .getUTCMinutes()
                .toString()
                .padStart(2, '0')}`

            time = formattedDate
          }
          return (
            <Accordion
              open={checkedOpen === idx + 1}
              icon={<Icon id={idx + 1} open={checkedOpen} />}
            >
              <AccordionHeader
                style={{ fontSize: '1rem' }}
                onClick={() => handleCheckedOpen(idx + 1)}
              >
                {time} - {consult.user_id}
              </AccordionHeader>
              <AccordionBody>
                <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
                <ContentBoxCellContentContainer
                  style={{ marginBottom: '40px' }}
                >
                  <ContentBoxCellContentWrapper>
                    <ContentBoxCellContentTitle>
                      이름
                    </ContentBoxCellContentTitle>
                    <ContentBoxCellContent>
                      {consult.user_id}
                    </ContentBoxCellContent>
                  </ContentBoxCellContentWrapper>

                  <ContentBoxCellContentWrapper>
                    <ContentBoxCellContentTitle>
                      지점
                    </ContentBoxCellContentTitle>
                    <ContentBoxCellContent>
                      {branch[consult.branch_id].branch_name}
                    </ContentBoxCellContent>
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
                    <ContentBoxCellContent>{time}</ContentBoxCellContent>
                  </ContentBoxCellContentWrapper>
                </ContentBoxCellContentContainer>

                <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
                <ContentBoxCellContentContainer
                  style={{ marginBottom: '40px' }}
                >
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

                <ContentBoxClickableContentWrapper
                  onClick={() => FinishConsulting(consult.consulting_id)}
                  style={{
                    color: '#797b84',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                  }}
                >
                  완료 처리
                </ContentBoxClickableContentWrapper>
              </AccordionBody>
            </Accordion>
          )
        })}
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
        {finished.map((consult: any, idx: number) => {
          let time = '미정'
          if (consult.consulting_time !== null) {
            // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
            const uploadTime = new Date(consult.consulting_time)

            // UTC+0 기준의 날짜 및 시간을 문자열로 변환
            const formattedDate =
              `${uploadTime.getUTCFullYear()}.${(uploadTime.getUTCMonth() + 1)
                .toString()
                .padStart(2, '0')}.${uploadTime
                .getUTCDate()
                .toString()
                .padStart(2, '0')} ` +
              `${uploadTime
                .getUTCHours()
                .toString()
                .padStart(2, '0')}.${uploadTime
                .getUTCMinutes()
                .toString()
                .padStart(2, '0')}`

            time = formattedDate
          }
          return (
            <Accordion
              style={{ margin: '20px 5px' }}
              open={finishedOpen === idx + 1}
              icon={<Icon id={idx + 1} open={finishedOpen} />}
            >
              <AccordionHeader
                style={{ fontSize: '1rem' }}
                onClick={() => handleFinishedOpen(idx + 1)}
              >
                {time} - {consult.user_id}
              </AccordionHeader>
              <AccordionBody>
                <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
                <ContentBoxCellContentContainer
                  style={{ marginBottom: '40px' }}
                >
                  <ContentBoxCellContentWrapper>
                    <ContentBoxCellContentTitle>
                      이름
                    </ContentBoxCellContentTitle>
                    <ContentBoxCellContent>
                      {consult.user_id}
                    </ContentBoxCellContent>
                  </ContentBoxCellContentWrapper>

                  <ContentBoxCellContentWrapper>
                    <ContentBoxCellContentTitle>
                      지점
                    </ContentBoxCellContentTitle>
                    <ContentBoxCellContent>
                      {branch[consult.branch_id].branch_name}
                    </ContentBoxCellContent>
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
                    <ContentBoxCellContent>{time}</ContentBoxCellContent>
                  </ContentBoxCellContentWrapper>
                </ContentBoxCellContentContainer>

                <ContentBoxCellTitle>상세 내용</ContentBoxCellTitle>
                <ContentBoxCellContentContainer
                  style={{ marginBottom: '40px' }}
                >
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
          )
        })}
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

export default AdminConsultingCheck
