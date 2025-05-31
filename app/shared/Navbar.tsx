import {
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

function Navbar() {
  return (
    <header className=" mx-3 md:container md:mx-auto p-3 border-b-[1px]   text-[#222222] md:flex  md:justify-between md:items-center  mt-2">
      <h2 className=" text-2xl font-bold ">STACK STORIES </h2>
      <nav className="w-1/2 p-2  md:block hidden">
        <ul className=" list-none">
          <div className="flex text-[1.6rem] font-light justify-end  gap-x-10 items-center ">
            <div className="flex gap-x-5">
              <li>
                <Link href={'/magazine'}>Magazine</Link>
              </li>
              <li>
                <Link href={'/podcast'}>Podcast</Link>
              </li>
              <li>
                <Link href={'/authors'}>Authors</Link>
              </li>
            </div>

            <div className="w-5 h-[1px] bg-black"></div>

            <div className=" flex gap-x-3  ">
              <InstagramLogo size={25} />
              <XLogo size={25} />
              <LinkedinLogo size={25} />
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
