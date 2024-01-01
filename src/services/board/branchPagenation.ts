import prisma from '@/libs/prisma'

export default async function branchPagenation(
  branch_id: number | undefined,
  page: number,
  pageSize: number,
  searchText: string | undefined,
  searchType: string | undefined,
) {
  if (branch_id === 1) {
    if (searchType === 'writer') {
      const posts = await prisma.branchpost.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          user_id: {
            contains: searchText,
          },
        },
        orderBy: {
          post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
        },
      })

      return posts
    } else if (searchType === 'content') {
      const posts = await prisma.branchpost.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          OR: [
            {
              post_title: {
                contains: searchText,
              },
            },
            {
              post_contents: {
                contains: searchText,
              },
            },
          ],
        },
        orderBy: {
          post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
        },
      })

      return posts
    } else {
      const posts = await prisma.branchpost.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
        },
      })

      return posts
    }
  }

  if (searchType === 'writer') {
    const posts = await prisma.branchpost.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        branch_id,
        user_id: {
          contains: searchText,
        },
      },
      orderBy: {
        post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
      },
    })

    return posts
  } else if (searchType === 'content') {
    const posts = await prisma.branchpost.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        branch_id,
        OR: [
          {
            post_title: {
              contains: searchText,
            },
          },
          {
            post_contents: {
              contains: searchText,
            },
          },
        ],
      },
      orderBy: {
        post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
      },
    })

    return posts
  } else {
    const posts = await prisma.branchpost.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        branch_id,
      },
      orderBy: {
        post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
      },
    })

    return posts
  }
}
