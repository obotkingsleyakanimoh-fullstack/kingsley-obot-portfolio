import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Linkedin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  type: string;
  url: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  stack: string[];
  stackNote?: string;
  featured?: boolean;
  monogram: string;
  theme: string;
};

const LINKEDIN = 'https://www.linkedin.com/in/kingsley-obot-akanimoh/';
const LINKTREE = 'https://linktr.ee/Kingsleyakanimohobot';

const projects: Project[] = [
  {
    id: 'pharmaivo', number: '01', name: 'Pharmaivo', category: 'Marketplace', type: 'Healthcare technology',
    url: 'https://pharmaivo.com', featured: true, monogram: 'P', theme: 'mint',
    summary: 'A digital pharmacy marketplace connecting customers with participating pharmacies for medicine discovery, prescription requests and order fulfilment.',
    challenge: 'The experience has several participants — customers, pharmacies and delivery partners — with different responsibilities. Prescription requests, live pharmacy availability, payment and delivery updates need to stay connected without exposing one role’s data to another.',
    approach: [
      'Designed customer, vendor and administration journeys around clear role-based access and order states.',
      'Built catalogue discovery, pharmacy pages, cart and checkout flows, prescription uploads and pharmacy offer handling.',
      'Connected payment and fulfilment workflows, including Paystack, Flutterwave and KoraPay options and delivery-provider integrations.',
      'Used Supabase authentication, PostgreSQL data, storage and Row Level Security policies to protect account and vendor information.',
    ],
    outcome: 'A live marketplace experience with pharmacy onboarding, product discovery, prescription-aware order flows and delivery or pickup fulfilment.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Supabase Auth', 'Storage / RLS', 'Payment APIs'],
  },
  {
    id: 'techmatrix', number: '02', name: 'TechMatrix Arena', category: 'Marketplace', type: 'Automotive technology',
    url: 'https://techmatrixarena.com', featured: true, monogram: 'TA', theme: 'blue',
    summary: 'An automotive marketplace for discovering vehicle listings, comparing details and connecting with sellers, with listing quality and buyer confidence at its core.',
    challenge: 'Vehicle marketplaces are exposed to fake listings, incomplete vehicle information and low-trust seller interactions. Buyers also need a practical way to narrow a large catalogue by make, model, price, condition and location.',
    approach: [
      'Structured vehicle listings and search filters around the details buyers compare before making contact.',
      'Designed seller-verification and listing-review workflows to strengthen trust and reduce suspicious activity.',
      'Planned AI-assisted listing checks, image watermarking and fraud-risk signals as additional trust layers.',
      'Created monetisation paths for subscriptions and promoted, featured or urgent listings.',
    ],
    outcome: 'A live automotive marketplace with searchable vehicle discovery and a trust-focused product direction for sellers and buyers.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Authentication', 'Marketplace workflows'],
  },
  {
    id: 'jobready', number: '03', name: 'JobReady Africa', category: 'Career tech', type: 'Employment & career tools',
    url: 'https://jobreadyafrica.com', monogram: 'JR', theme: 'violet',
    summary: 'A career platform that brings job discovery together with practical application tools, including CV building, cover letters and job-description matching.',
    challenge: 'Job data is fragmented across providers, and API coverage is not consistent across countries. Some sources return limited Nigerian listings or impose geographic restrictions, while job seekers also need more than a list of vacancies.',
    approach: [
      'Built guided CV and cover-letter workflows, job-description matching and career-resource experiences.',
      'Worked through PDF and DOCX export requirements and reusable CV information across templates.',
      'Evaluated multiple job-data sources, including Muse, JSearch and Techmap, and investigated regional feed fallbacks where API coverage was inconsistent.',
      'Designed the platform so job discovery and career tools can evolve independently as new sources are added.',
    ],
    outcome: 'A live career-tool experience with CV guidance and application support, alongside an evolving job-source integration layer.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'REST APIs', 'Job feeds', 'PDF / DOCX export'],
  },
  {
    id: 'satoshivault', number: '04', name: 'SatoshiVault', category: 'Fintech', type: 'Bitcoin-focused platform',
    url: 'https://satoshivault.online', monogram: 'SV', theme: 'amber',
    summary: 'A Bitcoin-focused digital platform with account features and a BTCPay Server integration path for cryptocurrency payments.',
    challenge: 'Crypto checkout depends on more than sending an API request: the store must expose a compatible payment method and rate, invoice status must be interpreted correctly, and webhook events need to be validated before the application updates a transaction.',
    approach: [
      'Configured BTCPay Server API access and a webhook endpoint for payment-event handling.',
      'Investigated invoice-creation failures by tracing request payloads and the BTCPay payment-method / rate configuration.',
      'Worked on server-side payment status handling so the application can rely on verified provider events rather than a front-end redirect alone.',
      'Kept payment configuration and diagnostics separate from the customer-facing interface.',
    ],
    outcome: 'A Bitcoin-focused product with a configured BTCPay integration path; payment-provider configuration and live transaction testing remain important release checks.',
    stack: ['React', 'Vite', 'Supabase', 'Supabase Edge Functions', 'BTCPay Server API', 'Webhooks'],
    stackNote: 'The exact front-end and data-layer versions should be confirmed against the current source repository before this case study is treated as a final technical inventory.',
  },
  {
    id: 'again', number: '05', name: 'Again Market', category: 'Marketplace', type: 'Pre-owned goods / re-commerce',
    url: 'https://again-marketplace.vercel.app', monogram: 'AM', theme: 'coral',
    summary: 'A Nigerian marketplace for pre-owned goods, with listing review, seller evidence, real-time conversations and offer and counteroffer workflows.',
    challenge: 'A marketplace for used goods has to manage more than listings. Buyers and sellers need a safe negotiation path, staff need to review listings and identity evidence, and simultaneous offers must not reserve the same item twice. Private evidence also has to remain separate from public listing photos.',
    approach: [
      'Built a React 18 and TypeScript application with Vite, TanStack Router, TanStack Query and Supabase for authentication, PostgreSQL data, storage, realtime updates and server-side functions.',
      'Implemented listing submission, image resizing and client-side WebP conversion, private seller-verification files, item-evidence uploads, review queues and short-lived signed URLs for authorised previews.',
      'Added realtime conversations, unread/read states, message attachments and two negotiation modes: direct buyer–seller discussions or staff-mediated conversations.',
      'Modelled offers and counteroffers with offer history, 48-hour expiry and a database transaction/row-locking path to prevent two accepted offers from reserving one listing concurrently.',
      'Built super-admin and staff controls with granular permissions, MFA/AAL2 checks, account moderation, notification preferences, email/browser push adapters and Capacitor mobile packaging setup.',
      'Added Nigerian state/LGA data sync, listing pre-rendering, dynamic sitemap support, SEO metadata, PWA install/offline support and native push adapter setup for FCM/APNs.',
    ],
    outcome: 'The supplied source release contains a detailed marketplace workflow implementation, including listing review, negotiation, verification and admin operations. Its README explicitly says the archive has not yet been connected to the live Supabase project or deployed/production-verified; provider credentials and release configuration remain separate steps.',
    stack: ['React 18.3', 'TypeScript 5.8', 'Vite 6', 'TanStack Router', 'TanStack Query', 'Tailwind CSS 3', 'Supabase Auth', 'PostgreSQL / RLS', 'Supabase Realtime', 'Storage & Edge Functions', 'Capacitor 7', 'React Hook Form', 'Zod', 'Lucide React', 'Web Push / VAPID'],
    stackNote: 'Payment capture, escrow, refunds, courier booking/tracking and external identity/authenticity checks are not active in this source release. Accepting an offer creates a deal/order record and reserves the listing; it does not charge a payment method or book delivery.',
  },
  {
    id: 'zitso', number: '06', name: 'Zitso Energy', category: 'Business website', type: 'Energy services & lead management',
    url: 'https://zitsoenergy.com', monogram: 'ZE', theme: 'sun',
    summary: 'A service-business website for solar and electrical solutions alongside painting, epoxy flooring and property improvement, supported by an admin content and enquiry system.',
    challenge: 'The business needed more than a static brochure. Service information, projects, customer enquiries, quotation requests, service coverage, media and business details all needed a consistent public experience and an admin workflow, while private quotation records and uploads needed controlled access.',
    approach: [
      'Built the application with React 19, TypeScript, Vite, TanStack Start/Router and TanStack Query, using Tailwind CSS 4 and reusable Radix-based UI components.',
      'Designed a Supabase/PostgreSQL data model for profiles and roles, company settings, business hours, office locations, service categories, services, projects, testimonials, FAQs, service areas, quote requests, uploaded quote files, contact messages, navigation, social links, media and admin activity logs.',
      'Implemented admin areas for content, services, projects, categories, FAQs, testimonials, locations, service areas, blog posts, quote requests, contact messages, users and uploaded media.',
      'Used Supabase Auth and database Row Level Security policies with staff roles (super admin, admin and editor) to separate public content reads from staff management and protected quote access.',
      'Built quote and contact forms with file uploads, service-aware quote context, plus a browser-geolocation distance checker against the configured office service radius.',
      'Added a before/after image slider, reusable hero content, blog content management, WhatsApp contact entry point and SEO metadata for public service and project pages.',
    ],
    outcome: 'The supplied source archive contains a database-backed business website, an operational content/admin area and customer lead-generation workflows. It includes SQL migrations and Supabase client integrations; production credentials, cloud database state and deployment configuration should be validated independently.',
    stack: ['React 19.2', 'TypeScript 5.8', 'Vite 8', 'TanStack Start', 'TanStack Router', 'TanStack Query', 'Tailwind CSS 4', 'Supabase Auth', 'PostgreSQL / SQL migrations', 'Supabase Storage & RLS', 'React Hook Form', 'Zod', 'Radix UI', 'Recharts', 'Lucide React', 'Drizzle Kit tooling'],
    stackNote: 'The package includes Drizzle Kit tooling, but the checked-in Drizzle schema file is intentionally blank; the reviewed data definition is in the SQL migrations and the application uses the Supabase client for data access.',
  },
  {
    id: 'kingdavid', number: '07', name: 'King David Ministries', category: 'Business website', type: 'Church & community',
    url: 'https://kingdavidministries.netlify.app', monogram: 'KD', theme: 'plum',
    summary: 'A digital home for a ministry, designed to make its identity, message and key information accessible to visitors.',
    challenge: 'A ministry website needs to communicate its identity and essential information with warmth and clarity, while remaining easy to navigate across phones, tablets and desktop screens.',
    approach: [
      'Organised the website around a clear introduction and visitor-friendly information hierarchy.',
      'Used a responsive layout so the experience remains accessible across screen sizes.',
      'Kept the visual direction aligned with the organisation’s identity and audience.',
    ],
    outcome: 'A ministry website that gives visitors a clear route to learn about the church, its activities and how to connect.',
    stack: [],
    stackNote: 'The source repository is needed to verify the exact implementation stack.',
  },
  {
    id: 'breathofkings', number: '08', name: 'Breath of Kings', category: 'Creative', type: 'Music & artist presence',
    url: 'https://elaborate-meringue-3c8b50.netlify.app', monogram: 'BK', theme: 'rose',
    summary: 'A creative website for a music identity, using a visual-first presentation to introduce the artist and showcase their work.',
    challenge: 'Creative projects need a recognisable visual identity and a focused path through the content, without making the visitor work to find the most important information.',
    approach: [
      'Built the experience around strong visual hierarchy and a distinct creative identity.',
      'Prioritised a clean content flow that can support music, media and artist updates.',
      'Kept the layout responsive so the work can be explored on mobile and desktop.',
    ],
    outcome: 'A live creative portfolio-style website for the Breath of Kings identity.',
    stack: [],
    stackNote: 'The exact source stack and any media integrations need confirmation from the project repository.',
  },
  {
    id: 'reunion', number: '09', name: 'Mavir Leaders College Reunion Hub', category: 'Web application', type: 'Alumni & community platform',
    url: 'https://reunion-glow-hub.vercel.app', monogram: 'ML', theme: 'teal',
    summary: 'An alumni community platform for member access, reunion events, shared photo memories, real-time messaging, voice notes and transparent group finances.',
    challenge: 'The alumni group needed a single place for members to communicate and plan events while keeping administration controlled and class finances transparent. The platform also had to make photo and audio uploads practical without unnecessarily heavy media files.',
    approach: [
      'Built with React 19, TypeScript, Vite, TanStack Start/Router and TanStack Query, with Supabase Auth, PostgreSQL and Row Level Security for member access and role permissions.',
      'Implemented member profiles and approval, admin/member roles, authenticated routes, app settings and a shared bank-account information card with copy-to-clipboard functionality.',
      'Created a realtime class room and direct-message experience using Supabase Realtime, with text messages, browser MediaRecorder voice capture, audio playback and storage-backed voice-note uploads.',
      'Built a public-to-members financial audit ledger with totals for contributions, expenses and net balance; admin-only transaction entry/deletion; and attached payment proof or receipt images.',
      'Added client-side image resizing and WebP conversion before uploading gallery photographs and receipt evidence, plus signed URLs for protected media previews.',
      'Implemented reunion events, agenda and venue details, RSVP records, alumni gallery, profile management and responsive application layouts.',
    ],
    outcome: 'The supplied source and SQL migrations show the core community modules, authenticated member experience, role-aware data policies, realtime messaging, event/RSVP records and transparent financial reporting. The uploaded project contains a PWA manifest and install icons; full native mobile packaging is not evidenced in this archive.',
    stack: ['React 19.2', 'TypeScript 5.8', 'Vite 8', 'TanStack Start', 'TanStack Router', 'TanStack Query', 'Tailwind CSS 4', 'Supabase Auth', 'PostgreSQL / RLS', 'Supabase Realtime', 'Supabase Storage', 'MediaRecorder API', 'WebP Canvas API', 'React Hook Form', 'Zod', 'Radix UI', 'Recharts', 'Lucide React'],
    stackNote: 'The ZIP includes Supabase SQL migrations for the application tables and RLS policies. A live production deployment or working configuration of email/OAuth providers was not independently verified from the source archive.',
  },

];

const categories = ['All work', 'Marketplace', 'Career tech', 'Fintech', 'Web application', 'Business website', 'Creative'];

const skillGroups = [
  {
    icon: Code2,
    title: 'Frontend engineering',
    description: 'Responsive interfaces, reusable components and accessible product journeys.',
    items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'HTML & CSS', 'TanStack Query'],
  },
  {
    icon: Database,
    title: 'Backend & data',
    description: 'Application logic, APIs, structured data and secure user access.',
    items: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'MongoDB', 'Mongoose', 'Prisma', 'REST APIs'],
  },
  {
    icon: ShieldCheck,
    title: 'Integrations & platform features',
    description: 'The systems that turn a website into a working product.',
    items: ['Paystack', 'Flutterwave', 'KoraPay', 'BTCPay Server', 'Webhooks', 'Supabase Auth', 'Storage & RLS', 'Role-based access'],
  },
  {
    icon: Layers3,
    title: 'Delivery & workflow',
    description: 'Deploying, iterating and maintaining products after the first release.',
    items: ['Git & GitHub', 'Vercel', 'Netlify', 'Render', 'Railway', 'Cloudflare', 'PWA workflows', 'API debugging'],
  },
];

type ProjectScreenshotProps = {
  project: Project;
  mode?: 'card' | 'modal';
};

// Vite bundles these local WebP files into the site at build time. There is no
// remote screenshot service and no runtime path back to the dist/ directory.
const projectPreviewAssets = import.meta.glob('./assets/project-previews/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function ProjectScreenshot({ project, mode = 'card' }: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const assetKey = `./assets/project-previews/${project.id}.webp`;
  const screenshotPath = projectPreviewAssets[assetKey];

  useEffect(() => {
    setFailed(false);
  }, [project.id]);

  const showFallback = !screenshotPath || failed;

  return (
    <div className={`project-screenshot project-screenshot-${mode}`}>
      {showFallback ? (
        <div className="screenshot-fallback">
          <span className="screenshot-fallback-label">HOMEPAGE SCREENSHOT UNAVAILABLE</span>
          <p>The saved local preview for {project.name} could not be found.</p>
          <a href={project.url} target="_blank" rel="noreferrer">
            Visit the live website <ExternalLink size={14} />
          </a>
        </div>
      ) : (
        <>
          <img
            src={screenshotPath}
            alt={`Real homepage screenshot of ${project.name}`}
            loading={mode === 'card' ? 'lazy' : 'eager'}
            decoding="async"
            onError={() => setFailed(true)}
          />
          <span className="screenshot-badge"><span /> REAL HOMEPAGE CAPTURE</span>
        </>
      )}
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredProjects = useMemo(
    () => activeCategory === 'All work' ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="site-shell">
      <div className="topline"><span className="topline-dot" /> Open to remote opportunities & selected freelance projects <span className="topline-location">· Lagos, Nigeria</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Kingsley Obot home" onClick={closeMobile}>
          <span className="brand-mark">KO</span>
          <span className="brand-name">KINGSLEY OBOT<span>DEVELOPER & PRODUCT BUILDER</span></span>
        </a>
        <button className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
          <a href="#work" onClick={closeMobile}>Work</a>
          <a href="#capabilities" onClick={closeMobile}>Capabilities</a>
          <a href="#about" onClick={closeMobile}>About</a>
          <a href="#experience" onClick={closeMobile}>Experience</a>
          <a className="nav-contact" href="#contact" onClick={closeMobile}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> FULL-STACK DEVELOPER · INDEPENDENT PRODUCT BUILDER</div>
            <h1>I build web products that turn real problems into <em>working solutions.</em></h1>
            <p className="hero-lede">I’m Kingsley Obot, a full-stack developer with <strong>4 years of hands-on experience</strong> building and improving web applications. I work across React and TypeScript interfaces, backend services, databases and third-party integrations to deliver products for marketplaces, career technology, fintech, energy and community platforms.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-light" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17} /> View LinkedIn profile</a>
            </div>
            <div className="hero-socials">
              <span>ELSEWHERE ONLINE</span>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
              <a href={LINKTREE} target="_blank" rel="noreferrer">Linktree <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Kingsley Obot portrait">
            <div className="visual-grid" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="portrait-card">
              <img
                className="portrait-image"
                src="/kingsley-obot.webp"
                alt="Professional portrait of Kingsley Obot in a black suit and coral shirt"
                loading="eager"
                decoding="async"
              />

            </div>
            <div className="floating-chip chip-code"><Code2 size={15} /> Front end · Backend · APIs</div>
            <div className="floating-chip chip-ship"><Zap size={15} /> Plan · Build · Deliver</div>
            <div className="visual-caption">LAGOS, NIGERIA · REMOTE-READY <span>↗</span></div>
          </div>
        </section>

        <section className="proof-strip section-wrap" aria-label="Portfolio highlights">
          <div><span className="proof-number">04</span><span className="proof-label">Years of hands-on development</span></div>
          <div><span className="proof-number">09</span><span className="proof-label">Projects in my portfolio</span></div>
          <div><span className="proof-number">05+</span><span className="proof-label">Industries and problem spaces</span></div>
          <div><span className="proof-number">End-to-end</span><span className="proof-label">Interfaces, data and integrations</span></div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> SELECTED WORK · 2022—2026</div><h2>Real products. <em>Practical engineering.</em></h2></div>
            <p className="section-intro">Explore nine projects across healthcare, automotive, career tech, fintech, energy and community products. Each case study explains the product, the engineering decisions and the challenges behind the work.</p>
          </div>
          <div className="filter-row" role="group" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button key={category} className={`filter-pill ${activeCategory === category ? 'filter-active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className={`project-card project-${project.theme} ${project.featured ? 'project-featured' : ''}`} key={project.id}>
                <div className="project-art">
                  <ProjectScreenshot project={project} />
                  <span className="art-index">{project.number} / 09</span>
                </div>
                <div className="project-content">
                  <div className="project-meta"><span>{project.category}</span><span>{project.type}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="project-footer">
                    <button className="text-link" onClick={() => setSelectedProject(project)}>View case study <ArrowRight size={15} /></button>
                    <a className="project-external" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}><ExternalLink size={16} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-note"><Sparkles size={16} /><span>Open a case study for the product context, implementation approach, technology stack and delivery considerations.</span></div>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="section-wrap">
            <div className="section-heading section-heading-light">
              <div><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> HOW I CAN CONTRIBUTE</div><h2>Across the stack, <em>from UI to data.</em></h2></div>
              <p className="section-intro">I contribute across the parts that make an application work in practice: responsive interfaces, application logic, database workflows, secure access and third-party integrations.</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group, index) => {
                const Icon = group.icon;
                return <article className="skill-card" key={group.title}>
                  <div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span className="skill-index">0{index + 1}</span></div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </article>;
              })}
            </div>
            <div className="capability-foot"><span>PRODUCT THINKING</span><span>·</span><span>PROBLEM SOLVING</span><span>·</span><span>API INTEGRATION</span><span>·</span><span>CONTINUOUS IMPROVEMENT</span></div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-left">
            <div className="eyebrow"><span className="eyebrow-line" /> ABOUT MY APPROACH</div>
            <h2>Good software starts with understanding the <em>whole problem.</em></h2>
          </div>
          <div className="about-right">
            <p className="about-lede">I’m an independent product builder who enjoys solving the problems between an idea and a useful digital product. My work has involved translating business needs into user flows, structuring data, building interfaces, integrating external services, debugging edge cases and preparing applications for release.</p>
            <p>I’m particularly interested in products that address everyday needs in African markets — trusted marketplaces, career tools, digital payments, healthcare access and essential services — while keeping usability, security and maintainability in view.</p>
            <div className="about-principles">
              <div><span>01</span><strong>Understand the workflow</strong><small>Map user roles, constraints, edge cases and success measures.</small></div>
              <div><span>02</span><strong>Build dependable systems</strong><small>Structure data, protect access and handle failures clearly.</small></div>
              <div><span>03</span><strong>Ship and keep improving</strong><small>Test, release, learn from feedback and iterate.</small></div>
            </div>
            <a className="inline-link" href={LINKEDIN} target="_blank" rel="noreferrer">More about my journey on LinkedIn <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-wrap experience-layout">
            <div className="experience-intro">
              <div className="eyebrow"><span className="eyebrow-line" /> EXPERIENCE & EDUCATION</div>
              <h2>Built through <em>doing.</em></h2>
              <p>Four years of hands-on, independent development and founder-led product work — building features, connecting services, solving implementation problems and preparing products for release.</p>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <div className="timeline-date">2022 — PRESENT</div>
                <div className="timeline-marker"><BriefcaseBusiness size={17} /></div>
                <div className="timeline-body"><span className="timeline-type">INDEPENDENT / FOUNDER-LED PRODUCT WORK</span><h3>Full-Stack Developer & Product Builder</h3><p>Developing and improving web products across healthcare, automotive, career technology, fintech, energy, creative and community use cases. Work includes feature planning, interface development, data workflows, API integrations, debugging and deployment.</p><div className="timeline-tags"><span>Product development</span><span>React & TypeScript</span><span>Data & APIs</span><span>Deployment</span></div></div>
              </article>
              <article className="timeline-item">
                <div className="timeline-date">2021 — 2024</div>
                <div className="timeline-marker"><GraduationCap size={18} /></div>
                <div className="timeline-body"><span className="timeline-type">EDUCATION</span><h3>Computer Science</h3><p>University of the People · 2021–2024</p><div className="timeline-tags"><span>Computer science foundations</span><span>Software development</span></div></div>
              </article>
              <article className="timeline-item">
                <div className="timeline-date">PROFESSIONAL DEVELOPMENT</div>
                <div className="timeline-marker"><Layers3 size={17} /></div>
                <div className="timeline-body"><span className="timeline-type">TECHNICAL TRAINING</span><h3>Full-Stack Web Development</h3><p>New Horizons Nigeria — practical training alongside continued independent work with modern web technologies.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-card">
            <div className="contact-orb" />
            <div className="contact-content">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> HAVE A ROLE OR AN IDEA?</div>
              <h2>Have a product to build or a problem to <em>solve?</em></h2>
              <p>I’m open to remote developer roles, collaborative product teams and selected freelance projects. Tell me what you’re building, the challenge you’re facing and where I can contribute.</p>
              <div className="contact-actions">
                <a className="button button-lime" href={LINKEDIN} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17} /></a>
                <a className="button button-outline-light" href={LINKTREE} target="_blank" rel="noreferrer">All my links <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="contact-stamp"><MessageCircle size={22} /><span>GOOD WORK<br />STARTS WITH<br />A CONVERSATION.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand footer-brand" href="#home"><span className="brand-mark">KO</span><span className="brand-name">KINGSLEY OBOT<span>DEVELOPER & PRODUCT BUILDER</span></span></a>
        <div className="footer-middle">Designed with purpose. Built with curiosity.<br /><span>© {new Date().getFullYear()} Kingsley Obot. All rights reserved.</span></div>
        <div className="footer-links"><a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href={LINKTREE} target="_blank" rel="noreferrer" aria-label="Linktree"><ArrowUpRight size={18} /></a><a href="#home" aria-label="Back to top"><ArrowDown className="back-to-top" size={17} /></a></div>
      </footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
        <section className={`project-modal project-${selectedProject.theme}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" aria-label="Close case study" onClick={() => setSelectedProject(null)}><X size={20} /></button>
          <div className="modal-topline"><span>CASE STUDY · {selectedProject.number} / 09</span><span>{selectedProject.type}</span></div>
          <div className="modal-heading"><div className="modal-monogram">{selectedProject.monogram}</div><div><div className="project-meta"><span>{selectedProject.category}</span></div><h2 id="modal-title">{selectedProject.name}</h2></div></div>
          <ProjectScreenshot project={selectedProject} mode="modal" />
          <p className="modal-summary">{selectedProject.summary}</p>
          <div className="modal-section"><h3>The challenge</h3><p>{selectedProject.challenge}</p></div>
          <div className="modal-section"><h3>How I approached it</h3><ul>{selectedProject.approach.map((step) => <li key={step}><Check size={15} /><span>{step}</span></li>)}</ul></div>
          <div className="modal-section"><h3>What it delivers</h3><p>{selectedProject.outcome}</p></div>
          <div className="modal-section"><h3>Technology & tools</h3>
            {selectedProject.stack.length > 0 ? <div className="modal-stack">{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div> : <p className="stack-pending">Technical stack details will be added after reviewing the project source repository.</p>}
            {selectedProject.stackNote && <p className="stack-note">{selectedProject.stackNote}</p>}
          </div>
          <div className="modal-actions"><a className="button button-dark" href={selectedProject.url} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={16} /></a><button className="button button-light" onClick={() => setSelectedProject(null)}>Close case study</button></div>
        </section>
      </div>}
    </div>
  );
}

export default App;
