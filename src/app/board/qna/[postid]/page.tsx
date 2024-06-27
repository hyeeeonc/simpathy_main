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
  })

  const currentReply = await prisma.qnareply.findMany({
    where: { post_id },
    orderBy: {
      reply_upload_time: 'asc',
    },
  })

  if (!currentPost) {
    return <div>존재하지 않는 게시물입니다.</div>
  }

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
        <QnaBreadcrumb />

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
          replies={currentReply}
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
