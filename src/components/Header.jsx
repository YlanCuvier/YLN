const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tools', href: '#tools' },
  { label: 'Thoughts', href: '#thoughts' },
  { label: 'Contact', href: '#contact' }
];

function Header({ profile }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Go to home section">
        <span className="brand-mark">YC</span>
        <span className="brand-text">{profile.name}</span>
      </a>
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
