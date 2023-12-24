import ReplyEditor from '@/containers/editor/ReplyEditor'
import '../../../../styles/post.css'

import BoardTable from '@/containers/board/BoardTable'
import Breadcrumb from '@/containers/post/Breadcrumb'
import PostUtil from '@/containers/post/PostUtil'
import prisma from '@/libs/prisma'
import getCurrentUser from '@/services/getCurrentUser'

const PostPage = async (props: any) => {
  const post_id = Number(props.params.postid)
  const board_id = Number(props.params.id)
  const currentUser = await getCurrentUser()
  const currentPost = await prisma.post.findUnique({
    where: { post_id },
  })

  const currentBoard = await prisma.board.findUnique({
    where: { board_id },
  })

  if (!currentPost || currentPost.board_id !== board_id || !currentBoard) {
    return <div>존재하지 않는 게시물입니다.</div>
  }

  if (
    !currentUser ||
    currentUser.grade_id === undefined ||
    currentUser.grade_id > currentBoard.board_read_auth
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
    `${koreanTime.getHours().toString().padStart(2, '0')}.${koreanTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`

  return (
    <>
      <div className="w-full rounded-[5px] md:border-solid md:border md:border-gray-300 md:p-6">
        <Breadcrumb board_id={board_id} board_name={currentBoard?.board_name} />

        <div className="w-full mt-[20px] mb-[20px] border-solid border-b border-b-gray-300">
          <div className="text-sky-800 text-3xl font-bold mb-[40px]">
            {currentPost.post_title}
          </div>
          <div className="text-sky-800 text-sm mb-[10px] text-right">
            <p className="font-bold">{currentPost.user_id}</p>

            <p className="text-gray-500">{formattedDate}</p>
          </div>

          {/* <div className="text-sky-800 text-2xl font-bold mb-[100px]"></div> */}
        </div>
        <div
          className="border-solid border-b border-b-gray-300 py-[20px]"
          dangerouslySetInnerHTML={{ __html: currentPost.post_contents }}
        />
        <div className="text-sky-800 text-xl font-bold my-[20px]">댓글</div>
        <ReplyEditor />
      </div>
      {currentPost.user_id === currentUser?.user_id && (
        <>
          <PostUtil />
        </>
      )}
    </>
  )
}

export default PostPage
