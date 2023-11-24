import Link from 'next/link'
import { HeaderButtons } from '@/components/Buttons'
import { SignInButton, SignOutButton } from '../auth/SignButtons'
import getCurrentUser from '@/services/getCurrentUser'
import NavBarProvider from './NavBar/NavBarProvider'

const Header = async () => {
  const currentUser = await getCurrentUser()
  return (
    <header className="w-full h-32 relative mb-[30px]">
      <div className="flex h-full items-center justify-between">
        <Link href={'/'}>
          <img
            className="w-32 md:w-40 cursor-pointer transition-all duration-300 ease-out hover:opacity-70"
            src="/images/common/logo.png"
            alt="logo"
          />
        </Link>
        <div className="flex">
          <Link className="mx-4" href={'/mypage'}>
            <HeaderButtons>mypage</HeaderButtons>
          </Link>
          {currentUser ? <SignOutButton /> : <SignInButton />}

          <div className="w-[50px]"> </div>
        </div>
      </div>
      <div className="absolute flex inset-x-0 bottom-0 h-2 bg-black">
        <div
          className="w-1/5 bg-sky-600"
          style={{ backgroundColor: 'rgb(2 132 199)' }}
        ></div>
        <div className="w-4/5 bg-teal-500"></div>
      </div>
    </header>
  )
}

export default Header
