import Image from "next/image";
import computer from "/public/computer.jpg";

function AsideComponent() {
  return (
    <aside className="   ">
      <header className="my-6">
        <h3 className=" text-lg font-bold  ">STACK STORIES MAGAZINE</h3>
        <h2 className="text-6xl  font-bold">04/2025</h2>
      </header>

      <figure className="relative  ">
        <Image
          className="brightness-75"
          src={computer}
          width={500}
          height={250}
          alt="90's Computer Desktop"
        />
        <figcaption className="absolute flex justify-center left-4   top-1/2 text-[#e7e8e2] ">
          <p className=" font-bold text-7xl tracking-[13]  ">
            STACK
            <span className="text-3xl block tracking-normal">STORIES</span>
          </p>
        </figcaption>
      </figure>
    </aside>
  );
}

export default AsideComponent;
