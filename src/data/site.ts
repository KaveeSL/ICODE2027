export const site = {
  name: 'ICODE2027',
  fullName: 'International Conference on Open and Digital Education',
  year: 2027,
  datesLabel: '4–5 August 2027',
  location: 'Colombo · Sri Lanka · Hybrid',
  organizer: 'Centre for Open and Distance Learning (CODL), University of Moratuwa',
  shortOrg: 'CODL · University of Moratuwa',
  email: 'icode@codl.lk',
  phone: '+94 74 247 8799',
  whatsapp: 'https://wa.me/94742478799',
  universityUrl: 'https://uom.lk',
  bitUrl: 'https://bit.uom.lk/',
  previousConferenceUrl: 'https://icode.bit.uom.lk',
  previousConferenceLabel: 'ICODE2026',
  /** CTA copy for linking to ICODE2026 — avoid “previous” */
  legacyConferenceCta: 'The first chapter · ICODE2026',
  submitUrl: '/call-for-papers',
}

export const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Important Dates', to: '/#dates' },
  { label: 'Schedule', to: '/programme' },
  { label: 'Programme', to: '/programme' },
  { label: 'Contact', to: '/#contact' },
] as const

export const footerNav = [
  { label: 'About ICODE2027', to: '/#about' },
  { label: 'Important Dates', to: '/#dates' },
  { label: 'Schedule', to: '/programme' },
  { label: 'Programme', to: '/programme' },
  { label: 'FAQs', to: '/#faq' },
  { label: 'Contact', to: '/#contact' },
] as const

export const pageLinks = [
  { label: 'Call for Papers', to: '/call-for-papers' },
  { label: 'Registration', to: '/registration' },
  { label: 'Governance', to: '/governance' },
  { label: 'Proceedings', to: '/proceedings' },
] as const

export const importantDates = [
  {
    label: 'Submissions Open',
    date: '1 April 2027',
    note: 'Extended abstract submissions open',
    status: 'upcoming' as const,
  },
  {
    label: 'Submission Deadline',
    date: '18 July 2027',
    note: 'Extended abstract submission closes',
    status: 'upcoming' as const,
  },
  {
    label: 'Acceptance notification',
    date: '19 July 2027',
    note: 'Authors notified of decisions',
    status: 'upcoming' as const,
  },
  {
    label: 'Registration deadline',
    date: '30 July 2027',
    note: 'Confirm your place and presentation slot',
    status: 'upcoming' as const,
  },
  {
    label: 'ICODE2027',
    date: '4–5 August 2027',
    note: 'Two-day hybrid conference',
    status: 'event' as const,
  },
]

export const programmeDays = [
  {
    slug: 'day1',
    day: 'Day 1',
    title: 'Academic Research Conference',
    date: '4 August 2027',
    venue: 'University of Moratuwa, Sri Lanka',
    summary:
      'A peer-reviewed research forum for scholars exploring the future of open, distance, and digital education.',
    points: [
      'Keynote addresses and invited talks',
      'Parallel abstract presentations and symposia',
      'Interactive sessions and live demonstrations',
      'Best presentation recognitions',
    ],
  },
  {
    slug: 'day2',
    day: 'Day 2',
    title: 'Practice & Innovation Workshops',
    date: '5 August 2027',
    venue: 'University of Moratuwa, Sri Lanka',
    summary:
      'Deep-dive, hands-on sessions for instructional designers, Moodle administrators, faculty, and EdTech teams.',
    points: [
      'Course design studios',
      'Learning analytics and AI tools',
      'Case-based institutional showcases',
      'Micro-credential and recognition dialogues',
    ],
  },
]

export const whyParticipate = [
  'Present high-impact work to an international audience.',
  'Build collaborations across institutions and sectors.',
  'Showcase innovative digital learning initiatives.',
  'Engage with regional and global leaders in Open and Digital Education.',
  'Help shape an inclusive, future-ready digital agenda.',
  'Access practical tools, templates, and takeaways you can apply immediately.',
]

export const audiences = [
  {
    title: 'Early- & mid-career academics',
    detail: 'Seeking feedback, visibility, and cross-institutional networks.',
  },
  {
    title: 'Instructional designers & EdTech teams',
    detail: 'Scaling digital programmes with evidence and peer exchange.',
  },
  {
    title: 'Policy makers & institutional leaders',
    detail: 'Planning national or institutional reforms with regional context.',
  },
]

export const themes = [
  'Digital transformation in education',
  'Artificial Intelligence in education',
  'Emerging methods, technologies and tools in education',
  'Online pedagogy, assessment, and learner engagement',
  'Open and distance learning systems and innovations',
  'Micro-credentials, credit transfer, and lifelong learning',
  'Ethics, Quality Assurance, and Governance in digital education',
  'Access, inclusion, and equity in digital education',
]

export const partners = [
  { name: 'University of Moratuwa', role: 'Hosting Partner' },
  { name: 'CODL', role: 'Organised by' },
  { name: 'Ministry of Digital Economy', role: 'Government Partner' },
  { name: 'Emojot', role: 'Engagement Partner' },
  { name: 'Lanka IOC / SERVO', role: 'Hospitality Partner' },
]

export const faqs = [
  {
    id: 'format',
    question: 'What is the event format?',
    answer: [
      'Day 1 – Academic Research Conference',
      'Day 2 – Practice & Innovation Workshops',
      'Hybrid participation with on-site and online options',
    ],
  },
  {
    id: 'submissions',
    question: 'What type of submissions are expected?',
    answer:
      'We invite 2–3 page extended abstracts (700–1,000 words) presenting empirical research, design-based studies, innovative practices, policy analyses, or case studies that align with the conference themes in open and digital education. All submissions must be in PDF format.',
  },
  {
    id: 'how-to-submit',
    question: 'How do I submit my extended abstract?',
    answer:
      "Extended abstracts should be submitted via the online submission portal on the Call for Papers page. Any other method of submission will not be accepted.",
  },
  {
    id: 'fees',
    question: 'How do I register for the event?',
    answer:
      'Registration opens closer to the conference. Fees and programme access details are listed on the Registration page.',
  },
  {
    id: 'venue',
    question: 'Where will the conference take place?',
    answer: [
      'ICODE2027 is a hybrid conference with on-site sessions at the University of Moratuwa and a fully supported virtual track for remote participation.',
      'Day 1 – Academic Research Conference (4 August 2027): University of Moratuwa, Sri Lanka',
      'Day 2 – Practice & Innovation Workshops (5 August 2027): University of Moratuwa, Sri Lanka',
    ],
  },
  {
    id: 'language',
    question: 'What is the language of the conference and submissions?',
    answer:
      'The working language of ICODE2027 is English. Extended abstracts, presentations, and conference materials should be prepared in English.',
  },
]

export const registrationFees = [
  { category: 'Accepted Authors', fee: 'Free', highlight: true },
  { category: 'Regular Registration', fee: 'LKR 10,000' },
  {
    category: 'State University / OUSL — Academics and Students',
    fee: 'LKR 7,500',
  },
  { category: 'Government Officials in Education', fee: 'LKR 5,000' },
  {
    category: 'International Participants',
    fee: '$30',
    secondaryFee: '$20 (Virtual)',
  },
]

export const registrationIncludes = [
  'Academic research sessions on 4 August 2027',
  'Practice and innovation workshops on 5 August 2027',
  'Keynote and invited sessions',
  'Refreshments and lunch during registered conference/workshop days',
]

export const templateSections = [
  {
    title: '1. Introduction',
    detail:
      'Background, problem statement, rationale, relevance to open/digital education, and link to conference themes.',
  },
  {
    title: '2. Related work / context',
    detail: 'Key literature, policy context, or practice baseline that situates the contribution.',
  },
  {
    title: '3. Approach / methodology',
    detail: 'Design, methods, data sources, or implementation pathway used in the study or practice.',
  },
  {
    title: '4. Findings / outcomes',
    detail: 'Results, insights, artefacts, or early evidence of impact.',
  },
  {
    title: '5. Implications & conclusion',
    detail: 'What the work means for open and digital education, plus next steps.',
  },
]

export const authorGuidelines = {
  language: 'English',
  wordLimit: '700–1000 words (excluding author block and references)',
  length: '2–3 pages',
  format: 'PDF via the online submission portal',
  anonymity:
    'Blind review: the PDF must not contain identifying information such as author names, affiliations, emails, or acknowledgements. Author details must be entered in the correct order within the submission system.',
  originality:
    'The work must not have been previously published or be under consideration elsewhere, and should not be simultaneously submitted to another conference, journal, or publication venue.',
  aiPolicy:
    'Authors are fully responsible for the submitted content. Generative AI tools must not be listed as authors, and any substantive use of such tools in content creation should be disclosed in the Acknowledgements section.',
}

export const governanceGroups = [
  {
    id: 'strategic',
    title: 'Strategic Leadership',
    description:
      'Event Patron and Co-chairs provide overall direction with support from the International Advisory Board and summit steering groups.',
    people: [
      {
        name: 'Ms Vishaka Nanayakkara',
        role: 'Director, Centre for Open and Distance Learning, University of Moratuwa',
      },
      {
        name: 'Conference Co-Chairs',
        role: 'Academic and organising leadership for ICODE2027',
      },
    ],
  },
  {
    id: 'academic',
    title: 'Academic Programme',
    description:
      'Programme chairs and the review committee shape tracks, peer review, keynotes, and session quality.',
    people: [
      {
        name: 'Programme Committee',
        role: 'Peer review, session design, and academic quality assurance',
      },
      {
        name: 'Track / Session Chairs',
        role: 'Theme leadership across research and practice days',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations & Secretariat',
    description:
      'Logistics, registration, communications, and on-site coordination for the hybrid conference.',
    people: [
      {
        name: 'Conference Secretariat',
        role: 'ICODE2027, CODL, University of Moratuwa, Sri Lanka',
      },
      {
        name: 'Volunteer & Logistics Team',
        role: 'Venue, hybrid production, and participant support',
      },
    ],
  },
]

export const aboutCopy = {
  lead: 'ICODE2027 is an international research conference at the University of Moratuwa (UoM), hosted by the Centre for Open and Distance Learning (CODL). It is envisioned as a space where policy makers, researchers, and practitioners could design the next generation of open, distance, and digital education together.',
  body: 'Over two days, the programme moves intentionally from research to practice. Conversations focus on resilient digital ecosystems, inclusive learning pathways, micro-credentials, and quality assurance in a rapidly changing education landscape.',
  global:
    'While rooted in Sri Lanka, ICODE2027 is globally connected, welcoming contributors from across the Global South and Global North working on open, distance, and digital learning in universities, professional education, and lifelong learning systems.',
}
