import prisma from '@/libs/prisma'

export default async function pagination(
  board_id: number,
  page: number,
  pageSize: number,
  searchText: string | undefined,
  searchType: string | undefined,
) {
  if (board_id === 0) {
    if (searchType === 'writer') {
      const posts = await prisma.post.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          user_id: {
            contains: searchText,
          },
          NOT: {
            user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
          },
        },
        orderBy: {
          post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
        },
      })

      return posts
    } else if (searchType === 'content') {
      const posts = await prisma.post.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          NOT: {
            user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
          },
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
      const posts = await prisma.post.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          NOT: {
            user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
          },
        },
        orderBy: {
          post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
        },
      })

      return posts
    }
  }

  if (searchType === 'writer') {
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        NOT: {
          user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
        },
        board_id,
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
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        NOT: {
          user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
        },
        board_id,
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
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        NOT: {
          user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
        },
        board_id,
      },
      orderBy: {
        post_upload_time: 'desc', // 'asc'로 설정하면 오래된 순으로 정렬
      },
    })

    return posts
  }
}
