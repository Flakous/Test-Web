import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiCopy, FiCheck } from 'react-icons/fi';
import { profile } from '../data/cv';
import { Reveal } from './ui';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const rows = [
    { icon: FiPhone, label: profile.phone, href: profile.phoneHref },
    { icon: FiLinkedin, label: 'LinkedIn', href: profile.linkedin, external: true },
    { icon: FiMapPin, label: profile.location },
  ];

  return (
    <section id="contact" className="section">
      <Reveal className="panel relative overflow-hidden p-8 sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="h2 max-w-xl">Let’s talk about your football department.</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn-solid"><FiMail /> {profile.email}</a>
          <button onClick={copy} className="btn-ghost" aria-label="Copy email address">
            {copied ? <FiCheck className="text-accent" /> : <FiCopy />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {rows.map(({ icon: Icon, label, href, external }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {href ? (
                <a href={href} className="hover:text-ink" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}</a>
              ) : label}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};

export default Contact;
