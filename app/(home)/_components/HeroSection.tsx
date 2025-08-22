import HeadingComponent from '@/app/shared/HeadingComponent';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

function HeroSection() {
  const tickerRef = useRef(null);
  const containerRef= useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const containerWidth = containerRef.current?.scrollWidth;
 

    gsap.to(tickerRef.current, {
      x: `-${containerWidth }`, 
      duration: 10,
      ease: 'linear',
      repeat: -1,
    
      
    });
  });

  return (
    <section className="container mx-auto p-5">
      <HeadingComponent
        title="TECH & LIFE"
        headingStyle="text-center font-bold text-[#222222]"
        overrideStyle={false}
        inlineStyle={{ fontSize: '12vw' }}
      />

      <div ref={containerRef} className="relative overflow-hidden bg-[#222222] text-[#E7E8E2] flex items-center py-3  ">
        <div className="z-20 relative bg-[#222222] p-2 md:w-auto w-4/12 min-h-full ">
          <h2 className="font-bold text-xl ">NEW TICKER+++</h2>
        </div>

        {/* Scrolling ticker content */}
        <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center overflow-hidden">
          <div
            ref={tickerRef}
            className="whitespace-nowrap flex text-xl font-normal"
          >
          <p className="px-4">React 19 introduces server components support.</p>
          <p className="px-4">Next.js 15 TurboPack speeds up dev builds.</p>
          <p className="px-4">Angular 19 adds better hydration for SSR apps.</p>
          <p className="px-4">Vite 6 launches with improved HMR performance.</p>
          <p className="px-4">Tailwind CSS 4.0 brings new design tokens.</p>
          <p className="px-4">ShadCN/UI components simplify design workflows.</p>
          <p className="px-4">React Testing Library updates with async utils.</p>
          <p className="px-4">TypeScript 6 enhances JSX type safety.</p>


           
          </div>
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
