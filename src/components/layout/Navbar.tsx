import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'home' },
  { to: '/about', label: 'about' },
  { to: '/projects', label: 'projects' },
  { to: '/contact', label: 'contact' },
];

function navClasses(isActive: boolean) {
  return [
    'rounded border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition',
    isActive
      ? 'border-cold/70 bg-cold/15 text-ivory shadow-glow'
      : 'border-transparent text-frost hover:border-frost/30 hover:bg-ash/65 hover:text-ivory',
  ].join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#1a3323] bg-[#050a06]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="font-body text-sm tracking-[0.18em] text-ivory" to="/">
          NVIM // ylan.portfolio
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded border border-cold/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cold animate-pulseLine">
            normal
          </span>
          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => navClasses(isActive)}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className="rounded border border-frost/35 px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.2em] text-frost sm:hidden"
          onClick={() => setOpen((state) => !state)}
        >
          :menu
        </button>
      </div>

      <div className="border-t border-[#12321f] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-frost/90 sm:px-6 lg:px-8">
        <p className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <span>file explorer active</span>
          <span>tabline enabled</span>
        </p>
      </div>

      {open ? (
        <nav className="border-t border-[#1a3323] bg-[#07100a] px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => navClasses(isActive)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
