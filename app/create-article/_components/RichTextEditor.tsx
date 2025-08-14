'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
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
import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { EditorView } from 'prosemirror-view';
import { Skeleton } from '@/components/ui/skeleton';
import { EditorActionTyped } from '../_schema/Editor.model';
import { fetchStreamedAI } from '../_actions/FetchStreamedAI';


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
  const selectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deferredGenerateContent = useDeferredValue(generateContent);
  const [loadingPos, setLoadingPos] = useState<number | null>(null);
  const [loadingCoords, setLoadingCoords] = useState<{ top: number; left: number } | null>(null);

  const handlePaste = useCallback((view: EditorView, event: ClipboardEvent) => {
    const html = event.clipboardData?.getData('text/html');
    if (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const content = doc.body.textContent || '';
      view.dispatch(view.state.tr.insertText(content));
      return true;
    }
    return false;
  }, []);

  const handleSelectionUpdate = useCallback(
    async ({ editor }: { editor: Editor}) => {
      if (selectionTimer.current) clearTimeout(selectionTimer.current);

      selectionTimer.current = setTimeout(async () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);

        if (selectedText.trim() && deferredGenerateContent) {
          editor.chain().focus().insertContentAt({ from, to }, "").run();
          setLoadingPos(from);
          editor.setEditable(false);
          dispatch({type:'GENERATE_CONTENT',payload:false});

          let buffer = "";
          const flushBuffer = () => {
            if (buffer) {
              setLoadingPos(null);
              editor.chain().focus().insertContent(buffer).run();
              

              buffer = "";
            }
          };
          await fetchStreamedAI(selectedText, (chunk) => {
            buffer += chunk;
            if (buffer.length > 50) flushBuffer();
          });

      

          flushBuffer();
      
          editor.setEditable(true);
        }
      }, 500);
    },
    [deferredGenerateContent]
  );

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
    return () => {
      if (selectionTimer.current) clearTimeout(selectionTimer.current);
      editor?.destroy();
    };
  }, [editor]);

  // Compute coordinates relative to the wrapper so absolute overlay stays within it
  useLayoutEffect(() => {
    const compute = () => {
      if (!editor || loadingPos == null || !containerRef.current) {
        setLoadingCoords(null);
        return;
      }
      try {
        const caret = editor.view.coordsAtPos(loadingPos);
        const rect = containerRef.current.getBoundingClientRect();
        const top = caret.top - rect.top + containerRef.current.scrollTop;
        const left = caret.left - rect.left + containerRef.current.scrollLeft;
        setLoadingCoords({ top, left });
      } catch {
        setLoadingCoords(null);
      }
    };

    compute();
    const onScrollOrResize = () => compute();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [editor, loadingPos]);

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
        <div
          className="absolute pointer-events-none z-50 -translate-y-1 flex flex-col gap-2 animate-pulse"
          style={{ top: loadingCoords.top, left: loadingCoords.left }}
          aria-hidden="true"
        >
          <Skeleton className="h-[18px] w-[280px] rounded-full bg-[#222222]" />
          <Skeleton className="h-[18px] w-[360px] rounded-full bg-[#222222]" />
          <Skeleton className="h-[18px] w-[300px] rounded-full bg-[#222222]" />
          <Skeleton className="h-[18px] w-[340px] rounded-full bg-[#222222]" />
          <Skeleton className="h-[18px] w-[200px] rounded-full bg-[#222222]" />
        </div>
      )}
    </div>
  );
}

export default RichTextEditor;
