import HeadingComponent from "@/app/shared/HeadingComponent";
import MagazineGrid from "./_components/MagazineGrid";
import { GetPaginateArticles } from "./_actions/GetPaginatedArticles";
import PaginationList from "./_components/PaginationList";
import { BlogPostsResponse } from "./_schema/PaginatedArticles";
import Footer from "../_components/_footer/Footer";
import Navbar from "@/app/shared/Navbar";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

type SearchParamsTyped = Promise<{
  [key: string]: string | string[] | undefined;
}>;

// Pre-generate the first 10 pages at build time
export async function generateStaticParams() {
  // Generate params for pages 1-10
  return Array.from({ length: 2 }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata(props: {
  searchParams: SearchParamsTyped;
}) {
  const { page } = await props.searchParams;
  return {
    title: `Page ${page}`,
    description: `This is the page ${page}.`,
  };
}

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;

  let articles: BlogPostsResponse | null = null;

  try {
    articles = await GetPaginateArticles(Number(page) - 1, "asc");
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
      <Navbar />
      <HeadingComponent
        title="MAGAZINE"
        headingStyle="text-center font-bold text-[#222222]"
        overrideStyle={false}
        inlineStyle={{ fontSize: "12vw" }}
      />

      <MagazineGrid articles={articles.content} />

      <PaginationList totalPages={articles.totalPages} />
      <Footer />
    </>
  );
}

export default page;
