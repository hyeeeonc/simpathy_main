'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

function DashBoard() {
  const moment = require('moment')

  const [value, onChange] = useState<Value>(new Date())

  return (
    <div>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format('D')}
        value={value}
        className="text-sm"
      />
      <div className="text-gray-500 mt-4">
        {moment(value).format('YYYY년 MM월 DD일')}
      </div>
    </div>
  )
}

export default DashBoard
