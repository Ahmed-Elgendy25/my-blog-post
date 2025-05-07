import React from 'react'

function LeftColGrid( {children}: {children: React.ReactNode}) {
  return (
    <section className="md:col-start-1 md:col-end-6 col-start-1 col-end-13 min-h-screen   ">
        {children}
    </section>
  )
}

export default LeftColGrid