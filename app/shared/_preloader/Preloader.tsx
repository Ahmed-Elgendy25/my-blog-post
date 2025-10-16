"use client";
import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";

function Preloader({
  preloaderRef,
}: {
  preloaderRef: RefObject<HTMLDivElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stackTextRef = useRef<HTMLHeadingElement>(null);
  const storiesTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Use requestAnimationFrame to ensure SVG is fully rendered
    const animate = () => {
      const ctx = gsap.context(() => {
        // Get all stroke paths and fill shapes
        const strokePaths = gsap.utils.toArray<SVGPathElement | SVGLineElement>(
          ".stroke-path",
        );
        const fillShapes = gsap.utils.toArray<SVGPathElement>(".fill-shape");

        // Set up initial states for stroke animation
        gsap.set(strokePaths, {
          opacity: 0,
        });

        // Manually set initial stroke-dasharray and stroke-dashoffset
        strokePaths.forEach((path) => {
          try {
            const length = (path as SVGGeometryElement).getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          } catch (error) {
            console.warn("Could not get path length", error);
          }
        });

        gsap.set(fillShapes, {
          opacity: 0,
        });

        // Create timeline
        const tl = gsap.timeline();

        // Animate strokes
        tl.to(strokePaths, {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.05,
        });

        // Animate fills
        tl.to(
          fillShapes,
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.03,
          },
          "-=0.5",
        );

        // Animate text
        tl.fromTo(
          stackTextRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8 },
        );

        tl.fromTo(
          storiesTextRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.5",
        );
      }, svgRef);

      return ctx;
    };

    // Wait for next frame to ensure SVG is rendered
    const rafId = requestAnimationFrame(() => {
      const ctx = animate();
      return () => ctx?.revert();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={preloaderRef} className="preloader-container">
      <div className="flex items-center justify-center h-full w-full bg-[#E7E8E2]">
        <div className="flex items-center">
          <svg ref={svgRef} width="300" height="300" viewBox="0 0 200 200">
            {/* Bottom layer - rounded diamond */}
            <path
              className="fill-shape"
              d="M100 160 C120 160 140 160 155 145 C170 130 170 110 170 90 C170 70 170 50 155 35 C140 20 120 20 100 20 C80 20 60 20 45 35 C30 50 30 70 30 90 C30 110 30 130 45 145 C60 160 80 160 100 160 Z"
              fill="#FF9D5C"
            />
            <path
              className="stroke-path"
              d="M100 160 C120 160 140 160 155 145 C170 130 170 110 170 90 C170 70 170 50 155 35 C140 20 120 20 100 20 C80 20 60 20 45 35 C30 50 30 70 30 90 C30 110 30 130 45 145 C60 160 80 160 100 160 Z"
              fill="none"
              stroke="#FF9D5C"
              strokeWidth="3"
            />

            {/* Middle layer white stripe - left */}
            <path
              className="fill-shape"
              d="M50 120 Q48 115 50 110 L85 75 Q90 70 95 75 L100 80 Q105 85 100 90 L65 125 Q60 130 50 120 Z"
              fill="white"
            />
            <path
              className="stroke-path"
              d="M50 120 Q48 115 50 110 L85 75 Q90 70 95 75 L100 80 Q105 85 100 90 L65 125 Q60 130 50 120 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            {/* Middle layer white stripe - right */}
            <path
              className="fill-shape"
              d="M150 120 Q152 115 150 110 L115 75 Q110 70 105 75 L100 80 Q95 85 100 90 L135 125 Q140 130 150 120 Z"
              fill="white"
            />
            <path
              className="stroke-path"
              d="M150 120 Q152 115 150 110 L115 75 Q110 70 105 75 L100 80 Q95 85 100 90 L135 125 Q140 130 150 120 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            {/* Middle layer - smaller rounded diamond */}
            <path
              className="fill-shape"
              d="M100 130 C115 130 130 130 140 120 C150 110 150 95 150 80 C150 65 150 50 140 40 C130 30 115 30 100 30 C85 30 70 30 60 40 C50 50 50 65 50 80 C50 95 50 110 60 120 C70 130 85 130 100 130 Z"
              fill="#FF9D5C"
            />
            <path
              className="stroke-path"
              d="M100 130 C115 130 130 130 140 120 C150 110 150 95 150 80 C150 65 150 50 140 40 C130 30 115 30 100 30 C85 30 70 30 60 40 C50 50 50 65 50 80 C50 95 50 110 60 120 C70 130 85 130 100 130 Z"
              fill="none"
              stroke="#FF9D5C"
              strokeWidth="3"
            />

            {/* Top layer white stripe - bottom left */}
            <path
              className="fill-shape"
              d="M55 95 Q53 92 55 89 L80 64 Q83 61 86 64 L91 69 Q94 72 91 75 L66 100 Q63 103 55 95 Z"
              fill="white"
            />
            <path
              className="stroke-path"
              d="M55 95 Q53 92 55 89 L80 64 Q83 61 86 64 L91 69 Q94 72 91 75 L66 100 Q63 103 55 95 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            {/* Top layer white stripe - bottom right */}
            <path
              className="fill-shape"
              d="M145 95 Q147 92 145 89 L120 64 Q117 61 114 64 L109 69 Q106 72 109 75 L134 100 Q137 103 145 95 Z"
              fill="white"
            />
            <path
              className="stroke-path"
              d="M145 95 Q147 92 145 89 L120 64 Q117 61 114 64 L109 69 Q106 72 109 75 L134 100 Q137 103 145 95 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            {/* Top layer - smallest rounded diamond */}
            <path
              className="fill-shape"
              d="M100 105 C110 105 120 105 127 98 C134 91 134 81 134 71 C134 61 134 51 127 44 C120 37 110 37 100 37 C90 37 80 37 73 44 C66 51 66 61 66 71 C66 81 66 91 73 98 C80 105 90 105 100 105 Z"
              fill="#FF9D5C"
            />
            <path
              className="stroke-path"
              d="M100 105 C110 105 120 105 127 98 C134 91 134 81 134 71 C134 61 134 51 127 44 C120 37 110 37 100 37 C90 37 80 37 73 44 C66 51 66 61 66 71 C66 81 66 91 73 98 C80 105 90 105 100 105 Z"
              fill="none"
              stroke="#FF9D5C"
              strokeWidth="3"
            />

            {/* Chat bubble */}
            <path
              className="fill-shape"
              d="M80 55 C75 55 70 60 70 65 L70 85 C70 90 75 95 80 95 L85 95 L90 102 L95 95 L120 95 C125 95 130 90 130 85 L130 65 C130 60 125 55 120 55 Z"
              fill="white"
            />
            <path
              className="stroke-path"
              d="M80 55 C75 55 70 60 70 65 L70 85 C70 90 75 95 80 95 L85 95 L90 102 L95 95 L120 95 C125 95 130 90 130 85 L130 65 C130 60 125 55 120 55 Z"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            {/* Chat bubble lines */}
            <line
              className="stroke-path"
              x1="80"
              y1="67"
              x2="115"
              y2="67"
              stroke="#FF9D5C"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              className="stroke-path"
              x1="80"
              y1="75"
              x2="110"
              y2="75"
              stroke="#FF9D5C"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              className="stroke-path"
              x1="80"
              y1="83"
              x2="105"
              y2="83"
              stroke="#FF9D5C"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <div className="ml-8">
            <h1
              ref={stackTextRef}
              className="text-5xl tracking-tight text-[#222]"
              style={{ fontWeight: 700 }}
            >
              STACK
            </h1>
            <h1
              ref={storiesTextRef}
              className="text-5xl tracking-tight text-[#222]"
              style={{ fontWeight: 700 }}
            >
              STORIES
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
