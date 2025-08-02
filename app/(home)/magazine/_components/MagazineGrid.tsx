import Image from "next/image";
import Link from "next/link";
import { Post } from "../_schema/PaginatedArticles";

import placeholderImage from '@/public/landscape-placeholder-svgrepo-com.png'

const cleanImageUrl = (url: string) => url.replace(/([^:]\/)\/+/g, '$1'); // removes double slashes except after 'https://'

async function MagazineGrid({ articles }: { articles: Post[] }) {

  return (
    <main className="container mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  ">
        {
   
        articles.map((article) => {
          const cleanedUrl = cleanImageUrl(article.postImg);
          
          return (
            <section 
              key={article.id} 
              className= "p-5 border-[0.1px]   border-[#222222]" >
              <span className="text-[#222222] text-sm font-medium">{article.date}</span>
              <figure className="p-3">
                <Link href={`/magazine/${article.id}`}>
                  {
                    article.postImg===""?     
                  <Image
                  placeholder="empty"
                  src={placeholderImage}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="object-cover object-center max-w-full"
                />: <Image
                src={cleanedUrl}
                alt={article.title}
                width={500}
                height={500}
                className="object-cover object-center max-w-full"
              /> 
                  }
              
                </Link>
                <figcaption className="p-3">
                  <Link href={`/magazine/${article.id}`}>
                    <h2 className="text-[#222222] text-4xl my-2 font-bold">{article.title}</h2>
                  </Link>
                  <p className="text-[#222222] text-md"></p>
                  <dl className="flex gap-x-5 mt-10">
                    <div className="flex gap-2">
                      <dt className="text-[#222222] text-md font-medium">Author</dt>
                      <dd className="text-[#222222] text-md underline">{article.authorName}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-[#222222] text-md font-medium">Read</dt>
                      <dd className="text-[#222222] text-md">{article.durationRead}</dd>
                    </div>
                  </dl>
                </figcaption>
              </figure>
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default MagazineGrid