"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";

import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from "@tiptap/extension-youtube";
import { TableKit } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Link } from "@tiptap/extension-link";

import { Markdown } from "tiptap-markdown";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { EditorActionTyped } from "../_schema/Editor.model";
import { useHandlePaste } from "../_hooks/useHandlePaste";
import { useStreamingSelection } from "../_hooks/useStreamingSelection";
import { useLoadingOverlayPosition } from "../_hooks/useLoadingOverlayPosition";
import SkeletonOverlay from "./SkeletonOverlay";

function RichTextEditor({
  dispatch,
  title,
  bannerRef,
  generateContent,
  content,
}: {
  dispatch: React.Dispatch<EditorActionTyped>;
  title: string;
  bannerRef: React.RefObject<string>;
  generateContent: boolean | undefined;
  content: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deferredGenerateContent = useDeferredValue(generateContent);
  const [loadingPos, setLoadingPos] = useState<number | null>(null);
  const handlePaste = useHandlePaste();
  const { handleSelectionUpdate, selectionTimer } = useStreamingSelection(
    deferredGenerateContent || false,
    dispatch,
    setLoadingPos,
  );

  // Streaming selection handler comes from hook

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
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
        nocookie: true,
      }),
      TableKit,
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
      }),
      Markdown.configure({
        html: true, // Enables Markdown → HTML rendering
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: `min-h-[500px] resize-none border-0 p-0 text-base leading-relaxed focus-visible:outline-0 focus-visible:ring-0 `,
      },
      handlePaste,
    },
    onUpdate: ({ editor }) => {
      dispatch({ type: "SET_CONTENT", payload: editor.getHTML() });
    },
    onSelectionUpdate: handleSelectionUpdate,
    immediatelyRender: false,
  });

  // Sync external content changes to editor
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  useEffect(() => {
    const timer = selectionTimer.current;
    return () => {
      if (timer) clearTimeout(timer);
      editor?.destroy();
    };
  }, [editor, selectionTimer]);

  // Compute coordinates for the overlay relative to the container
  const loadingCoords = useLoadingOverlayPosition(
    editor,
    loadingPos,
    containerRef,
  );

  return (
    <div ref={containerRef} className="relative bg-card">
      <MenuBar
        editor={editor}
        title={title}
        bannerRef={bannerRef}
        generateContent={deferredGenerateContent || false}
        dispatch={dispatch}
      />
      <div className="p-6 lg:p-8">
        <EditorContent editor={editor} className="min-h-[500px]" />
      </div>
      {loadingCoords && (
        <SkeletonOverlay top={loadingCoords.top} left={loadingCoords.left} />
      )}
    </div>
  );
}

export default RichTextEditor;
