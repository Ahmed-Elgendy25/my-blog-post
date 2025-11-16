import Banner from "./_components/Banner";
import HeadingDetails from "./_components/HeadingDetails";
import Article from "./_components/Article";
import { GetSpecificPost } from "./_actions/GetSpecificPost";
import { GetImagesPost } from "./_actions/GetImagesPost";
import { GetUserById } from "./_actions/GetUserById";
import { imageUrls, SpecificPostTyped, UserTyped } from "./_schema/PostById";
import Navbar from "@/app/shared/Navbar";
import Comments from "./_components/Comments";
import { supabaseRequest } from "@/lib/supabase/request";

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

// Pre-generate all existing posts at build time
export async function generateStaticParams() {
  try {
    const posts = await supabaseRequest(async (supabase) => {
      const { data, error } = await supabase
        .from("posts")
        .select("id")
        .order("date", { ascending: false })
        .limit(100); // Limit to most recent 100 posts for build performance

      if (error) {
        console.error("Error fetching posts for static params:", error);
        return [];
      }

      return data || [];
    });

    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: SpecificPostTyped = await GetSpecificPost(id);

  return {
    title: `${post.title}`,
    description: `${post.title}`,
  };
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post: SpecificPostTyped = await GetSpecificPost(id);

  if (!post) {
    return null;
  }

  const images: imageUrls[] = await GetImagesPost(post.title);
  const user: UserTyped | null = await GetUserById(post.author_id);
  // Handle case where user is not found
  if (!user) {
    return (
      <>
        <Navbar />
        <main>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5">
            <p>Error: User not found for this post</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex flex-col items-center">
        {/* Hero Section - Title */}
        <div className="w-full bg-white dark:bg-gray-900">
          <div className="w-full py-6 sm:py-8 lg:py-10">
            <HeadingDetails
              subTitle={post.sub_title}
              title={post.title}
              durationRead={post.duration_read}
              author={
                user.first_name.toUpperCase() +
                " " +
                user.last_name.toUpperCase()
              }
              date={post.date}
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Banner */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <Banner banner={post.banner} />
          </div>

          <Article
            userImg={user.user_img}
            content={post.content}
            user={user}
            images={images || null}
          />

          <hr className="my-12 sm:my-16 border-t border-gray-200 dark:border-gray-800" />

          <Comments />
        </div>
      </main>
    </>
  );
}

export default page;
