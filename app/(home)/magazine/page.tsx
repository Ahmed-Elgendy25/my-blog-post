import HeadingComponent from "@/app/shared/HeadingComponent"
import MagazineGrid from "./_components/MagazineGrid"
import { verifySession } from "@/dal"
import { GetPaginateArticles } from "./_actions/GetPaginatedArticles"
import PaginationList from "./_components/PaginationList"
import { BlogPostsResponse } from "./_schema/PaginatedArticles"

async function page() {
  const session = await verifySession()
  if (!session) return null

  let articles: BlogPostsResponse | null = null;
  try {
    articles = await GetPaginateArticles(0, 'asc')
    console.log("Articles received from API:", articles);
    
 
  } catch (error) {
    console.error("Error fetching articles:", error)
    return (
      <div className="text-center text-red-500">
        Failed to load articles. Please try again later.
      </div>
    )
  }

  if (!articles) {
    console.log("No articles found");
    return (
      <div className="text-center text-gray-500">
        No articles available
      </div>
    )
  }

  return (
    <div>
      <HeadingComponent 
        title="MAGAZINE" 
        headingStyle="text-center font-bold text-[#222222]" 
        overrideStyle={false} 
        inlineStyle={{ fontSize: '12vw' }}
      />
      
      <MagazineGrid articles={articles.content} />
      
      <PaginationList totalPages={articles.totalPages} />
    </div>
  )
}

export default page