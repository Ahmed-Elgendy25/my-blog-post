import Image from "next/image";
import PostsDescription from "./PostsDescription";
import PostsSection from "./PostsSection";
import AsideComponent from "../AsideComponent";
import { Post } from "../../magazine/_schema/PaginatedArticles";
import Link from "next/link";
function PostHero({ articles }: { articles: Post[] }) {
  return (
    <section className="container text-[#222222] mx-auto px-3 py-5 sm:px-5 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 p-3 sm:p-4 lg:p-5">
        <div className="w-full sm:w-3/5 md:w-2/3 lg:w-3/5 xl:w-2/3">
          <h1 className="uppercase leading-tight font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            {articles[0].title}
          </h1>
        </div>
        <div className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5 xl:w-1/3 flex-shrink-0">
          <PostsDescription
            author={articles[0]?.authorName?.toLocaleUpperCase() || ""}
            subtitle={articles[0]?.sub_title}
            date={articles[0].date}
            readTime={articles[0].duration_read}
          />
        </div>
      </div>
      <Link
        href={`/magazine/${articles[1].id}`}
        className="block my-4 sm:my-5 lg:my-6"
      >
        <Image
          className="my-5 p-[2rem]"
          src={articles[0].banner}
          width={1550}
          height={200}
          priority={true}
          alt={articles[0].title}
          unoptimized={true}
        />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-8 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-start-1 lg:col-end-6">
          {articles.slice(1).map((post) => (
            <PostsSection
              key={post.id}
              id={post.id}
              title={post.title}
              subtitle={post.sub_title}
              author={post.authorName}
              date={post.date}
              readTime={post.duration_read}
              imageUrl={post.banner}
            />
          ))}
        </div>

        <div className="lg:col-start-6 lg:col-end-8 p-3 ">
          <div className="sticky top-0">
            <AsideComponent />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostHero;
