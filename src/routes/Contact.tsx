import { FormEvent, useState } from 'react';
import PageContainer from '../components/common/PageContainer';
import contactData from '../content/contact.json';
import profileData from '../content/profile.json';
import { usePageMeta } from '../hooks/usePageMeta';
import type { ContactInfo, Profile } from '../types/content';

const contactInfo = contactData as ContactInfo;
const profile = profileData as Profile;

function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  usePageMeta('Contact', 'Reach Elias Vance for frontend and product engineering opportunities.');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = buildMailto(name.trim(), email.trim(), message.trim());
  }

  return (
    <PageContainer
      title="Contact"
      subtitle="Open a message buffer for projects, collaboration, or senior frontend/product engineering opportunities."
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form id="contact-form" onSubmit={onSubmit} className="scroll-mt-40 space-y-4 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body shadow-card sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cold">:compose mail</p>

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-frost">
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded border border-[#244a33] bg-[#050d08] px-3 py-2.5 text-sm tracking-normal text-ivory outline-none transition placeholder:text-frost/70 focus:border-cold focus:ring-2 focus:ring-cold/30"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-frost">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border border-[#244a33] bg-[#050d08] px-3 py-2.5 text-sm tracking-normal text-ivory outline-none transition placeholder:text-frost/70 focus:border-cold focus:ring-2 focus:ring-cold/30"
              placeholder="you@company.com"
            />
          </label>

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-frost">
            Message
            <textarea
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded border border-[#244a33] bg-[#050d08] px-3 py-2.5 text-sm tracking-normal text-ivory outline-none transition placeholder:text-frost/70 focus:border-cold focus:ring-2 focus:ring-cold/30"
              placeholder="Tell me what you are building and where I can help."
            />
          </label>

          <button type="submit" className="rounded border border-warm/60 bg-warm/10 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-warm transition hover:border-warm hover:bg-warm/20 hover:text-ivory">
            :send email
          </button>
        </form>

        <aside id="contact-direct" className="scroll-mt-40 space-y-4 rounded-xl border border-[#1a3323] bg-[#07110b]/95 p-5 font-body sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-warm">:open direct</p>
          <a href={`mailto:${contactInfo.email}`} className="block rounded border border-transparent px-2 py-1 text-sm text-frost transition hover:border-[#1a3323] hover:bg-[#0a1710] hover:text-ivory">
            {contactInfo.email}
          </a>
          {contactInfo.location ? <p className="px-2 text-sm text-frost">{contactInfo.location}</p> : null}
          {contactInfo.availability ? <p className="px-2 text-sm text-frost">{contactInfo.availability}</p> : null}

          <div id="contact-socials" className="scroll-mt-40 border-t border-[#1a3323] pt-4">
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-cold">:open socials</p>
            <ul className="space-y-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="flex items-center justify-between rounded border border-transparent px-2 py-1 text-sm text-frost transition hover:border-[#1a3323] hover:bg-[#0a1710] hover:text-ivory"
                  >
                    <span>{social.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-cold">visit</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </PageContainer>
  );
}
