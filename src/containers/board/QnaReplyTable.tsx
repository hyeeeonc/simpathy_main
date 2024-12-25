'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { ChangeEvent, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Select, Option, Input, Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

const BoardTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  table-layout: fixed;
`

const BoardSearchContainer = styled.div`
  width: 100%;
  gap: 20px;
  margin-bottom: 10px;
  display: flex;

  @media (max-width: 920px) {
    flex-direction: column;
  }
`

const BoardTableHeader = styled.thead`
  border-top: 2px solid lightgray;
  height: 40px;
  line-height: 40px;
`

const BoardTableHead = styled.th`
  border-bottom: 1px solid lightgray;
  text-align: center;
`

const BoardTableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const BoardTableWriter = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const BoardTableCellTitle = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const BoardTableMobileContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const BoardTableMobileItemContainer = styled.div`
  width: 100%;
  height: 80px;

  border-bottom: 1px solid #ddd;

  padding: 11px 12px 11px 0;
`

const BoardTableMobileItemTitle = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;

  a {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const BoardTableMobileDoublelineTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`

const BoardTableMobileItemSubContainer = styled.div`
  display: flex;
  color: #999;

  font-size: 12px;
  line-height: 1.8;
`

const BoardTableMobileWriter = styled.div`
  margin-right: 10px;
`

const BoardTableAnsweredIndicator = styled.div`
  white-space: nowrap;
  padding: 2px 5px;

  font-size: 12px;
  color: white;

  border-radius: 5px;

  margin-right: 5px;

  display: inline;
`

const BoardTableMobileDate = styled.div``

const BoardQnaTypeButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 10px;
`

const BoardTableReplyIndicator = styled.p`
  color: red;
`

const TruncatedText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 원하는 줄 수 (여기서는 2줄로 제한) */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const QnaAnswerType = ({ isAnswered }: { isAnswered: number }) => {
  if (isAnswered === 1) {
    return (
      <BoardTableAnsweredIndicator
        style={{ backgroundColor: 'rgb(2 132 199)' }}
      >
        답변완료
      </BoardTableAnsweredIndicator>
    )
  } else if (isAnswered === 0) {
    return (
      <BoardTableAnsweredIndicator style={{ backgroundColor: '#999' }}>
        답변대기
      </BoardTableAnsweredIndicator>
    )
  }
  return (
    <BoardTableAnsweredIndicator style={{ backgroundColor: '#2EC4B6' }}>
      재질문
    </BoardTableAnsweredIndicator>
  )
}

const QnaReplyTable = ({
  replies,
  userId,
}: {
  replies: any
  userId: string
}) => {
  console.log(replies)
  const [showReplies, setShowReplies] = useState(replies)
  const router = useRouter()
  const [isAnswered, setIsAnswered] = useState<string>('')
  const [qnaType, setQnaType] = useState<string>('')
  const [qnaTarget, setQnaTarget] = useState<string>('')
  const [search, setSearch] = useState('')

  const handleAnswered = (e: any) => {
    setIsAnswered(e)
  }

  const handleQnaType = (e: any) => {
    setQnaType(e)
  }

  const handleQnaTarget = (e: any) => {
    setQnaTarget(e)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const searchSubmit = () => {
    if (
      isAnswered === '' &&
      qnaType === '' &&
      qnaTarget === '' &&
      search === ''
    ) {
      router.refresh()
      router.push('/board/qna/reply/' + userId)
    }

    let addr = '/board/qna/reply/' + userId + '?'

    let flag = false
    if (isAnswered !== '') {
      flag = true
      addr += `isAnswered=${isAnswered}`
    }

    if (qnaType !== '') {
      if (flag) addr += `&`
      else flag = true
      addr += `qnaType=${qnaType}`
    }

    if (qnaTarget !== '') {
      if (flag) addr += `&`
      else flag = true
      addr += `qnaTarget=${qnaTarget}`
    }

    if (search !== '') {
      if (flag) addr += `&`
      else flag = true
      addr += `search=${search}`
    }
    router.refresh()
    router.push(addr)
    // location.reload()
  }

  const handleKeyPress = (e: any): void => {
    if (e.key === 'Enter') {
      searchSubmit()
    }
  }

  const isDesktop: boolean = useMediaQuery({
    query: '(min-width:768px)',
  })
  const isMobile: boolean = useMediaQuery({
    query: '(max-width:767px)',
  })

  useEffect(() => {
    setShowReplies(replies)
    console.log(replies)
  }, [replies])

  return (
    <>
      <>
        <BoardSearchContainer>
          <Select label="상태" value={isAnswered} onChange={handleAnswered}>
            <Option value={''}>전체</Option>
            <Option value={'0'}>답변대기</Option>
            <Option value={'1'}>답변완료</Option>
            <Option value={'2'}>재질문</Option>
          </Select>
          <Select label="종류" value={qnaType} onChange={handleQnaType}>
            <Option value={''}>전체</Option>
            <Option value={'문학'}>문학</Option>
            <Option value={'독서'}>독서</Option>
            <Option value={'기타'}>기타</Option>
          </Select>
          <Select label="질문대상" value={qnaTarget} onChange={handleQnaTarget}>
            <Option value={''}>전체</Option>
            <Option value={'강의'}>강의</Option>
            <Option value={'교재(강의교재)'}>교재(강의교재)</Option>
            <Option value={'교재(학습자료)'}>교재(학습자료)</Option>
            <Option value={'기출문제'}>평가원 기출</Option>
            <Option value={'기타'}>기타</Option>
          </Select>
          <Input
            label="제목, 내용 검색"
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            icon={
              <MagnifyingGlassIcon
                className="h-5 w-5 cursor-pointer"
                onClick={searchSubmit}
              />
            }
            crossOrigin={undefined}
          />
        </BoardSearchContainer>
        <BoardQnaTypeButtonContainer>
          <Button onClick={searchSubmit} variant="outlined">
            적용하기
          </Button>
        </BoardQnaTypeButtonContainer>
      </>

      {replies.length === 0 ? (
        <p>답변이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {showReplies.map((reply: any) => (
            <Link
              href={`/board/qna/${reply.qnapost.post_id}`}
              key={reply.reply_id}
            >
              <li key={reply.reply_id} className="border p-4 rounded shadow-sm">
                <QnaAnswerType isAnswered={reply.qnapost?.post_isAnswered} />
                <div className="text-s text-gray-700 mb-5">
                  <p>제목: {reply.qnapost.post_title}</p>
                  <p>작성자: {reply.qnapost.user.user_id}</p>
                </div>
                <p className="text-sm text-black">
                  {new Date(reply.reply_upload_time).toLocaleString('ko-KR', {
                    year: 'numeric', // 4자리 연도
                    month: '2-digit', // 2자리 월
                    day: '2-digit', // 2자리 일
                    hour: '2-digit', // 2자리 시
                    minute: '2-digit', // 2자리 분
                    hour12: false, // 24시간 형식 사용
                  })}
                </p>
                <TruncatedText>{reply.reply_content}</TruncatedText>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  )
}

export default QnaReplyTable
