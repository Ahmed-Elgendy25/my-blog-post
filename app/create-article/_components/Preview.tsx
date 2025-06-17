
function Preview({ content }: { content: string }) {
  return (
    <div className="h-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl p-5 ">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Preview