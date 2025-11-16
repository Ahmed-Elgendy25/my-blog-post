import { Calendar, Clock } from "@phosphor-icons/react/dist/ssr";

function HeadingDetails({
  title,
  durationRead,
  author,
  date,
  subTitle,
}: {
  title: string;
  durationRead: string;
  author: string;
  date: string;
  subTitle: string;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
        {subTitle}
      </p>

      {/* Author and Meta Info */}
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">
          {author}
        </span>
        <span>·</span>
        <span className="flex items-center gap-1.5">
          <Calendar
            size={16}
            weight="regular"
            className="sm:w-[18px] sm:h-[18px]"
          />
          {date}
        </span>
        <span>·</span>
        <span className="flex items-center gap-1.5">
          <Clock
            size={16}
            weight="regular"
            className="sm:w-[18px] sm:h-[18px]"
          />
          {durationRead}
        </span>
      </div>
    </div>
  );
}

export default HeadingDetails;
