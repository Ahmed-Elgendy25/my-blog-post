"use client";

import type React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MarqueeComponentProps {
  // Simple mode - single text repeating
  text?: string;
  // Advanced mode - array of items
  items?: string[];
  // Optional label
  label?: string;
  // Animation settings
  duration?: number;
  // Styling
  className?: string;
  textClassName?: string;
  bgColor?: string;
  textColor?: string;
  labelBgColor?: string;
  fontSize?: string;
  labelClassName?: string;
  itemClassName?: string;
  // Simple mode settings
  repeatCount?: number;
}

export default function MarqueeComponent({
  text,
  items,
  label,
  duration = 20,
  className = "",
  textClassName = "text-sm font-medium mx-8",
  bgColor = "bg-[#222222]",
  textColor = "text-[#E7E8E2]",
  labelBgColor,
  fontSize = "text-xl",
  labelClassName = "",
  itemClassName = "",
  repeatCount = 8,
}: MarqueeComponentProps) {
  const tickerRef = useRef<HTMLDivElement>(null);

  // GSAP animation for items mode
  useGSAP(() => {
    if (!items || !tickerRef.current) return;

    const tickerWidth = tickerRef.current.scrollWidth / 2;

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
  }, [duration, items]);

  // Simple mode with CSS animation
  if (!items && text) {
    return (
      <div
        className={`border-y border-background/20 py-4 overflow-hidden ${className}`}
      >
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: repeatCount }).map((_, index) => (
            <span key={index} className={textClassName}>
              {text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Advanced mode with items array and label
  if (items) {
    return (
      <div
        className={`relative overflow-hidden ${bgColor} ${textColor} flex items-center py-3 ${className}`}
      >
        {label && (
          <div
            className={`z-20 relative ${labelBgColor || bgColor} p-2 md:w-auto w-4/12 min-h-full ${labelClassName}`}
          >
            <h2 className={`font-bold ${fontSize}`}>{label}</h2>
          </div>
        )}

        <div className="absolute left-0 top-0 w-full h-full z-10 flex items-center overflow-hidden">
          <div
            ref={tickerRef}
            className={`whitespace-nowrap flex ${fontSize} font-normal`}
          >
            {/* First set of items */}
            {items.map((item, idx) => (
              <p className={`px-4 ${itemClassName}`} key={`item-1-${idx}`}>
                {item}
              </p>
            ))}
            {/* Duplicate set for seamless loop */}
            {items.map((item, idx) => (
              <p className={`px-4 ${itemClassName}`} key={`item-2-${idx}`}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
