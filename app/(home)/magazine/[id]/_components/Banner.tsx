import Image from 'next/image'
function Banner({banner}: {banner: string}) {
  return (
    <div className="col-span-12 relative  w-auto h-[50rem] ">
                        
    <Image src={banner} alt="Mr.Robot" fill objectFit="cover " className="mx-auto l" />

    </div>
  )
}

export default Banner