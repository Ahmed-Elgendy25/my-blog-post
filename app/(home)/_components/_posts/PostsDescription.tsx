/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostTyped } from "@/app/create-article/_schema/posts.model";
import ArticleInfoListComponent from "@/app/shared/ArticleInfoListComponent";
import Link from "next/link";

function PostsDescription({ title, author, date, readTime, id }: PostTyped) {
  return (
    <div className="flex flex-col gap-y-5 xl:w-1/2  ">
      {title && (
        <Link href={`/magazine/${id}`}>
          <h2 className="font-bold text-4xl  underline underline-offset-4">
            {title}
          </h2>
        </Link>
      )}
      <p className="font-normal text-lg">{title}</p>
      <ArticleInfoListComponent
        author={author}
        date={date}
        readTime={readTime}
      />
    </div>
  );
}

export default PostsDescription;
