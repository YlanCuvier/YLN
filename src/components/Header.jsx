import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tools', href: '#tools' },
  { label: 'Thoughts', href: '#thoughts' },
  { label: 'Contact', href: '#contact' }
];

function Header({ profile }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    let frameId = null;

    const updateProgress = () => {
      const maxScroll = root.scrollHeight - root.clientHeight;
      const nextProgress = maxScroll > 0
        ? Math.min(1, Math.max(0, root.scrollTop / maxScroll))
        : 0;
      setScrollProgress(nextProgress);
    };

    const onScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateProgress();
        frameId = null;
      });
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollPercent = Math.round(scrollProgress * 100);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Go to home section">
        <span className="brand-mark">YC</span>
        <span className="brand-text">{profile.name}</span>
      </a>
      <div className="nav-progress-wrap" aria-hidden="true">
        <div className="nav-progress">
          <span
            className="nav-progress-fill"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
        <span className="nav-progress-value">{scrollPercent}%</span>
      </div>
      <nav aria-label="Primary">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
