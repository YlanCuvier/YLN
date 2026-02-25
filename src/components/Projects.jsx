function Projects({ projects }) {
  return (
    <section id="projects" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Recent Projects</p>
        <h2>Built Under Real Constraints</h2>
      </div>
      <div className="card-grid projects-grid">
        {projects.map((project) => (
          <article key={project.name} className="panel-card project-card">
            <p className="card-tag">{project.context}</p>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p className="project-type">{project.type}</p>
            <ul className="stack-list" aria-label={`${project.name} stack`}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
