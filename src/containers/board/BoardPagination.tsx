'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, CardFooter, IconButton } from '@material-tailwind/react'

const BoardPagination = ({
  board_id,
  page,
  totalPage,
}: {
  board_id: number
  page: number
  totalPage: number
}) => {
  const router = useRouter()
  const pageSize = 5
  const currentSection = Math.floor((page - 1) / pageSize)
  const currentStartPage = currentSection * pageSize + 1
  const currentEndPage = Math.min((currentSection + 1) * pageSize, totalPage)

  const navigatePage = (page: number) => {
    if (board_id === 0) router.push(`/board?page=${page}`)
    else router.push(`/board/${board_id}?page=${page}`)
  }
  const nextSectionHandler = () => {
    if (currentEndPage === totalPage) return
    navigatePage(currentEndPage + 1)
  }

  const prevSectionHandler = () => {
    if (currentStartPage === 1) return
    navigatePage(currentStartPage - 1)
  }

  const pageList = Array(currentEndPage - currentStartPage + 1).fill(0)

  return (
    <>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          disabled={currentStartPage === 1 ? true : false}
          variant="text"
          size="sm"
          onClick={prevSectionHandler}
        >
          &lt; 이전
        </Button>
        <div className="flex items-center gap-2">
          {pageList.map((_, index) => (
            <IconButton
              variant={page === currentStartPage + index ? 'outlined' : 'text'}
              size="sm"
              onClick={() => navigatePage(currentStartPage + index)}
            >
              {currentStartPage + index}
            </IconButton>
          ))}
        </div>
        <Button
          disabled={currentEndPage === totalPage ? true : false}
          variant="text"
          size="sm"
          onClick={nextSectionHandler}
        >
          다음 &gt;
        </Button>
      </CardFooter>
    </>
  )
}

export default BoardPagination
