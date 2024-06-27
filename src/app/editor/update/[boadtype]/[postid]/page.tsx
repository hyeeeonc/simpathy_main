import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(
  () => import('@/containers/editor/UpdateEditorComponent'),
  { ssr: false },
)

const PostUpdatePage = async (props: any) => {
  const post_id = Number(props.params.postid)
  const board_type = Number(props.params.boadtype)
  const currentUser = await getCurrentUser()
  const branches = await prisma.branch.findMany()
  const userBoards = await prisma.board.findMany({
    where: {
      board_write_auth: {
        gte: currentUser?.grade_id,
      },
    },
  })

  const currentPost: any =
    board_type === 0
      ? await prisma.post.findUnique({
          where: { post_id },
        })
      : board_type === 1
      ? await prisma.qnapost.findUnique({
          where: { post_id },
        })
      : board_type === 2
      ? await prisma.branchpost.findUnique({
          where: { post_id },
        })
      : null

  if (!currentPost) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        존재하지 않는 게시물입니다.
      </div>
    )
  }

  if (
    !currentUser ||
    currentUser.grade_id === undefined ||
    currentUser.grade_id >= 6 ||
    currentPost.user_id !== currentUser.user_id
  ) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        권한이 없습니다.
      </div>
    )
  }

  //console.log(currentPost)

  let boardId = 0
  if (board_type === 0) {
    boardId = currentPost.board_id
  }

  return (
    <div>
      <div className="w-full text-3xl font-bold mt-20 mb-[50px]">수정하기</div>
      <EditorComponent
        user_id={currentUser?.user_id}
        grade_id={currentUser?.grade_id}
        board_id={boardId}
        boards={userBoards}
        branches={branches}
        post={currentPost}
        board_type={board_type}
      />
    </div>
  )
}

export default PostUpdatePage
