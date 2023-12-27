import {
  ContentBoxCellContent,
  ContentBoxCellContentContainer,
  ContentBoxCellContentTitle,
  ContentBoxCellContentWrapper,
} from '@/components/ContentBox'
import { Grade, UserNoPw } from '@/types/auth'
import { Branch } from '@/types/branch'
import {
  Select,
  Option,
  Input,
  Button,
  Card,
  Typography,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const UserListContainer = styled.div`
  width: 100%;
`

const UserListSelectorTitle = styled.div`
  width: 100%;

  font-size: 1.1rem;
  font-weight: 600;

  margin-bottom: 20px;
`

const UserListSelectorContainer = styled.div`
  display: flex;

  width: 100%;

  margin: 20px 0;

  gap: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const TABLE_HEAD = ['계정', '등급', '지점', '연락처', '부모님 연락처', '']

const UserList = () => {
  const [grades, setGrades] = useState<Grade[]>([])
  const [branches, setBranches] = useState<Branch[]>([])

  const getGradeData = async () => {
    const res = await fetch(`/api/user/grade/getUserGradeAll`)
    const data = await res.json()
    setGrades(data)
  }

  const getBranchData = async () => {
    const res = await fetch(`/api/branch/getBranchAll`)
    const data = await res.json()
    setBranches(data)
  }

  // 필터
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [branch, setBranch] = useState<number>(0)
  const [grade, setGrade] = useState<number>(0)

  // 유저 리스트
  const [users, setUsers] = useState<UserNoPw[]>()
  const [showUsers, setShowUsers] = useState<UserNoPw[]>()

  const getUserData = async () => {
    const res = await fetch(`/api/user/getUserAll`)
    const data = await res.json()
    setUsers(data)
    setShowUsers(data)
  }

  useEffect(() => {
    getUserData()
    getGradeData()
    getBranchData()
  }, [])

  const filterUsers = () => {
    setShowUsers(
      users?.filter(
        user =>
          user.user_id.includes(name) &&
          ((user.user_phone ?? '').includes(phone) ||
            user.user_parent_phone?.includes(phone)) &&
          user.branch_id === (branch || user.branch_id) &&
          user.grade_id === (grade || user.grade_id),
      ),
    )
  }

  useEffect(() => {
    filterUsers()
  }, [name, phone, branch, grade])

  return (
    <UserListContainer>
      <ContentBoxCellContentContainer>
        <UserListSelectorTitle>
          필터, {showUsers?.length} 명
        </UserListSelectorTitle>
        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>이름 검색</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
              label="계정"
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>

        <ContentBoxCellContentWrapper>
          <ContentBoxCellContentTitle>연락처 검색</ContentBoxCellContentTitle>
          <ContentBoxCellContent>
            <Input
              value={phone}
              onChange={e => {
                setPhone(e.target.value)
              }}
              label="전화번호"
              crossOrigin={undefined}
            />
          </ContentBoxCellContent>
        </ContentBoxCellContentWrapper>

        <UserListSelectorContainer>
          <Select
            label="등록 지점"
            onChange={(e: any) => {
              setBranch(Number(e))
            }}
          >
            {branches?.map(branch => (
              <Option
                key={branch.branch_id}
                value={branch.branch_id.toString()}
              >
                {branch.branch_name}
              </Option>
            ))}
          </Select>
          <Select
            label="등급"
            onChange={(e: any) => {
              setGrade(Number(e))
            }}
          >
            {grades?.map(grade => (
              <Option key={grade.grade_id} value={grade.grade_id.toString()}>
                {grade.grade_name}
              </Option>
            ))}
          </Select>
        </UserListSelectorContainer>
        <Button
          color="red"
          fullWidth
          onClick={() => {
            setName('')
            setPhone('')
            setBranch(0)
            setGrade(0)
          }}
        >
          필터 초기화
        </Button>
      </ContentBoxCellContentContainer>

      <Card className="h-full w-full overflow-scroll mt-10">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(head => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {showUsers?.map((user, index) => {
              const isLast = index === users.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'
              const gradeName = grades.find(
                g => g.grade_id === user.grade_id,
              )?.grade_name
              const branchName = branches.find(
                b => b.branch_id === user.branch_id,
              )?.branch_name

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.user_id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {gradeName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branchName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.user_phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.user_parent_phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </UserListContainer>
  )
}

export default UserList
