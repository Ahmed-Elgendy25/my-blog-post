import styles from "../_styles/tiptap.module.css"

function Preview({ content }: { content: string }) {
  return (
    <div className={`h-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl p-5 ${styles.tiptap}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default Preview