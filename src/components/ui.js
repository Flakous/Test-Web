import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Paths contain spaces, colons and diacritics, so encode each segment.
export const src = (path) => path.split('/').map((s) => (s ? encodeURIComponent(s) : s)).join('/');

export const Reveal = ({ children, delay = 0, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Word-by-word blur-in headline.
export const BlurText = ({ text, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
};

export const SectionHead = ({ eyebrow, title, children }) => (
  <Reveal className="mb-12 max-w-2xl">
    <p className="eyebrow mb-3">{eyebrow}</p>
    <h2 className="h2">{title}</h2>
    {children && <p className="mt-4 text-muted text-lg leading-relaxed">{children}</p>}
  </Reveal>
);

export const Gallery = ({ images, className = '' }) => {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className={`grid grid-cols-3 sm:grid-cols-4 gap-2 ${className}`}>
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={src(img)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={images[index]}
              src={src(images[index])}
              alt=""
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white" aria-label="Close">
              <FiX className="h-5 w-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-3 rounded-full bg-white/10 p-2 text-white"
                  aria-label="Previous"
                  onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + images.length) % images.length); }}
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-3 rounded-full bg-white/10 p-2 text-white"
                  aria-label="Next"
                  onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % images.length); }}
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
