import { Breadcrumb } from '@/components/Breadcrumb'
import { TransactionsTable } from '@/containers/board/BoardList'
import BoardTable from '@/containers/board/BoardTable'

const BoardPage = () => {
  return (
    <>
      {/* <div className="mb-[30px]">
        <Breadcrumb />
      </div>
      <TransactionsTable /> */}
      <div className="w-full  mt-20">
        <div className="text-sky-800 text-3xl font-bold mb-[100px]">
          게시판 이름
        </div>
        <BoardTable />
      </div>
    </>
  )
}

export default BoardPage
