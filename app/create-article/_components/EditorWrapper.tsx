'use client';
import  { useState} from 'react'
import Preview from './Preview'
import RichTextEditor from './RichTextEditor'
import ButtonComponent from '@/app/shared/ButtonComponent';
import createPost from '../_actions/CreatePost';


function EditorWrapper() {
    const [content, setContent] = useState<string>('');

    const handlePublish = async () => {
      const response = await createPost(content);
      if (response.success) {
        console.log("Post created successfully");
        console.log("Post data:", response.data);
      } else {
        console.error("Failed to create post");
        console.error("Error:", response.error);
        }
    }
 
    return (
      <>
        <section className="md:w-[50rem] mx-auto lg:p-5 bg-[#f6f6f6ec] mb-[10rem]">
          <RichTextEditor setContent={setContent} />

          <ButtonComponent type="submit" overrideStyle={true} style="min-w-full  mt-3" onClick={handlePublish}>Publish</ButtonComponent>

        </section>
        
             <section className="md:w-[50rem] mx-auto p-5 bg-[#f6f6f6ec] mb-[10rem]">
            <Preview content={content} />
          </section>
        
      
      </>
    );
}

export default EditorWrapper;
