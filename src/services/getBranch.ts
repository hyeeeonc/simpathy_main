import prisma from '@/libs/prisma'

export default async function getBranch() {
  try {
    // "Branch" 모델을 사용하여 모든 branch 정보를 가져옵니다.
    const allBranches = await prisma.branch.findMany()
    console.log(allBranches)

    return allBranches
  } catch (error) {
    return null
  }
}
