'use client'

import styled from 'styled-components'

const FileListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 20px;
`

const FileListTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const FileList = ({ files }: { files: any[] }) => {
  return (
    <FileListContainer>
      <FileListTitle>첨부파일</FileListTitle>
      {files.map((file, index) => (
        <a href={file.file_addr} key={index}>
          {file.file_name}
        </a>
      ))}
    </FileListContainer>
  )
}

export default FileList
