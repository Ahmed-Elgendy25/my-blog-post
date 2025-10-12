"use client";

import HeadingComponent from "@/app/shared/HeadingComponent";
import MarqueeComponent from "@/app/shared/MarqueeComponent";
import React from "react";

function HeroSection() {
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

  return (
    <section className="container mx-auto p-5">
      <HeadingComponent
        title="TECH & LIFE"
        headingStyle="text-center font-bold text-[#222222]"
        overrideStyle={false}
        inlineStyle={{ fontSize: "12vw" }}
      />

      <MarqueeComponent
        items={tickerItems}
        label="NEW TICKER+++"
        duration={50}
      />
    </section>
  );
}

export default HeroSection;
