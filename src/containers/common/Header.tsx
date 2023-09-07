import Link from 'next/link'
import { HeaderButtons } from '@/components/Buttons'
import { SignInButton, SignOutButton } from '../auth/SignInButton'
import getCurrentUser from '@/services/getCurrentUser'

const Header = async () => {
  const currentUser = await getCurrentUser()
  return (
    <header className="w-full h-32 relative">
      <div className="flex h-full items-center justify-between">
        <Link href={'/'}>
          <img
            className="w-32 md:w-40 cursor-pointer"
            src="/images/common/logo.png"
            alt="logo"
          />
        </Link>
        <div className="flex">
          <Link href={'/mypage'}>
            <HeaderButtons>mypage</HeaderButtons>
          </Link>
          {currentUser ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
      <div className="absolute flex inset-x-0 bottom-0 h-2 bg-black">
        <div className="w-1/5 bg-sky-600"></div>
        <div className="w-4/5 bg-teal-500"></div>
      </div>
    </header>
  )
}

export default Header
