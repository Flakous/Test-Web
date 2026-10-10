import React from 'react';
import { pillars, stats, profile } from '../data/cv';
import { Reveal, SectionHead } from './ui';

const Now = () => (
  <section id="now" className="section">
    <SectionHead eyebrow={`Now · ${profile.club}`} title="One insights service for the people who decide.">
      My title covers recruitment analysis. The job covers the whole loop from first-team staff to the Sporting Director.
    </SectionHead>

    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
      {pillars.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.06} className="bg-surface p-6">
          <p className="font-mono text-xs text-accent">0{i + 1}</p>
          <h3 className="mt-3 font-medium">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
        </Reveal>
      ))}
    </div>

    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="border-t border-line pt-5">
          <p className={`font-display leading-none ${s.value.length > 4 ? 'text-5xl' : 'text-6xl'}`}>{s.value}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.label}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Now;
