'use client'

import styled from 'styled-components'

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 86px;
  height: 42px;
  box-sizing: border-box;

  text-decoration: none;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;

  background: rgba(238, 238, 238, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 5px;

  color: black;

  cursor: pointer;

  transition: 0.3s ease;

  &:hover {
    opacity: 0.5;
  }
`
