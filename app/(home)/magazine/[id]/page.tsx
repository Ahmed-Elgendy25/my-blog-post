import Banner from "./_components/Banner"
import HeadingDetails from "./_components/HeadingDetails"
import Article from "./_components/Article"
import { GetSpecificPost } from "./_actions/GetSpecificPost"
import { GetImagesPost } from "./_actions/GetImagesPost"
import { GetUserById } from "./_actions/GetUserById"
import { imageUrls, SpecificPostTyped, UserTyped } from "./_schema/PostById"
import Navbar from "@/app/shared/Navbar"
import Comments from "./_components/Comments"
 
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;

  const post:SpecificPostTyped = await GetSpecificPost(id);



  return {
    title: `${post.title}`,
    description: `${post.title}`
  }
}

async function page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const {id} = await params;
    
    const post:SpecificPostTyped = await GetSpecificPost(id);
    
    if (!post) {
      return null; 
    }

    const images:imageUrls[] = await GetImagesPost(post.title);
    const user:UserTyped = await GetUserById(post.authorId);



    return ( 
      <>
            <Navbar/>
        <main>
            <div className="container mx-auto p-5 ">
                <div className=" grid grid-cols-12  p-5 gap-5 ">
                    <HeadingDetails subTitle={post.subTitle} title={post.title} durationRead={post.durationRead} author={user.firstName + " " + user.lastName} date={post.date}/>
                    <Banner banner={post.postImg}/>
                    <Article  userImg={user.userImg} content={post.content} user={user} date={post.date} durationRead={post.durationRead} images={images}/>   
                </div>

                <hr/>
               
                <Comments/>

            </div>
        </main>
      </>
    )
}

export default page