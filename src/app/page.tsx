import SignInButton from '@/containers/auth/SignInButton'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">NextAuth Tutorial</h1>
      <SignInButton />
    </div>
  )
}
