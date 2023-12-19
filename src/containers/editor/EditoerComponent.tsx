'use client'

import QuillNoSSRWrapper from './WysiwygEditor'
import ReactQuill from 'react-quill'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const StyledVideo = styled.div`
  iframe {
    width: 100%;
    height: calc(1068px / 16 * 9);
  }

  @media (max-width: 1159px) {
    iframe {
      height: calc((100vw - 93px) * 9 / 16);
    }
  }

  @media (max-width: 767px) {
    iframe {
      height: calc((100vw - 73px) * 9 / 16);
    }
  }
`

const EditorComponent = () => {
  const quillInstance = useRef<ReactQuill>(null)
  const [contents, setContents] = useState('')
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ['link', 'image', 'video'],
    ],
  }

  return (
    <StyledVideo>
      <QuillNoSSRWrapper
        forwardedRef={quillInstance}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </StyledVideo>
  )
}

export default EditorComponent
