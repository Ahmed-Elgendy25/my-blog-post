'use client';
import  { useState} from 'react'
import Preview from './Preview'
import RichTextEditor from './RichTextEditor'


function EditorWrapper() {
    const [content, setContent] = useState<string>('');

 console.log("content: ",content)

    return (
      <>
        <div className="md:w-[50rem] mx-auto lg:p-5 bg-[#f6f6f6ec] mb-[10rem]">
          <RichTextEditor setContent={setContent} />
        </div>
        
             <div className="md:w-[50rem] mx-auto p-5 bg-[#f6f6f6ec] mb-[10rem]">
            <Preview content={content} />
          </div>
        
      
      </>
    );
}

export default EditorWrapper;
