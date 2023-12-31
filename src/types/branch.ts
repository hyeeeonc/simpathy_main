export interface Branch {
  branch_id: number
  branch_name: string
  branch_textbook: string
  branch_textbook_total: number | undefined
  branch_textbook_now: number | undefined
  branch_textbook_preview: number | undefined
  branch_text_now: string
  branch_text_preview: string
}
