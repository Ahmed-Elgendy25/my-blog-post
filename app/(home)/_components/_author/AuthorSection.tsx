import AuthorStyle from './_styles/Author.module.css'
import AuthorGrid from './AuthorGrid'
function AuthorSection() {
  return (
    <section className='container mx-auto p-5 mb-24   border-t-1 border-[#222222]'>
        <div className='flex flex-col gap-y-3'>
            <h2 className={`${AuthorStyle.authorHeading} font-bold   text-[#222222]`} >AUTHORS</h2>
            
          
        </div>

        <AuthorGrid/>
    </section>
  )
}

export default AuthorSection