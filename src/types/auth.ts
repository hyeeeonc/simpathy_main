//api/signup

export interface SignupRequest {
  user_id: string
  user_pw: string
  user_name: string
  user_phone?: string
  user_parent_phone?: string
  grade_id: number
  branch_id: number
}

export interface SigninRequest {
  user_id: string
  user_pw: string
}

export interface User {
  user_id: string
  user_pw: string
  user_name: string
  user_phone?: string
  user_parent_phone?: string
  grade_id: number
  branch_id: number
}
