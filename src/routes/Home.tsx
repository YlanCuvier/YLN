import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WorkspaceWindow, { type ResizeEdge, type WorkspaceWindowModel } from '../components/home/WorkspaceWindow';
import { usePageMeta } from '../hooks/usePageMeta';

interface TreeFile {
  name: string;
  route: string;
  sectionId: string;
}

interface TreeFolder {
  name: string;
  route: string;
  hint: string;
  files: TreeFile[];
}

interface WindowGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ViewportSize {
  width: number;
  height: number;
}

const WINDOW_PADDING = 10;
const MIN_WINDOW_WIDTH = 320;
const MIN_WINDOW_HEIGHT = 220;

const treeFolders: TreeFolder[] = [
  {
    name: 'about',
    route: '/about',
    hint: 'profile and principles',
    files: [
      { name: 'intro.md', route: '/about', sectionId: 'about-intro' },
      { name: 'principles.yml', route: '/about', sectionId: 'about-principles' },
      { name: 'socials.json', route: '/about', sectionId: 'about-connect' },
    ],
  },
  {
    name: 'projects',
    route: '/projects',
    hint: 'work archive and filters',
    files: [
      { name: 'overview.md', route: '/projects', sectionId: 'projects-overview' },
      { name: 'filters.conf', route: '/projects', sectionId: 'projects-filters' },
      { name: 'gallery.list', route: '/projects', sectionId: 'projects-gallery' },
    ],
  },
  {
    name: 'contact',
    route: '/contact',
    hint: 'reach out and links',
    files: [
      { name: 'inbox.sh', route: '/contact', sectionId: 'contact-form' },
      { name: 'direct.txt', route: '/contact', sectionId: 'contact-direct' },
      { name: 'links.json', route: '/contact', sectionId: 'contact-socials' },
    ],
  },
];

const sectionBufferContent: Record<string, string[]> = {
  'about-intro': [
    '" about/intro.md',
    'bio: Product-focused frontend engineer with systems mindset.',
    'focus: fast interfaces, clear architecture, maintainable code.',
    'skills: React, TypeScript, design systems, motion choreography.',
    '',
    'related buffers:',
    '  - about/principles.yml',
    '  - about/socials.json',
  ],
  'about-principles': [
    '" about/principles.yml',
    'principles:',
    '  - signal_over_noise',
    '  - narrative_through_motion',
    '  - resilience_by_default',
    '',
    'intent: communicate engineering values and decision style.',
  ],
  'about-connect': [
    '" about/socials.json',
    'contains: social and contact links.',
    'behavior: external links open in new tab when applicable.',
    '',
    'purpose: quick path for collaboration requests.',
  ],
  'projects-overview': [
    '" projects/overview.md',
    'summary: archive of shipped work and delivery context.',
    'layout: card-based scan with editor-like visual treatment.',
    '',
    'next: open filters.conf to refine results.',
  ],
  'projects-filters': [
    '" projects/filters.conf',
    'control: active technology tag for project list.',
    'default: All',
    'effect: narrows gallery to matching stack.',
    '',
    'target section id: #projects-filters',
  ],
  'projects-gallery': [
    '" projects/gallery.list',
    'output: visible project cards after current filter.',
    'includes: title, summary, tech stack, external links.',
    '',
    'tip: use tag filters before scanning cards.',
  ],
  'contact-form': [
    '" contact/inbox.sh',
    'input: name, email, message.',
    'submit action: compose mailto draft via local email client.',
    '',
    'target section id: #contact-form',
  ],
  'contact-direct': [
    '" contact/direct.txt',
    'contains: direct email, location, availability.',
    'format: compact quick-contact panel.',
    '',
    'target section id: #contact-direct',
  ],
  'contact-socials': [
    '" contact/links.json',
    'contains: social profile links.',
    'behavior: outbound links in new tab when needed.',
    '',
    'target section id: #contact-socials',
  ],
};

function clampValue(value: number, min: number, max: number) {
  if (max < min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function getViewportSize(): ViewportSize {
  if (typeof window === 'undefined') {
    return { width: 1280, height: 760 };
  }

  return { width: window.innerWidth, height: window.innerHeight };
}

function clampGeometry(geometry: WindowGeometry, viewport: ViewportSize): WindowGeometry {
  const maxWidth = Math.max(260, viewport.width - WINDOW_PADDING * 2);
  const maxHeight = Math.max(190, viewport.height - WINDOW_PADDING * 2);
  const minWidth = Math.min(MIN_WINDOW_WIDTH, maxWidth);
  const minHeight = Math.min(MIN_WINDOW_HEIGHT, maxHeight);

  const width = clampValue(geometry.width, minWidth, maxWidth);
  const height = clampValue(geometry.height, minHeight, maxHeight);
  const maxX = Math.max(WINDOW_PADDING, viewport.width - width - WINDOW_PADDING);
  const maxY = Math.max(WINDOW_PADDING, viewport.height - height - WINDOW_PADDING);
  const x = clampValue(geometry.x, WINDOW_PADDING, maxX);
  const y = clampValue(geometry.y, WINDOW_PADDING, maxY);

  return { x, y, width, height };
}

function initialWindowGeometry(windowIndex: number, viewport: ViewportSize): WindowGeometry {
  const isMobile = viewport.width < 640;
  const baseWidth = isMobile ? Math.min(420, viewport.width - WINDOW_PADDING * 2) : 540;
  const baseHeight = isMobile ? Math.min(300, viewport.height - WINDOW_PADDING * 2) : 340;
  const x = isMobile ? WINDOW_PADDING + (windowIndex % 4) * 12 : 72 + (windowIndex % 6) * 24;
  const y = isMobile ? 86 + (windowIndex % 4) * 14 : 56 + (windowIndex % 6) * 18;

  return clampGeometry({ x, y, width: baseWidth, height: baseHeight }, viewport);
}

function buildFolderBuffer(folder: TreeFolder): string[] {
  return [
    `" pages/${folder.name}/`,
    `route: ${folder.route}`,
    `hint: ${folder.hint}`,
    '',
    'files:',
    ...folder.files.map((file) => `  - ${file.name} -> #${file.sectionId}`),
    '',
    'workspace mode:',
    '  - drag title bar to move window',
    '  - drag edges/corners to resize',
    '  - :q closes this buffer',
  ];
}

export default function HomePage() {
  const [rootOpen, setRootOpen] = useState(false);
  const [windows, setWindows] = useState<WorkspaceWindowModel[]>([]);
  const nextWindowRef = useRef(0);
  const nextZRef = useRef(40);
  const reduceMotion = useReducedMotion();

  usePageMeta('Home', 'Workspace-style portfolio home with floating Vim windows for folders and file summaries.');

  const openWindow = useCallback((data: Omit<WorkspaceWindowModel, 'id' | 'x' | 'y' | 'width' | 'height' | 'zIndex'>) => {
    setWindows((previous) => {
      const viewport = getViewportSize();
      const geometry = initialWindowGeometry(previous.length, viewport);

      return [
        ...previous,
        {
          id: `workspace-${nextWindowRef.current++}`,
          ...data,
          ...geometry,
          zIndex: ++nextZRef.current,
        },
      ];
    });
  }, []);

  const openFolderWindow = useCallback(
    (folder: TreeFolder) => {
      openWindow({
        title: `${folder.name}/`,
        subtitle: folder.hint,
        bufferPath: `~/pages/${folder.name}/`,
        bufferLines: buildFolderBuffer(folder),
      });
    },
    [openWindow],
  );

  const openFileWindow = useCallback(
    (folder: TreeFolder, file: TreeFile) => {
      openWindow({
        title: file.name,
        subtitle: `${folder.name} :: ${file.sectionId}`,
        bufferPath: `~/pages/${folder.name}/${file.name}`,
        bufferLines: sectionBufferContent[file.sectionId] ?? ['" buffer not found', 'No mapped content for this section yet.'],
      });
    },
    [openWindow],
  );

  const focusWindow = useCallback((windowId: string) => {
    setWindows((previous) => {
      const found = previous.some((item) => item.id === windowId);
      if (!found) {
        return previous;
      }

      const nextZ = ++nextZRef.current;
      return previous.map((item) => (item.id === windowId ? { ...item, zIndex: nextZ } : item));
    });
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindows((previous) => previous.filter((item) => item.id !== windowId));
  }, []);

  const moveWindow = useCallback((windowId: string, dx: number, dy: number) => {
    setWindows((previous) => {
      const viewport = getViewportSize();
      return previous.map((item) => {
        if (item.id !== windowId) {
          return item;
        }

        const clamped = clampGeometry(
          {
            x: item.x + dx,
            y: item.y + dy,
            width: item.width,
            height: item.height,
          },
          viewport,
        );
        return { ...item, ...clamped };
      });
    });
  }, []);

  const resizeWindow = useCallback((windowId: string, edge: ResizeEdge, dx: number, dy: number) => {
    setWindows((previous) => {
      const viewport = getViewportSize();
      return previous.map((item) => {
        if (item.id !== windowId) {
          return item;
        }

        const geometry: WindowGeometry = {
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
        };

        if (edge.includes('e')) {
          geometry.width += dx;
        }
        if (edge.includes('s')) {
          geometry.height += dy;
        }
        if (edge.includes('w')) {
          geometry.x += dx;
          geometry.width -= dx;
        }
        if (edge.includes('n')) {
          geometry.y += dy;
          geometry.height -= dy;
        }

        const clamped = clampGeometry(geometry, viewport);
        return { ...item, ...clamped };
      });
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    function onViewportResize() {
      const viewport = getViewportSize();
      setWindows((previous) =>
        previous.map((item) => {
          const clamped = clampGeometry(item, viewport);
          return { ...item, ...clamped };
        }),
      );
    }

    window.addEventListener('resize', onViewportResize);
    return () => window.removeEventListener('resize', onViewportResize);
  }, []);

  const activeWindowId = useMemo(() => {
    let active: WorkspaceWindowModel | null = null;
    for (const item of windows) {
      if (!active || item.zIndex > active.zIndex) {
        active = item;
      }
    }
    return active?.id ?? null;
  }, [windows]);

  return (
    <>
      <section className="w-full max-w-3xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-xl border border-[#1a3323] bg-[#060d08]/95 shadow-card"
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b3724] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-frost sm:px-6">
            <span>ylan@portfolio:~$ tree ./pages</span>
            <span className="rounded border border-[#1b3724] bg-[#08130d] px-2 py-1 text-[9px] tracking-[0.18em] text-[#83a598]">
              click file/folder to open buffer
            </span>
          </header>

          <div className="space-y-4 px-4 py-5 font-body text-sm leading-7 sm:px-6">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded border border-transparent px-2 py-1 text-left transition hover:border-[#1a3323] hover:bg-[#09130d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cold/60"
              onClick={() => setRootOpen((state) => !state)}
              aria-expanded={rootOpen}
            >
              <span className="text-cold">{rootOpen ? '[-]' : '[+]'}</span>
              <span className="text-ivory">pages/</span>
              <span className="text-xs uppercase tracking-[0.2em] text-frost">project root</span>
            </button>

            {rootOpen ? (
              <div className="space-y-2 pl-3 sm:pl-5">
                {treeFolders.map((folder, folderIndex) => {
                  const folderPrefix = folderIndex === treeFolders.length - 1 ? '`--' : '|--';

                  return (
                    <motion.div
                      key={folder.name}
                      initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.24, delay: folderIndex * 0.06 }}
                      className="space-y-1"
                    >
                      <button
                        type="button"
                        onClick={() => openFolderWindow(folder)}
                        className="flex w-full items-center gap-3 rounded border border-transparent px-2 py-1 text-left transition hover:border-[#1a3323] hover:bg-[#09130d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cold/60"
                      >
                        <span className="text-frost">{folderPrefix}</span>
                        <span className="text-cold">{folder.name}/</span>
                        <span className="text-xs text-frost">{folder.hint}</span>
                      </button>

                      <div className="space-y-1 pl-7">
                        {folder.files.map((file, fileIndex) => {
                          const filePrefix = fileIndex === folder.files.length - 1 ? '`--' : '|--';

                          return (
                            <button
                              key={file.name}
                              type="button"
                              onClick={() => openFileWindow(folder, file)}
                              className="flex w-full items-center gap-3 rounded border border-transparent px-2 py-1 text-left text-ivory/90 transition hover:border-[#1a3323] hover:bg-[#09130d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cold/60"
                            >
                              <span className="text-frost">{filePrefix}</span>
                              <span>{file.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="pl-2 text-xs uppercase tracking-[0.18em] text-frost">open pages/ to reveal folders and files</p>
            )}
          </div>
        </motion.div>
      </section>

      {windows.length > 0 ? (
        <div className="pointer-events-none fixed inset-0 z-40">
          {windows.map((windowItem) => (
            <WorkspaceWindow
              key={windowItem.id}
              window={windowItem}
              active={windowItem.id === activeWindowId}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMove={moveWindow}
              onResize={resizeWindow}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
