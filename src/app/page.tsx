// import SignInButton from '@/containers/auth/SignInButton'
import MainNoticeBoard from '@/containers/board/MainNoticeBoard'
import LandingBranches from '@/containers/landing/LandingBranches'
import LandingPosts from '@/containers/landing/LandingPosts'
import LandingWebtoon from '@/containers/landing/LandingWebtoon'
import LandingWindow from '@/containers/landing/LandingWindow'
import prisma from '@/libs/prisma'

export default async function Home() {
  const noticePosts = await prisma.post.findMany({
    where: { isNotice: true },
    orderBy: {
      post_upload_time: 'desc',
    },
  })

  // posts를 순회하면서 날짜를 변경하고 포맷팅
  const formattedPosts = noticePosts.map(post => {
    // Prisma에서 받아온 날짜 데이터를 JavaScript Date 객체로 변환
    const uploadTime = new Date(post.post_upload_time)

    // 한국 표준시로 변경 (UTC+9)
    const koreanTime = new Date(uploadTime.getTime())

    // 날짜를 'yyyy.mm.dd hh.mm.ss' 형식의 문자열로 변환
    const formattedDate = `${koreanTime.getFullYear()}.${(
      koreanTime.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${koreanTime.getDate().toString().padStart(2, '0')}`

    // 변환된 값을 포함하는 새로운 객체를 반환
    return {
      ...post,
      formattedDate,
    }
  })

  return (
    <>
      <img src="/images/landing/Head.jpeg" className="w-full" />
      {/* 공지사항 */}
      <>
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1 className="text-3xl font-bold">공지사항</h1>
        <br />
        <MainNoticeBoard posts={formattedPosts} />

        <br />
        <br />
      </>
      {/* <LandingWindow /> */}
      <div className="flex justify-between items-center my-[50px] flex-wrap">
        <img src="/images/landing/epilog.jpeg" className="w-1/2 mob:w-1/3" />
        <img src="/images/landing/books.jpeg" className="w-1/2 mob:w-1/3" />
        <LandingWebtoon />
      </div>

      {/* <LandingPosts /> */}
      <img src="/images/landing/timetable.png" className="w-full" />
      {/* <LandingBranches /> */}
    </>
  )
}
