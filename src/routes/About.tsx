import PageContainer from '../components/common/PageContainer';
import profileData from '../content/profile.json';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Profile } from '../types/content';

const profile = profileData as Profile;

const principles = [
  {
    title: 'Signal Over Noise',
    detail: 'I prioritize interfaces that make important product decisions obvious in seconds, not minutes.',
  },
  {
    title: 'Narrative Through Motion',
    detail: 'Motion is used to guide attention and explain state changes, not as visual decoration.',
  },
  {
    title: 'Resilience By Default',
    detail: 'I design components and architecture for long-term maintainability under changing product demands.',
  },
];

export default function AboutPage() {
  usePageMeta('About', 'Background, design principles, and social links for Elias Vance.');

  return (
    <PageContainer title="About" subtitle="Building precise product systems that feel fast, legible, and durable under load.">
      <section id="about-intro" className="scroll-mt-40 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="space-y-4 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body shadow-card sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cold">cat profile.txt</p>
          <p className="text-sm leading-relaxed text-frost">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 border-t border-[#1a3323] pt-4">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded border border-cold/35 bg-cold/10 px-2.5 py-1 font-body text-[11px] uppercase tracking-[0.16em] text-cold"
              >
                {skill}
              </span>
            ))}
          </div>
        </article>

        <aside id="about-connect" className="scroll-mt-40 space-y-3 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-warm">:open socials</p>
          <ul className="space-y-2 border-t border-[#1a3323] pt-3">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="flex items-center justify-between rounded border border-transparent px-2 py-1 text-sm text-frost transition hover:border-[#1a3323] hover:bg-[#0a1710] hover:text-ivory"
                >
                  <span>{social.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-cold">follow</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="about-principles" className="scroll-mt-40 space-y-3">
        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-cold">set principles=3</p>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item, index) => (
            <article key={item.title} className="rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-frost">0{index + 1}</p>
              <h2 className="mb-2 text-base uppercase tracking-[0.12em] text-ivory">{item.title}</h2>
              <p className="text-sm leading-relaxed text-frost">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
