import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageContainer({ title, subtitle, children }: PageContainerProps) {
  const fileLabel = `${title.toLowerCase()}.md`;

  return (
    <section className="space-y-6 pb-8">
      <header className="overflow-hidden rounded-xl border border-[#1a3323] bg-[#060d08]/95 shadow-card">
        <div className="flex items-center justify-between border-b border-[#1b3724] px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-frost sm:px-6">
          <span>{`~/pages/${fileLabel}`}</span>
          <span>utf-8 | unix</span>
        </div>
        <div className="space-y-3 px-4 py-5 sm:px-6">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-cold">:{title.toLowerCase()}</p>
          <h1 className="font-body text-3xl tracking-[0.04em] text-ivory sm:text-4xl">{title}</h1>
          {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-frost sm:text-[15px]">{subtitle}</p> : null}
        </div>
      </header>

      <div className="space-y-5">{children}</div>
    </section>
  );
}
