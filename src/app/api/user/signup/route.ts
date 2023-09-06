import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'
import { SignupRequest } from '@/types/auth'

export async function POST(request: Request) {
  const body: SignupRequest = await request.json()

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      grade: body.grade,
      branch: body.branch,
    },
  })

  const { password, ...result } = user
  return new Response(JSON.stringify(result))
}
