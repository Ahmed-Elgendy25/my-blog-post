/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */



'use client';

import { useEditor, EditorContent} from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block'

import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import { EditorAction } from '../_schema/Editor.model';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Youtube from '@tiptap/extension-youtube'



import styles from "../_styles/tiptap.module.css"
import { useState } from 'react';


function RichTextEditor({ setContent,title, bannerRef }: {  setContent: React.Dispatch<EditorAction>;
title:string ,bannerRef:React.RefObject<string> }) {


  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);

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
      CodeBlock,

      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
      HorizontalRule,
      Youtube.configure({
        controls:false,
        nocookie:true
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: `h-full p-5 border-0 focus-visible:outline-0 overflow-y-auto ${styles.tiptap}`,
      },
      handlePaste(view, event) {
        const html = event.clipboardData?.getData('text/html');
        const plain = event.clipboardData?.getData('text/plain');
      
        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const content = doc.body.textContent || '';
      
          view.dispatch(
            view.state.tr.insertText(content)
          );
          return true;
        }
      
        return false;
      }
      
    },
    onUpdate: ({ editor }) => {
      setContent({ type: 'SET_CONTENT', payload: editor.getHTML() });
    },
    immediatelyRender:false,
  });

  return (
    <div className='min-h-screen bg-[#ebebeb]'>
    
      <MenuBar editor={editor} title={title} bannerRef={bannerRef} />
      <EditorContent editor={editor}  className={`p-2  `} />
    </div>
  );
}
export default RichTextEditor;
