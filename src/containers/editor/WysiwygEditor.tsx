'use client'

import dynamic from 'next/dynamic'
import { Spinner } from '@material-tailwind/react'

import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill')
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    )
    return Quill
  },
  {
    loading: () => (
      <div className="flex justify-center h-96">
        <Spinner className="h-12 w-12" />
      </div>
    ),
    ssr: false,
  },
)

export default QuillNoSSRWrapper
