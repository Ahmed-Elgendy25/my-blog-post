import Banner from "./_components/Banner";
import HeadingDetails from "./_components/HeadingDetails";
import Article from "./_components/Article";
import { GetSpecificPost } from "./_actions/GetSpecificPost";
import { GetImagesPost } from "./_actions/GetImagesPost";
import { GetUserById } from "./_actions/GetUserById";
import { imageUrls, SpecificPostTyped, UserTyped } from "./_schema/PostById";
import Navbar from "@/app/shared/Navbar";
import Comments from "./_components/Comments";

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
  const user: UserTyped = await GetUserById(post.authorId);

  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-12 p-0 md:p-5 gap-6 md:gap-8">
            <HeadingDetails
              subTitle={post.subTitle}
              title={post.title}
              durationRead={post.durationRead}
              author={user.firstName + " " + user.lastName}
              date={post.date}
            />
            <Banner banner={post.postImg} />
            <Article
              userImg={user.userImg}
              content={post.content}
              user={user}
              date={post.date}
              durationRead={post.durationRead}
              images={images}
            />
          </div>

          <hr className="my-5 border-t border-gray-300" />

          <Comments />
        </div>
      </main>
    </>
  );
}

export default page;
