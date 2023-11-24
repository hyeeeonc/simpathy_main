import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'
import { SignupRequest } from '@/types/auth'

export async function POST(request: Request) {
  const body: SignupRequest = await request.json()

  const user = await prisma.user.create({
    data: {
      user_id: body.user_id,
      user_pw: await bcrypt.hash(body.user_pw, 10),
      user_name: body.user_name,
      user_phone: body.user_phone,
      user_parent_phone: body.user_parent_phone,
      grade_id: 1,
      branch_id: 1,
    },
  })

  const { user_pw, ...result } = user
  return new Response(JSON.stringify(result))
}
