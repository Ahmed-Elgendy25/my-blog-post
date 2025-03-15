import Image from 'next/image';
import PostsDescription from './PostsDescription';
import { PostTyped } from '@/app/_models/post.model';

function PostsSection({
  imageUrl,
  author,
  date,
  readTime,
  description,
  title,
}: PostTyped) {
  return (
    <section className=" border-b-1   border-b-[#222222] last:border-b-0">
      <article className=" flex lg:flex-row lg:gap-y-0 lg:p-5 lg:items-center lg:justify-between   flex-col items-center  gap-x-5   ">
        <figure className=" my-3 h-fit   ">
          <Image
            src={imageUrl || ''}
            width={340}
            height={240}
            quality={100}
            alt={description}
          />
        </figure>
        <div className=" w-full  my-3 p-10 ">
          <PostsDescription
            author={author}
            date={date}
            readTime={readTime}
            description={description}
            title={title}
          />
        </div>
      </article>
    </section>
  );
}

export default PostsSection;
