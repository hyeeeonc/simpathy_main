import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import QnaBoardTable from '@/containers/board/QnaBoardTable'
import QnaPagination from '@/containers/board/QnaPagination'
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
  NOT?: {
    user_id?: string
  }
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
    // user_id가 "(알 수 없음)"인 데이터를 제외하는 조건 추가
    NOT: {
      user_id: '(알 수 없음)',
    },
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
      post_id: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
    },
    include: {
      user: {
        select: {
          user_name: true, // user 테이블에서 user_name 필드만 가져옵니다.
          grade_id: true,
        },
      },
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

  // *표 넣기
  const updatedPosts = posts.map(post => {
    const { user_id, user } = post

    if (user && user.grade_id >= 3) {
      const { user_name } = user

      let modifiedUserName = user_name
      if (user_name.length === 4) {
        // 마지막 글자가 숫자 또는 영어인 경우
        const lastChar = user_name[user_name.length - 1]
        if (/[0-9A-Za-z]/.test(lastChar)) {
          modifiedUserName = user_name[0] + '*' + user_name.slice(2)
        } else {
          // 한글 이름인 경우
          modifiedUserName = user_name.slice(0, 2) + '*' + user_name.slice(3)
        }
      } else if (user_name.length > 1) {
        // 일반적인 경우 (두 번째 글자를 *)
        modifiedUserName = user_name[0] + '*' + user_name.slice(2)
      }

      // user_id에서 기존 user_name을 수정된 user_name으로 교체
      const modifiedUserId = user_id.replace(user_name, modifiedUserName)

      // 결과 반환
      return {
        ...post,
        user_id: modifiedUserId,
        user: {
          ...user,
          user_name: modifiedUserName, // user_name도 수정된 값을 반영
        },
      }
    }

    // 조건을 만족하지 않으면 원본 데이터 유지
    return post
  })

  const postsWithReplyCount = updatedPosts.map(post => {
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
          <QnaBoardTable
            isAdmin={false}
            isUser={false}
            posts={formattedPosts}
          />
          <QnaPagination page={page} totalPage={totalPage} />
        </>
      </div>
    </>
  )
}

export default BoardPage
