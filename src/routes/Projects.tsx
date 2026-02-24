import { useMemo, useState } from 'react';
import PageContainer from '../components/common/PageContainer';
import TypedText from '../components/common/TypedText';
import ProjectCard from '../components/projects/ProjectCard';
import projectsData from '../content/projects.json';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Project } from '../types/content';

const projects = projectsData as Project[];

export default function ProjectsPage() {
  usePageMeta('Projects', 'Selected hackathon and engineering projects by Ylan Cuvier.');

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
      subtitle="Hackathon and engineering projects with delivery context, stack, and technical focus."
      fileName="projects.tsx"
      commandHint=":open projects.tsx"
      statusHint={`[${visibleProjects.length}] matches`}
    >
      <section id="projects-overview" className="scroll-mt-36 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body sm:p-6">
        <TypedText text="ls -la ./projects" className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#fabd2f]" speed={16} delay={140} />
        <p className="max-w-3xl text-sm leading-relaxed text-[#d5c4a1]">
          Includes Epitech hackathons, the AREA automation platform, and the R-Type multiplayer engine project. Use tech
          filters to narrow the list.
        </p>
      </section>

      <section id="projects-filters" className="scroll-mt-36 space-y-3 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body sm:p-6">
        <TypedText text=":filter tech" className="text-[11px] uppercase tracking-[0.2em] text-[#b8bb26]" speed={16} delay={180} />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={[
                'rounded-sm border px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] transition',
                activeTag === tag
                  ? 'border-[#fabd2f] bg-[#3c3836] text-[#fbf1c7] shadow-glow'
                  : 'border-[#665c54] text-[#d5c4a1] hover:border-[#a89984] hover:text-[#fbf1c7]',
              ].join(' ')}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section id="projects-gallery" className="scroll-mt-36">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
