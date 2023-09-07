'use client'

import styled from 'styled-components'

const AdminMainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

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

const AdminMain = () => {
  return (
    <AdminMainContainer>
      <AdminMainItems>회원 등록 관리</AdminMainItems>
      <AdminMainItems>회원 등록 관리</AdminMainItems>
      <AdminMainItems>회원 등록 관리</AdminMainItems>
      <AdminMainItems>회원 등록 관리</AdminMainItems>
    </AdminMainContainer>
  )
}

export default AdminMain
