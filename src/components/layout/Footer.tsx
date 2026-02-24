import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="relative z-20 border-t border-[#1a3323] bg-[#050a06]/95 py-4">
      <div className="mx-auto grid w-full max-w-6xl gap-2 px-4 font-body text-[10px] uppercase tracking-[0.2em] text-frost sm:grid-cols-3 sm:px-6 lg:px-8">
        <p className="text-cold">-- normal --</p>
        <p className="truncate text-center">{location.pathname === '/' ? '~/home' : `~${location.pathname}`}</p>
        <p className="text-left sm:text-right">ln 1, col 1 | {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
