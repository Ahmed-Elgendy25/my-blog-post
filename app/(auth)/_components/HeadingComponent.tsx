import React from 'react'
import style from '../_styles/page.module.css'
function HeadingComponent({title,subtitle}: {title: string, subtitle: string}) {
  return (
    <>
    <h1 className={`${style.dmSans} font-bold p-5 text-[#222222]`}style={{fontSize:'4.5vmax'}}>{title}</h1>
    <h2 className={` ${style.montserrat} p-5 bg-[#222222] font-medium    text-[#e7e8e2]`} style={{fontSize:'clamp(1.5rem,1.6vmax,10rem)'}}>{subtitle}</h2>
    </>
  )
    
}

export default HeadingComponent