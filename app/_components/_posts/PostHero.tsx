import Image from 'next/image';
import React from 'react';
import PostsDescription from './PostsDescription';
import { posts, PostTyped } from '@/app/_models/post.model';
import PostsSection from './PostsSection';
const DataOfPosts: PostTyped[] = posts;
function PostHero() {
  return (
    <section className="container text-[#222222] mx-auto p-5">
      <div className=" flex lg:flex-row lg:gap-y-0 gap-y-3 flex-col justify-between    items-start lg:p-5 p-3">
        <div className=" xl:w-1/2 ">
          <h1 className=" uppercase  leading-[1.3] font-extrabold lg:text-[2.5vmax] text-4xl   ">
            Why Mr.Robot consider the best tv show among geeks?
          </h1>
        </div>
        <PostsDescription
          description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Egestas dui id
        ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis
        bibendum ut. Porttitor leo a diam Eget nunc lobortis mattis aliquam`}
          author={'Cristofer Vaccaro'}
          date={'September 22, 2022'}
          readTime={'50 Min'}
        />
      </div>

      <Image
        className="my-5"
        src="/Mr_Robot.png"
        width={1550}
        height={200}
        alt="Mr.Robot"
      />

      {DataOfPosts.map((post) => (
        <PostsSection
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          description={post.description}
          readTime={post.readTime}
          imageUrl={post.imageUrl}
        />
      ))}
    </section>
  );
}

export default PostHero;
