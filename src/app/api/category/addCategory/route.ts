import prisma from '@/libs/prisma'

interface CategoryAddRequest {
  category_name: string
  category_auth: number
}

export async function POST(request: Request) {
  const body: CategoryAddRequest = await request.json()
  try {
    const newCategory = await prisma.category.create({
      data: {
        category_name: body.category_name,
        category_auth: body.category_auth,
      },
    })

    return new Response(null, { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response(null, { status: 500 })
  }
}
