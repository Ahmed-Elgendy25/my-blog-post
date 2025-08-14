import { RefObject, useLayoutEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';

export function useLoadingOverlayPosition(
  editor: Editor | null,
  loadingPos: number | null,
  containerRef: RefObject<HTMLDivElement | null>
) {
  const [loadingCoords, setLoadingCoords] = useState<{ top: number; left: number } | null>(null);

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
  }, [editor, loadingPos, containerRef]);

  return loadingCoords;
}
