import WysiwygEditor from '@/containers/editor/WysiwygEditor'

const Editor = () => {
  return (
    <div>
      <div className="w-full text-3xl font-bold mt-20">
        글 쓰기
        <WysiwygEditor />
      </div>
    </div>
  )
}

export default Editor
