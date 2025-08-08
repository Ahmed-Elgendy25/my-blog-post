import Image from 'next/image';
import PostsDescription from './PostsDescription';
import PostsSection from './PostsSection';
import AsideComponent from '../AsideComponent';
import { Post } from '../../magazine/_schema/PaginatedArticles';
import Link from 'next/link';
function PostHero({articles}:{articles:Post[]}) {
  return (
    <section className="container text-[#222222] mx-auto p-5 relative">
      <div className=" flex lg:flex-row lg:gap-y-0 gap-y-3 flex-col justify-between    items-start lg:p-5 p-3">
        <div className=" xl:w-1/2 ">
          <h1 className=" uppercase  leading-[1.3] font-extrabold lg:text-[2.5vmax] text-4xl   ">
            {articles[0].title}
          </h1>
        </div>
        <PostsDescription
          title={articles[0].title}
          author={articles[0].authorName.toLocaleUpperCase()}
          date={articles[0].date}
          readTime={articles[0].durationRead}
        />
      </div>
      <Link href={`/magazine/${articles[0].id}`}>
        <Image
          className="my-5"
          src={articles[0].postImg}
          width={1550}
          height={200}
          alt="Mr.Robot"
        />
      </Link>
    
      <div className="grid lg:grid-cols-7 gap-x-16  ">
        <div className="lg:col-start-1 lg:col-end-6">
          {articles.map((post) => (
            <PostsSection
              key={post.id}
              title={post.title}
              author={post.authorName}
              date={post.date}
              readTime={post.durationRead}
              imageUrl={post.postImg}
            />
          ))}
        </div>


        {/* <AsideComponent /> */}

        {/* <aside className="lg:col-start-6 lg:col-end-8 p-3 bg-purple-500  ">
          <div className="   ">
            <header className="my-6">
              <h3 className=" text-lg font-bold  ">STACK STORIES MAGAZINE</h3>
              <h2 className="text-6xl  font-bold">04/2025</h2>
            </header>

            <figure className="relative  ">
              <Image
                className="brightness-75"
                src="/90's desktop.jpg"
                width={500}
                height={250}
                alt="90's Desktop"
              />
              <figcaption className="absolute flex justify-center left-4   top-1/2 text-[#e7e8e2] ">
                <p className=" font-bold text-7xl tracking-[13]  ">
                  STACK
                  <span className="text-3xl block tracking-normal">
                    STORIES
                  </span>
                </p>
              </figcaption>
            </figure>
            <button className=" uppercase bg-[#222222]  text-[#e7e8e2] font-medium p-5 w-full my-3 cursor-pointer">
              buy now
            </button>
          </div>
        </aside> */}
      </div>
    </section>
  );
}

export default PostHero;
