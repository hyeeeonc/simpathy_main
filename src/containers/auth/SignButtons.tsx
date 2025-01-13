'use client'
import { signIn, signOut } from 'next-auth/react'
import { HeaderButtons } from '@/components/Buttons'
import React from 'react'

export function SignInButton() {
  return <HeaderButtons onClick={() => signIn()}>로그인</HeaderButtons>
}

export function SignOutButton() {
  return <HeaderButtons onClick={() => signOut()}>로그아웃</HeaderButtons>
}
