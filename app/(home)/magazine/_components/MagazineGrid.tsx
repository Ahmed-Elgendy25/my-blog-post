"use client";

import { useRef, useEffect, useState } from "react";
import { Post } from "../_schema/PaginatedArticles";
import MagazineCard from "./MagazineCard";

function MagazineGrid({ articles }: { articles: Post[] }) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [articles]);

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-black ">
        {articles.map((article, index) => (
          <div
            key={article.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`p-5 border-r border-b border-black transition-all duration-700 ${
              visibleCards.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: `${(index % 3) * 100}ms`,
            }}
          >
            <MagazineCard {...article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MagazineGrid;
