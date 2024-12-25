import prisma from '@/libs/prisma'
import MainModal from '../modal/MainModal'

async function LandingModal() {
  const modal = await prisma.modal.findUnique({
    where: { modal_id: 1 },
  })

  return (
    <>
      <MainModal modal={modal} />
    </>
  )
}

export default LandingModal
