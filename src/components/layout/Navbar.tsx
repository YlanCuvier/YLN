import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TypedText from '../common/TypedText';

const links = [
  { to: '/', label: 'home.tsx' },
  { to: '/about', label: 'about.tsx' },
  { to: '/projects', label: 'projects.tsx' },
  { to: '/contact', label: 'contact.tsx' },
];

function navClasses(isActive: boolean) {
  return [
    'rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition',
    isActive
      ? 'border-[#fabd2f] bg-[#3c3836] text-[#fbf1c7] shadow-glow'
      : 'border-transparent text-[#d5c4a1] hover:border-[#665c54] hover:bg-[#282828] hover:text-[#fbf1c7]',
  ].join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#5a4b39] bg-[#1d1811]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-[#5a4b39] px-4 py-2.5 sm:px-6 lg:px-8">
        <Link className="font-body text-[11px] uppercase tracking-[0.2em] text-[#ebdbb2]" to="/">
          NVIM // ylan.workspace
        </Link>
        <TypedText
          text=":set number relativenumber termguicolors"
          className="hidden font-body text-[10px] uppercase tracking-[0.18em] text-[#a89984] lg:block"
          speed={16}
          delay={80}
        />
        <span className="hidden rounded-sm border border-[#83a598] bg-[#2b2a24] px-2 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-[#83a598] sm:block">
          -- normal --
        </span>

        <button
          type="button"
          className="rounded-sm border border-[#7c6f64] px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-[#d5c4a1] sm:hidden"
          onClick={() => setOpen((state) => !state)}
        >
          :menu
        </button>
      </div>

      <div className="border-b border-[#5a4b39] bg-[#14110d] px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto hidden w-full max-w-6xl items-center gap-2 sm:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => navClasses(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto pb-1 sm:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => navClasses(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {open ? (
        <nav className="border-b border-[#5a4b39] bg-[#1b1712] px-4 py-3 sm:hidden">
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
