'use client'

import styled from 'styled-components'
import { SearchIcon } from '../../../../public/svgs/svgIndex'

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100vh;

  background: rgb(245, 245, 245);

  // box-shadow: 0 0 5em 0 rgba(0, 0, 0, 0.175);

  @media (max-width: 1399px) {
    display: none;
  }
`

const NavBarSearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 120px;

  background: rgb(220, 220, 220);

  margin-bottom: 80px;
`

const NavBarSearchInput = styled.input`
  width: 230px;
  height: 45px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
`

const NavBarSearchButton = styled.div`
  position: absolute;
  top: 39%;
  right: 15%;

  width: 25px;
  height: 25px;

  cursor: pointer;
`

const NavBarMenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: calc(100vh - 120px);

  padding: 20px;
`

const NavBarMenuTitle = styled.div`
  width: 80px;

  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;

  padding-bottom: 10px;

  border-bottom: 5px solid #0284c7;
`

const NavBarNavTitle = styled.div`
  width: 100%;

  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;

  padding-bottom: 3px;

  border-bottom: 1px solid gray;
`

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarSearchContainer>
        <NavBarSearchInput placeholder="검색어를 입력하세요" />
        <NavBarSearchButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 513.749 513.749"
            // style={{enable-background:new 0 0 513.749 513.749}}
            xmlSpace="preserve"
          >
            <g>
              <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" />
            </g>
          </svg>
        </NavBarSearchButton>
      </NavBarSearchContainer>

      <NavBarMenuContainer>
        <NavBarMenuTitle>menu</NavBarMenuTitle>
        {/* <NavBarNavTitle>공지사항</NavBarNavTitle>
        <h1>NavBar</h1> */}
      </NavBarMenuContainer>
    </NavBarContainer>
  )
}

export default NavBar
