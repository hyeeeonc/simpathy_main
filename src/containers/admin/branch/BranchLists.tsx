'use client'

import { useState } from 'react'

interface Branch {
  branch_id: number
  branch_name: string
  branch_week: string
  branch_time: Date
}

const BranchLists = ({ branch }: { branch: any }) => {
  console.log(branch)
  const [branches, setBranches] = useState(branch)

  return (
    <table>
      <thead>
        <tr>
          <th>지점명</th>
          <th>출강 요일</th>
          <th>출강 시간</th>
        </tr>
      </thead>
      <tbody>
        {branch.map((b: Branch) => (
          <tr key={b.branch_id}>
            <td>{b.branch_name}</td>
            <td>{b.branch_week}</td>
            <td>{b.branch_time.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BranchLists
