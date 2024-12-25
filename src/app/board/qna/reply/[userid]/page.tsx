import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import QnaReplyTable from '@/containers/board/QnaReplyTable'
import QnaPagination from '@/containers/board/QnaPagination'
import QnaReplyPagenation from '@/containers/board/QnaReplyPagenation'

interface WhereCondition {
  post_isAnswered?: number | undefined
  post_qnatype?: '문학' | '독서' | '기타' | undefined
  post_qnatarget?:
    | '기출문제'
    | '강의'
    | '기타'
    | '교재(강의교재)'
    | '교재(학습자료)'
    | undefined
  OR?: {
    post_title?: { contains: string } | undefined
    post_contents?: { contains: string } | undefined
  }[]
}

const QnaReplyPage = async (props: any) => {
  const user = await getCurrentUser()
  const user_id = decodeURIComponent(props.params.userid)

  if (
    !user ||
    user.grade_id >= 6 ||
    (user.grade_id >= 3 && user.user_id !== user_id)
  ) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
  }

  const pageSize = 15

  const pageHandler = () => {
    const page = props.searchParams.page
    if (!/^\d+$/.test(page) || page === undefined || page === null) return 1
    else if (Number(page) < 1) return 1
    else return Number(page)
  }

  const page = pageHandler()

  const searchText = props.searchParams.search
  const isAnswered = props.searchParams.isAnswered
  const qnaType = props.searchParams.qnaType
  const qnaTarget = props.searchParams.qnaTarget

  const whereCondition: WhereCondition = {
    post_isAnswered:
      isAnswered === '0' || isAnswered === '1' || isAnswered === '2'
        ? Number(isAnswered)
        : undefined,
    post_qnatype:
      qnaType === '문학' || qnaType === '독서' || qnaType === '기타'
        ? qnaType
        : undefined,
    post_qnatarget:
      qnaTarget === '기출문제' ||
      qnaTarget === '강의' ||
      qnaTarget === '기타' ||
      qnaTarget === '교재(강의교재)' ||
      qnaTarget === '교재(학습자료)'
        ? qnaTarget
        : undefined,
  }

  if (searchText) {
    whereCondition.OR = [
      { post_title: { contains: searchText } },
      { post_contents: { contains: searchText } },
    ]
  }

  // 데이터베이스에서 qnapost와 qnareply를 조인하여 가져오기
  const replies = await prisma.qnareply.findMany({
    where: {
      user_id: user_id, // 사용자가 작성한 reply만 필터링
      qnapost: {
        // qnapost의 필터링 조건을 whereCondition에 반영
        ...whereCondition,
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      reply_upload_time: 'desc', // 최신 순으로 정렬
    },
    include: {
      qnapost: {
        select: {
          post_id: true,
          post_title: true,
          post_contents: true,
          post_qnatype: true,
          post_qnatarget: true,
          post_isAnswered: true,
          post_upload_time: true,
          user: {
            select: {
              user_id: true,
              grade_id: true,
            },
          },
        },
      },
    },
  })

  const totalPost = await prisma.qnareply.count({
    where: {
      user_id: user_id, // 사용자가 작성한 reply만 필터링
      qnapost: {
        // qnapost의 필터링 조건을 whereCondition에 반영
        ...whereCondition,
      },
    },
  })

  const totalPage = Math.ceil(totalPost / pageSize)

  if (user) {
    return (
      <>
        <div className="w-full mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            {user_id} 답변 목록
          </div>
          <QnaReplyTable userId={user_id} replies={replies} />
          <QnaReplyPagenation
            userId={user_id}
            page={page}
            totalPage={totalPage}
          />
        </div>
      </>
    )
  } else
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
}

export default QnaReplyPage
