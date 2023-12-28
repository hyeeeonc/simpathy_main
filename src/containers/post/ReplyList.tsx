'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { Button, ButtonGroup } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import ReplyEditor from '../editor/ReplyEditor'
import { UserNoPw } from '@/types/auth'

const ReplyListContainer = styled.div`
  margin-bottom: 30px;
`

const ReplyItemContainer = styled.div`
  width: 100%;
  padding: 10px;

  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 767px) {
    padding: 10px 0px;
  }
`

const ReplyItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReplyItemWriter = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const ReplyItemButtons = styled.div``

const ReplyItemContent = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  white-space: pre-line;
  word-break: break-all;

  margin-top: 15px;

  @media (max-width: 767px) {
    padding: 5px;
  }
`

const ReplyFooterContainer = styled.div`
  display: flex;

  width: 100%;
  padding: 10px;
  gap: 20px;

  @media (max-width: 767px) {
    padding: 5px;

    gap: 10px;
  }
`

const ReplyDate = styled.div`
  font-size: 12px;
  color: #828282;
`

const ReplyCommentButton = styled.div`
  font-size: 12px;
  color: #828282;

  cursor: pointer;
`

const SubReplyContainer = styled.div`
  margin-left: 30px;
  width: calc(100% - 30px));
  padding: 10px;

  @media (max-width: 767px) {
    padding: 10px 0px;
  }
`

const ReplyList = ({
  replies,
  post_id,
  user,
}: {
  replies: any[]
  post_id: number
  user: any
}) => {
  const [originReplies, setOriginReplies] = useState<any[]>([])
  const [openHandler, setOpenHandler] = useState<number>(0)

  const subReplyEditorOpenHandler = (reply_id: number) => {
    if (openHandler === reply_id) {
      setOpenHandler(0)
    } else {
      setOpenHandler(reply_id)
    }
  }

  const replyDeleteHandler = async (reply_id: number) => {
    try {
      const response = await fetch('/api/reply/deleteReply', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply_id,
        }),
      })

      if (response.ok) {
        alert('댓글이 삭제되었습니다.')
        window.location.reload()
        // Handle success, e.g., redirect or show a success message
      } else if (response.status === 401) {
        alert('권한이 없습니다.')
        // Handle errors, e.g., show an error message to the user
      } else {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      }
    } catch (error: any) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  useEffect(() => {
    const originReplies: any[] = []
    replies.forEach(reply => {
      if (reply.origin_id === null) {
        originReplies.push(reply)
      }
    })
    setOriginReplies(originReplies)
  }, [])

  return (
    <ReplyListContainer>
      {originReplies.map(reply => {
        // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
        const uploadTime = new Date(reply.reply_upload_time)

        // 한국 표준시로 변경 (UTC+9)
        const koreanTime = new Date(uploadTime.getTime())

        // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
        const formattedDate =
          `${koreanTime.getFullYear()}.${(koreanTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}.${koreanTime
            .getDate()
            .toString()
            .padStart(2, '0')} ` +
          `${koreanTime.getHours().toString().padStart(2, '0')}.${koreanTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}`

        const subReplies: any[] = []
        replies.forEach(subreply => {
          if (subreply.origin_id === reply.reply_id) {
            subReplies.push(subreply)
          }
        })

        return (
          <>
            <ReplyItemContainer key={reply.reply_id}>
              <ReplyItemHeader>
                <Link href={`/board?searchType=writer&search=${reply.user_id}`}>
                  <ReplyItemWriter>{reply.user_id}</ReplyItemWriter>
                </Link>
                <ReplyItemButtons>
                  {(user.user_id === reply.user_id || user.grade_id === 1) && (
                    <Button
                      onClick={() => {
                        replyDeleteHandler(reply.reply_id)
                      }}
                      size="sm"
                      variant="text"
                    >
                      삭제
                    </Button>
                  )}
                </ReplyItemButtons>
              </ReplyItemHeader>
              <ReplyItemContent>{reply.reply_content}</ReplyItemContent>
              <ReplyFooterContainer>
                <ReplyDate>{formattedDate}</ReplyDate>
                <ReplyCommentButton
                  onClick={() => {
                    subReplyEditorOpenHandler(reply.reply_id)
                  }}
                >
                  답글쓰기
                </ReplyCommentButton>
              </ReplyFooterContainer>
            </ReplyItemContainer>

            {subReplies.length !== 0 && (
              <SubReplyContainer>
                {subReplies.map(subreply => {
                  // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
                  const uploadTime = new Date(subreply.reply_upload_time)

                  // 한국 표준시로 변경 (UTC+9)
                  const koreanTime = new Date(uploadTime.getTime())

                  // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
                  const formattedDate =
                    `${koreanTime.getFullYear()}.${(koreanTime.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}.${koreanTime
                      .getDate()
                      .toString()
                      .padStart(2, '0')} ` +
                    `${koreanTime
                      .getHours()
                      .toString()
                      .padStart(2, '0')}.${koreanTime
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}`

                  return (
                    <>
                      <ReplyItemContainer key={subreply.reply_id}>
                        <ReplyItemHeader>
                          <Link
                            href={`/board?searchType=writer&search=${subreply.user_id}`}
                          >
                            <ReplyItemWriter>
                              {subreply.user_id}
                            </ReplyItemWriter>
                          </Link>
                          <ReplyItemButtons>
                            {(user.user_id === reply.user_id ||
                              user.grade_id === 1) && (
                              <Button
                                onClick={() => {
                                  replyDeleteHandler(subreply.reply_id)
                                }}
                                size="sm"
                                variant="text"
                              >
                                삭제
                              </Button>
                            )}
                          </ReplyItemButtons>
                        </ReplyItemHeader>
                        <ReplyItemContent>
                          {subreply.reply_content}
                        </ReplyItemContent>
                        <ReplyFooterContainer>
                          <ReplyDate>{formattedDate}</ReplyDate>
                        </ReplyFooterContainer>
                      </ReplyItemContainer>
                    </>
                  )
                })}
              </SubReplyContainer>
            )}

            <div
              style={{
                display: openHandler === reply.reply_id ? 'block' : 'none',
              }}
            >
              <ReplyEditor post_id={post_id} origin_id={reply.reply_id} />
            </div>
          </>
        )
      })}
    </ReplyListContainer>
  )
}

export default ReplyList
