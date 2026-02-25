function Experience({ experience, education, languages, interests }) {
  return (
    <section id="experience" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Experience</p>
        <h2>Professional and Academic Timeline</h2>
      </div>

      <div className="timeline">
        {experience.map((item) => (
          <article key={item.company} className="panel-card timeline-item">
            <p className="card-tag">{item.period}</p>
            <h3>
              {item.role} · {item.company}
            </h3>
            <p className="location">{item.location}</p>
            <ul className="detail-list">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <ul className="stack-list" aria-label={`${item.company} stack`}>
              {item.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="card-grid split-grid">
        <article className="panel-card">
          <h3>Education</h3>
          <ul className="detail-list compact">
            {education.map((item) => (
              <li key={item.degree}>
                <strong>{item.degree}</strong>
                <span>{item.institution}</span>
                <span>{item.period}</span>
                {item.detail ? <span>{item.detail}</span> : null}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel-card">
          <h3>Languages & Interests</h3>
          <ul className="detail-list compact">
            {languages.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.level}</span>
              </li>
            ))}
          </ul>
          <p className="card-subtitle">Interests</p>
          <div className="chip-row">
            {interests.map((interest) => (
              <span key={interest} className="chip">
                {interest}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Experience;
