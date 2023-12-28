import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      user_id: string
      user_name: string
      user_phone?: string
      user_parent_phone?: string
      grade_id: number
      branch_id: number
      accessToken: string
    }
  }
}
