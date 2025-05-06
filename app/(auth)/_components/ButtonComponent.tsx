import React from 'react'

function ButtonComponent({type,children,style}: {type: "submit" | "reset" | "button" | undefined, children: React.ReactNode,style?: string}) {
  
const defaultStyle = `bg-[#222222] min-w-full rounded-lg text-[#e7e8e2]  border-[1px] border-[#222222] p-5 cursor-pointer   hover:bg-[#e7e8e2] hover:text-[#222222] transition-all duration-300`s
  return (
    <button type={type} className={style?style :defaultStyle}>{children}</button>
)
}

export default ButtonComponent