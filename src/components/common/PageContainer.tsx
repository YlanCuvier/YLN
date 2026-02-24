import { ReactNode } from 'react';
import TypedText from './TypedText';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  fileName?: string;
  commandHint?: string;
  statusHint?: string;
  showGutter?: boolean;
}

export default function PageContainer({
  title,
  subtitle,
  children,
  fileName,
  commandHint,
  statusHint = '[+] ready',
  showGutter = true,
}: PageContainerProps) {
  const fileLabel = fileName ?? `${title.toLowerCase()}.md`;

  return (
    <section className="space-y-5 pb-6">
      <header className="overflow-hidden rounded-lg border border-[#4f4232] bg-[#1a1610]/95 shadow-card">
        <div className="flex items-center justify-between border-b border-[#4f4232] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#ddc7a1] sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#cc241d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d79921]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#98971a]" />
          </div>
          <span>{`~/pages/${fileLabel}`}</span>
          <span className="text-[#a89984]">utf-8 | unix</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#4f4232] bg-[#23201b] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#a89984] sm:px-6">
          <span className="truncate">{`-- ${title.toLowerCase()} --`}</span>
          <span className="text-[#d79921]">{statusHint}</span>
        </div>
        <div className="space-y-3 px-4 py-5 sm:px-6">
          {commandHint ? (
            <TypedText
              text={commandHint}
              className="font-body text-[11px] uppercase tracking-[0.2em] text-[#fabd2f]"
              cursor
              speed={18}
              delay={120}
            />
          ) : null}
          <TypedText
            as="h1"
            text={title}
            className="font-body text-3xl tracking-[0.04em] text-[#fbf1c7] sm:text-4xl"
            cursor
            speed={22}
            delay={180}
          />
          {subtitle ? (
            <TypedText
              as="p"
              text={subtitle}
              className="max-w-3xl text-sm leading-relaxed text-[#d5c4a1] sm:text-[15px]"
              speed={8}
              delay={260}
            />
          ) : null}
        </div>
      </header>

      <div className="overflow-hidden rounded-lg border border-[#4f4232] bg-[#14110d]/95 shadow-card">
        <div className="flex items-center justify-between border-b border-[#4f4232] bg-[#1f1b15] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#a89984]">
          <span>buffer</span>
          <span className="text-[#83a598]">lines synced</span>
        </div>
        <div className={['grid', showGutter ? 'grid-cols-[auto_1fr]' : 'grid-cols-1'].join(' ')}>
          {showGutter ? (
            <aside className="hidden border-r border-[#3f3528] bg-[#18140f] px-2 py-4 text-right font-body text-[10px] leading-7 text-[#7c6f64] sm:block">
              {Array.from({ length: 18 }).map((_, index) => (
                <p key={index}>{index + 1}</p>
              ))}
            </aside>
          ) : null}
          <div className="space-y-5 px-4 py-5 sm:px-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
