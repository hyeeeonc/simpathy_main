'use client'
import { Card, Typography } from '@material-tailwind/react'
import {
  ContentBoxCellContainer,
  ContentBoxCellContentContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
} from '@/components/ContentBox'
import { styled } from 'styled-components'

const TABLE_HEAD = ['학원', '시간', '강의']

const TABLE_ROWS = [
  {
    name: '대치러셀',
    type: '단과',
    date: '월 18:30 ~ 22:00',
  },
  {
    name: '러셀기숙',
    type: '종합',
    date: '화 13:30 ~ 17:00',
  },
  {
    name: '러셀기숙',
    type: '종합',
    date: '화 18:30 ~ 22:00',
  },
  {
    name: '센텀러셀',
    type: '단과',
    date: '수 18:30 ~ 22:00',
  },
  {
    name: '분당러셀',
    type: '단과',
    date: '목 18:30 ~ 22:00',
  },
  {
    name: '목동러셀',
    type: '단과',
    date: '금 18:30 ~ 22:00',
  },
  {
    name: '대치러셀',
    type: '단과',
    date: '토 13:30 ~ 17:00',
  },
  {
    name: '강남러셀',
    type: '단과',
    date: '일 18:30 ~ 22:00',
  },
]

export function TableWithStripedColumns() {
  return (
    <ContentBoxCellContainer>
      <ContentBoxCellTitle>출강 지점</ContentBoxCellTitle>
      <ContentBoxCellContentContainer>
        <Card className="h-full w-full overflow-scroll">
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
              {TABLE_ROWS.map(({ name, type, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
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
                        {type}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </ContentBoxCellContentContainer>
    </ContentBoxCellContainer>
  )
}

export default TableWithStripedColumns
