import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../../types/content';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group overflow-hidden rounded-xl border border-[#1a3323] bg-[#07110b]/95 font-body shadow-card"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.34, delay: reduceMotion ? 0 : index * 0.05 }}
    >
      <div className="border-b border-[#1b3724] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-frost">
        ./projects/{project.id}.tsx
      </div>

      <div className="relative h-40 overflow-hidden border-b border-[#1b3724]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020503]/90 via-[#020503]/30 to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base uppercase tracking-[0.12em] text-ivory">{project.title}</h3>
          <p className="text-sm leading-relaxed text-frost">{project.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <li key={tag} className="rounded border border-cold/35 bg-cold/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-cold">
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 border-t border-[#1b3724] pt-3 text-[11px] uppercase tracking-[0.16em]">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-warm transition hover:text-ivory">
              :open live
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-cold transition hover:text-ivory">
              :open code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
