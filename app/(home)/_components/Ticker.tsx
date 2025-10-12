"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface TickerProps {
  items: string[];
  label?: string;
  duration?: number;
  bgColor?: string;
  textColor?: string;
  labelBgColor?: string;
  fontSize?: string;
  className?: string;
  labelClassName?: string;
  itemClassName?: string;
}

function Ticker({
  items,
  label = "NEW TICKER+++",
  duration = 20,
  bgColor = "bg-[#222222]",
  textColor = "text-[#E7E8E2]",
  labelBgColor = "bg-[#222222]",
  fontSize = "text-xl",
  className = "",
  labelClassName = "",
  itemClassName = "",
}: TickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);

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
        duration: duration,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(gsap.utils.wrap(-tickerWidth, 0)),
        },
      },
    );
  }, [duration]);

  return (
    <div
      className={`relative overflow-hidden ${bgColor} ${textColor} flex items-center py-3 ${className}`}
    >
      <div
        className={`z-20 relative ${labelBgColor} p-2 md:w-auto w-4/12 min-h-full ${labelClassName}`}
      >
        <h2 className={`font-bold ${fontSize}`}>{label}</h2>
      </div>

      {/* Scrolling ticker content */}
      <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center overflow-hidden">
        <div
          ref={tickerRef}
          className={`whitespace-nowrap flex ${fontSize} font-normal`}
        >
          {/* First set of ticker items */}
          {items.map((item, idx) => (
            <p className={`px-4 ${itemClassName}`} key={`ticker-1-${idx}`}>
              {item}
            </p>
          ))}
          {/* Duplicate set for seamless loop */}
          {items.map((item, idx) => (
            <p className={`px-4 ${itemClassName}`} key={`ticker-2-${idx}`}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticker;
