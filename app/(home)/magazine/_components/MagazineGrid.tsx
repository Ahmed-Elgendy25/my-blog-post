import Image from "next/image";
import Link from "next/link";
import { Post } from "../_schema/PaginatedArticles";

const cleanImageUrl = (url: string) => url.replace(/([^:]\/)\/+/g, '$1'); // removes double slashes except after 'https://'

async function MagazineGrid({ articles }: { articles: Post[] }) {


  const styledElements = {
    firstElement: 'sm:border-b-0 md:border-b-1 md:border-r-0 lg:border-b-1 border-l-1 border-r-1 border-t-1',
    secondElement: 'sm:border-l-1 sm:border-r-1 sm:border-b-1 lg:border-b-0 lg:border-r-0 border-l-0 border-t-1',
    thirdElement: 'sm:border-r-1 sm:border-l-1 sm:border-t-0 sm:border-b-0 sm:border-r-0 md:border-b-0 md:border-r-0 lg:border-t-1 lg:border-b-1 lg:border-r-1 border-l-0 border-t-1',
    fourthElement: 'sm:border-r-1 sm:border-l-1 sm:border-t-0 sm:border-r-0 lg:border-l-1 lg:border-r-0 lg:border-b-1 border-r-0 border-t-1 border-b-1',
    fifthElement: 'sm:border-r-1 sm:border-l-1 sm:border-t-0 sm:border-b-1 sm:border-r-0 md:border-t-1 lg:border-b-1 border-r-0 border-l-0',
  };

  return (
    <main className="container mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => {
          const cleanedUrl = cleanImageUrl(article.postImg);
          console.log(`Article ${article.id} - Cleaned URL:`, cleanedUrl);
          
          return (
            <section 
              key={article.id} 
              className={`p-5 ${
                index === 0 ? styledElements.firstElement :
                index === 1 ? styledElements.secondElement :
                index === 2 ? styledElements.thirdElement :
                index === 3 ? styledElements.fourthElement :
                index === 4 ? styledElements.fifthElement :
                ''
              } border-[#222222]`}
            >
              <span className="text-[#222222] text-sm font-medium">{article.date}</span>
              <figure className="p-3">
                <Link href={`/magazine/${article.id}`}>
                  <Image
                    src={cleanedUrl}
                    alt={article.title}
                    width={500}
                    height={500}
                    className="object-cover object-center max-w-full"
                  />
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