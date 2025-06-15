import Image from 'next/image';
import { UserTyped } from '../_schema/PostById';

function Article({
  userImg,
  content,
  user,
  date,
  durationRead,
  images
}: {
  userImg: string;
  content: string;
  user: UserTyped;
  date: string;
  durationRead: string;
  images: string[];
}) {
  
      
  return (
    <>
      <aside className='col-span-4 mt-10 bg-pink-500'>
        <div className='flex items-center gap-x-2 border-[#222222] border-b-1'>
          <Image
            src={userImg}
            alt="User"
            width={120}
            height={100}
            className='rounded-[50%] p-3 w-[120px] h-[100px] object-cover'
          />
          <h2 className='text-3xl font-bold text-[#222222]'>
            {`${user.firstName} ${user.lastName}`}
          </h2>
        </div>
        <ul className='flex flex-col gap-y-2 py-3'>
          <li className='flex justify-between text-md text-[#222222]'>
            <span className='font-bold'>Date</span>
            <p>{date}</p>
          </li>
          <li className='flex justify-between text-md text-[#222222]'>
            <span className='font-bold'>Read</span>
            <p>{durationRead}</p>
          </li>
          <li className='flex justify-between text-md text-[#222222]'>
            <span className='font-bold'>Share</span>
            <p></p>
          </li>
        </ul>
      </aside>

      <article className='col-span-7 mt-10 bg-red-400 prose'>
        {renderContentWithImages()}
      </article>
    </>
  );
}

export default Article;
