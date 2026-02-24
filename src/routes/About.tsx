import PageContainer from '../components/common/PageContainer';
import TypedText from '../components/common/TypedText';
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
    <PageContainer
      title="About"
      subtitle="Building precise product systems that feel fast, legible, and durable under load."
      fileName="about.tsx"
      commandHint=":open about.tsx"
      statusHint="[+] profile loaded"
    >
      <section id="about-intro" className="scroll-mt-36 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="space-y-4 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body sm:p-6">
          <TypedText text="cat profile.md" className="text-[11px] uppercase tracking-[0.2em] text-[#fabd2f]" speed={16} delay={140} />
          <p className="text-sm leading-relaxed text-[#d5c4a1]">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 border-t border-[#4f4232] pt-4">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-sm border border-[#7c6f64] bg-[#28231d] px-2.5 py-1 font-body text-[11px] uppercase tracking-[0.16em] text-[#ebdbb2]"
              >
                {skill}
              </span>
            ))}
          </div>
        </article>

        <aside id="about-connect" className="scroll-mt-36 space-y-3 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body sm:p-6">
          <TypedText text=":open socials" className="text-[11px] uppercase tracking-[0.2em] text-[#b8bb26]" speed={16} delay={180} />
          <ul className="space-y-2 border-t border-[#4f4232] pt-3">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="flex items-center justify-between rounded-sm border border-transparent px-2 py-1 text-sm text-[#d5c4a1] transition hover:border-[#665c54] hover:bg-[#24201b] hover:text-[#fbf1c7]"
                >
                  <span>{social.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#fabd2f]">follow</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="about-principles" className="scroll-mt-36 space-y-3">
        <TypedText text="set principles=3" className="font-body text-[11px] uppercase tracking-[0.2em] text-[#b8bb26]" speed={16} delay={220} />
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item, index) => (
            <article key={item.title} className="rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#a89984]">0{index + 1}</p>
              <h2 className="mb-2 text-base uppercase tracking-[0.12em] text-[#fbf1c7]">{item.title}</h2>
              <p className="text-sm leading-relaxed text-[#d5c4a1]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
