'use client';
import  { useRef, useState} from 'react'
import Preview from './Preview'
import RichTextEditor from './RichTextEditor'
import ButtonComponent from '@/app/shared/ButtonComponent';
import createPost from '../_actions/CreatePost';
import InputComponent from '@/app/shared/InputComponent';


function EditorWrapper() {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const bannerRef = useRef<string>('');
    const handlePublish = async () => {
     
        const postData = {
          content,
          title,
          durationRead:duration
        }
        
        if (!title.trim()) {
          console.error("Title is required");
          return;
        }
        
        const response = await createPost(postData, bannerRef.current);
        setContent('');
        setTitle('');
        setDuration('');
        bannerRef.current = '';
        if (response.success) {
          console.log("Post created successfully");
          console.log("Post data:", response.data);
          // You might want to add a success notification or redirect here
        } else {
          // Instead of just logging, handle the error more gracefully
          const errorMessage = response.error instanceof Error 
            ? response.error.message 
            : "Failed to create post";
          console.error(errorMessage);
        }
    
    }
 
    return (
      <>
        <section className="md:w-[50rem] mx-auto lg:p-5 bg-[#f6f6f6ec] mb-[10rem]">
        <div className='flex gap-x-0.5'>
        <InputComponent input={
        <input type="text" placeholder="Enter The Title" name='title' onChange={(e) => setTitle(e.target.value)} className="w-full p-5 bg-[#222222] text-[#e7e8e2] font-medium text-3xl focus-visible:outline-0 "/>
      } />

           <InputComponent input={
        <input type="text" placeholder="Enter The Duration" name='duration' onChange={(e) => setDuration(e.target.value)} className="w-full p-5 bg-[#222222] text-[#e7e8e2] font-medium text-3xl focus-visible:outline-0 "/>
      } />
        </div>
    
          <RichTextEditor  setContent={setContent} title={title} bannerRef={bannerRef} />

          <ButtonComponent type="submit" overrideStyle={true} style="min-w-full  mt-3" onClick={handlePublish}>Publish</ButtonComponent>

        </section>
        
             <section className="md:w-[50rem] mx-auto p-5 bg-[#f6f6f6ec] mb-[10rem]">
            <Preview content={content}  />
          </section>
        
      
      </>
    );
}

export default EditorWrapper;
