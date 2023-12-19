import EditorComponent from '@/containers/editor/EditoerComponent'

const Editor = () => {
  return (
    <div>
      <div className="w-full text-3xl font-bold mt-20 mb-[50px]">글 쓰기</div>
      <EditorComponent />
    </div>
  )
}

export default Editor
