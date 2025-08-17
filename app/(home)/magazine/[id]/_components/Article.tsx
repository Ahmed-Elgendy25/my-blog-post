import Image from 'next/image';
import parse, { DOMNode } from 'html-react-parser';
import { imageUrls, UserTyped } from '../_schema/PostById';
import React from 'react';
import {  InstagramLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import placeholderImage from '@/public/landscape-placeholder-svgrepo-com.png'

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
  images: imageUrls[];
}) {
  const replaceImagePlaceholder = (domNode: DOMNode) => {
    if (domNode.type === 'text') {
      const matches = [...domNode.data.matchAll(/{{image:img(\d+)}}/g)];
      if (matches.length === 0) return;
  
      const elements: (string |React.ReactNode)[] = [];
      let lastIndex = 0;
  
      for (const match of matches) {
        const [placeholder, indexStr] = match;
        const index = parseInt(indexStr);
        const imageUrl = images?.[index]?.data?.publicUrl;
  
        // Push text before the match
        elements.push(domNode.data.slice(lastIndex, match.index));
  
        if (imageUrl) {
          elements.push(
            <div key={placeholder} className="relative w-full  min-h-[45rem]   my-4">
              <Image
                src={imageUrl}
                alt="Article image"
                fill
                className='  object-cover '
              />
            </div>
          );
        } else {
          elements.push(placeholder); // if not found, push raw
        }
  
        lastIndex = match.index! + placeholder.length;
      }
  
      // Push remaining text
      elements.push(domNode.data.slice(lastIndex));
  
      return <>{elements}</>;
    }
  };
  
  const options = { replace: replaceImagePlaceholder };
  const parsedContent = parse(content, options);
  

  return (
    <>
      <aside className='col-span-4 mt-10  '>
      <div className='sticky top-10'>
    <div className='flex items-center gap-x-2 border-[#222222] border-b-1 p-4'>

    {
                             !userImg?     
                              <Image
                                placeholder="empty"
                                src={placeholderImage}
                                alt={`${user.firstName} ${user.lastName}`}
                                width={150} 
                                height={500}
                                className="object-cover rounded-[50%]"
                              />: 
                              <Image
                              src={userImg}
                              alt={`${user.firstName} ${user.lastName}`}
                              width={150} 
                              height={500}
                              className="object-cover rounded-[50%]"
                              /> 
                                }

      <h2 className='text-3xl font-bold text-[#222222]'>
        {`${user.firstName} ${user.lastName}`}
      </h2>
    </div>

    
    <ul className='flex flex-col gap-y-2 py-3 px-4'>
      <li className='flex justify-between text-md text-[#222222]'>
        <span className='font-bold'>Date</span>
        <p>{date}</p>
      </li>
      <li className='flex justify-between text-md text-[#222222]'>
        <span className='font-bold'>Read</span>
        <p>{durationRead}</p>
      </li>
      <li className='flex justify-between  text-md text-[#222222]'>
        <span className='flex  font-bold'>Share</span>
       <div  className=' flex gap-x-3  '>
        <Link href={"https://www.linkedin.com/"}><LinkedinLogo   size={28} weight='fill'  /></Link>
        <Link href={"https://www.x.com/"}><XLogo size={28} weight='fill' /></Link>
        <Link href={"https://www.instagram.com/"}><InstagramLogo   size={28} weight='fill' /></Link>
       </div>
      </li>
    </ul>
  </div>

      </aside>

      <article className='col-span-8 mt-10   h-full  p-7'>
        {parsedContent}
      </article>
    </>
  );
}

export default Article;
