// Builds the downloadable PDF CV from src/data/cv.js with headless Chrome.
//   node scripts/build-cv.mjs              -> public/Kristian_Flak_CV.pdf (general)
//   node scripts/build-cv.mjs leicester    -> out/Kristian_Flak_CV_Leicester.pdf (with role-fit table)
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

const variant = process.argv[2] === 'leicester' ? 'leicester' : 'general';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fit = [
  ['Lead performance analysis, data science and recruitment data', 'Head of Analysis at DAC 1904 (six analysts). At Sparta, lead club analytics and insights with a data engineer, linking scouts, analysts and coaches.'],
  ['Objective, timely insight for the First Team Manager and Sporting Director', 'Daily tactical, opposition, video and data work with Sparta’s first-team staff; strategic support to the Sporting Director on squad planning, staff roles and player trading.'],
  ['KPIs linked to the Football Strategy', 'Turned the game model into position profiles, team KPIs, player ratings and recruitment criteria, with shared reporting standards.'],
  ['Modern platforms, tracking data and AI-enabled workflows', 'SkillCorner tracking, StatsBomb, Impect, Opta, Wyscout, Hudl; Python, SQL, cloud; AI-assisted scouting planner and in-house tools.'],
  ['Track record of influencing high-level decisions', 'DAC: back-to-back 2nd places with record points; Krstović and Bajo sold for club-record fees. Sparta: succession, valuation and sale input.'],
];

const headline =
  variant === 'leicester'
    ? 'Football Insights · Performance Analysis · Recruitment Data · Decision Support'
    : 'Club Analytics · Football Insights · Performance Analysis · Recruitment';

const intro =
  'Football insights leader who has run a club analysis department and now leads club analytics and insights at AC Sparta Praha. Brings performance analysis, data science and recruitment data together into one service for the coaching staff and the Sporting Director. Former professional player and Slovakia U21 international, UCFB-educated in the UK.';

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
  .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 12pt; }
  .role { font-weight: 600; margin-top: 4pt; }
  .tag { font-size: 7.6pt; letter-spacing: .08em; text-transform: uppercase; color: #52525b; margin-top: 3pt; }
  .contact { text-align: right; font-size: 8.4pt; color: #3f3f46; line-height: 1.55; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8pt; margin-top: 8pt; }
  .stat { border-top: 1.2pt solid #15803d; padding-top: 4pt; }
  .stat b { font: 17pt/1 'Instrument Serif', serif; display: block; }
  .stat span { font-size: 7.6pt; color: #52525b; line-height: 1.35; display: block; margin-top: 2pt; }
  .job { margin-bottom: 8pt; break-inside: avoid; }
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
  <div>
    <h1>${esc(profile.name)}</h1>
    <div class="role">${esc(profile.role)} <span class="muted">· ${esc(profile.club)}</span></div>
    <div class="tag">${esc(headline)}</div>
  </div>
  <div class="contact">
    ${esc(profile.location)}<br>${variant === 'leicester' ? 'Open to relocating to the UK<br>' : ''}
    ${esc(profile.phone)} · <a href="mailto:${profile.email}">${esc(profile.email)}</a><br>
    <a href="${profile.linkedin}">LinkedIn</a> · <a href="https://interactivecv-psi.vercel.app">interactivecv-psi.vercel.app</a>
  </div>
</div>

<h2>Profile</h2>
<p style="margin:0">${esc(intro)}</p>
<div class="stats">${stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>

${variant === 'leicester' ? `<h2>Fit for Head of Football Insights</h2>
<table>${fit.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table>` : ''}

<h2>Experience</h2>
${roles.map((r) => `<div class="job">
  <div class="job-top"><h3>${esc(r.title)} <span class="muted" style="font-weight:400">· ${esc(r.company)}</span></h3><span class="when">${esc(r.period)} · ${esc(r.location.split(',')[0])}</span></div>
  ${r.highlights.length ? `<ul>${r.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : `<div class="muted">${esc(r.summary)}</div>`}
</div>`).join('')}
<div class="job">
  <div class="job-top"><h3>${esc(player.title)}</h3><span class="when">${esc(player.period)}</span></div>
  <div class="muted">${esc(player.company)}. ${esc(player.summary)}</div>
</div>

<h2>Selected work</h2>
<div class="grid2">${projects.map((p) => `<div class="proj"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join('')}</div>

<h2>Education, toolkit, languages</h2>
<div class="grid2">
  <div>${education.map((e) => `<div style="margin-bottom:4pt"><h3>${esc(e.degree)}</h3><div class="muted">${esc(e.school)} · ${esc(e.period)}</div><div class="muted">${esc(e.note)}</div></div>`).join('')}
  <div class="tk"><b>Languages:</b> ${languages.map(esc).join(' · ')}</div></div>
  <div>${toolkit.map((g) => `<div class="tk"><b>${esc(g.group)}:</b> ${g.items.map(esc).join(', ')}</div>`).join('')}</div>
</div>
</body></html>`;

const htmlPath = path.join(tmp, 'cv.html');
writeFileSync(htmlPath, html);

const out = variant === 'leicester'
  ? path.join(root, 'out/Kristian_Flak_CV_Leicester.pdf')
  : path.join(root, 'public/Kristian_Flak_CV.pdf');
mkdirSync(path.dirname(out), { recursive: true });

const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=4000',
  `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href,
], { stdio: 'ignore' });
console.log(`Wrote ${path.relative(root, out)}`);
