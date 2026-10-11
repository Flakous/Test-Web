// All CV content lives here so the site can be updated without touching components.

export const profile = {
  name: 'Kristián Flak',
  role: 'Head of Club Analytics & Insights',
  club: 'AC Sparta Praha',
  tagline: 'Football insights leader',
  summary:
    'I bring performance analysis, data science, recruitment data and traditional scouting together into one service for the coaching staff, the Head of Scouting and the Sporting Director. Former professional player, UK-educated analyst, and builder of the tools my clubs make decisions with.',
  location: 'Prague, Czech Republic',
  email: 'business.flak@gmail.com',
  phone: '+420 776 031 313',
  phoneHref: 'tel:+420776031313',
  linkedin: 'https://www.linkedin.com/in/kristi%C3%A1n-flak-811152165/',
  photo: '/images/Main photo.jpeg',
  cvPdf: '/Kristian_Flak_CV.pdf',
  openTo: 'Open to head-of-department roles in the UK and abroad',
};

export const stats = [
  { value: '2×', label: 'Back-to-back 2nd places at DAC — best in club history, record points' },
  { value: '2', label: 'Club-record outgoing transfers identified and supported (Krstović, Bajo)' },
  { value: '6', label: 'Analysts led as Head of Analysis at DAC 1904' },
  { value: '35%', label: 'Of the data and software budget saved at Sparta by replacing external platforms with our own in-house tools' },
];

// What the current role actually covers, beyond the title.
export const pillars = [
  {
    title: 'Insights leadership',
    text: "Lead Sparta's football data and analytics function and set priorities for data engineering and analytical support.",
  },
  {
    title: 'First-team support',
    text: 'Weekly tactical, technical, opposition, video and data analysis with the coaching staff — and an independent voice when a decision needs challenge.',
  },
  {
    title: 'Sporting Director partner',
    text: 'Football strategy, squad planning, succession, role profiles and candidate identification for key sporting appointments.',
  },
  {
    title: 'Recruitment & trading',
    text: 'Live scouting, video, event and tracking data and market information combined into identification, valuation and sales strategy.',
  },
  {
    title: 'Platforms & AI',
    text: 'Club-owned insights platform, automated reports, alerts, player ratings and AI-assisted workflows built in Python, SQL and the cloud.',
  },
];

export const experience = [
  {
    id: 'sparta',
    title: 'Head of Club Analytics & Insights',
    company: 'AC Sparta Praha',
    period: 'Jan 2026 – Present',
    location: 'Prague, Czech Republic',
    current: true,
    summary:
      'Promoted from Lead Recruitment Analyst to lead the club’s football data and insights function across recruitment, first team and sporting leadership.',
    highlights: [
      'Lead the football data and analytics function, coordinating a data engineer and analytical support.',
      'Work with the first-team coaching staff every week on tactical, opposition, video and data analysis.',
      'Support the Sporting Director on strategy, squad planning, job descriptions and staff identification.',
      'Learn daily from Sporting Director Tomáš Rosický, who led Sparta to back-to-back Czech titles (2022/23, 2023/24) and its first Champions League league phase in 19 years (2024/25).',
      'Hold regular meetings with the Head of Scouting and lead scouts and keep daily contact with the scouting network to align priorities, targets and report feedback.',
      'Translate the football strategy into position profiles, ratings, team KPIs, expected-points and Elo models.',
      'Built SkillCorner physical and game-intelligence position ratings to add tracking context to event data.',
      'Replaced external data platforms with club-built tools, saving around 35% of the data and software budget.',
      'Support outgoing-transfer strategy and early club-to-club conversations about player sales.',
    ],
    tags: ['Insights leadership', 'First team', 'Tracking data', 'Sporting strategy', 'Platform build'],
    images: [
      '/images/Platform/sparta-data-platform.jpg',
      '/images/Platform/pass-decision-model.jpg',
    ],
  },
  {
    id: 'sparta-recruitment',
    title: 'Lead Recruitment Analyst',
    company: 'AC Sparta Praha',
    period: 'Aug 2024 – Jan 2026',
    location: 'Prague, Czech Republic',
    summary:
      'Led recruitment analysis: turning internal and external data into player insight that directly shaped recruitment decisions.',
    highlights: [
      'Led sourcing and analysis of internal and external datasets to produce actionable player insights for recruitment decisions.',
      'Produced data profiles and visualisations of target players aligned with the club’s recruitment strategy.',
      'Worked with local, national and international area coordinators and scouts on player tracking, fixture scheduling, coverage and report analysis.',
      'Improved the scouting report form, built position-specific profiles and managed internal squad lists across age groups and positions.',
      'Developed an AI solution to optimise scouting routes, making talent identification faster and more efficient.',
      'Created advanced metrics and valuation models to deepen analysis and improve club decision-making.',
    ],
    tags: ['Recruitment', 'Data profiling', 'Scouting operations', 'AI', 'Valuation'],
    images: [
      '/images/Lead Recruitment Analyst/Scouting/0B61B93E-50D4-44A5-82F4-A5E7AFDD31FD.jpg',
      '/images/Lead Recruitment Analyst/Scouting/1295adac-b368-428b-8f8c-9c54bebe00cf.jpg',
      '/images/Lead Recruitment Analyst/Scouting/23310E2C-6EB3-456A-AB0D-66D14509BBDE.jpg',
      '/images/Lead Recruitment Analyst/Scouting/D492D1D1-0B83-43C5-B590-3343436790BB_1_105_c.jpeg',
      '/images/Lead Recruitment Analyst/Scoutin AI/Planner.png',
    ],
  },
  {
    id: 'dac-head',
    title: 'Head of Analysis',
    company: 'DAC 1904 Dunajská Streda',
    period: 'Nov 2023 – Aug 2024',
    location: 'Dunajská Streda, Slovakia',
    summary: 'Led video, data and performance analysis across the club with a six-person department.',
    highlights: [
      'Part of back-to-back 2nd-place finishes — the best results in club history, with record points.',
      'Identified and supported the sale of Krstović and Bajo for club-record fees.',
      'Built the scouting-analysis structure and game model with head coach Xisco Muñoz.',
      'Set video-analysis structures, standards and reporting across the club.',
      'Produced data-based reports on team and league-wide trends.',
    ],
    tags: ['Department lead', 'Game model', 'Performance analysis', 'Recruitment'],
    images: [
      '/images/Head of Analysis/IMG_1120.jpeg',
      '/images/Head of Analysis/Analysis structure.png',
      '/images/Head of Analysis/fbd4fdb9-14fd-4424-8a64-a13de0b771ed.jpg',
      '/images/Head of Analysis/Medals.jpg',
    ],
  },
  {
    id: 'dac-coach',
    title: 'Coach Analyst',
    company: 'DAC 1904 Dunajská Streda',
    period: 'Jan 2023 – Nov 2023',
    location: 'Dunajská Streda, Slovakia',
    summary: 'Combined coaching with analysis inside the first-team staff under Adrián Guľa.',
    highlights: [
      'Opposition analysis and pressing-pattern identification.',
      'Scouting dashboards and KPIs for staff.',
      'Live tagging and in-game feedback.',
      'Training-session preparation and individual player work with the first-team staff.',
    ],
    tags: ['Opposition', 'Live analysis', 'Training design', 'Individual development'],
    images: [
      '/images/Coach Analyst/A77780A8-0796-4F01-A5E1-228B80B892D7_1_105_c.jpeg',
      '/images/Coach Analyst/46a66b1f-ab59-4fc6-acc9-6cc2d8430da5.jpg',
      '/images/Coach Analyst/Individual work.png',
      '/images/Coach Analyst/Indivindi.png',
    ],
  },
  {
    id: 'dac-opp',
    title: 'Opposition Analyst',
    company: 'DAC 1904 Dunajská Streda',
    period: '2022',
    location: 'Dunajská Streda, Slovakia',
    summary: 'Opposition analysis with video and data (Opta API, Metrica, Wyscout, Hudl).',
    highlights: [
      'Opposition reports combining event data and video.',
      'Match-preparation plans and tactical counter-strategies.',
    ],
    tags: ['Opta', 'Metrica', 'Wyscout', 'Hudl'],
    images: [
      '/images/Opposition Analyst/1.png',
      '/images/Opposition Analyst/2.png',
      '/images/Opposition Analyst/Middle Block 4:1:4:1.png',
      '/images/Opposition Analyst/pressing POD.png',
    ],
  },
  {
    id: 'canal',
    title: 'Junior Football Editor',
    company: 'Canal+',
    period: '2022',
    location: 'Prague, Czech Republic',
    summary: 'Match analysis and highlight production for broadcast using Piero and RT Sports.',
    highlights: [],
    tags: ['Broadcast', 'Video'],
    images: [],
  },
  {
    id: 'player',
    title: 'Professional Footballer',
    company: 'AC Sparta Praha · Liptovský Mikuláš · FK Liepāja · Makedonikos',
    period: '2017 – 2022',
    location: 'Czech Republic, Slovakia, Latvia, Greece',
    summary:
      'Came through the AC Sparta Praha academy; Slovakia U21 international; professional football in four countries.',
    highlights: [
      'First-hand understanding of dressing rooms and how coaches and players actually use information.',
      'The reason my analysis is built to be used on the pitch, not just read.',
    ],
    tags: ['Slovakia U21', 'Sparta academy'],
    images: [],
  },
];

export const projects = [
  {
    title: 'Club insights platform',
    text: 'Sparta Data Platform: the club’s own internal analytics app for opposition reports, gameweek reviews, player profiles, ratings and alerts — replacing external platforms.',
    tags: ['Python', 'SQL', 'Web app', 'Cloud'],
    image: '/images/Platform/sparta-data-platform.jpg',
  },
  {
    title: 'Scout AI Planner',
    text: 'AI-assisted planning that assigns scouts to matches by priority, location and expertise, with a live reporting view.',
    tags: ['AI', 'Automation'],
    image: '/images/Lead Recruitment Analyst/Scoutin AI/Planner.png',
  },
  {
    title: 'Event & tracking player models',
    text: 'Decision models on event and tracking data — e.g. which pass option the model rated highest versus the one played — plus SkillCorner physical and game-intelligence position ratings.',
    tags: ['Tracking', 'Decision-making', 'SkillCorner', 'StatsBomb'],
    image: '/images/Platform/pass-decision-model.jpg',
  },
  {
    title: 'Game-to-game & team models',
    text: 'Game-to-game player ratings, expected points, Elo ratings and monthly reports tied to the club’s KPIs.',
    tags: ['xPts', 'Elo', 'KPIs'],
    image: '/images/Lead Recruitment Analyst/3.png',
  },
];

export const toolkit = [
  { group: 'Data & tracking', items: ['StatsBomb', 'SkillCorner', 'Impect', 'Opta', 'Wyscout', 'Metrica'] },
  { group: 'Video', items: ['Hudl Sportscode', 'Wyscout', 'Piero'] },
  { group: 'Engineering & BI', items: ['Python', 'SQL', 'PostgreSQL / Supabase', 'AWS', 'APIs', 'Streamlit', 'Tableau', 'Power BI'] },
  { group: 'Football', items: ['Opposition analysis', 'Game model', 'Live scouting', 'Player valuation', 'Squad planning', 'KPI design'] },
];

export const education = [
  {
    degree: 'MSc Coaching and Analysis (Performance Analysis)',
    school: 'University of East London / UCFB',
    period: '2023 – 2024',
    location: 'United Kingdom',
    note: 'Thesis: goal-kick strategy in the Slovak Niké liga. Earlier research: data-driven player recruitment.',
    images: [
      '/images/school/IMG_0522.jpeg',
      '/images/school/IMG_0578.jpeg',
      '/images/school/Thesis name.png',
      '/images/school/Thesis.jpeg',
    ],
  },
  {
    degree: 'BSc Sports Science',
    school: 'VŠTVS Palestra',
    period: '2019 – 2022',
    location: 'Prague',
    note: 'UEFA C coaching licence.',
    images: [],
  },
];

export const languages = ['Slovak (native)', 'Czech (fluent)', 'English (advanced professional)'];
