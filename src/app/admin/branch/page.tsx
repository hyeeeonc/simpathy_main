import getBranch from '@/services/getBranch'
import BranchLists from '@/containers/admin/branch/BranchLists'
import '@/styles/fc.css'

const AttendPage = async () => {
  const branches = await getBranch()
  console.log(branches)
  return (
    <div>
      <BranchLists branch={branches} />
    </div>
  )
}

export default AttendPage
