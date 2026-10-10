import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiLinkedin } from 'react-icons/fi';
import { profile } from '../data/cv';
import { BlurText, src } from './ui';

const Hero = () => (
  <section className="wrap grid min-h-[92vh] items-center gap-12 pt-24 pb-12 md:grid-cols-[1.4fr_1fr]">
    <div>
      <motion.p
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {profile.openTo}
      </motion.p>

      <h1 className="font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
        <BlurText text="Football insight that changes decisions." />
      </h1>

      <motion.p
        className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {profile.summary}
      </motion.p>

      <motion.div
        className="mt-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <span className="font-medium">{profile.role}</span>
        <span className="text-muted"> — {profile.club}</span>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <a href={`mailto:${profile.email}`} className="btn-solid"><FiMail /> Get in touch</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><FiLinkedin /> LinkedIn</a>
        <a href={profile.cvPdf} download className="btn-ghost"><FiDownload /> Download CV</a>
      </motion.div>
    </div>

    <motion.div
      className="relative mx-auto w-full max-w-sm"
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-transparent blur-2xl" />
      <img
        src={src(profile.photo)}
        alt={profile.name}
        className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-line object-cover object-[50%_30%]"
      />
      <div className="panel absolute -bottom-6 -left-5 right-6 space-y-2.5 px-4 py-3 shadow-xl sm:right-auto sm:max-w-[17rem]">
        <div>
          <p className="eyebrow">Former</p>
          <p className="text-sm font-medium">Slovakia U21</p>
          <p className="text-sm font-medium">DAC Head of Analysis</p>
        </div>
        <div className="border-t border-line pt-2.5">
          <p className="eyebrow text-accent">Currently</p>
          <p className="text-sm font-medium">{profile.role}</p>
          <p className="text-xs text-muted">{profile.club}</p>
        </div>
      </div>
    </motion.div>
  </section>
);

export default Hero;
