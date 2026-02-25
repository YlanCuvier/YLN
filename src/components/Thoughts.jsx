function Thoughts({ thoughts }) {
  return (
    <section id="thoughts" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Design Thoughts</p>
        <h2>Working Notes</h2>
      </div>
      <div className="card-grid thoughts-grid">
        {thoughts.map((thought) => (
          <article key={thought.title} className="panel-card thought-card">
            <p className="card-tag">{thought.tag}</p>
            <h3>{thought.title}</h3>
            <p>{thought.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Thoughts;
