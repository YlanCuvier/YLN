import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function HomePage() {
  const [rootOpen, setRootOpen] = useState(true);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  usePageMeta('Home', 'Vim-inspired portfolio explorer with folders for pages and files for page sections.');

  return (
    <section className="w-full max-w-3xl">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-xl border border-[#1a3323] bg-[#060d08]/95 shadow-card"
      >
        <header className="border-b border-[#1b3724] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-frost sm:px-6">
          ylan@portfolio:~$ tree ./pages
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
                      onClick={() => navigate(folder.route)}
                      className="flex w-full items-center gap-3 rounded border border-transparent px-2 py-1 text-left transition hover:border-[#1a3323] hover:bg-[#09130d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cold/60"
                    >
                      <span className="text-frost">{folderPrefix}</span>
                      <span className="text-cold">{folder.name}/</span>
                      <span className="text-xs text-frost">{folder.hint}</span>
                    </button>

                    <div className="space-y-1 pl-7">
                      {folder.files.map((file, fileIndex) => {
                        const filePrefix = fileIndex === folder.files.length - 1 ? '`--' : '|--';
                        const target = `${file.route}#${file.sectionId}`;

                        return (
                          <div key={file.name}>
                            <button
                              type="button"
                              onClick={() => navigate(target)}
                              className="hidden w-full items-center gap-3 rounded border border-transparent px-2 py-1 text-left text-ivory/90 transition hover:border-[#1a3323] hover:bg-[#09130d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cold/60 sm:flex"
                            >
                              <span className="text-frost">{filePrefix}</span>
                              <span>{file.name}</span>
                            </button>
                            <div className="flex items-center gap-3 rounded px-2 py-1 text-frost sm:hidden">
                              <span className="text-frost">{filePrefix}</span>
                              <span>{file.name}</span>
                            </div>
                          </div>
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
  );
}
