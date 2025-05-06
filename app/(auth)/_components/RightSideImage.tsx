import React from 'react'
import Image from 'next/image'
function RightSideImage() {
  return (
   
    <Image
    
        src="/auth/7.jpg"
        alt="IDGAF"
        width={500}
        height={210}
        className=' object-cover  min-w-fit h-full'/>


  )
}

export default RightSideImage