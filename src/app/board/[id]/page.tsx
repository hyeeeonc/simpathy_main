import { Breadcrumb } from '@/components/Breadcrumb'
import { TransactionsTable } from '@/containers/board/BoardList'

const BoardPage = () => {
  return (
    <>
      <div className="mb-[30px]">
        <Breadcrumb />
      </div>
      <TransactionsTable />
    </>
  )
}

export default BoardPage
