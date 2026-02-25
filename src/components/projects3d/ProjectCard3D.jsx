import { useEffect, useMemo, useRef, useState } from 'react';
import ProjectScene from './ProjectScene';

function ProjectCard3D({ project, motionProfile }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [tilt, setTilt] = useState({ glowX: 50, glowY: 40 });

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.24 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const isStaticMode = !motionProfile.animate;
  const canTilt = motionProfile.interactive;
  const sceneActive = isInView && motionProfile.animate;

  const cardStyle = useMemo(
    () => ({
      '--card-glow-x': `${tilt.glowX}%`,
      '--card-glow-y': `${tilt.glowY}%`
    }),
    [tilt]
  );

  const handlePointerMove = (event) => {
    if (!canTilt) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width;
    const normalizedY = (event.clientY - rect.top) / rect.height;

    setTilt({
      glowX: normalizedX * 100,
      glowY: normalizedY * 100
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ glowX: 50, glowY: 40 });
  };

  return (
    <article
      ref={cardRef}
      className={`project-3d-card ${isHovered ? 'is-hovered' : ''} ${
        isStaticMode ? 'is-static' : ''
      }`}
      tabIndex={0}
      style={cardStyle}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={handlePointerLeave}
      aria-label={`${project.name} project card`}
    >
      <div className="project-3d-content">
        <p className="card-tag">{project.context}</p>
        <p className="project-3d-description">{project.description}</p>
        <p className="project-type">{project.type}</p>
        <ul className="stack-list" aria-label={`${project.name} stack`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="project-3d-scene-wrap" aria-hidden="true">
        <ProjectScene
          name={project.name}
          isActive={sceneActive}
          isHovered={isHovered}
          isReducedMotion={!motionProfile.animate}
        />
      </div>
    </article>
  );
}

export default ProjectCard3D;
