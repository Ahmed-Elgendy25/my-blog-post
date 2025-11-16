"use client";

import HeadingComponent from "@/app/shared/HeadingComponent";
import MarqueeComponent from "@/app/shared/MarqueeComponent";
import React from "react";

function HeroSection() {
  const tickerItems = [
    "Big things start with small steps.",
    "Don’t wait for perfect — ship, learn, improve.",
    "Upgrade your mindset like you upgrade your stack.",
    "Trust the process — even slow progress is progress.",
    "Great products start with brave first attempts.",
    "Keep building. Someone will notice your work.",
    "No excuses. Just commits.",
    "Hungry devs outwork talented devs.",
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
