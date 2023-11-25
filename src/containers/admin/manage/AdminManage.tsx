'use client'

import { useState } from 'react'
import styled from 'styled-components'
import BoardManage from './BoardManage'
import UserManage from './UserManage'

const AdminMainContainer = styled.div``

const AdminMainItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(25% - 20px);
  margin: 10px;
  height: 200px;

  border: 1px solid black;

  cursor: pointer;
`

const AdminMenuConatiner = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  border-bottom: 2px solid lightgray;
`

const AdminMenuItems = styled.div`
  color: black;
  font-size: 1rem;
  cursor: pointer;
  margin: 20px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(30 58 138);
    box-shadow: 0px 2px 0px 0px rgb(30 58 138);
  }
`

const AdminManage = () => {
  const [editSelector, setEditSelector] = useState(0)

  const editSelectorHandler = (selector: number) => {
    setEditSelector(selector)
  }

  return (
    <AdminMainContainer>
      <AdminMenuConatiner>
        <AdminMenuItems
          onClick={() => {
            editSelectorHandler(0)
          }}
        >
          게시판 관리
        </AdminMenuItems>
        <AdminMenuItems
          onClick={() => {
            editSelectorHandler(1)
          }}
        >
          수강생 관리
        </AdminMenuItems>
      </AdminMenuConatiner>

      {editSelector === 0 && <BoardManage />}
      {editSelector === 1 && <UserManage />}
    </AdminMainContainer>
  )
}

export default AdminManage
