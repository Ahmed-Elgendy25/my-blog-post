import Image from "next/image";
import PostsDescription from "./PostsDescription";
import PostsSection from "./PostsSection";
import AsideComponent from "../AsideComponent";
import { Post } from "../../magazine/_schema/PaginatedArticles";
import Link from "next/link";
function PostHero({ articles }: { articles: Post[] }) {
  return (
    <section className="container text-[#222222] mx-auto p-5 relative">
      <div className=" flex lg:flex-row lg:gap-y-0 gap-y-3 flex-col justify-between    items-start lg:p-5 p-3">
        <div className=" xl:w-1/2 ">
          <h1 className=" uppercase  leading-[1.3] font-extrabold lg:text-[2.5vmax] text-4xl   ">
            {articles[1].title}
          </h1>
        </div>
        <PostsDescription
          author={articles[1]?.authorName?.toLocaleUpperCase() || ""}
          subtitle={articles[1]?.sub_title}
          date={articles[1].date}
          readTime={articles[1].duration_read}
        />
      </div>
      <Link href={`/magazine/${articles[1].id}`}>
        <Image
          className="my-5"
          src={articles[1].banner}
          width={1550}
          height={200}
          priority={true}
          alt={articles[0].title}
          unoptimized={true}
        />
      </Link>

      <div className=" grid lg:grid-cols-7 gap-x-16">
        <div className="lg:col-start-1 lg:col-end-6">
          {articles.map((post) => (
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
