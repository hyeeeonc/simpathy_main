'use client'

import styled from 'styled-components'

export const MyPageCellContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-top: 40px;
  padding: 20px;

  @media (max-width: 767px) {
    padding: 0;
  }
`

export const MyPageCellTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`

export const MyPageCellContentContainer = styled.div`
  width: 100%;

  padding: 20px;
  margin-top: 20px;

  border: 2px solid rgb(245, 245, 245);
  box-shadow: 0 2px 3px 0 rgba(56, 63, 70, 0.06);

  border-radius: 10px;

  @media (max-width: 767px) {
    padding: 10px;
  }
`

export const MyPageCellContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 10px 20px;
  font-weight: bold;

  margin: 5px 0;
`

export const MyPageCellContentTitle = styled.div`
  color: #797b84;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`

export const MyPageCellContent = styled.div`
  color: black;

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`
