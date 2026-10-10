import React from 'react';
import { toolkit, languages } from '../data/cv';
import { Reveal, SectionHead } from './ui';

const Toolkit = () => (
  <section id="toolkit" className="section">
    <SectionHead eyebrow="Toolkit" title="Providers, code and football craft." />

    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {toolkit.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.06} className="bg-surface p-6">
          <p className="eyebrow mb-4">{g.group}</p>
          <div className="flex flex-wrap gap-2">
            {g.items.map((t) => (
              <span key={t} className="rounded-lg border border-line bg-bg px-3 py-1.5 text-sm transition-colors hover:border-accent">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-8 flex flex-wrap items-center gap-3 text-sm">
      <span className="eyebrow mr-2">Languages</span>
      {languages.map((l) => <span key={l} className="chip">{l}</span>)}
    </Reveal>
  </section>
);

export default Toolkit;
