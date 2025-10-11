"use client";

import HeadingComponent from "@/app/shared/HeadingComponent";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

function HeroSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tickerItems = [
    "React 19 introduces server components support.",
    "Next.js 15 TurboPack speeds up dev builds.",
    "Angular 19 adds better hydration for SSR apps.",
    "Vite 6 launches with improved HMR performance.",
    "Tailwind CSS 4.0 brings new design tokens.",
    "ShadCN/UI components simplify design workflows.",
    "React Testing Library updates with async utils.",
    "TypeScript 6 enhances JSX type safety.",
  ];

  useGSAP(() => {
    if (!tickerRef.current) return;

    // Get the width of one complete set of ticker items
    const tickerWidth = tickerRef.current.scrollWidth / 2; // Divided by 2 because we duplicate content

    // Animate with seamless infinite loop using GSAP's wrap functionality
    gsap.fromTo(
      tickerRef.current,
      { x: 0 },
      {
        x: -tickerWidth,
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(gsap.utils.wrap(-tickerWidth, 0)),
        },
      },
    );
  }, []);

  return (
    <section className="container mx-auto p-5">
      <HeadingComponent
        title="TECH & LIFE"
        headingStyle="text-center font-bold text-[#222222]"
        overrideStyle={false}
        inlineStyle={{ fontSize: "12vw" }}
      />

      <div
        ref={containerRef}
        className="relative overflow-hidden bg-[#222222] text-[#E7E8E2] flex items-center py-3  "
      >
        <div className="z-20 relative bg-[#222222] p-2 md:w-auto w-4/12 min-h-full ">
          <h2 className="font-bold text-xl ">NEW TICKER+++</h2>
        </div>

        {/* Scrolling ticker content */}
        <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center overflow-hidden">
          <div
            ref={tickerRef}
            className="whitespace-nowrap flex text-xl font-normal"
          >
            {/* First set of ticker items */}
            {tickerItems.map((item, idx) => (
              <p className="px-4" key={`ticker-1-${idx}`}>
                {item}
              </p>
            ))}
            {/* Duplicate set for seamless loop */}
            {tickerItems.map((item, idx) => (
              <p className="px-4" key={`ticker-2-${idx}`}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
