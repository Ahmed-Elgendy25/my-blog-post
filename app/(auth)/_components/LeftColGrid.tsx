import React from 'react'

function LeftColGrid( {children}: {children: React.ReactNode}) {
  return (
    <section className="md:col-start-1 md:col-end-6 col-start-1 col-end-13 min-h-screen bg-red-200  ">
        {children}
    </section>
  )
}

export default LeftColGrid