import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'

import { SigninRequest } from '@/types/auth'
import { signJwtAccessToken } from '@/libs/jwt'

export async function POST(request: Request) {
  const body: SigninRequest = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      user_id: body.user_id,
    },
  })

  if (user && (await bcrypt.compare(body.user_pw, user.user_pw))) {
    const { user_pw, ...userWithoutPass } = user

    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      email: userWithoutPass.user_id,
      accessToken,
    }

    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
}
