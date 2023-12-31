// import EditorComponent from '@/containers/editor/EditoerComponent'
import getCurrentUser from '@/services/getCurrentUser'
import prisma from '@/libs/prisma'
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(
  () => import('@/containers/editor/EditoerComponent'),
  { ssr: false },
)

const Editor = async (props: any) => {
  const currentUser = await getCurrentUser()
  const userBoards = await prisma.board.findMany({
    where: {
      board_write_auth: {
        gte: currentUser?.grade_id,
      },
    },
  })

  const branches = await prisma.branch.findMany()

  const boardParamHandler = () => {
    const board = props.searchParams.board_id
    if (!/^\d+$/.test(board) || board === undefined || board === null) return 0
    else if (Number(board) < 1) return 0

    const boardExists = userBoards.some(
      userBoard => userBoard.board_id === Number(board),
    )
    if (!boardExists) return 0
    return Number(board)
  }

  if (currentUser?.grade_id === undefined || currentUser?.grade_id === 6) {
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        접근 권한이 없습니다.
      </div>
    )
  }

  return (
    <div>
      <div className="w-full text-3xl font-bold mt-20 mb-[50px]">글 쓰기</div>
      <EditorComponent
        user_id={currentUser?.user_id}
        grade_id={currentUser?.grade_id}
        board_id={boardParamHandler()}
        boards={userBoards}
        branches={branches}
      />
    </div>
  )
}

export default Editor
