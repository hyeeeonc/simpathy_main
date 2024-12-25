'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

const MainModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainModalContent = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  max-height: 80%; /* 길어질 경우 제한 */
  overflow-y: auto; /* 스크롤 활성화 */

  @media (max-width: 767px) {
    width: 90%;
    padding: 15px 5px;
  }
`

interface MainModalProps {
  modal: any
}

const MainModal = ({ modal }: MainModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // console.log(modal)

  useEffect(() => {
    // modal_endtime이 존재하는지 확인하고, 현재 시간이 그 이하일 때만 모달을 노출
    const currentDateTime = new Date()
    const modalEndTime = new Date(modal.modal_endtime)
    console.log('mod', modalEndTime)
    console.log('cur', currentDateTime)

    if (modalEndTime >= currentDateTime) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [modal.modal_endtime])

  return (
    <MainModalContainer
      onClick={() => {
        setIsOpen(false)
      }}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <MainModalContent
        onClick={e => {
          e.stopPropagation() // 클릭 이벤트 전파 방지
        }}
      >
        <div
          className="border-solid border-b-gray-300 py-[20px] view ql-editor"
          dangerouslySetInnerHTML={{ __html: modal.modal_contents }}
        />
      </MainModalContent>
    </MainModalContainer>
  )
}

export default MainModal
