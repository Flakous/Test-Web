import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import { experience } from '../data/cv';
import { Gallery, SectionHead } from './ui';

// Desktop: role list on the left, detail panel on the right. Mobile: the list becomes an accordion.
const Detail = ({ role, compact = false }) => (
  <div>
    {!compact && (
      <>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="font-mono">{role.period}</span>
          <span className="inline-flex items-center gap-1"><FiMapPin className="h-3.5 w-3.5" />{role.location}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{role.title}</h3>
        <p className="mb-5 text-muted">{role.company}</p>
      </>
    )}
    <p className="leading-relaxed">{role.summary}</p>
    {role.highlights.length > 0 && (
      <ul className="mt-5 space-y-2.5">
        {role.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="mt-6 flex flex-wrap gap-2">
      {role.tags.map((t) => <span key={t} className="chip">{t}</span>)}
    </div>
    <Gallery images={role.images} className="mt-6" />
  </div>
);

const Experience = () => {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active = experience.find((r) => r.id === activeId);

  return (
    <section id="experience" className="section">
      <SectionHead eyebrow="Experience" title="From the pitch to head of department.">
        Opposition analyst to head of analysis in two seasons, then into club-wide insights at Sparta.
      </SectionHead>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <ol className="relative space-y-1">
          <span className="absolute left-[11px] top-3 bottom-3 hidden w-px bg-line md:block" aria-hidden />
          {experience.map((r) => {
            const on = r.id === activeId;
            return (
              <li key={r.id}>
                <button
                  onClick={() => setActiveId(r.id)}
                  aria-expanded={on}
                  className={`relative flex w-full items-start gap-4 rounded-xl py-3 pr-3 text-left transition-colors ${on ? '' : 'hover:bg-surface/60'}`}
                >
                  {on && (
                    <motion.span layoutId="exp-active" className="absolute inset-0 rounded-xl border border-line bg-surface" transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }} />
                  )}
                  <span className={`relative z-10 mt-1.5 ml-[6px] h-3 w-3 flex-none rounded-full border-2 ${on ? 'border-accent bg-accent' : 'border-line bg-bg'}`} />
                  <span className="relative">
                    <span className="block font-medium leading-snug">{r.title}</span>
                    <span className="block text-sm text-muted">{r.company}</span>
                    <span className="mt-1 block font-mono text-xs text-muted">
                      {r.period}
                      {r.current && <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-accent">Current</span>}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="overflow-hidden md:hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="panel mt-2 p-5"><Detail role={r} compact /></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <div className="hidden md:block">
          <div className="panel sticky top-20 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                <Detail role={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
