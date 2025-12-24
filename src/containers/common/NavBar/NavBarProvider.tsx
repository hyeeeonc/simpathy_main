import NavBar from './NavBar'
import prisma from '@/libs/prisma'

const NavBarProvider = async () => {
  async function getActiveBoardsWithin3Days() {
    const now = new Date()
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

    const boards = await prisma.board.findMany({
      where: {
        post: {
          some: {
            post_upload_time: {
              gte: threeDaysAgo,
            },
          },
        },
      },
      select: {
        board_id: true,
        board_name: true,
      },
      orderBy: {
        board_order: 'asc',
      },
    })

    return boards
  }
  const activeBoards = await getActiveBoardsWithin3Days()
  return (
    <>
      <NavBar activeBoards={activeBoards} />
    </>
  )
}

export default NavBarProvider
