"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../_schema/PaginatedArticles";
import placeholderImage from "@/public/landscape-placeholder-svgrepo-com.png";
import { Calendar } from "@phosphor-icons/react/dist/ssr";

const cleanImageUrl = (url: string) => url.replace(/([^:]\/)\/+/g, "$1"); // removes double slashes except after 'https://'

function MagazineCard(article: Post) {
  const [isHovered, setIsHovered] = useState(false);
  const cleanedUrl = cleanImageUrl(article.banner);
  const imageSource = article.banner === "" ? placeholderImage : cleanedUrl;

  return (
    <Link href={`/magazine/${article.id}`}>
      <article
        className="group cursor-pointer h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={imageSource}
            alt={article.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div
            className={`absolute inset-0 bg-background/10 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Content */}
        <div className="space-y-3 p-6">
          <h2
            className={`text-2xl font-bold leading-tight transition-all duration-300 ${
              isHovered ? "translate-x-2" : "translate-x-0"
            }`}
          >
            {article.title}
          </h2>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{article.authorName.toLocaleUpperCase()}</span>
            <span>
              {" "}
              <Calendar
                size={16}
                weight="regular"
                className="sm:w-[18px] sm:h-[18px]"
              />
            </span>
            <span>{article.date}</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 border border-border rounded-full">
              Article
            </span>
            <span className="text-muted-foreground">
              {article.duration_read}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default MagazineCard;
