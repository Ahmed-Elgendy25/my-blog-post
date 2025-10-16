import Image from "next/image";
import PostsDescription from "./PostsDescription";
import { PostTyped } from "@/app/create-article/_schema/posts.model";
import placeholderImage from "@/public/landscape-placeholder-svgrepo-com.png";
import Link from "next/link";
function PostsSection({
  imageUrl,
  author,
  date,
  readTime,
  title,
  id,
}: PostTyped) {
  return (
    <section className=" border-b-1   border-b-[#222222] last:border-b-0">
      <article className=" flex lg:flex-row lg:gap-y-0 lg:p-5 lg:items-center lg:justify-between   flex-col items-center  gap-x-5   ">
        <figure className=" my-3 h-fit overflow-hidden rounded-lg">
          <Link href={`/magazine/${id}`}>
            <Image
              src={imageUrl || placeholderImage}
              className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              width={500}
              height={500}
              quality={100}
              alt={title}
              unoptimized={true}
            />
          </Link>
        </figure>
        <div className=" w-full  my-3 p-10 ">
          <PostsDescription
            id={id}
            author={author}
            date={date}
            readTime={readTime}
            title={title}
          />
        </div>
      </article>
    </section>
  );
}

export default PostsSection;
