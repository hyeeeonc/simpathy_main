// import SignInButton from '@/containers/auth/SignInButton'
import LandingBranches from '@/containers/landing/LandingBranches'
import LandingPosts from '@/containers/landing/LandingPosts'
import LandingWindow from '@/containers/landing/LandingWindow'
export default function Home() {
  return (
    <>
      <img src="/images/landing/Head.jpeg" className="w-full" />
      {/* <LandingWindow /> */}
      <div className="flex justify-between items-center">
        <img src="/images/landing/epilog.jpeg" className="w-1/2" />
        <img src="/images/landing/books.jpeg" className="w-1/2" />
      </div>

      <LandingPosts />
      <img src="/images/landing/timetable.png" className="w-full" />
      {/* <LandingBranches /> */}
    </>
  )
}
