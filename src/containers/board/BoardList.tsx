'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from '@material-tailwind/react'

const TABLE_HEAD = ['제목', '작성자', '게시일', '조회수']

const TABLE_ROWS = [
  {
    name: '[필독] 영상을 무단으로 다운로드, 공유를 하는 행위는 불법입니다.',
    author: '심찬우',
    date: 'Wed 3:00pm',
    view: '184',
  },
  {
    name: '[필독] 카페 활용 체크리스트',
    author: '심찬우',
    date: 'Wed 1:00pm',
    view: '123',
  },
  {
    name: '[2024] 6월 모의평가 해설',
    author: '심찬우',
    date: 'Mon 7:40pm',
    view: '12512',
  },
  {
    name: '[공지] 단과 수업 결석생 보강 규정 안내',
    author: '심찬우',
    date: 'Wed 5:00pm',
    view: '132',
  },
  {
    name: '[공지] 닉네임 설정과 등업',
    author: '심찬우',
    date: 'Wed 3:30am',
    view: '12',
  },
  {
    name: '[필독] 영상을 무단으로 다운로드, 공유를 하는 행위는 불법입니다.',
    author: '심찬우',
    date: 'Wed 3:00pm',
    view: '184',
  },
  {
    name: '[필독] 카페 활용 체크리스트',
    author: '심찬우',
    date: 'Wed 1:00pm',
    view: '123',
  },
  {
    name: '[2024] 6월 모의평가 해설',
    author: '심찬우',
    date: 'Mon 7:40pm',
    view: '12512',
  },
  {
    name: '[공지] 단과 수업 결석생 보강 규정 안내',
    author: '심찬우',
    date: 'Wed 5:00pm',
    view: '132',
  },
  {
    name: '[공지] 닉네임 설정과 등업',
    author: '심찬우',
    date: 'Wed 3:30am',
    view: '12',
  },
]

export function TransactionsTable() {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              className="text-3xl font-bold"
              variant="h5"
              color="blue-gray"
            >
              공지사항
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                crossOrigin={false}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> 검색
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(head => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            {TABLE_ROWS.map(({ name, author, date, view }, index) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {author}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {view}
                    </Typography>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}
