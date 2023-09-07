'use client'
import { signIn, signOut } from 'next-auth/react'
import { HeaderButtons } from '@/components/Buttons'
import React from 'react'

export function SignInButton() {
  return <HeaderButtons onClick={() => signIn()}>login</HeaderButtons>
}

export function SignOutButton() {
  return <HeaderButtons onClick={() => signOut()}>logout</HeaderButtons>
}
