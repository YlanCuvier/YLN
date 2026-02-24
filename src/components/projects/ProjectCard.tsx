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
      className="group overflow-hidden rounded-sm border border-[#4f4232] bg-[#17130f]/95 font-body shadow-card"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.34, delay: reduceMotion ? 0 : index * 0.05 }}
    >
      <div className="flex items-center justify-between border-b border-[#4f4232] bg-[#23201b] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#a89984]">
        <span>{`./projects/${project.id}.tsx`}</span>
        <span className="text-[#83a598]">buffer</span>
      </div>

      <div className="relative h-40 overflow-hidden border-b border-[#4f4232]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110d]/90 via-[#14110d]/30 to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base uppercase tracking-[0.12em] text-[#fbf1c7]">{project.title}</h3>
          <p className="text-sm leading-relaxed text-[#d5c4a1]">{project.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-[#665c54] bg-[#2a2520] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#ebdbb2]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 border-t border-[#4f4232] pt-3 text-[11px] uppercase tracking-[0.16em]">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[#fabd2f] transition hover:text-[#fbf1c7]">
              :open live
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-[#b8bb26] transition hover:text-[#fbf1c7]">
              :open code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
