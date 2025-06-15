/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostTyped } from '@/app/create-article/_schema/posts.model';
import ArticleInfoListComponent from '@/app/shared/ArticleInfoListComponent';

function PostsDescription({
  title,
  description,
  author,
  date,
  readTime,
}: PostTyped) {
  return (
    <div className="flex flex-col gap-y-5 xl:w-1/2  ">
      {title && <h2 className="font-bold text-4xl">{title}</h2>}
      <p className="font-normal text-lg">{description}</p>
       <ArticleInfoListComponent author={author} date={date} readTime={readTime}/>
    </div>
  );
}

export default PostsDescription;
