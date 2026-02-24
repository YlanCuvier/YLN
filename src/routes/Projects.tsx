import { useMemo, useState } from 'react';
import PageContainer from '../components/common/PageContainer';
import ProjectCard from '../components/projects/ProjectCard';
import projectsData from '../content/projects.json';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Project } from '../types/content';

const projects = projectsData as Project[];

export default function ProjectsPage() {
  usePageMeta('Projects', 'Selected frontend and product engineering projects by Elias Vance.');

  const tags = useMemo(() => {
    const all = new Set<string>();
    for (const project of projects) {
      for (const tag of project.tech) {
        all.add(tag);
      }
    }

    return ['All', ...Array.from(all).slice(0, 7)];
  }, []);

  const [activeTag, setActiveTag] = useState('All');

  const visibleProjects = useMemo(
    () => projects.filter((project) => activeTag === 'All' || project.tech.includes(activeTag)),
    [activeTag],
  );

  return (
    <PageContainer
      title="Projects"
      subtitle="A command-driven archive of shipped product work, organized by stack and delivery context."
    >
      <section id="projects-overview" className="scroll-mt-40 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body sm:p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cold">ls -la ./projects</p>
        <p className="max-w-3xl text-sm leading-relaxed text-frost">
          Use filters to narrow the list. Each item shows context, tools, and links, formatted like editor buffers for fast
          scanning.
        </p>
      </section>

      <section id="projects-filters" className="scroll-mt-40 space-y-3 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-warm">:filter tech</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={[
                'rounded border px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition',
                activeTag === tag
                  ? 'border-cold bg-cold/15 text-ivory shadow-glow'
                  : 'border-[#244a33] text-frost hover:border-frost/40 hover:text-ivory',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section id="projects-gallery" className="scroll-mt-40">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
