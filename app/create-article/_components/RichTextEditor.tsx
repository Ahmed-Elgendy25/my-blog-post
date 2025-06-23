'use client';

import { useEditor, EditorContent} from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import { EditorAction } from '../_schema/Editor.model';

function RichTextEditor({ setContent,title, bannerRef }: {  setContent: React.Dispatch<EditorAction>;
title:string ,bannerRef:React.RefObject<string> }) {
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
      handlePaste(view, event) {
        const html = event.clipboardData?.getData('text/html');
        const plain = event.clipboardData?.getData('text/plain');
  
        if (html) {
          view.dispatch(
            view.state.tr.replaceSelectionWith(
              view.state.schema.nodeFromJSON(
                view.state.schema.node(html).toJSON()
              )
            )
          );
          return true;
        } else if (plain && plain.trim().startsWith('<')) {
          // Interpret plain text that looks like HTML as HTML
          view.dom.innerHTML = plain;
          return true;
        }
  
        return false; // fallback to default
      },
    },
    onUpdate: ({ editor }) => {
      setContent({ type: 'SET_CONTENT', payload: editor.getHTML() });
    },
    immediatelyRender:false,
  });

  return (
    <div className='min-h-screen bg-[#ebebeb]'>
    
      <MenuBar editor={editor} title={title} bannerRef={bannerRef} />
      <EditorContent editor={editor}  className=" p-2 " />
    </div>
  );
}
export default RichTextEditor;
