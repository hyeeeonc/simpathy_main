import ReplyEditor from '@/containers/editor/ReplyEditor'
import 'react-quill/dist/quill.snow.css'
import '../../../../styles/post.css'

import Breadcrumb from '@/containers/post/Breadcrumb'
import { PostDeleteButton, PostNoticeButton } from '@/containers/post/PostUtil'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'
import PostUserName from '@/containers/post/PostUserName'
import ReplyList from '@/containers/post/ReplyList'
import FileList from '@/containers/post/FileList'
import QnaBreadcrumb from '@/containers/post/QnaBreadcrumb'
import {
  QnaAnsweredButton,
  QnaReansweredButton,
} from '@/containers/post/QnaUtil'
import QnaReplyList from '@/containers/post/QnaReplyList'
import QnaReplyEditor from '@/containers/editor/QnaReplyEditor'
import QnaNotice from '@/containers/post/QnaNotice'

const PostPage = async (props: any) => {
  const post_id = Number(props.params.postid)
  const currentUser = await getCurrentUser()
  const currentPost = await prisma.qnapost.findUnique({
    where: { post_id },
    include: {
      user: {
        select: {
          user_name: true,
          grade_id: true,
        },
      },
    },
  })

  // `user_name`과 `user_id` 수정 로직
  if (currentPost && currentPost.user) {
    const { user_id, user } = currentPost

    // `user`가 존재하고 `user_id`가 null이 아닌지 체크
    if (user.grade_id >= 3 && user_id !== null) {
      const { user_name } = user

      // `user_name`의 두 번째 글자를 '*'로 교체
      let modifiedUserName = user_name
      if (user_name.length === 4) {
        // 마지막 글자가 숫자 또는 영어인 경우
        const lastChar = user_name[user_name.length - 1]
        if (/[0-9A-Za-z]/.test(lastChar)) {
          modifiedUserName = user_name[0] + '*' + user_name.slice(2)
        } else {
          // 한글 이름인 경우
          modifiedUserName = user_name.slice(0, 2) + '*' + user_name.slice(3)
        }
      } else if (user_name.length > 1) {
        // 일반적인 경우 (두 번째 글자를 *)
        modifiedUserName = user_name[0] + '*' + user_name.slice(2)
      }

      // `user_id`에서 기존 `user_name`을 수정된 `user_name`으로 교체
      const modifiedUserId = user_id.replace(user_name, modifiedUserName)

      // 수정된 결과 반영
      currentPost.user_id = modifiedUserId
      currentPost.user.user_name = modifiedUserName // `user_name`도 수정된 값을 반영
    }
  }

  if (!currentPost) {
    return <div>존재하지 않는 게시물입니다.</div>
  }

  const currentReply = await prisma.qnareply.findMany({
    where: { post_id },
    orderBy: {
      reply_upload_time: 'asc',
    },
    include: {
      user: {
        select: {
          user_name: true,
          grade_id: true,
        },
      },
    },
  })

  // `user_name`과 `user_id` 수정 로직
  const updatedReplies = currentReply.map(reply => {
    const { user_id, user } = reply

    if (user && user.grade_id >= 3) {
      const { user_name } = user

      // `user_name`의 두 번째 글자를 '*'로 교체
      let modifiedUserName = user_name
      if (user_name.length === 4) {
        // 마지막 글자가 숫자 또는 영어인 경우
        const lastChar = user_name[user_name.length - 1]
        if (/[0-9A-Za-z]/.test(lastChar)) {
          modifiedUserName = user_name[0] + '*' + user_name.slice(2)
        } else {
          // 한글 이름인 경우
          modifiedUserName = user_name.slice(0, 2) + '*' + user_name.slice(3)
        }
      } else if (user_name.length > 1) {
        // 일반적인 경우 (두 번째 글자를 *)
        modifiedUserName = user_name[0] + '*' + user_name.slice(2)
      }

      // `user_id`에서 기존 `user_name`을 수정된 `user_name`으로 교체
      const modifiedUserId = user_id
        ? user_id.replace(user_name, modifiedUserName)
        : ''

      // 결과 반환
      return {
        ...reply,
        user_id: modifiedUserId,
        user: {
          ...user,
          user_name: modifiedUserName, // `user_name`도 수정된 값을 반영
        },
      }
    }

    // 조건을 만족하지 않으면 원본 데이터 유지
    return reply
  })

  if (
    !currentUser ||
    currentUser.grade_id === undefined ||
    currentUser.grade_id >= 6
  ) {
    return <div>권한이 없습니다.</div>
  }

  // posts를 순회하면서 날짜를 변경하고 포맷팅

  // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
  const uploadTime = new Date(currentPost.post_upload_time)

  // 한국 표준시로 변경 (UTC+9)
  const koreanTime = new Date(uploadTime.getTime())

  // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
  const formattedDate =
    `${koreanTime.getFullYear()}.${(koreanTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${koreanTime.getDate().toString().padStart(2, '0')} ` +
    `${koreanTime.getHours().toString().padStart(2, '0')}:${koreanTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`

  return (
    <>
      <div className="w-full rounded-[5px] md:border-solid md:border md:border-gray-300 md:p-6">
        <QnaBreadcrumb isAdmin={true} />

        <div className="w-full mt-[20px] mb-[20px] border-solid border-b border-b-gray-300">
          <div className="text-sky-800 text-3xl font-bold mb-[40px]">
            <span style={{ fontWeight: 'bold' }}>
              &#91;
              {currentPost?.post_qnatype}
              &#93;&#91;
              {currentPost?.post_qnatarget}
              &#93;
            </span>
            {currentPost.post_title}
          </div>
          <div className="flex justify-end">
            <div className="text-sky-800 text-sm mb-[10px] text-right">
              <p className="font-bold">{currentPost.user_id}</p>

              <p className="text-gray-500">{formattedDate}</p>
            </div>
          </div>

          {/* <div className="text-sky-800 text-2xl font-bold mb-[100px]"></div> */}
        </div>
        <QnaNotice />
        <div
          className="border-solid border-b border-b-gray-300 py-[20px] view ql-editor"
          dangerouslySetInnerHTML={{ __html: currentPost.post_contents }}
        />
        <div className="text-sky-800 text-xl font-bold my-[20px]">답변</div>
        <QnaReplyList
          user={currentUser}
          replies={updatedReplies}
          post_id={post_id}
        />
        <QnaReplyEditor post_id={post_id} origin_id={null} />
      </div>
      <div className="flex justify-end items-center w-full my-[20px]">
        {currentUser.grade_id <= 2 && <QnaAnsweredButton post_id={post_id} />}
        {currentUser.user_id === currentPost.user_id &&
          currentPost.post_isAnswered === 1 && (
            <QnaReansweredButton
              post_id={post_id}
              user_id={currentPost.user_id}
            />
          )}
        {currentPost.user_id === currentUser?.user_id && (
          <>
            <PostDeleteButton
              can_edit={currentPost.user_id === currentUser?.user_id}
              board_type={1}
              post_id={post_id}
              board_id={0}
            />
          </>
        )}
      </div>
    </>
  )
}

export default PostPage
