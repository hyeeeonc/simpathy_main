import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
  ContentBoxClickableContentWrapper,
} from '@/components/ContentBox'
import { ConsultingCheckDetailContainer } from '@/containers/admin/consulting/AdminConsultingCheck'
import ConsultingNav from './ConsultingNav'

async function ConsultingEach(props: any) {
  const currentUser = await getCurrentUser()
  const consulting_id = Number(props.params.id)
  const consult = await prisma.consulting.findUnique({
    where: {
      consulting_id,
    },
  })

  if (!currentUser) {
    return <div>로그인이 필요합니다.</div>
  }

  if (currentUser.grade_id === undefined || currentUser.grade_id >= 3) {
    return <div>권한이 없습니다.</div>
  }

  if (!consult) {
    return <div>존재하지 않는 상담입니다.</div>
  }

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
      `${uploadTime.getUTCHours().toString().padStart(2, '0')}.${uploadTime
        .getUTCMinutes()
        .toString()
        .padStart(2, '0')}`

    time = formattedDate
  }

  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>
        {consult.consulting_checked === 0
          ? '미확인 상담'
          : consult.consulting_checked === 1
          ? '예정된 상담'
          : '완료된 상담'}
      </ContentBoxCellTitle>
      <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
        <ContentBoxCellTitle>기본 정보</ContentBoxCellTitle>
        <ContentBoxCellContentContainer style={{ marginBottom: '40px' }}>
          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>이름</ContentBoxCellContentTitle>
            <ContentBoxCellContent>{consult.user_id}</ContentBoxCellContent>
          </ContentBoxCellContentWrapper>

          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>연락처</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              {consult.consulting_phone}
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>

          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>희망 상담자</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              {consult.consulting_consultant}
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>

          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>상담 주제</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              {consult.consulting_tag}
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>

          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>희망 상담일</ContentBoxCellContentTitle>
            <ContentBoxCellContent>
              {consult.consulting_wishdate}
            </ContentBoxCellContent>
          </ContentBoxCellContentWrapper>

          <ContentBoxCellContentWrapper>
            <ContentBoxCellContentTitle>
              확정 상담 시간
            </ContentBoxCellContentTitle>
            <ContentBoxCellContent>{time}</ContentBoxCellContent>
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

        <ConsultingNav />
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default ConsultingEach
