'use client'

import styled from 'styled-components'

const FileListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  flex-direction: column;
  gap: 10px;

  text-align: right;

  margin-bottom: 20px;
`

const FileListTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const FileListItems = styled.div`
  font-size: 14px;
  font-weight: 400;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const FileList = ({ files }: { files: any[] }) => {
  if (files.length === 0) return null
  return (
    <FileListContainer>
      <FileListTitle>첨부파일</FileListTitle>
      {files.map((file, index) => (
        <FileListItems>
          <a href={file.file_addr} key={index}>
            {file.file_name}
          </a>
        </FileListItems>
      ))}
    </FileListContainer>
  )
}

export default FileList
