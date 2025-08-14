'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Youtube from '@tiptap/extension-youtube';
import styles from "../_styles/tiptap.module.css";
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { EditorActionTyped } from '../_schema/Editor.model';
import { useHandlePaste } from '../_hooks/useHandlePaste';
import { useStreamingSelection } from '../_hooks/useStreamingSelection';
import { useLoadingOverlayPosition } from '../_hooks/useLoadingOverlayPosition';
import SkeletonOverlay from './SkeletonOverlay';


function RichTextEditor({
  dispatch,
  title,
  bannerRef,
  generateContent
}: {
  dispatch: React.Dispatch<EditorActionTyped>,
  title: string,
  bannerRef: React.RefObject<string>,
  generateContent: boolean
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deferredGenerateContent = useDeferredValue(generateContent);
  const [loadingPos, setLoadingPos] = useState<number | null>(null);
  const handlePaste = useHandlePaste();
  const { handleSelectionUpdate, selectionTimer } = useStreamingSelection(
    deferredGenerateContent,
    dispatch,
    setLoadingPos
  );

  // Streaming selection handler comes from hook

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
        controls: false,
        nocookie: true
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: `h-full p-5 border-0 focus-visible:outline-0 overflow-y-auto ${styles.tiptap}`,
      },
      handlePaste,
    },
    onUpdate: ({ editor }) => {
      dispatch({ type: 'SET_CONTENT', payload: editor.getHTML() });
    },
    onSelectionUpdate: handleSelectionUpdate,
    immediatelyRender:false
  });

  useEffect(() => {
    const timer = selectionTimer.current;
    return () => {
      if (timer) clearTimeout(timer);
      editor?.destroy();
    };
  }, [editor, selectionTimer]);

  // Compute coordinates for the overlay relative to the container
  const loadingCoords = useLoadingOverlayPosition(editor, loadingPos, containerRef);

  return (
    <div ref={containerRef} className='relative min-h-screen bg-[#ebebeb] overflow-hidden'>
      <MenuBar
        editor={editor}
        title={title}
        bannerRef={bannerRef}
        generateContent={deferredGenerateContent}
        dispatch={dispatch}
      />
      <EditorContent editor={editor} className="p-2" />
      {loadingCoords && (
        <SkeletonOverlay top={loadingCoords.top} left={loadingCoords.left} />
      )}
    </div>
  );
}

export default RichTextEditor;
