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
import { EditorAction } from '../_schema/Editor.model';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Youtube from '@tiptap/extension-youtube';
import styles from "../_styles/tiptap.module.css";
import { useCallback, useDeferredValue, useEffect, useRef } from 'react';
import type { EditorView } from 'prosemirror-view';

async function fetchStreamedAI(selectedText: string, onChunk: (chunk: string) => void) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ text: selectedText }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      onChunk(decoder.decode(value, { stream: true }));
    }
  }
}

function RichTextEditor({
  dispatch,
  title,
  bannerRef,
  generateContent
}: {
  dispatch: React.Dispatch<EditorAction>,
  title: string,
  bannerRef: React.RefObject<string>,
  generateContent: boolean
}) {
  const selectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deferredGenerateContent = useDeferredValue(generateContent);

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
    async ({ editor }: { editor: Editor }) => {
      if (selectionTimer.current) clearTimeout(selectionTimer.current);

      selectionTimer.current = setTimeout(async () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);

        if (selectedText.trim() && deferredGenerateContent) {
          editor.chain().focus().insertContentAt({ from, to }, "").run();

          let buffer = "";
          const flushBuffer = () => {
            if (buffer) {
              editor.chain().focus().insertContent(buffer).run();
              buffer = "";
            }
          };

          await fetchStreamedAI(selectedText, (chunk) => {
            buffer += chunk;
            if (buffer.length > 50) flushBuffer();
          });

          flushBuffer();
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

  return (
    <div className='min-h-screen bg-[#ebebeb]'>
      <MenuBar
        editor={editor}
        title={title}
        bannerRef={bannerRef}
        generateContent={deferredGenerateContent}
        dispatch={dispatch}
      />
      <EditorContent editor={editor} className="p-2" />
    </div>
  );
}

export default RichTextEditor;
