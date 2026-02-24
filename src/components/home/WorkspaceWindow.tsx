import { useRef, type PointerEvent as ReactPointerEvent } from 'react';

export type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface WorkspaceWindowModel {
  id: string;
  title: string;
  subtitle: string;
  bufferPath: string;
  bufferLines: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface WorkspaceWindowProps {
  window: WorkspaceWindowModel;
  active: boolean;
  onFocus: (windowId: string) => void;
  onClose: (windowId: string) => void;
  onMove: (windowId: string, dx: number, dy: number) => void;
  onResize: (windowId: string, edge: ResizeEdge, dx: number, dy: number) => void;
}

interface PointerState {
  pointerId: number;
  lastX: number;
  lastY: number;
}

const RESIZE_HANDLES: Array<{ edge: ResizeEdge; className: string }> = [
  { edge: 'n', className: '-top-1 left-4 right-4 h-2 cursor-ns-resize' },
  { edge: 's', className: '-bottom-1 left-4 right-4 h-2 cursor-ns-resize' },
  { edge: 'e', className: '-right-1 bottom-4 top-4 w-2 cursor-ew-resize' },
  { edge: 'w', className: '-left-1 bottom-4 top-4 w-2 cursor-ew-resize' },
  { edge: 'ne', className: '-right-1 -top-1 h-3 w-3 cursor-nesw-resize' },
  { edge: 'nw', className: '-left-1 -top-1 h-3 w-3 cursor-nwse-resize' },
  { edge: 'se', className: '-bottom-1 -right-1 h-3 w-3 cursor-nwse-resize' },
  { edge: 'sw', className: '-bottom-1 -left-1 h-3 w-3 cursor-nesw-resize' },
];

export default function WorkspaceWindow({ window, active, onFocus, onClose, onMove, onResize }: WorkspaceWindowProps) {
  const dragStateRef = useRef<PointerState | null>(null);
  const resizeStateRef = useRef<(PointerState & { edge: ResizeEdge }) | null>(null);

  function onDragStart(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    onFocus(window.id);
    dragStateRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onDragMove(event: ReactPointerEvent<HTMLElement>) {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    if (dx !== 0 || dy !== 0) {
      onMove(window.id, dx, dy);
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    }
  }

  function onDragEnd(event: ReactPointerEvent<HTMLElement>) {
    const state = dragStateRef.current;
    if (state && state.pointerId === event.pointerId) {
      dragStateRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onResizeStart(edge: ResizeEdge, event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onFocus(window.id);
    resizeStateRef.current = {
      edge,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onResizeMove(event: ReactPointerEvent<HTMLDivElement>) {
    const state = resizeStateRef.current;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    if (dx !== 0 || dy !== 0) {
      onResize(window.id, state.edge, dx, dy);
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    }
  }

  function onResizeEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const state = resizeStateRef.current;
    if (state && state.pointerId === event.pointerId) {
      resizeStateRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <article
      className={[
        'pointer-events-auto absolute select-none overflow-hidden rounded-md border bg-[#0e1410]/95 shadow-[0_22px_48px_rgba(0,0,0,0.5)]',
        active ? 'border-[#fabd2f] shadow-[0_0_0_1px_rgba(250,189,47,0.45),0_22px_48px_rgba(0,0,0,0.56)]' : 'border-[#385040]',
      ].join(' ')}
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      }}
      onPointerDown={() => onFocus(window.id)}
      aria-label={`${window.title} workspace window`}
    >
      <header
        className={[
          'flex cursor-move items-center justify-between border-b px-3 py-2 font-body text-[10px] uppercase tracking-[0.18em] touch-none',
          active
            ? 'border-[#665c54] bg-[linear-gradient(90deg,rgba(42,55,44,0.98),rgba(24,32,26,0.98))] text-[#fbf1c7]'
            : 'border-[#3f4a41] bg-[linear-gradient(90deg,rgba(29,38,32,0.98),rgba(18,24,20,0.98))] text-[#d5c4a1]',
        ].join(' ')}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className={active ? 'text-[#fabd2f]' : 'text-[#7c8f79]'}>{active ? '[*]' : '[ ]'}</span>
          <span className="truncate">{window.title}</span>
          <span className="truncate text-[#a89984]">{window.subtitle}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[#b8bb26] sm:block">-- NORMAL --</span>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onClose(window.id)}
            className="rounded-sm border border-[#7c6f64] px-2 py-1 text-[9px] tracking-[0.2em] text-[#fbf1c7] transition hover:border-[#fabd2f] hover:text-[#fabd2f]"
            aria-label={`Close ${window.title}`}
          >
            :q
          </button>
        </div>
      </header>

      <div className="h-[calc(100%-58px)] overflow-auto bg-[#0a100c]/95 px-3 py-2.5 font-body text-[12px] leading-6 text-[#d5c4a1]">
        <p className="mb-2 border-b border-[#2a3a30] pb-2 text-[10px] uppercase tracking-[0.2em] text-[#83a598]">{window.bufferPath}</p>
        {window.bufferLines.map((line, index) => (
          <div key={`${window.id}-line-${index}`} className="flex gap-3">
            <span className="w-7 shrink-0 text-right text-[#6f776f]">{index + 1}</span>
            <span className="whitespace-pre-wrap break-words">{line}</span>
          </div>
        ))}
      </div>

      {RESIZE_HANDLES.map((handle) => (
        <div
          key={`${window.id}-${handle.edge}`}
          className={`absolute touch-none ${handle.className}`}
          onPointerDown={(event) => onResizeStart(handle.edge, event)}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
          onPointerCancel={onResizeEnd}
          aria-hidden="true"
        />
      ))}
    </article>
  );
}
