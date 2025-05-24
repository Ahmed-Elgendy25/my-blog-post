import Image from "next/image"
import author1 from '/public/authors/rehab_v3.jpg'
import AuthorStyle from './_styles/Author.module.css'

function AuthorGrid() {
  return (
    <section className='grid grid-cols-12 grid-rows-3 '>
        <div className='md:col-span-6 col-span-12 border-1 border-[#222222]  px-3 py-8'>
            <div className="flex items-center  gap-x-5 p-3">
            <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />
                <div className="bg-amber-500">
                <h3 className={`${AuthorStyle.authorName} font-bold text-[#222222] `}>AHMED EL-GENDY</h3>
                </div>
            </div>
        </div>
        <div className='md:col-span-6 col-span-12   border-1 border-l-0 border-[#222222]  px-3 py-8'>
        <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />

        </div>

        <div className='md:col-span-6 col-span-12 border-r-1 border-l-1 border-[#222222]  px-3 py-8'>
        <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />

        </div>
      
        <div className='md:col-span-6 col-span-12 border-r-1  border-[#222222]  px-3 py-8'>
        <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />

        </div>

        <div className='md:col-span-6 col-span-12 border-1 border-[#222222]  px-3 py-8'>
        <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />

        </div>
        <div className='md:col-span-6 col-span-12 border-1 border-l-0 border-[#222222]  px-3 py-8'>
        <Image src={author1} alt='author1' width={150} height={500} className="  object-cover rounded-[50%]" />

        </div>



    </section>
  )
}

export default AuthorGrid