
function Preview({ content }: { content: string }) {
  return (
    <div className="h-full ">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Preview