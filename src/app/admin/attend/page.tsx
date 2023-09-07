import DashBoard from '@/containers/admin/attend/DashBoard'
import getBranch from '@/services/getBranch'
import '@/styles/fc.css'

const AttendPage = async () => {
  const branches = await getBranch()
  console.log(branches)
  return (
    <div>
      <DashBoard />
    </div>
  )
}

export default AttendPage
