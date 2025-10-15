import MainComponent from "./_components/MainComponent";
import { BlogPostsResponse } from "./magazine/_schema/PaginatedArticles";
import { GetPaginateArticles } from "./magazine/_actions/GetPaginatedArticles";

export default async function Home() {
  let articles: BlogPostsResponse | null = null;

  try {
    articles = await GetPaginateArticles(0, "asc", 4);
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500">
        Failed to load articles. Please try again later.
      </div>
    );
  }

  if (!articles) {
    return (
      <div className="text-center text-gray-500">No articles available</div>
    );
  }

  return (
    <>
      <MainComponent articles={articles} />
    </>
  );
}
