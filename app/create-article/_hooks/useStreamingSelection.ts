import { useCallback, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorActionTyped } from '../_schema/Editor.model';
import { fetchStreamedAI } from '../_actions/FetchStreamedAI';
import { marked } from 'marked';

export function useStreamingSelection(
  deferredGenerateContent: boolean,
  dispatch: React.Dispatch<EditorActionTyped>,
  setLoadingPos: (pos: number | null) => void
) {
  const selectionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectionUpdate = useCallback(
    async ({ editor }: { editor: Editor }) => {
      if (selectionTimer.current) clearTimeout(selectionTimer.current);

      selectionTimer.current = setTimeout(async () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);

        if (selectedText.trim() && deferredGenerateContent) {
          editor.chain().focus().insertContentAt({ from, to }, '').run();
          setLoadingPos(from);
          editor.setEditable(false);
          dispatch({ type: 'GENERATE_CONTENT', payload: false });

          let buffer = '';
          const flushBuffer = () => {
            if (buffer) {
              setLoadingPos(null);
              const html = marked.parse(buffer); // Convert markdown to HTML
              
              editor.chain()
                .focus()
                .insertContent({
                  type: 'paragraph', // fallback if HTML parsing fails
                  content: [],
                  // let TipTap parse the HTML
                })
                .run();
          
              editor.commands.insertContent(html, { parseOptions: { preserveWhitespace: false } });
              buffer = '';
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
    [deferredGenerateContent, dispatch, setLoadingPos]
  );

  return { handleSelectionUpdate, selectionTimer } as const;
}
