'use client'

import { Button } from './button'

interface ReserveButtonProps {
  post_id: number
  type: 'reserve' | 'cancel'
  className?: string
  children: React.ReactNode
}

export function ReserveButton({ post_id, type, className, children }: ReserveButtonProps) {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/qna/reserve', {
        method: type === 'reserve' ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `${type === 'reserve' ? '예약' : '예약 취소'} 중 오류가 발생했습니다.`)
      }

      window.location.reload()
    } catch (error) {
      alert(error instanceof Error ? error.message : `${type === 'reserve' ? '예약' : '예약 취소'} 중 오류가 발생했습니다.`)
    }
  }

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  )
} 