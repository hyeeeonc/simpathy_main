'use client'

import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled, { css } from 'styled-components'
import {
  ContentBoxCellContainer,
  ContentBoxCellTitle,
  ContentBoxCellContentContainer,
  ContentBoxCellContentWrapper,
  ContentBoxCellContentTitle,
  ContentBoxCellContent,
} from '@/components/ContentBox'
import { HeaderButtons } from '@/components/Buttons'
import * as XLSX from 'xlsx-js-style'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

type Branch = {
  branch_id: number
  branch_name: string
}

type User = {
  user_id: string
  user_name: string
  user_phone?: string
  user_parent_phone?: string
  branch_id: number
  grade_id: number
}

type AttendStatus = 'O' | 'O_VIDEO' | 'O_OTHER_BRANCH' | 'X'

const ATTEND_LABELS: Record<AttendStatus, string> = {
  O: 'O',
  O_VIDEO: 'O(영상)',
  O_OTHER_BRANCH: 'O(타지점)',
  X: 'X',
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td {
    border: 1px solid #e5e7eb;
    padding: 6px 8px;
    text-align: center;
  }
  th {
    background: #f1f5f9;
    font-weight: bold;
  }
`

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  margin-top: 10px;
`

const AttendDashboardSummaryBox = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(56, 63, 70, 0.06);
  padding: 28px 24px 20px 24px;
  margin-top: 16px;
  font-size: 14px;
  color: #222;
`

const AttendDashboardSummaryRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const AttendDashboardSummaryLabel = styled.div`
  min-width: 110px;
  font-size: 14px;
  margin-right: 8px;
`

const AttendDashboardSummaryValue = styled.div`
  font-size: 15px;
  color: #222;
  font-weight: 500;
  white-space: pre-line;
`

const AttendDashboardSummarySection = styled.div`
  margin-top: 18px;
  margin-bottom: 8px;
  border-top: 1px solid #e5e7eb;
  padding-top: 10px;
`

const AttendDashboardTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  margin-bottom: 18px;
  border-radius: 10px;
  border: 1.5px solid #e5e7eb;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  background: #f9fafb;
  box-sizing: border-box;
  resize: vertical;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #7dd3fc;
    outline: none;
    background: #fff;
  }
  &::placeholder {
    color: #b0b0b0;
    font-size: 13px;
  }
`

const AttendDashboardTableContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  margin-top: 18px;
  border: 2px solid #bfc7d1;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(56, 63, 70, 0.04);
  padding: 12px 0 12px 0;
`

function DashBoard() {
  const moment = require('moment')
  const [value, onChange] = useState<Value>(new Date())
  const [branches, setBranches] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [attend, setAttend] = useState<Record<string, AttendStatus>>({})
  const [note, setNote] = useState<Record<string, string>>({})
  const [refund, setRefund] = useState<number>(0)
  const [newcomer, setNewcomer] = useState<number>(0)
  const [reRegister, setReRegister] = useState<number>(0)
  const [summaryMemo, setSummaryMemo] = useState<string>('')
  const [branchMove, setBranchMove] = useState<string>('')
  const [branchMoveCount, setBranchMoveCount] = useState<number>(0)
  const [newStudent, setNewStudent] = useState<string>('')
  const [absentStudent, setAbsentStudent] = useState<string>('')
  const [refundStudent, setRefundStudent] = useState<string>('')
  const [specialNote, setSpecialNote] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<AttendStatus | 'ALL'>('ALL')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchType, setSearchType] = useState<'name' | 'phone'>('name')

  // 요약 계산
  const presentCount = Object.values(attend).filter(v => v === 'O').length
  const absentCount = Object.values(attend).filter(v => v !== 'O').length
  const totalCount = presentCount + absentCount

  // 보강 영상/타지점 명단 자동 집계
  const videoOList = users.filter(u => attend[u.user_id] === 'O_VIDEO').map(u => u.user_name)
  const videoXList = users.filter(u => attend[u.user_id] === 'X').map(u => u.user_name)
  const otherBranchList = users.filter(u => attend[u.user_id] === 'O_OTHER_BRANCH').map(u => u.user_name)

  // 입력된 정보가 하나라도 있는지 체크
  const hasAnyInput =
    Object.keys(attend).length > 0 ||
    Object.keys(note).length > 0 ||
    refund > 0 ||
    newcomer > 0 ||
    branchMove ||
    newStudent ||
    absentStudent ||
    refundStudent ||
    specialNote

  // 지점 리스트 불러오기
  useEffect(() => {
    fetch('/api/branch/getBranchAll')
      .then(res => res.json())
      .then(data => setBranches(data))
  }, [])

  // 지점 선택 시 학생 리스트 불러오기 및 출석 디폴트 O로 세팅
  useEffect(() => {
    if (selectedBranch) {
      fetch(`/api/user/getUserAll`)
        .then(res => res.json())
        .then(data => {
          // branch_id와 grade_id(3, 4)만 필터링
          const filtered = data.filter(
            (u: User) => u.branch_id === selectedBranch && (u.grade_id === 3 || u.grade_id === 4)
          )
          setUsers(filtered)
          // 출석 디폴트 O로 세팅
          const defaultAttend: Record<string, AttendStatus> = {}
          filtered.forEach((u: User) => { defaultAttend[u.user_id] = 'O' })
          setAttend(defaultAttend)
          setNote({})
        })
    } else {
      setUsers([])
      setAttend({})
      setNote({})
    }
  }, [selectedBranch])

  // 출석 상태 변경
  const handleAttendChange = (user_id: string, status: AttendStatus) => {
    setAttend(prev => ({ ...prev, [user_id]: status }))
  }

  // 비고 변경
  const handleNoteChange = (user_id: string, value: string) => {
    setNote(prev => ({ ...prev, [user_id]: value }))
  }

  // 제출 (mock API)
  const handleSubmit = async () => {
    if (users.some(u => !attend[u.user_id])) {
      alert('모든 학생의 출석 상태를 선택해주세요.')
      return
    }
    const res = await fetch('/api/attend/mockSubmit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        branch_id: selectedBranch,
        date: moment(value).format('YYYY-MM-DD'),
        attendances: users.map(u => ({
          user_id: u.user_id,
          status: attend[u.user_id],
          note: note[u.user_id] || ''
        })),
        refund,
        newcomer
      })
    })
    if (res.ok) alert('제출 완료!')
    else alert('제출 실패')
  }

  // 날짜 변경 핸들러
  const handleCalendarChange = (date: Value) => {
    if (hasAnyInput) {
      if (!window.confirm('모든 내용이 삭제됩니다. 계속하시겠습니까?')) return
    }
    onChange(date)
    setAttend({})
    setNote({})
    setBranchMove('')
    setNewStudent('')
    setAbsentStudent('')
    setRefundStudent('')
    setSpecialNote('')
    setRefund(0)
    setNewcomer(0)
    setSelectedBranch(null)
    setUsers([])
  }

  // 지점 변경 핸들러
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (hasAnyInput) {
      if (!window.confirm('모든 내용이 삭제됩니다. 계속하시겠습니까?')) return
    }
    setSelectedBranch(Number(e.target.value))
    // 나머지 값 초기화
    setAttend({})
    setNote({})
    setBranchMove('')
    setNewStudent('')
    setAbsentStudent('')
    setRefundStudent('')
    setSpecialNote('')
    setRefund(0)
    setNewcomer(0)
    setUsers([])
  }

  // 필터링된 학생 리스트 계산
  const filteredUsers = users.filter(user => {
    // 출석상태 필터링
    const statusMatch = statusFilter === 'ALL' ? true : attend[user.user_id] === statusFilter
    
    // 검색어 필터링
    const searchMatch = searchTerm === '' ? true : 
      searchType === 'name' 
        ? user.user_name.includes(searchTerm)
        : (user.user_phone || '').includes(searchTerm) || (user.user_parent_phone || '').includes(searchTerm)
    
    return statusMatch && searchMatch
  })

  // 날짜를 "5월 17일" 형식으로 변환
  const getMonthDay = (date: Date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }

  // 엑셀 다운로드 함수
  const handleExcelDownload = () => {
    const dateStr = getMonthDay(value as Date)
    // wsData 생성 및 줄 수 추적
    const wsData = [['이름', dateStr]]
    const rowIndexes: number[] = [] // 각 유저의 실제 시작 row
    let currentRow = 2
    filteredUsers.forEach(user => {
      const name = user.user_name
      const status = ATTEND_LABELS[attend[user.user_id] || 'O']
      wsData.push([name, status])
      rowIndexes.push(currentRow)
      // status에 줄바꿈이 있으면 줄 수만큼 row 증가
      const lineCount = (status.match(/\n/g) || []).length + 1
      currentRow += lineCount
    })
    const ws = XLSX.utils.aoa_to_sheet(wsData)

    // 스타일 적용: 정확한 row 인덱스 사용
    filteredUsers.forEach((user, idx) => {
      const status = ATTEND_LABELS[attend[user.user_id] || 'O']
      const cellRef = `B${rowIndexes[idx]}`
      if (ws[cellRef]) {
        if (status === 'O(영상)' || status === 'O(타지점)') {
          ws[cellRef].s = {
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: { fgColor: { rgb: 'C6EFCE' } },
            font: { color: { rgb: '006100' }, bold: false }
          }
        } else if (status === 'X') {
          ws[cellRef].s = {
            alignment: { horizontal: 'center', vertical: 'center' },
            fill: { fgColor: { rgb: 'FFC7CE' } },
            font: { color: { rgb: '9C0006' }, bold: false }
          }
        } else {
          ws[cellRef].s = {
            alignment: { horizontal: 'center', vertical: 'center' },
            font: { color: { rgb: '000000' }, bold: false }
          }
        }
      }
    })

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '출석명단')
    XLSX.writeFile(wb, `출석명단_${dateStr}.xlsx`)
  }

  return (
    <div
      style={{
        width: 1100,
        display: 'flex',
        gap: 28,
        margin: '0 auto'
      }}
    >
      {/* 왼쪽: 달력 + 요약 */}
      <div style={{ width: 400 }}>
        <Calendar
          onChange={handleCalendarChange}
          formatDay={(locale, date) => moment(date).format('D')}
          value={value}
          className="text-sm"
        />
        <div className="text-gray-500 mt-4 mb-4" style={{ fontSize: 13 }}>
          {moment(value).format('YYYY년 MM월 DD일')}
        </div>
        <AttendDashboardSummaryBox>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>총원 : {totalCount}명</AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>결석 : {absentCount}명 </AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>출석 : {presentCount}명 </AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>신규 : {newcomer}명 </AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>환불 : {refund}명 </AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>
          <AttendDashboardSummaryRow>
            <AttendDashboardSummaryLabel>재등록 : {reRegister}명 </AttendDashboardSummaryLabel>
          </AttendDashboardSummaryRow>

          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>지점 이동 - {branchMoveCount}명</AttendDashboardSummaryLabel>
            <br />
            <AttendDashboardSummaryValue>
              {branchMove || '-'}
            </AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[신규생] - {newcomer}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{newStudent || '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[결석생] - {absentCount}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{absentStudent || '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[보강 영상 수강 O] - {videoOList.length}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{videoOList.length > 0 ? videoOList.join(', ') : '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[보강 영상 수강 X] - {videoXList.length}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{videoXList.length > 0 ? videoXList.join(', ') : '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[타지점 보강] - {otherBranchList.length}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{otherBranchList.length > 0 ? otherBranchList.join(', ') : '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[환불생] - {refund}명</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>{refundStudent || '-'}</AttendDashboardSummaryValue>
          </AttendDashboardSummarySection> <br />
          <AttendDashboardSummarySection>
            <AttendDashboardSummaryLabel>[특이사항]</AttendDashboardSummaryLabel>
            <AttendDashboardSummaryValue>
              {specialNote || '-'}
            </AttendDashboardSummaryValue>
          </AttendDashboardSummarySection>
        </AttendDashboardSummaryBox>
      </div>

      {/* 오른쪽: 날짜+지점 모두 선택 시에만 표시 */}
      <div style={{ flex: 1 }}>
        {/* 지점 선택 */}
        <div className="mb-4">
          <select
            value={selectedBranch ?? ''}
            onChange={handleBranchChange}
            style={{ height: 36, fontSize: 15, borderRadius: 6, border: '1px solid #e5e7eb', padding: '0 10px' }}
          >
            <option value="">지점(학원) 선택</option>
            {branches.map(b => (
              <option key={b.branch_id} value={b.branch_id}>{b.branch_name}</option>
            ))}
          </select>
        </div>

        {/* 날짜와 지점이 모두 선택된 경우에만 나머지 메뉴 표시 */}
        {selectedBranch && value && (
          <>
            {/* 환불/신규/재등록/지점이동 입력 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div>
                <label>환불: </label>
                <input
                  type="number"
                  min={0}
                  value={refund}
                  onChange={e => setRefund(Number(e.target.value))}
                  style={{ width: 60, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                />
              </div>
              <div>
                <label>신규: </label>
                <input
                  type="number"
                  min={0}
                  value={newcomer}
                  onChange={e => setNewcomer(Number(e.target.value))}
                  style={{ width: 60, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                />
              </div>
              <div>
                <label>재등록: </label>
                <input
                  type="number"
                  min={0}
                  value={reRegister}
                  onChange={e => setReRegister(Number(e.target.value))}
                  style={{ width: 60, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                />
              </div>
              <div>
                <label>지점 이동: </label>
                <input
                  type="number"
                  min={0}
                  value={branchMoveCount}
                  onChange={e => setBranchMoveCount(Number(e.target.value))}
                  style={{ width: 60, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                />
              </div>
            </div>

            {/* 필터 + 검색 영역 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
              <div>
                <label>출석상태: </label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as AttendStatus | 'ALL')}
                  style={{ 
                    height: 36, 
                    fontSize: 15, 
                    borderRadius: 6, 
                    border: '1px solid #e5e7eb', 
                    padding: '0 10px',
                    marginLeft: 8
                  }}
                >
                  <option value="ALL">전체</option>
                  <option value="O">O</option>
                  <option value="O_VIDEO">O(영상)</option>
                  <option value="O_OTHER_BRANCH">O(타지점)</option>
                  <option value="X">X</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select
                  value={searchType}
                  onChange={e => setSearchType(e.target.value as 'name' | 'phone')}
                  style={{ 
                    height: 36, 
                    fontSize: 15, 
                    borderRadius: 6, 
                    border: '1px solid #e5e7eb', 
                    padding: '0 10px'
                  }}
                >
                  <option value="name">이름</option>
                  <option value="phone">휴대폰</option>
                </select>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder={searchType === 'name' ? "이름으로 검색" : "휴대폰으로 검색"}
                  style={{ 
                    height: 36, 
                    fontSize: 15, 
                    borderRadius: 6, 
                    border: '1px solid #e5e7eb', 
                    padding: '0 10px',
                    width: 200
                  }}
                />
              </div>
            </div>

            {/* 엑셀 다운로드 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button
                onClick={handleExcelDownload}
                style={{
                  background: '#4f8cff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontSize: 15,
                  cursor: 'pointer'
                }}
              >
                엑셀 다운로드
              </button>
            </div>

            {/* 학생 리스트 */}
            <AttendDashboardTableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>휴대폰</th>
                    <th>부모님휴대폰</th>
                    <th>출석상태</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, idx) => (
                    <tr key={u.user_id}>
                      <td>{idx + 1}</td>
                      <td>{u.user_name}</td>
                      <td>{u.user_phone || '-'}</td>
                      <td>{u.user_parent_phone || '-'}</td>
                      <td>
                        <select
                          value={attend[u.user_id] || 'O'}
                          onChange={e => handleAttendChange(u.user_id, e.target.value as AttendStatus)}
                          style={{ width: 100, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                        >
                          <option value="O">O</option>
                          <option value="O_VIDEO">O(영상)</option>
                          <option value="O_OTHER_BRANCH">O(타지점)</option>
                          <option value="X">X</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={note[u.user_id] || ''}
                          onChange={e => handleNoteChange(u.user_id, e.target.value)}
                          style={{ width: 120, borderRadius: 6, border: '1px solid #e5e7eb', padding: '2px 6px' }}
                          maxLength={30}
                          placeholder="비고"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </AttendDashboardTableContainer>

            {/* 세분화 textarea */}
            <div style={{ marginTop: 28 }}>
              <AttendDashboardSummaryLabel>[지점이동] - {branchMoveCount}명</AttendDashboardSummaryLabel>
              <AttendDashboardTextarea
                value={branchMove}
                onChange={e => setBranchMove(e.target.value)}
                placeholder="지점 이동 내역을 입력하세요"
              />
              <AttendDashboardSummaryLabel>[신규생] - {newcomer}명</AttendDashboardSummaryLabel>
              <AttendDashboardTextarea
                value={newStudent}
                onChange={e => setNewStudent(e.target.value)}
                placeholder="신규생 내역을 입력하세요"
              />
              <AttendDashboardSummaryLabel>[결석생] - {absentCount}명</AttendDashboardSummaryLabel>
              <AttendDashboardTextarea
                value={absentStudent}
                onChange={e => setAbsentStudent(e.target.value)}
                placeholder="결석생 내역을 입력하세요"
              />
              <AttendDashboardSummaryLabel>[환불생] - {refund}명</AttendDashboardSummaryLabel>
              <AttendDashboardTextarea
                value={refundStudent}
                onChange={e => setRefundStudent(e.target.value)}
                placeholder="환불생 내역을 입력하세요"
              />
              <AttendDashboardSummaryLabel>[특이사항]</AttendDashboardSummaryLabel>
              <AttendDashboardTextarea
                value={specialNote}
                onChange={e => setSpecialNote(e.target.value)}
                placeholder="특이사항을 입력하세요"
                style={{ height: 500 }}
              />
            </div>

            {/* 제출 버튼 */}
            {selectedBranch && (
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <HeaderButtons as="button" onClick={handleSubmit}>
                  제출
                </HeaderButtons>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashBoard
