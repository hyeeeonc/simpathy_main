import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'

import { SigninRequest } from '@/types/auth'
import { signJwtAccessToken } from '@/libs/jwt'

export async function POST(request: Request) {
  const body: SigninRequest = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user

    const accessToken = signJwtAccessToken(userWithoutPass)
    const result = {
      ...userWithoutPass,
      accessToken,
    }

    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
}
