/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostTyped } from '@/app/create-article/_models/posts.model';
import Link from 'next/link';

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
      <ul className="md:flex sm:flex-col md:flex-row  md:justify-between md:gap-x-12  gap-y-2   flex-wrap  ">
        <li className="md:min-w-fit  flex-auto  sm:px-2 sm:py-1 md:px-0 md:py-0 ">
          <span className="font-bold md:ms-3 ">Text</span>
          <Link
            href="#"
            className=" underline font-normal text-md ms-2 text-nowrap"
          >
            {author}
          </Link>
        </li>
        <li className="md:min-w-fit  flex-auto sm:px-2 sm:py-1 md:px-0 md:py-0">
          <span className="font-bold md:ms-3 me-2  ">Date</span>
          <p className="inline-block">{date}</p>
        </li>
        <li className="md:min-w-fit  flex-auto  sm:px-2 sm:py-1 md:px-0 md:py-0">
          <span className="font-bold md:ms-3 me-2 w-fit  ">Read</span>
          <p className="inline-block">{readTime}</p>
        </li>
      </ul>
    </div>
  );
}

export default PostsDescription;
