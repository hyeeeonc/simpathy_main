// import SignInButton from '@/containers/auth/SignInButton'
import LandingBranches from '@/containers/landing/LandingBranches'
import LandingPosts from '@/containers/landing/LandingPosts'
import LandingWindow from '@/containers/landing/LandingWindow'
export default function Home() {
  return (
    <>
      <LandingWindow />
      <LandingPosts />
      <LandingBranches />
    </>
  )
}
