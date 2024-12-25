'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, CardFooter, IconButton } from '@material-tailwind/react'

const QnaReplyPagenation = ({
  page,
  totalPage,
  userId,
}: {
  page: number
  totalPage: number
  userId: string
}) => {
  const router = useRouter()
  const pageSize = 5
  const currentSection = Math.floor((page - 1) / pageSize)
  const currentStartPage = currentSection * pageSize + 1
  const currentEndPage = Math.min((currentSection + 1) * pageSize, totalPage)

  // const navigatePage = (page: number) => {
  //   router.push(`/board?page=${page}`)

  // }

  const navigatePage = (page: number) => {
    // 현재 URL에서 모든 쿼리 파라미터 추출
    const url = new URL(window.location.href)
    const queryParams = url.searchParams

    // 쿼리 파라미터를 문자열로 변환
    const queryParamsString = Array.from(queryParams)
      .filter(([key]) => key !== 'page')
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    // 쿼리 파라미터를 붙일 경로 생성
    const pathWithQueryParams = `/board/qna/reply/${userId}?page=${page}&${queryParamsString}`

    router.refresh()
    router.push(pathWithQueryParams)
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

export default QnaReplyPagenation
