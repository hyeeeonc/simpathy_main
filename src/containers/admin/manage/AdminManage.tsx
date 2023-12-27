'use client'

import styled from 'styled-components'
import BoardManage from './BoardManage'

const AdminMainContainer = styled.div``

const AdminManage = () => {
  return (
    <AdminMainContainer>
      <BoardManage />
      {/* <UserManage /> */}
    </AdminMainContainer>
  )
}

export default AdminManage
