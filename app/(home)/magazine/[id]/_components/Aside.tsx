"use client";

import React from "react";
import {
  FacebookLogoIcon,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import placeholderImage from "@/public/landscape-placeholder-svgrepo-com.png";
import Image from "next/image";
import { UserTyped } from "../_schema/PostById";
import { shareArticle } from "../_actions/ShareArticle";

function Aside({ userImg, user }: { userImg: string; user: UserTyped }) {
  const handleShare = async (platform: "linkedin" | "twitter" | "facebook") => {
    const url = window.location.href;
    const title = document.title;

    const shareUrl = await shareArticle(platform, url, title);
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
      {/* Author Image */}
      <div className="flex-shrink-0">
        {!userImg ? (
          <Image
            placeholder="empty"
            src={placeholderImage}
            alt={`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
            width={56}
            height={56}
            className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14"
          />
        ) : (
          <Image
            src={userImg}
            alt={`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
            width={56}
            height={56}
            className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14"
            unoptimized={true}
          />
        )}
      </div>

      {/* Author Info and Social */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
            </h3>
          </div>

          {/* Social Share Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleShare("linkedin")}
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
              aria-label="Share on LinkedIn"
            >
              <LinkedinLogo size={20} weight="fill" className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Share on X (Twitter)"
            >
              <XLogo size={20} weight="fill" className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors cursor-pointer"
              aria-label="Share on Facebook"
            >
              <FacebookLogoIcon
                size={20}
                weight="fill"
                className="sm:w-6 sm:h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aside;
