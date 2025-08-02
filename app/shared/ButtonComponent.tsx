import React from 'react'

function ButtonComponent({type, children, style, overrideStyle, onClick ,pending}: {pending:boolean,type: "submit" | "reset" | "button" | undefined, children: React.ReactNode, style?: string, overrideStyle?: boolean, onClick?: () => void}) {
  const defaultStyle = `bg-[#222222] rounded-lg text-[#e7e8e2] border-[1px] border-[#222222] p-5 cursor-pointer hover:bg-[#e7e8e2] hover:text-[#222222] transition-all duration-300`;
  
  let buttonStyle = defaultStyle;

  if (style) {
    buttonStyle = overrideStyle ? `${defaultStyle} ${style}` : style;
  }

  return (
    <button type={type} className={buttonStyle} onClick={onClick} disabled={pending}>{children}</button>
  );
}

export default ButtonComponent;