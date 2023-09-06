//api/signup

export interface SignupRequest {
  email: string
  password: string
  name: string
  grade: number
  branch: number
}

export interface SigninRequest {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
  grade: number
  branch: string
  phone_number?: string
  parent_phone_number?: string
}
