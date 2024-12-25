import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(
  () => import('@/containers/editor/ModalEditor'),
  { ssr: false },
)

const AdminModalPage = async (props: any) => {
  const currentUser = await getCurrentUser()

  const currentModal: any = await prisma.modal.findUnique({
    where: { modal_id: 1 },
  })

  if (currentUser && currentUser.grade_id <= 2) {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            팝업 공지 관리
          </div>
          <EditorComponent modal={currentModal} />
        </div>
      </>
    )
  } else
    return (
      <div className="w-full flex justify-center text-xl font-bold mb-[100px]">
        권한이 없습니다.
      </div>
    )
}

export default AdminModalPage
