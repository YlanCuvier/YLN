function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <p>
        Built by {profile.name} with React + Vite.
      </p>
      <a href={profile.linkedin} target="_blank" rel="noreferrer">
        linkedin.com/in/ylan-cuvier
      </a>
    </footer>
  );
}

export default Footer;
