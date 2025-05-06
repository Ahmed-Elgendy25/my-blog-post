import React from 'react';

// we need to fix responsive text of this div

function HeroSection() {
  return (
    <section className="  container mx-auto  p-5 ">
      <h1
        className="text-center  font-bold  text-[#222222]  "
        style={{
          fontSize: '12vw',
        }}
      >
        TECH & LIFE
      </h1>

      {/* we need to fix responsive text of this div */}
      <div className="flex justify-between  lg:p-5 p-2 bg-[#222222] items-center  text-[#E7E8E2]">
        <div className="lg:p-2 p-2 md:w-2/12 ">
          <h2 className="font-bold text-xl  ">NEW TICKER+++</h2>
        </div>
        <div className="lg:p-2 p-2  w-full md:w-10/12">
          <p className="font-normal text-xl text-end ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

{
  /* <div className="bg-[#222222]  relative text-[#E7E8E2] w-5/6 mx-auto  grid grid-cols-12 md:p-3 ">
<div className=" col-start-1 col-end-3 z-20  p-2  ">
  <h2 className="font-bold  text-xl ">NEW TICKER+++</h2>
</div>
<div className="  col-start-3 col-end-13 z-10 p-2 bg-amber-700 justify-self-end  ">
  <p className=" absolute  top-[1.3rem] font-normal text-lg  ">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </p>
</div>
</div> */
}
