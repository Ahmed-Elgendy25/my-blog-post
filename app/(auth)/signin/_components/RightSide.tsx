"use client";

import dynamic from "next/dynamic";
import type { SilkProps } from "./Silk";

const Silk = dynamic<SilkProps>(() => import("./Silk"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

export default function RightSide() {
  return (
    <div className="hidden lg:flex flex-1 bg-black items-center justify-center p-12 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl relative z-10">
        <div className="mt-8 text-center space-y-4">
          <h2 className="text-white text-3xl tracking-tight font-bold">
            Discover Developer Stories
          </h2>
          <p className="text-gray-400 font-normal">
            Join thousands of developers sharing their experiences, learning
            from each other, and building the future together.
          </p>
        </div>
      </div>
    </div>
  );
}
