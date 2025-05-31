'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';

function RichTextEditor({ setContent,title, bannerRef }: { setContent: React.Dispatch<React.SetStateAction<string>> ,title:string ,bannerRef:React.RefObject<string> }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Heading.configure({ levels: [1, 2, 3] }),
      Highlight,
      BulletList,
      OrderedList,
      ListItem,
      Image,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'h-full p-5 border-0 focus-visible:outline-0 overflow-y-auto',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender:false,
    
  });

  return (
    <div className='min-h-screen bg-[#ebebeb]'>
    
      <MenuBar editor={editor} title={title} bannerRef={bannerRef} />
      <EditorContent editor={editor}  />
    </div>
  );
}
export default RichTextEditor;
