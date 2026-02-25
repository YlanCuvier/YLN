import ProjectCard3D from './projects3d/ProjectCard3D';
import useMotionProfile from './projects3d/useMotionProfile';

function Projects({ projects }) {
  const motionProfile = useMotionProfile();

  return (
    <section id="projects" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Recent Projects</p>
        <h2>Built Under Real Constraints</h2>
      </div>
      <div className="card-grid projects-3d-grid">
        {projects.map((project) => (
          <ProjectCard3D key={project.name} project={project} motionProfile={motionProfile} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
