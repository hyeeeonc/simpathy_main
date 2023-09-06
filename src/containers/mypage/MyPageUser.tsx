'use client'

import styled from 'styled-components'

const MyPageUserContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 200px;

  margin-top: 40px;
  padding: 20px;

  color: rgb(229 231 235);
`

const MyPageUserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MyPageUserNameWrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

const MyPageUserNameBold = styled.span`
  font-size: 3rem;
`

const MyPageUserSubTextWrapper = styled.div`
  font-size: 0.8rem;

  color: rgb(209 213 219);
`

const MyPageUserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 20px;
  margin-left: auto;
`

const MyPageUserContentWrapper = styled.div``

const MyPageUser = ({
  name,
  email,
  branchName,
}: {
  name: string
  email: string
  branchName: string
}) => {
  return (
    <MyPageUserContainer className="bg-sky-800">
      <MyPageUserDataContainer>
        <MyPageUserNameWrapper>
          <MyPageUserNameBold>{name}</MyPageUserNameBold>님, 반갑습니다.
        </MyPageUserNameWrapper>
        <div>
          <MyPageUserSubTextWrapper>{email}</MyPageUserSubTextWrapper>
          <MyPageUserSubTextWrapper>{branchName}</MyPageUserSubTextWrapper>
        </div>
      </MyPageUserDataContainer>

      <MyPageUserContentContainer>
        <MyPageUserContentWrapper>작성한 질문: 0개</MyPageUserContentWrapper>
        <MyPageUserContentWrapper>작성한 댓글: 0개</MyPageUserContentWrapper>
      </MyPageUserContentContainer>
    </MyPageUserContainer>
  )
}

export default MyPageUser
