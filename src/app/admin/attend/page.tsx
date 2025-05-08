import DashBoard from '@/containers/admin/attend/DashBoard'
import getBranch from '@/services/getBranch'
import '@/styles/fc.css'
import getCurrentUser from '@/services/getCurrentUser'

async function AttendPage() {
  const currentUser = await getCurrentUser()
  const branches = await getBranch()

  if (currentUser && currentUser.grade_id <= 2) {
    return (
      <>
        <div className="w-full  mt-20">
          <div className="text-sky-800 text-3xl font-bold mb-10 ">
            출석 관리
          </div>
          <DashBoard />
        </div>
      </>
    )
  } else return <div>접근 권한이 없습니다</div>
}

export default AttendPage
