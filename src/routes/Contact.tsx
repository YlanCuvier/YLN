import { FormEvent, useState } from 'react';
import PageContainer from '../components/common/PageContainer';
import TypedText from '../components/common/TypedText';
import contactData from '../content/contact.json';
import profileData from '../content/profile.json';
import { usePageMeta } from '../hooks/usePageMeta';
import type { ContactInfo, Profile } from '../types/content';

const contactInfo = contactData as ContactInfo;
const profile = profileData as Profile;

function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Internship / freelance contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  usePageMeta('Contact', 'Reach Ylan Cuvier for internship opportunities, freelance work, and collaboration.');

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
      subtitle="Open a message buffer for internship opportunities, freelance work, or technical collaboration."
      fileName="contact.tsx"
      commandHint=":open contact.tsx"
      statusHint="[+] mailbox ready"
    >
      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          id="contact-form"
          onSubmit={onSubmit}
          className="scroll-mt-36 space-y-4 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body shadow-card sm:p-6"
        >
          <TypedText text=":compose mail" className="text-[11px] uppercase tracking-[0.2em] text-[#fabd2f]" speed={16} delay={140} />

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-[#d5c4a1]">
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-sm border border-[#665c54] bg-[#14110d] px-3 py-2.5 text-sm tracking-normal text-[#fbf1c7] outline-none transition placeholder:text-[#a89984] focus:border-[#fabd2f] focus:ring-2 focus:ring-[#fabd2f]/30"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-[#d5c4a1]">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-sm border border-[#665c54] bg-[#14110d] px-3 py-2.5 text-sm tracking-normal text-[#fbf1c7] outline-none transition placeholder:text-[#a89984] focus:border-[#fabd2f] focus:ring-2 focus:ring-[#fabd2f]/30"
              placeholder="you@company.com"
            />
          </label>

          <label className="block space-y-2 text-[11px] uppercase tracking-[0.2em] text-[#d5c4a1]">
            Message
            <textarea
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-sm border border-[#665c54] bg-[#14110d] px-3 py-2.5 text-sm tracking-normal text-[#fbf1c7] outline-none transition placeholder:text-[#a89984] focus:border-[#fabd2f] focus:ring-2 focus:ring-[#fabd2f]/30"
              placeholder="Tell me what you are building and where I can help."
            />
          </label>

          <button
            type="submit"
            className="rounded-sm border border-[#fabd2f]/70 bg-[#fabd2f]/10 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-[#fabd2f] transition hover:border-[#fabd2f] hover:bg-[#fabd2f]/20 hover:text-[#fbf1c7]"
          >
            :send email
          </button>
        </form>

        <aside id="contact-direct" className="scroll-mt-36 space-y-4 rounded-sm border border-[#4f4232] bg-[#17130f]/95 p-5 font-body sm:p-6">
          <TypedText text=":open direct" className="text-[11px] uppercase tracking-[0.2em] text-[#b8bb26]" speed={16} delay={180} />
          <a
            href={`mailto:${contactInfo.email}`}
            className="block rounded-sm border border-transparent px-2 py-1 text-sm text-[#d5c4a1] transition hover:border-[#665c54] hover:bg-[#24201b] hover:text-[#fbf1c7]"
          >
            {contactInfo.email}
          </a>
          {contactInfo.phone ? (
            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className="block rounded-sm border border-transparent px-2 py-1 text-sm text-[#d5c4a1] transition hover:border-[#665c54] hover:bg-[#24201b] hover:text-[#fbf1c7]"
            >
              {contactInfo.phone}
            </a>
          ) : null}
          {contactInfo.location ? <p className="px-2 text-sm text-[#d5c4a1]">{contactInfo.location}</p> : null}
          {contactInfo.availability ? <p className="px-2 text-sm text-[#d5c4a1]">{contactInfo.availability}</p> : null}

          <div id="contact-socials" className="scroll-mt-36 border-t border-[#4f4232] pt-4">
            <TypedText text=":open socials" className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#b8bb26]" speed={16} delay={220} />
            <ul className="space-y-2">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center justify-between rounded-sm border border-transparent px-2 py-1 text-sm text-[#d5c4a1] transition hover:border-[#665c54] hover:bg-[#24201b] hover:text-[#fbf1c7]"
                  >
                    <span>{social.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#fabd2f]">visit</span>
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
