function Hero({ profile, metrics, keywords }) {
  return (
    <section id="home" className="hero section reveal">
      <div className="hero-top">
        <div className="hero-intro">
          <p className="eyebrow">Software Engineer</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-contact-line">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <aside className="hero-photo-card" aria-label={`${profile.name} portrait card`}>
          <div className="hero-photo-shell">
            <img className="hero-photo" src="/lowpolly.png" alt={`${profile.name} portrait`} />
            <p className="hero-photo-status">{profile.availability}</p>
          </div>
        </aside>
      </div>

      <div className="metrics-grid" aria-label="Career highlights">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label">{metric.label}</p>
          </article>
        ))}
      </div>

      <div className="keyword-marquee" aria-label="Primary skills">
        <div className="keyword-track">
          {[...keywords, ...keywords].map((item, index) => (
            <span key={`${item}-${index}`} className="keyword-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
