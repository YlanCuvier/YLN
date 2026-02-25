function Tools({ tools }) {
  return (
    <section id="tools" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Premium Tools</p>
        <h2>Current Technical Stack</h2>
      </div>
      <div className="card-grid tools-grid">
        {tools.map((tool) => (
          <article key={tool.name} className="panel-card tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.category}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Tools;
