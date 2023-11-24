'use client'

import React, { useCallback, useEffect } from 'react'
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

export function NavBar() {
  const [open, setOpen] = React.useState(false)
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
        className="overflow-y-hidden fixed"
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
          <Link href={'/board/1'}>
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </ListItemPrefix>
              공지사항
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default NavBar
