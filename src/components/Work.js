import React from 'react';
import { projects } from '../data/cv';
import { Gallery, Reveal, SectionHead } from './ui';

const Work = () => (
  <section id="work" className="section">
    <SectionHead eyebrow="Selected work" title="Tools the club makes decisions with.">
      Built around football questions first — then the data, models and interfaces to answer them.
    </SectionHead>

    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal key={p.title} delay={(i % 2) * 0.08} className="panel group flex flex-col overflow-hidden">
          {p.image && (
            <div className="border-b border-line bg-bg p-3">
              <Gallery images={[p.image]} className="!grid-cols-1 [&_button]:aspect-[16/9] [&_img]:object-contain" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Work;
