import prisma from '@/libs/prisma'
import { post } from '@prisma/client' // Prisma에서 생성된 Post 타입 가져오기

/**
 * 공통 조건 생성 함수
 */
function buildConditions(
  board_id: number,
  searchText: string | undefined,
  searchType: string | undefined,
): object {
  return {
    NOT: {
      user_id: '(알 수 없음)', // user_id가 "(알 수 없음)"인 데이터를 제외
    },
    ...(board_id !== 0 && { board_id }), // board_id가 0이 아닐 때만 추가
    ...(searchType === 'writer' && {
      user_id: { contains: searchText }, // 작성자 검색
    }),
    ...(searchType === 'content' && {
      OR: [
        { post_title: { contains: searchText } }, // 제목 검색
        { post_contents: { contains: searchText } }, // 내용 검색
      ],
    }),
  }
}

/**
 * 게시글 페이지네이션 함수
 */
export async function pagination(
  board_id: number,
  page: number,
  pageSize: number,
  searchText: string | undefined,
  searchType: string | undefined,
): Promise<post[]> {
  const conditions = buildConditions(board_id, searchText, searchType) // 조건 생성

  const posts = await prisma.post.findMany({
    where: conditions,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      post_upload_time: 'desc', // 최신순 정렬
    },
  })

  return posts
}

/**
 * 게시글 총 개수 반환 함수
 */
export async function getTotalPostCount(
  board_id: number,
  searchText: string | undefined,
  searchType: string | undefined,
): Promise<number> {
  const conditions = buildConditions(board_id, searchText, searchType) // 조건 생성

  const totalCount = await prisma.post.count({
    where: conditions,
  })

  return totalCount
}

/**
 * 페이지네이션 및 총 게시글 개수를 함께 반환하는 함수
 */
export async function getPaginatedPosts(
  board_id: number,
  page: number,
  pageSize: number,
  searchText: string | undefined,
  searchType: string | undefined,
): Promise<{ totalPost: number; posts: post[] }> {
  const totalPost = await getTotalPostCount(board_id, searchText, searchType)
  const posts = await pagination(
    board_id,
    page,
    pageSize,
    searchText,
    searchType,
  )

  return {
    totalPost,
    posts,
  }
}
