import prisma from '@/libs/prisma'

export async function POST(request: Request) {
  const { files, post_id } = await request.json()
  console.log(files)
  console.log(post_id)
  try {
    const cratedfiles = await prisma.file.createMany({
      data: files.map((file: any) => ({
        file_name: file.name,
        file_addr: file.url,
        post_id: post_id,
      })),
    })
    console.log(cratedfiles)

    if (!cratedfiles) return new Response(null, { status: 404 })
    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
