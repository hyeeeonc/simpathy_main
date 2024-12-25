import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import QnaBoardTable from '@/containers/board/QnaBoardTable'

import AdminQnaPagination from '@/containers/board/AdminQnaPagination'
// import qnaPagination from '@/services/board/qnaPagination'

export const revalidate = 1
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
  user_id: string
}

const BoardPage = async (props: any) => {
  const user = await getCurrentUser()

  if (!user) {
    return <div>로그인이 필요합니다.</div>
  }

  // const posts = await prisma.qnapost.findMany()

  if (user?.grade_id === undefined || user?.grade_id >= 6) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
  }

  const pageSize = 15 // 한 페이지당 노출할 post 개수

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
    user_id: '(알 수 없음)',
  }

  if (searchText) {
    whereCondition.OR = [
      { post_title: { contains: searchText } },
      { post_contents: { contains: searchText } },
    ]
  }

  const posts = await prisma.qnapost.findMany({
    where: whereCondition,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
    },
  })

  const postIds = posts.map(post => post.post_id)

  const repliesCount = await prisma.qnareply.groupBy({
    by: ['post_id'],
    _count: {
      post_id: true,
    },
    where: {
      post_id: {
        in: postIds,
      },
    },
  })

  const postsWithReplyCount = posts.map(post => {
    const replyCount =
      repliesCount.find(reply => reply.post_id === post.post_id)?._count
        .post_id || 0
    return {
      ...post,
      replyCount,
    }
  })

  const totalPost = await prisma.qnapost.count({
    where: whereCondition,
  })

  const totalPage = Math.ceil(totalPost / pageSize)

  // posts를 순회하면서 날짜를 변경하고 포맷팅
  const formattedPosts = postsWithReplyCount.map(post => {
    // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
    const uploadTime = new Date(post.post_upload_time)

    // 한국 표준시로 변경 (UTC+9)
    const koreanTime = new Date(uploadTime.getTime())

    // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
    const formattedDate = `${koreanTime.getFullYear()}.${(
      koreanTime.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${koreanTime.getDate().toString().padStart(2, '0')}`

    // 변환된 값을 포함하는 새로운 객체를 반환
    return {
      ...post,
      formattedDate,
    }
  })

  return (
    <>
      <div className="w-full mt-20">
        <div className="text-sky-800 text-3xl font-bold mb-[100px]">
          질문게시판
        </div>
        {/* {posts.length === 0 && (
          <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
            등록된 게시글이 없습니다.
          </div>
        )} */}

        <>
          <QnaBoardTable isUser={false} posts={formattedPosts} />
          <AdminQnaPagination page={page} totalPage={totalPage} />
        </>
      </div>
    </>
  )
}

export default BoardPage
