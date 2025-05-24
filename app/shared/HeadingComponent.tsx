import React from 'react'
import style from './_styles/shared.module.css'
function HeadingComponent({title,children,headingStyle,overrideStyle,overrideInlineStyle,inlineStyle}: {title: string, children?: React.ReactNode, headingStyle?: string, overrideStyle?: boolean, overrideInlineStyle?: boolean, inlineStyle?: React.CSSProperties}) {
  const defaultStyle = ` ${style.dmSans} font-bold p-5 text-[#222222]`
  const defaultInlineStyle: React.CSSProperties = {fontSize:'4.5vmax'}
  let styledComponent = defaultStyle;
  let inlineStyledComponent: React.CSSProperties = defaultInlineStyle;

  if (headingStyle) {
    styledComponent = overrideStyle ? `${defaultStyle} ${headingStyle}` : headingStyle;
  }
 if (inlineStyle) {
    inlineStyledComponent = overrideInlineStyle
        ? {
            ...defaultInlineStyle,
            ...inlineStyle
        }
        : inlineStyle;
  }
  return (
    <>
    <h1 className={styledComponent} style={inlineStyledComponent} >{title}</h1>
    {children}
    </>
  )
    
}

export default HeadingComponent