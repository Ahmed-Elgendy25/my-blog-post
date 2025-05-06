import React from 'react'

function SectionComponent({children,style}: {children: React.ReactNode,style?: string}) {
  return (
    <section className={`  ${style}`}>
        {children}
    </section>
  )
}

export default SectionComponent