export interface Category {
  category_id: number
  category_name: string
  category_order: number
}

export interface Board {
  board_id: number
  board_name: string
  board_read_auth: number
  board_write_auth: number
  category_id: number
  board_order: number
}
