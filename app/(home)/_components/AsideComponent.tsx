import Image from "next/image"

function AsideComponent() {
  return (
    <aside className="lg:col-start-6 lg:col-end-8 p-3 ">
    <header className="my-6">
      <h3 className=" text-lg font-bold  ">STACK STORIES MAGAZINE</h3>
      <h2 className="text-6xl  font-bold">04/2025</h2>
    </header>

    <figure className="relative  ">
      <Image
        className="brightness-75"
        src="/90's desktop.jpg"
        width={500}
        height={250}
        alt="90's Desktop"
      />
      <figcaption className="absolute flex justify-center left-4   top-1/2 text-[#e7e8e2] ">
        <p className=" font-bold text-7xl tracking-[13]  ">
          STACK
          <span className="text-3xl block tracking-normal">
            STORIES
          </span>
        </p>
      </figcaption>
    </figure>

</aside>
  )
}

export default AsideComponent