// import EditorComponent from '@/containers/editor/EditoerComponent'
import getCurrentUser from '@/services/getCurrentUser'
import prisma from '@/libs/prisma'
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(
  () => import('@/containers/editor/EditoerComponent'),
  { ssr: false },
)

const Editor = async () => {
  const currentUser = await getCurrentUser()
  const userBoards = await prisma.board.findMany({
    where: {
      board_write_auth: {
        gte: currentUser?.grade_id,
      },
    },
  })

  const branches = await prisma.branch.findMany()

  return (
    <div>
      <div className="w-full text-3xl font-bold mt-20 mb-[50px]">글 쓰기</div>
      <EditorComponent
        user_id={currentUser?.user_id}
        grade_id={currentUser?.grade_id}
        boards={userBoards}
        branches={branches}
      />
    </div>
  )
}

export default Editor
