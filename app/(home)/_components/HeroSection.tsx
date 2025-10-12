"use client";

import HeadingComponent from "@/app/shared/HeadingComponent";
import Ticker from "@/app/(home)/_components/Ticker";
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

      <Ticker
        items={tickerItems}
        label="NEW TICKER+++"
        duration={20}
        bgColor="bg-[#222222]"
        textColor="text-[#E7E8E2]"
        labelBgColor="bg-[#222222]"
        fontSize="text-xl"
      />
    </section>
  );
}

export default HeroSection;
