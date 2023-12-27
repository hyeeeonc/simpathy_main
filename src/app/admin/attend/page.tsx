import DashBoard from '@/containers/admin/attend/DashBoard'
import getBranch from '@/services/getBranch'
import '@/styles/fc.css'

const AttendPage = async () => {
  const branches = await getBranch()
  return (
    <div>
      <DashBoard />
    </div>
  )
}

export default AttendPage
