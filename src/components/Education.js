import React from 'react';
import { education } from '../data/cv';
import { Gallery, Reveal, SectionHead } from './ui';

const Education = () => (
  <section id="education" className="section">
    <SectionHead eyebrow="Education" title="Trained in the UK and Prague." />

    <div className="space-y-5">
      {education.map((e, i) => (
        <Reveal key={e.degree} delay={i * 0.08} className="panel grid gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
          <div>
            <p className="font-mono text-xs text-muted">{e.period} · {e.location}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{e.degree}</h3>
            <p className="text-muted">{e.school}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{e.note}</p>
          </div>
          <Gallery images={e.images} />
        </Reveal>
      ))}
    </div>
  </section>
);

export default Education;
