import { useCallback } from 'react';
import type { EditorView } from 'prosemirror-view';

export function useHandlePaste() {
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

  return handlePaste;
}
