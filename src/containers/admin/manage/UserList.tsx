import { Grade, UserNoPw } from '@/types/auth'
import { Branch } from '@/types/branch'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline'
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Admin',
    value: 'monitored',
  },
  {
    label: 'Student',
    value: 'unmonitored',
  },
]

const TABLE_HEAD = ['이름', '등급', '지점', '연락처', '부모님 연락처', '']

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michaelㄴㅁㅇㄹㅁㄴㅇㄹㄴㅁㅇㅎㄴㅁㅇㄹㄴㅁㅇㅎㄴㅁ',
    email: 'john@creative-tim.com',
    job: 'Manager',
    org: 'Organization',
    online: true,
    date: '23/04/18',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: false,
    date: '23/04/18',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    job: 'Executive',
    org: 'Projects',
    online: false,
    date: '19/09/17',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    online: true,
    date: '24/12/08',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    email: 'richard@creative-tim.com',
    job: 'Manager',
    org: 'Executive',
    online: false,
    date: '04/10/21',
  },
]

const UserList = ({
  grades,
  branches,
}: {
  grades: Grade[] | undefined
  branches: Branch[] | undefined
}) => {
  const [users, setUsers] = useState<UserNoPw[]>()

  const getUserData = async () => {
    const res = await fetch(`/api/user/getUserAll`)
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              const isLast = index === users.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'
              return (
                <tr key={user.user_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.user_id}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.user_name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {
                          grades?.filter(
                            grade => grade.grade_id === user.grade_id,
                          )[0].grade_name
                        }
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {
                          branches?.filter(
                            branch => branch.branch_id === user.branch_id,
                          )[0].branch_name
                        }
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.user_phone}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.user_parent_phone}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UserList
