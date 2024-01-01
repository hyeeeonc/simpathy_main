'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react'
import { styled } from 'styled-components'
import Link from 'next/link'
import { Board, Category } from '@/types/board'

const NavButtonFixer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: calc(64px - 14px);
  left: calc((100vw - 1100px) / 2 + 1100px - 28px);
  z-index: 999;

  cursor: pointer;

  @media (max-width: 1159px) {
    left: calc(100vw - 30px - 28px);
  }

  @media (max-width: 767px) {
    left: calc(100vw - 20px - 28px);
  }
`

const NavCommonBoardConatiner = styled.div`
  margin: 30px 0;
`

const NavCategoryContainer = styled.div`
  height: 60px;
  line-height: 60px;

  padding-left: 10px;

  font-weight: bold;

  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;

  @media (max-width: 767px) {
    height: 50px;
    line-height: 50px;
    font-size: 0.8rem;
  }
`

const NavBoardContainer = styled.div`
  display: flex;
  align-items: center;

  height: 50px;

  padding-left: 10px;

  svg {
    margin: 0 5px;
  }

  @media (max-width: 767px) {
    height: 45px;
    font-size: 0.8rem;
  }
`

const NavBoardName = styled.p`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export function NavBar() {
  const [open, setOpen] = React.useState(false)
  const [categories, setCategories] = useState<Category[]>()
  const [boards, setBoards] = useState<Board[]>()
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow')
  }, [])

  useEffect(() => {
    if (open) {
      lockScroll()
    } else {
      openScroll()
    }
  }, [open])

  const getCategoryData = async () => {
    const res = await fetch(`/api/board/getCategory`, { cache: 'no-store' })
    const data = await res.json()
    data.sort((a: Category, b: Category) => a.category_order - b.category_order)

    setCategories(data)
  }

  const getBoardData = async () => {
    const res = await fetch(`/api/board/getBoard`, { cache: 'no-store' })
    const data = await res.json()
    data.sort((a: Board, b: Board) => {
      if (a.category_id === b.category_id) {
        return a.board_order - b.board_order
      }
      return a.category_id - b.category_id
    })
    setBoards(data)
  }

  useEffect(() => {
    getCategoryData()
    getBoardData()
  }, [])

  return (
    <React.Fragment>
      <NavButtonFixer onClick={openDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="28px"
          height="28px"
        >
          <path d="M 6 9 A 2.0002 2.0002 0 1 0 6 13 L 42 13 A 2.0002 2.0002 0 1 0 42 9 L 6 9 z M 6 22 A 2.0002 2.0002 0 1 0 6 26 L 42 26 A 2.0002 2.0002 0 1 0 42 22 L 6 22 z M 6 35 A 2.0002 2.0002 0 1 0 6 39 L 42 39 A 2.0002 2.0002 0 1 0 42 35 L 6 35 z" />
        </svg>
      </NavButtonFixer>
      <Drawer
        className="overflow-y-scroll fixed"
        placement="right"
        open={open}
        onClose={closeDrawer}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <Link href={'/editor'}>
            <ListItem onClick={closeDrawer}>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </ListItemPrefix>
              글 쓰기
            </ListItem>
          </Link>

          <Link href={'/consulting'}>
            <ListItem onClick={closeDrawer}>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </ListItemPrefix>
              상담 신청
            </ListItem>
          </Link>

          {/* <Link href={'/qna'}>
            <ListItem onClick={closeDrawer}>
              <ListItemPrefix>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.053 17c.466 0 .844-.378.844-.845 0-.466-.378-.844-.844-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.468-2.822h-.998c-.035-1.162.182-2.054.939-2.943.491-.57 1.607-1.479 1.945-2.058.722-1.229.077-3.177-2.271-3.177-1.439 0-2.615.877-2.928 2.507l-1.018-.102c.28-2.236 1.958-3.405 3.922-3.405 1.964 0 3.615 1.25 3.615 3.22 0 1.806-1.826 2.782-2.638 3.868-.422.563-.555 1.377-.568 2.09z" />
                </svg>
              </ListItemPrefix>
              질문 게시판
            </ListItem>
          </Link> */}

          <Link href={'/board'}>
            <ListItem onClick={closeDrawer}>
              <ListItemPrefix>
                <svg
                  style={{ opacity: 0.62 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm3-6h-19v19h-1v-20h20v1zm-2-2h-19v19h-1v-20h20v1z" />
                </svg>
              </ListItemPrefix>
              전체 게시글
            </ListItem>
          </Link>

          <Link href={'/board/branch'}>
            <ListItem onClick={closeDrawer}>
              <ListItemPrefix>
                <svg
                  style={{ opacity: 0.62 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 3c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.323.861 2.433 2.05 2.832.168 4.295-2.021 4.764-4.998 5.391-1.709.36-3.642.775-5.052 2.085v-7.492c1.163-.413 2-1.511 2-2.816 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.305.837 2.403 2 2.816v12.367c-1.163.414-2 1.512-2 2.817 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.295-.824-2.388-1.973-2.808.27-3.922 2.57-4.408 5.437-5.012 3.038-.64 6.774-1.442 6.579-7.377 1.141-.425 1.957-1.514 1.957-2.803zm-16.8 0c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8zm3.6 18c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8zm10.2-16.2c-.993 0-1.8-.807-1.8-1.8s.807-1.8 1.8-1.8 1.8.807 1.8 1.8-.807 1.8-1.8 1.8z" />
                </svg>
              </ListItemPrefix>
              복습 영상 게시판
            </ListItem>
          </Link>

          <NavCommonBoardConatiner>
            {categories?.map((category, categoryIndex) => (
              <>
                <NavCategoryContainer key={categoryIndex}>
                  {category.category_name}
                </NavCategoryContainer>

                {boards?.map((board, boardIndex) => (
                  <div key={`${categoryIndex}-${boardIndex}`}>
                    {board.category_id === category.category_id && (
                      <NavBoardContainer>
                        ┕
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 22v-16h14v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-5.362zm16-7.614v-10.386h-18v20h8.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-4v-1h4v1zm6-4h-10v1h10v-1zm0-3h-10v1h10v-1zm1-7h-17v19h-2v-21h19v2z" />
                        </svg>
                        <Link
                          onClick={closeDrawer}
                          href={`/board/${board.board_id}`}
                        >
                          <NavBoardName>{board.board_name}</NavBoardName>
                        </Link>
                      </NavBoardContainer>
                    )}
                  </div>
                ))}
              </>
            ))}
          </NavCommonBoardConatiner>
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default NavBar
