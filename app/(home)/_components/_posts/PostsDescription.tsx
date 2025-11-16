import { PostTyped } from "@/app/create-article/_schema/posts.model";
import ArticleInfoListComponent from "@/app/shared/ArticleInfoListComponent";
import Link from "next/link";

function PostsDescription({
  title,
  author,
  date,
  readTime,
  subtitle,
  id,
}: PostTyped) {
  return (
    <div className="flex flex-col gap-y-3 sm:gap-y-4 lg:gap-y-5 w-full">
      {title && (
        <Link href={`/magazine/${id}`}>
          <h2 className="font-bold text-xl pb-2 sm:text-2xl md:text-3xl lg:text-4xl relative inline-block group">
            {title}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-current transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </h2>
        </Link>
      )}
      <p className="font-normal text-sm sm:text-base lg:text-lg">{subtitle}</p>
      <ArticleInfoListComponent
        author={author}
        date={date}
        readTime={readTime}
      />
    </div>
  );
}

export default PostsDescription;
