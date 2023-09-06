import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      grade: number
      branch: string
      phone_number?: string
      parent_phone_number?: string
      accessToken: string
    }
  }
}
