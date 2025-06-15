import Image from 'next/image'
function Banner({banner}: {banner: string}) {
  return (
    <div className="col-span-12 ">
                        
    <Image src={banner} alt="Mr.Robot"  objectFit="cover" className="mx-auto" />

    </div>
  )
}

export default Banner