'use client'

import { useState } from 'react'

const dummyReplies = [
  {
    reply_id: 1,
    user_id: 'user1',
    post_id: 101,
    reply_content: '이 문제에 대한 답변입니다.',
    reply_upload_time: '2024-06-01 10:30',
  },
  {
    reply_id: 2,
    user_id: 'user2',
    post_id: 102,
    reply_content: '다른 질문에 대한 답변입니다.',
    reply_upload_time: '2024-06-02 14:15',
  },
  {
    reply_id: 3,
    user_id: 'user3',
    post_id: 103,
    reply_content: '추가 정보를 드리겠습니다.',
    reply_upload_time: '2024-06-03 09:45',
  },
]

const RepliesPage = () => {
  const [replies] = useState(dummyReplies)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">내 답변 목록</h1>
      {replies.length === 0 ? (
        <p>답변이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {replies.map(reply => (
            <li key={reply.reply_id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">답변 내용:</p>
              <p className="mb-2">{reply.reply_content}</p>
              <div className="text-sm text-gray-600">
                <p>게시글 ID: {reply.post_id}</p>
                <p>작성자: {reply.user_id}</p>
                <p>업로드 시간: {reply.reply_upload_time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RepliesPage
