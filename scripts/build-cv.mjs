// Builds the downloadable PDF CV from src/data/cv.js with headless Chrome.
//   node scripts/build-cv.mjs              -> public/Kristian_Flak_CV.pdf (general)
//   node scripts/build-cv.mjs leicester    -> out/Kristian_Flak_CV_Leicester.pdf (with role-fit table)
//   node scripts/build-cv.mjs rsl          -> out/Kristian_Flak_CV_RSL.pdf (Real Salt Lake)
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = mkdtempSync(path.join(tmpdir(), 'cv-'));

// cv.js is an ES module inside a CommonJS package; copy it to .mjs so Node can import it.
const dataPath = path.join(tmp, 'cv.mjs');
writeFileSync(dataPath, readFileSync(path.join(root, 'src/data/cv.js')));
const cv = await import(pathToFileURL(dataPath).href);
const { profile, stats, experience, projects, toolkit, education, languages } = cv;

const site = 'https://interactivecv-psi.vercel.app';
const photoUrl = pathToFileURL(path.join(root, 'public', profile.photo)).href;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const baseIntro =
  'Football insights leader who has run a club analysis department and now leads club analytics and insights at AC Sparta Praha. Connects performance analysis, recruitment, data science and traditional scouting into one football insights function — built to help coaches and sporting directors make better decisions. Former professional player and Slovakia U21 international, UCFB-educated in the UK.';

// Each variant can change the tagline, intro, fit table, project order, extra bullets and toolkit.
const variants = {
  general: {
    file: 'public/Kristian_Flak_CV.pdf',
    headline: 'Club Analytics · Football Insights · Performance Analysis · Recruitment',
    intro: baseIntro,
  },
  leicester: {
    file: 'out/Kristian_Flak_CV_Leicester.pdf',
    headline: 'Football Insights · Performance Analysis · Recruitment Data · Decision Support',
    intro: baseIntro,
    fitTitle: 'Fit for Head of Football Insights',
    fit: [
      ['Lead performance analysis, data science and recruitment data', 'Head of Analysis at DAC 1904 (six analysts). At Sparta, lead club analytics and insights with a data engineer, linking scouts, analysts and coaches.'],
      ['Objective, timely insight for the First Team Manager and Sporting Director', 'Weekly tactical, opposition, video and data work with Sparta’s first-team staff; strategic support to the Sporting Director on squad planning, staff roles and player trading.'],
      ['KPIs linked to the Football Strategy', 'Turned the game model into position profiles, team KPIs, player ratings and recruitment criteria, with shared reporting standards.'],
      ['Modern platforms, tracking data and AI-enabled workflows', 'SkillCorner tracking, StatsBomb, Impect, Opta, Wyscout, Hudl; Python, SQL, cloud; AI-assisted scouting planner and in-house tools.'],
      ['Track record of influencing high-level decisions', 'DAC: back-to-back 2nd places with record points; Krstović and Bajo sold for club-record fees. Sparta: succession, valuation and sale input.'],
    ],
  },
  rsl: {
    file: 'out/Kristian_Flak_CV_RSL.pdf',
    headline: 'Recruitment Analytics · Player Evaluation · Scouting Decision Support',
    intro:
      'Recruitment analytics leader with 4.5 years in professional club analysis, now Head of Club Analytics & Insights at AC Sparta Praha after leading its recruitment analysis. Builds the player evaluation models, data pipelines and dashboards that scouts and sporting directors use in every transfer window — combining event and tracking data, video and live scouting. Former professional player and Slovakia U21 international; MSc in Performance Analysis (UK).',
    fitTitle: 'Fit for Director of Soccer Analytics',
    fit: [
      ['Recruitment analytics strategy across first team, second team and academy', 'Led recruitment analysis at Sparta, now head the club’s analytics function; profiles and squad lists across age groups and positions; regular meetings with the Head of Scouting and lead scouts.'],
      ['Positional profiles, benchmarking and similarity modelling', 'Position-specific profiles and ratings, redesigned scouting report form, and player-similarity and machine-learning evaluation models built with the analytics team.'],
      ['Data providers and integrations (StatsBomb, Wyscout, SkillCorner)', 'Integrated StatsBomb, Wyscout, SkillCorner, Impect and Opta into club-owned databases; replaced external platforms, saving around 35% of the data and software budget.'],
      ['Evaluation models, contract value and transfer shortlists', 'Player ratings, valuation and market-value models, succession planning and target shortlists; DAC: identified Krstović and Bajo, later sold for club-record fees.'],
      ['Dashboards, data ingestion and integrity', 'Sparta Data Platform: ingestion, storage, dashboards, automated reports and alerts (Python, SQL, PostgreSQL/Supabase, AWS).'],
      ['Partnering with the Sporting Director, scouts and coaches', 'Learn daily from Sporting Director Tomáš Rosický; weekly first-team analysis; daily contact with the scouting network across transfer windows.'],
    ],
    projectOrder: ['Event & tracking player models', 'Club insights platform', 'Scout AI Planner', 'Game-to-game & team models'],
    extraBullets: {
      sparta: {
        after: 'Hold regular meetings',
        text: 'Develop player-similarity and machine-learning evaluation models with the analytics team for talent identification and target benchmarking.',
      },
    },
    toolkitExtra: { 'Engineering & BI': ['R (working knowledge)'] },
    // Earlier analyst roles shown as one-line summaries to keep two pages.
    compactRoles: ['dac-coach', 'dac-opp'],
  },
};

const variantName = variants[process.argv[2]] ? process.argv[2] : 'general';
const v = variants[variantName];
const { headline, intro } = v;

const withExtras = (r) => {
  const extra = v.extraBullets?.[r.id];
  if (!extra) return r.highlights;
  const i = r.highlights.findIndex((h) => h.startsWith(extra.after));
  const list = [...r.highlights];
  list.splice(i + 1, 0, extra.text);
  return list;
};
const orderedProjects = v.projectOrder
  ? v.projectOrder.map((t) => projects.find((p) => p.title === t)).filter(Boolean)
  : projects;
const tools = toolkit.map((g) => ({ ...g, items: [...g.items, ...(v.toolkitExtra?.[g.group] || [])] }));

const roles = experience.filter((r) => r.id !== 'player');
const player = experience.find((r) => r.id === 'player');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; }
  body { font: 9pt/1.42 Inter, system-ui, sans-serif; color: #18181b; margin: 0; }
  h1 { font: 30pt/1 'Instrument Serif', Georgia, serif; margin: 0; letter-spacing: -0.01em; }
  h2 { font: 14pt/1.1 'Instrument Serif', Georgia, serif; margin: 12pt 0 5pt; padding-bottom: 3pt; border-bottom: 0.6pt solid #d4d4d8; }
  h3 { font-size: 9.8pt; margin: 0; font-weight: 600; }
  a { color: inherit; text-decoration: none; }
  .accent { color: #15803d; }
  .muted { color: #52525b; }
  .head { display: flex; align-items: center; gap: 12pt; }
  .who { flex: 1; }
  .photo { width: 64pt; height: 64pt; border-radius: 50%; object-fit: cover; object-position: 50% 28%; border: 0.6pt solid #d4d4d8; }
  .site { display: block; margin-top: 9pt; padding: 5pt 8pt; border-left: 2pt solid #15803d; background: #f0fdf4; font-size: 8.4pt; color: #14532d; }
  .site u { text-underline-offset: 1.5pt; }
  .role { font-weight: 600; margin-top: 4pt; }
  .tag { font-size: 7.6pt; letter-spacing: .08em; text-transform: uppercase; color: #52525b; margin-top: 3pt; }
  .contact { text-align: right; font-size: 8.4pt; color: #3f3f46; line-height: 1.55; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8pt; margin-top: 8pt; }
  .stat { border-top: 1.2pt solid #15803d; padding-top: 4pt; }
  .stat b { font: 17pt/1 'Instrument Serif', serif; display: block; }
  .stat span { font-size: 7.6pt; color: #52525b; line-height: 1.35; display: block; margin-top: 2pt; }
  .job { margin-bottom: 8pt; }
  .job-top { break-after: avoid; }
  li { break-inside: avoid; }
  .job-top { display: flex; justify-content: space-between; gap: 8pt; }
  .when { font-size: 8pt; color: #52525b; white-space: nowrap; }
  ul { margin: 3pt 0 0; padding-left: 11pt; }
  li { margin: 1.2pt 0; }
  li::marker { color: #15803d; }
  table { width: 100%; border-collapse: collapse; font-size: 8.4pt; }
  td { border-top: 0.6pt solid #e4e4e7; padding: 3.5pt 6pt 3.5pt 0; vertical-align: top; }
  td:first-child { width: 36%; font-weight: 500; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4pt 16pt; }
  .proj { break-inside: avoid; }
  .proj p { margin: 1pt 0 0; color: #3f3f46; }
  .tk { margin: 1.5pt 0; }
  .tk b { font-weight: 600; }
</style></head><body>
<div class="head">
  <img class="photo" src="${photoUrl}" alt="">
  <div class="who">
    <h1>${esc(profile.name)}</h1>
    <div class="role">${esc(profile.role)} <span class="muted">· ${esc(profile.club)}</span></div>
    <div class="tag">${esc(headline)}</div>
  </div>
  <div class="contact">
    ${esc(profile.location)}<br>
    ${esc(profile.phone)} · <a href="mailto:${profile.email}">${esc(profile.email)}</a><br>
    <a href="${profile.linkedin}">LinkedIn</a>
  </div>
</div>
<a class="site" href="${site}"><b>Interactive CV</b> — projects, platform screenshots and models: <u>${site.replace('https://', '')}</u> ↗</a>

<h2>Profile</h2>
<p style="margin:0">${esc(intro)}</p>
<div class="stats">${stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>

${v.fit ? `<h2>${esc(v.fitTitle)}</h2>
<table>${v.fit.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table>` : ''}

<h2>Experience</h2>
${roles.map((r) => `<div class="job">
  <div class="job-top"><h3>${esc(r.title)} <span class="muted" style="font-weight:400">· ${esc(r.company)}</span></h3><span class="when">${esc(r.period)} · ${esc(r.location.split(',')[0])}</span></div>
  ${r.highlights.length && !v.compactRoles?.includes(r.id) ? `<ul>${withExtras(r).map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : `<div class="muted">${esc(r.summary)}</div>`}
</div>`).join('')}
<div class="job">
  <div class="job-top"><h3>${esc(player.title)}</h3><span class="when">${esc(player.period)}</span></div>
  <div class="muted">${esc(player.company)}. ${esc(player.summary)}</div>
</div>

<h2>Selected work</h2>
<div class="grid2">${orderedProjects.map((p) => `<div class="proj"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join('')}</div>

<h2>Education, toolkit, languages</h2>
<div class="grid2">
  <div>${education.map((e) => `<div style="margin-bottom:4pt"><h3>${esc(e.degree)}</h3><div class="muted">${esc(e.school)} · ${esc(e.period)}</div><div class="muted">${esc(e.note)}</div></div>`).join('')}
  <div class="tk"><b>Languages:</b> ${languages.map(esc).join(' · ')}</div></div>
  <div>${tools.map((g) => `<div class="tk"><b>${esc(g.group)}:</b> ${g.items.map(esc).join(', ')}</div>`).join('')}</div>
</div>
</body></html>`;

const htmlPath = path.join(tmp, 'cv.html');
writeFileSync(htmlPath, html);

const out = path.join(root, v.file);
mkdirSync(path.dirname(out), { recursive: true });

const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=4000',
  `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href,
], { stdio: 'ignore' });
console.log(`Wrote ${path.relative(root, out)}`);
