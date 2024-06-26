import BoardTable from '@/containers/board/BoardTable'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import pagination from '@/services/board/pagination'
import BoardPagination from '@/containers/board/BoardPagination'

const BoardPage = async (props: any) => {
  const pageSize = 15 // 한 페이지당 노출할 post 개수

  const pageHandler = () => {
    const page = props.searchParams.page
    if (!/^\d+$/.test(page) || page === undefined || page === null) return 1
    else if (Number(page) < 1) return 1
    else return Number(page)
  }

  const totalPost = await prisma.post.count()

  const page = pageHandler()

  const searchText = props.searchParams.search
  const searchType = props.searchParams.searchType
  let posts = await pagination(0, page, pageSize, searchText, searchType)
  const totalPage = Math.ceil(totalPost / pageSize)

  if (page === 1) {
    const noticePosts = await prisma.post.findMany({
      where: { isNotice: true },
      orderBy: {
        post_upload_time: 'desc',
      },
    })

    // 중복된 id 확인을 위해 Set 사용
    const postIds = new Set(noticePosts.map(post => post.post_id))

    // 중복된 id를 가지는 noticePosts 필터링
    posts = posts.filter(post => !postIds.has(post.post_id))

    // 중복된 id를 제거한 noticePosts를 posts 배열에 추가
    posts.unshift(...noticePosts)
  }

  const postIds = posts.map(post => post.post_id)

  const repliesCount = await prisma.reply.groupBy({
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
          전체 게시글
        </div>
        {posts.length === 0 && (
          <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
            등록된 게시글이 없습니다.
          </div>
        )}
        {posts.length !== 0 && (
          <>
            <BoardTable posts={formattedPosts} board_id={0} />
            <BoardPagination board_id={0} page={page} totalPage={totalPage} />
          </>
        )}
      </div>
    </>
  )
}

export default BoardPage
