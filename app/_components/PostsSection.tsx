import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PostsSection() {
  return (
    <section className="container text-[#222222] mx-auto p-5">
      <div className=" flex lg:flex-row lg:gap-y-0 gap-y-3 flex-col justify-between    items-start">
        <div className=" xl:w-1/2 ">
          <h1 className=" uppercase  leading-[1.3] font-extrabold lg:text-[2.5vmax] text-4xl   ">
            Why Mr.Robot consider the best tv show among geeks?
          </h1>
        </div>
        <div className="flex flex-col gap-y-5 xl:w-1/2  ">
          <p className="font-normal text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu
            felis bibendum ut. Porttitor leo a diam.
          </p>
          <ul className="md:flex md:gap-x-12 gap-y-2 flex flex-col">
            <li>
              <span className="font-bold md:ms-3  me-2">Text</span>
              <Link href="#" className=" underline font-normal text-md">
                Cristofer Vaccaro
              </Link>
            </li>
            <li>
              <span className="font-bold md:ms-3 me-2 ">Date</span>
              <p className="inline-block">September 22, 2022</p>
            </li>
            <li>
              <span className="font-bold md:ms-3 me-2 ">Read</span>
              <p className="inline-block">50 Min</p>
            </li>
          </ul>
        </div>
      </div>

      <Image
        className="my-5"
        src="/Mr_Robot.png"
        width={1550}
        height={200}
        alt="Mr.Robot"
      />
    </section>
  );
}

export default PostsSection;
