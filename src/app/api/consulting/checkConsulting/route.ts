import prisma from '@/libs/prisma'

export async function PUT(request: Request) {
  try {
    const { consulting_id, consulting_time } = await request.json()

    // Find the consulting record by consulting_id and update the fields
    const updatedConsulting = await prisma.consulting.update({
      where: {
        consulting_id: consulting_id,
      },
      data: {
        consulting_time: consulting_time,
        consulting_checked: 1, // Assuming you want to set consulting_check to 1
      },
    })

    if (!updatedConsulting) {
      return new Response(null, { status: 404 })
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 }) // Internal Server Error
  }
}
