import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiCommand, FiSearch, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { profile } from '../data/cv';

export const sections = [
  { id: 'now', name: 'Now' },
  { id: 'experience', name: 'Experience' },
  { id: 'work', name: 'Work' },
  { id: 'toolkit', name: 'Toolkit' },
  { id: 'education', name: 'Education' },
  { id: 'contact', name: 'Contact' },
];

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const useActiveSection = () => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
};

const Palette = ({ open, onClose }) => {
  const { isDark, toggleTheme } = useTheme();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);

  const actions = useMemo(
    () => [
      ...sections.map((s) => ({ label: `Go to ${s.name}`, run: () => go(s.id) })),
      { label: `Email ${profile.name}`, run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Download CV (PDF)', run: () => window.open(profile.cvPdf, '_blank', 'noopener') },
      { label: 'Open LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { label: isDark ? 'Switch to light theme' : 'Switch to dark theme', run: toggleTheme },
    ],
    [isDark, toggleTheme]
  );
  const results = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => input.current?.focus(), 20);
    }
  }, [open]);

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && results[sel]) { results[sel].run(); onClose(); }
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="panel w-full max-w-md overflow-hidden shadow-2xl"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command menu"
          >
            <div className="flex items-center gap-2 border-b border-line px-4">
              <FiSearch className="h-4 w-4 text-muted" />
              <input
                ref={input}
                value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={onKey}
                placeholder="Jump to…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-72 overflow-auto p-1.5">
              {results.map((a, i) => (
                <li key={a.label}>
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => { a.run(); onClose(); }}
                    className={`relative flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${i === sel ? 'text-ink' : 'text-muted'}`}
                  >
                    {i === sel && (
                      <motion.span layoutId="palette-sel" className="absolute inset-0 rounded-lg bg-bg" transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }} />
                    )}
                    <span className="relative">{a.label}</span>
                    <FiArrowUpRight className="relative h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
              {!results.length && <li className="px-3 py-6 text-center text-sm text-muted">No matches</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Nav = () => {
  const { isDark, toggleTheme } = useTheme();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-md' : ''}`}>
        <nav className="wrap flex h-14 items-center justify-between gap-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-xl">
            {profile.name}
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${active === s.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {active === s.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-surface border border-line" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
                  )}
                  <span className="relative">{s.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={() => setPalette(true)} className="btn-ghost !px-3 !py-1.5" aria-label="Open command menu">
              <FiCommand className="h-3.5 w-3.5" />
              <span className="font-mono text-xs">K</span>
            </button>
            <button onClick={toggleTheme} className="btn-ghost !p-2" aria-label="Toggle theme">
              {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>
      <Palette open={palette} onClose={() => setPalette(false)} />
    </>
  );
};

export default Nav;
