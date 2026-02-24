import { useLocation } from 'react-router-dom';
import TypedText from '../common/TypedText';

const commandHints: Record<string, string> = {
  '/about': ':help about | :marks',
  '/projects': ':filter <tech> | :open live',
  '/contact': ':compose | :send',
};

export default function Footer() {
  const location = useLocation();
  const routePath = location.pathname === '/' ? '~/home.tsx' : `~${location.pathname}.tsx`;
  const commandHint = commandHints[location.pathname] ?? ':q';

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[#5a4b39] bg-[#14110d]/95 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-6xl gap-2 border-b border-[#5a4b39] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#d5c4a1] sm:grid-cols-3 sm:px-6 lg:px-8">
        <p className="text-[#b8bb26]">-- normal --</p>
        <p className="truncate text-center">{routePath}</p>
        <p className="text-left text-[#a89984] sm:text-right">ln 42, col 5 | {new Date().getFullYear()}</p>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6 lg:px-8">
        <TypedText
          text={commandHint}
          className="font-body text-[10px] uppercase tracking-[0.2em] text-[#fabd2f]"
          speed={14}
          delay={120}
          cursor
        />
      </div>
    </footer>
  );
}
