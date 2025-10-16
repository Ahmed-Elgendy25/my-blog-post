"use client";

import dynamic from "next/dynamic";
import type { SilkProps } from "../../signin/_components/Silk";

const Silk = dynamic<SilkProps>(() => import("../../signin/_components/Silk"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

export default function RightSide() {
  return (
    <div className="hidden lg:block col-span-12 lg:col-span-6 bg-black relative overflow-hidden min-h-screen">
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
      <div className="relative z-10 flex items-center justify-center h-full p-12">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-white text-4xl md:text-5xl tracking-tight font-bold">
            Join Our Community
          </h2>
          <p className="text-gray-400 text-lg font-normal leading-relaxed">
            Connect with developers worldwide, share your technical insights,
            and grow your professional network in the tech community.
          </p>
        </div>
      </div>
    </div>
  );
}
