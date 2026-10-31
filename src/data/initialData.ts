import { ServiceItem, ProductItem, BlogPost, CommunityResource, TrainingSession, ServiceEnquiry } from '../types';

export const COMPANY_INFO = {
  name: 'Blissful Touch Media & Technology',
  shortName: 'BTMT',
  slogan: 'Building Authentic Visibility and Promoting Moral and Ethical Excellence',
  concept: 'Building intentional visibility for sustainable growth, increased productivity and profitability.',
  address: '17 Ajoku Street, By UBA, Wetheral Road, Owerri, Imo State, Nigeria',
  phone: '+234 706 088 2645',
  phoneRaw: '+2347060882645',
  whatsappRaw: '2347060882645',
  email: 'blissfultouchmedia@gmail.com',
  founder: 'Michael C. George',
  foundingYear: 2017,
  registrations: [
    { year: '2017', event: 'Founded by Michael C. George' },
    { year: 'February 2021', event: 'Registered with Corporate Affairs Commission (CAC) as a Business Name' },
    { year: 'August 2026', event: 'Registered with Corporate Affairs Commission (CAC) as a Company Limited by Shares' }
  ],
  vision: 'To be a global system for authentic visibility and proliferation of moral and ethical excellence.',
  mission: 'To build a global system that provides authentic visibility and proliferation of moral and ethical excellence through innovative, creative and professional media, technological and entertaining products and services.',
  objectives: [
    'Build a media platform that provides authentic visibility for brands and organizations.',
    'Create and promote creative and innovative entertainment and educational products that promote moral and ethical excellence.',
    'Develop technological tools and platforms that inspire learning, growth, connection, productivity and global opportunities.',
    'Create and support events and platforms that inspire moral and ethical excellence.',
    'Help startups develop systems and visibility that can provide access to funding and global opportunities.'
  ],
  cultureValues: [
    {
      title: 'Moral and Ethical Excellence',
      description: 'A commitment to upholding strong moral principles and ethical standards in conduct, relationships and service delivery.'
    },
    {
      title: 'Timeliness',
      description: 'Respect for the time of clients, team members and audiences, with an emphasis on punctuality and reliable delivery.'
    },
    {
      title: 'Creativity',
      description: 'A commitment to original, useful ideas and their successful execution across technology, media and storytelling.'
    },
    {
      title: 'Continuous Learning',
      description: 'The pursuit of knowledge and improvement to strengthen outcomes and professional excellence.'
    },
    {
      title: 'Unity',
      description: 'Working together around a shared vision, mission, objectives and organizational culture.'
    }
  ],
  whyChooseUs: [
    { title: 'Efficient Service Delivery', description: 'Structured, streamlined execution designed to respect deadlines and maximize client productivity.' },
    { title: 'Creativity and Innovation', description: 'Fresh, tailored problem-solving and modern technical standards across every project.' },
    { title: 'Timely Delivery', description: 'Dependable scheduling and milestone commitments you can plan your business operations around.' },
    { title: 'Excellence', description: 'Meticulous attention to detail, robust engineering, and polished media production.' },
    { title: 'Integrity', description: 'Honest communication, transparent pricing, and unwavering moral and ethical standards.' },
    { title: 'Premium Customer Satisfaction', description: 'Long-term collaborative partnerships with proactive support for sustainable brand growth.' }
  ],
  approachStages: [
    { step: '01', title: 'Discover', description: 'We understand your goals, challenges, market positioning, and expectations.' },
    { step: '02', title: 'Plan', description: 'We develop a tailored strategy, technical architecture, and creative project direction.' },
    { step: '03', title: 'Create', description: 'We execute the work with creativity, engineering rigor, and detail-oriented craftsmanship.' },
    { step: '04', title: 'Deliver', description: 'We test, review, refine, and launch the agreed solution seamlessly.' },
    { step: '05', title: 'Support', description: 'Where applicable, we provide continued maintenance and optimization for sustainable results.' }
  ],
  socials: {
    facebook: 'Blissful Touch Media and Technology',
    facebookUrl: 'https://www.facebook.com/blissfultouchmedia',
    instagram: 'Blissful Touch Media',
    instagramUrl: 'https://www.instagram.com/blissfultouchmedia',
    youtube: 'Blissfultouch TV',
    youtubeUrl: 'https://www.youtube.com/@blissfultouchtv'
  }
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    slug: 'website-development',
    title: 'Website Development',
    category: 'Technology',
    headline: 'Your Brand Deserves a Space of Its Own',
    shortDescription: 'Modern, high-performance, mobile-responsive websites that establish online credibility and independence from social media algorithms.',
    fullDescription: 'What happens if something goes wrong with your social media accounts? Can your customers still find your business online? A professionally designed website gives your brand a digital home you can manage independently. At BTMT, we build beautiful, functional, accessible, and mobile-friendly websites that help businesses establish credibility, connect with audiences, and drive conversions.',
    offerings: [
      'Business & Corporate Websites',
      'E-commerce & Digital Storefronts',
      'Portfolio & Professional Showcases',
      'School & Educational Institution Portals',
      'Personal & Executive Brand Websites',
      'Full Website Redesign & Modernization',
      'Continuous Website Maintenance & Security'
    ],
    benefits: [
      'Total brand ownership independent of third-party platform policy shifts',
      'Blazing fast page loads optimized for mobile networks in Nigeria and globally',
      'Search Engine Optimization (SEO) structured for authentic local visibility',
      'Clear lead capture and customer conversion pathways'
    ],
    process: [
      { step: '1', title: 'Requirements & Sitemap', description: 'We audit your objectives, content inventory, and user journeys.' },
      { step: '2', title: 'Wireframing & UI Design', description: 'Clean, brand-aligned visual layouts tailored for desktop and mobile.' },
      { step: '3', title: 'Development & Testing', description: 'Modern, semantic coding with responsive styling and accessibility checks.' },
      { step: '4', title: 'Launch & Training', description: 'Domain deployment, SSL setup, and an admin handover session.' }
    ],
    faqs: [
      { question: 'How long does a standard business website take to build?', answer: 'Typically between 2 to 4 weeks depending on the scope of pages and content readiness.' },
      { question: 'Will my website work smoothly on mobile smartphones?', answer: 'Yes, every BTMT website is mobile-first, responsive, and rigorously tested across screen sizes.' },
      { question: 'Can we accept online payments on our website?', answer: 'Yes, we integrate certified Nigerian gateways including Paystack and Flutterwave as well as global processors.' }
    ],
    ctaText: "Let's Build Your Website",
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'software-dev',
    slug: 'software-development',
    title: 'Software Development',
    category: 'Technology',
    headline: 'Technology Built Around Your Business',
    shortDescription: 'Custom web applications, mobile apps, and business management systems tailored to streamline your operational processes.',
    fullDescription: 'We develop innovative software solutions tailored to the operational and growth needs of businesses and organizations. From mobile applications to web-based platforms and business management systems, our solutions are designed to simplify processes, improve efficiency, enhance user experiences, and support long-term growth.',
    offerings: [
      'Mobile Application Development (iOS & Android)',
      'Custom Web Application Platforms',
      'Business Management & ERP Systems',
      'Custom Workflow & Automation Solutions',
      'Software Architecture & API Integrations',
      'Legacy System Modernization & Maintenance'
    ],
    benefits: [
      'Eliminate manual redundancies and repetitive administrative overhead',
      'Centralized, secure business data storage and audit trails',
      'Scalable architecture built for user growth and market expansion'
    ],
    process: [
      { step: '1', title: 'System Architecture', description: 'Data modeling, technical specifications, and security planning.' },
      { step: '2', title: 'Agile Sprints', description: 'Iterative feature development with transparent weekly progress updates.' },
      { step: '3', title: 'Quality Assurance', description: 'Rigorous functional, stress, and security testing.' },
      { step: '4', title: 'Deployment & SLA', description: 'Production rollout with ongoing maintenance agreements.' }
    ],
    ctaText: 'Discuss Your Project',
    featured: true
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing-advertising',
    title: 'Digital Marketing & Advertising',
    category: 'Media',
    headline: 'Reach the Right Audience. Grow Your Brand.',
    shortDescription: 'Data-driven marketing, social media management, SEO, and targeted campaigns that turn authentic visibility into measurable growth.',
    fullDescription: 'Build a recognizable brand, connect with potential customers and improve your digital presence through thoughtful marketing and advertising. We help businesses increase visibility, reach target audiences, and drive meaningful engagement through strategies tailored to their goals.',
    offerings: [
      'Social Media Management & Strategy',
      'Targeted Online Advertising Campaigns',
      'Editorial & Visual Content Creation',
      'Brand Promotion & Thought Leadership',
      'Search Engine Optimization (SEO)',
      'Analytics, Conversion Tracking & Reporting'
    ],
    benefits: [
      'Target prospective buyers with laser-focused demographic and geographic parameters',
      'Consistent, professional brand voice across all digital channels',
      'Measurable return on advertising expenditure with transparent reporting'
    ],
    process: [
      { step: '1', title: 'Audience Research', description: 'Pinpointing target client personas, pain points, and active channels.' },
      { step: '2', title: 'Campaign Strategy', description: 'Crafting persuasive messaging, budget allocation, and creative concepts.' },
      { step: '3', title: 'Execution & Optimization', description: 'A/B testing ad creatives, refining audiences, and active bid management.' }
    ],
    ctaText: 'Grow Your Brand',
    featured: true
  },
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding',
    category: 'Media',
    headline: 'Build a Brand People Remember',
    shortDescription: 'Distinctive, authentic brand identities combining visual communication, positioning strategy, and consistent corporate guidelines.',
    fullDescription: 'We help businesses and organizations establish distinctive, authentic, and memorable brand identities. Our branding solutions combine strategy, creativity, and visual communication to help brands build trust, communicate consistently, and stand out in their markets.',
    offerings: [
      'Logo Design & Typography Systems',
      'Brand Strategy & Positioning Frameworks',
      'Visual Identity & Color Palette Guidelines',
      'Corporate Stationery & Brand Asset Design',
      'Packaging & Product Presentation Design',
      'Brand Style Guides & Usage Standards'
    ],
    benefits: [
      'Commands immediate trust and professional authority in your sector',
      'Distinctive market differentiation from competitors',
      'Uniform asset consistency across digital and physical touchpoints'
    ],
    process: [
      { step: '1', title: 'Brand Discovery', description: 'Uncovering brand values, tone, and long-term ambition.' },
      { step: '2', title: 'Concept Directions', description: 'Presenting distinct creative routes with practical mockups.' },
      { step: '3', title: 'Identity Guidelines', description: 'Comprehensive delivery of vector logos, fonts, and brand manual.' }
    ],
    ctaText: 'Start Your Branding Project',
    featured: true
  },
  {
    id: 'printing-publishing',
    slug: 'printing-publishing',
    title: 'Printing & Publishing',
    category: 'Media',
    headline: 'Bring Your Brand to Life in Print',
    shortDescription: 'High-grade physical print production for corporate stationery, marketing collateral, books, and promotional materials.',
    fullDescription: 'We provide quality printing and publishing solutions that help brands communicate professionally and effectively. From business stationery to promotional materials and publications, we focus on clear presentation, creative execution, and quality delivery.',
    offerings: [
      'Executive Business Cards & Letterheads',
      'Marketing Flyers, Brochures & Folders',
      'Large Format Banners & Event Backdrops',
      'Books, Booklets, Journals & Magazines',
      'Posters, Roll-up Displays & Signage',
      'Custom Promotional Gift Materials & Merchandising'
    ],
    benefits: [
      'Crisp color accuracy using commercial offset and digital presses',
      'Premium paper stocks, laminations, and finishing touches',
      'Reliable delivery to your office in Owerri or across Nigeria'
    ],
    process: [
      { step: '1', title: 'Artwork Prepress', description: 'Resolution check, color space formatting (CMYK), and bleed calibration.' },
      { step: '2', title: 'Proof Approval', description: 'Digital or physical sample sign-off prior to volume run.' },
      { step: '3', title: 'Production & Dispatch', description: 'Precision printing, binding, cutting, and safe delivery.' }
    ],
    ctaText: 'Request a Print Service',
    featured: true
  },
  {
    id: 'event-coverage',
    slug: 'event-coverage',
    title: 'Event Coverage',
    category: 'Media',
    headline: 'Every Moment Deserves to Be Remembered',
    shortDescription: 'Professional corporate and special occasion photography, multi-camera videography, and reliable high-definition live streaming.',
    fullDescription: 'Capture meaningful experiences and preserve memorable moments through professional photography, videography, live streaming, and event documentation. We cover corporate and personal events with a focus on visual storytelling, quality, and attention to detail.',
    offerings: [
      'Corporate Conferences, Summits & AGMs',
      'Brand Launches & Ceremonial Openings',
      'Weddings & Milestone Celebrations',
      'High-Definition Multi-Camera Live Streaming',
      'Event Documentary & Highlight Reels',
      'On-site Media Documentation & Rapid Social Clips'
    ],
    benefits: [
      'Broadcast-grade cinematography with high-fidelity audio recording',
      'Punctual team arrival with backup gear and power redundancies',
      'Polished post-production color grading and rapid turnaround'
    ],
    process: [
      { step: '1', title: 'Pre-Event Briefing', description: 'Reviewing itinerary, key VIPs, and media delivery requirements.' },
      { step: '2', title: 'On-Site Execution', description: 'Discreet, comprehensive coverage of every milestone and audience reaction.' },
      { step: '3', title: 'Editing & Archival', description: 'Color correction, sound mastering, and delivery via private download link.' }
    ],
    ctaText: 'Book Event Coverage',
    featured: true
  },
  {
    id: 'audio-visual',
    slug: 'audio-visual-production',
    title: 'Audio-Visual Production',
    category: 'Media',
    headline: 'Professional Media That Informs and Inspires',
    shortDescription: 'Audio-visual solutions for corporate communications, executive presentations, documentaries, and creative campaigns.',
    fullDescription: 'Provide professional audio-visual solutions for communication, business presentations and creative media projects. We combine state-of-the-art camera systems, acoustic capture, and narrative editing to produce compelling media assets.',
    offerings: [
      'Corporate Overview & Culture Films',
      'Product Demo Videos & Explainer Content',
      'Commercials & Promotional Teasers',
      'Educational Video Modules & Training Visuals'
    ],
    benefits: [
      'Elevates institutional credibility with cinematic production values',
      'Ideal for investor pitches, company websites, and TV broadcast'
    ],
    process: [
      { step: '1', title: 'Storyboarding', description: 'Developing visual scripts, shot lists, and location plans.' },
      { step: '2', title: 'Production Shoot', description: 'Direction, cinematography, sound, and lighting.' },
      { step: '3', title: 'Post-Production', description: 'Video editing, motion graphics, and audio mastering.' }
    ],
    ctaText: 'Enquire About Production',
    featured: false
  },
  {
    id: 'voice-over',
    slug: 'voice-over-services',
    title: 'Voice-Over Services',
    category: 'Media',
    headline: 'Give Your Message the Voice It Deserves',
    shortDescription: 'Studio narration and voice-over artistry for commercials, audiobooks, educational media, and corporate presentations.',
    fullDescription: 'Offer voice-over recording and narration solutions for appropriate media, promotional and storytelling projects. With warm, articulate, and resonant vocal talent, we deliver professional studio masters suitable for radio, television, online video, and podcasts.',
    offerings: [
      'Commercials & Radio Jingle Narration',
      'Corporate Documentary Narration',
      'E-Learning & Educational Voice Tracks',
      'IVR & Telephony System Prompts'
    ],
    benefits: [
      'Broadcast-quality studio acoustic clarity with zero room noise',
      'Diverse vocal styles from authoritative corporate to warm conversational'
    ],
    process: [
      { step: '1', title: 'Script Review', description: 'Pacing notes, pronunciation guides, and tone matching.' },
      { step: '2', title: 'Studio Session', description: 'High-grade microphone recording with dynamic processing.' },
      { step: '3', title: 'Mastering', description: 'Clean editing, equalization, and mastered file delivery in WAV/MP3.' }
    ],
    ctaText: 'Request a Voice-Over',
    featured: false
  },
  {
    id: 'scriptwriting',
    slug: 'scriptwriting',
    title: 'Scriptwriting',
    category: 'Entertainment',
    headline: 'Every Great Production Begins With a Story',
    shortDescription: 'Original, compelling, and ethically grounded scripts for films, drama series, commercials, documentaries, and skits.',
    fullDescription: 'We develop engaging, original, and impactful scripts that communicate ideas, connect with audiences, and bring creative concepts to life. Our scriptwriting services support a wide range of entertainment, educational, and promotional productions.',
    offerings: [
      'Feature Film & Short Film Screenplays',
      'Television & Drama Series Scripts',
      'Documentary Scripts & Voice Narration Writing',
      'Commercial & Advertisement Concepts',
      'Digital Skits & Creative Social Scenarios',
      'Script Doctoring, Editing & Formatting'
    ],
    benefits: [
      'Authentic dialogue and structured character development',
      'Aligned with moral, cultural, and ethical values that educate as they entertain',
      'Industry-standard screenplay formatting ready for production crews'
    ],
    process: [
      { step: '1', title: 'Logline & Treatment', description: 'Clarifying the core conflict, theme, and narrative arc.' },
      { step: '2', title: 'Drafting', description: 'Writing scene-by-scene script with realistic dialogue.' },
      { step: '3', title: 'Polishing', description: 'Table read feedback and final shooting draft delivery.' }
    ],
    ctaText: "Let's Tell Your Story",
    featured: false
  },
  {
    id: 'movie-production',
    slug: 'movie-production',
    title: 'Movie Production',
    category: 'Entertainment',
    headline: 'Stories Brought to Life',
    shortDescription: 'Creative film and video production focused on meaningful storytelling, artistic integrity, and engaging entertainment.',
    fullDescription: 'Explore creative film and video production services focused on meaningful storytelling and engaging entertainment. We collaborate with visionary writers, directors, and technical teams to craft cinematic works that uplift audiences and reflect moral excellence.',
    offerings: [
      'Film Co-Production & Executive Packaging',
      'Location Scouting & Production Management',
      'Cinematography & Sound Engineering',
      'Post-Production & Festival Distribution Preparation'
    ],
    benefits: [
      'Ethically conscious narratives that resonate across generations',
      'High cinematic benchmarks in photography and score'
    ],
    process: [
      { step: '1', title: 'Pre-Production', description: 'Casting, scheduling, location agreements, and technical planning.' },
      { step: '2', title: 'Principal Photography', description: 'Focused on-set production with strict safety and artistic standards.' },
      { step: '3', title: 'Post & Screening', description: 'Picture lock, color correction, score integration, and premiere.' }
    ],
    ctaText: 'Enquire About Movie Production',
    featured: false
  },
  {
    id: 'podcast-shows',
    slug: 'podcast-shows',
    title: 'Podcast Shows',
    category: 'Entertainment',
    headline: 'Conversations Worth Sharing',
    shortDescription: 'Engaging podcast series that inform, educate, entertain, and inspire valuable conversations on ethical leadership and growth.',
    fullDescription: 'Discover engaging podcast content that informs, educates, entertains and inspires valuable conversations. We produce branded and original podcast shows featuring thought leaders, innovators, and creators discussing business, technology, morality, and creative arts.',
    offerings: [
      'Original Audio/Video Podcast Production',
      'Executive Guest Interviews & Roundtable Discussions',
      'Studio Recording, Mixing & RSS Feed Syndication',
      'Short-form Social Clip Repurposing'
    ],
    benefits: [
      'Builds deep listener affinity and personal trust with your brand',
      'Accessible on Apple Podcasts, Spotify, and YouTube'
    ],
    process: [
      { step: '1', title: 'Show Conception', description: 'Defining target listener, recurring segments, and episode rhythm.' },
      { step: '2', title: 'Recording Session', description: 'In-person or remote high-definition audio/video capture.' },
      { step: '3', title: 'Distribution', description: 'Mastering, chapter markers, show notes, and cross-platform publishing.' }
    ],
    ctaText: 'Explore Podcast Opportunities',
    featured: false
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'btmt-corporate-stationery-pack',
    name: 'Executive Corporate Stationery & Identity Pack',
    brand: 'Blissful Touch Media',
    category: 'Branding & Print',
    price: 45000,
    originalPrice: 52000,
    description: 'High-grade corporate identity stationery set including 500 premium 400gsm laminated business cards, 200 custom letterheads, and 50 branded presentation folders. Ideal for established firms and growing enterprises seeking credible representation in meetings.',
    specifications: [
      '500 Business Cards (400gsm, Matte Lamination, Rounded Corners optional)',
      '200 Official Letterheads (100gsm Bond paper, laser-printer compatible)',
      '50 Presentation Folders (350gsm with document pocket and card slot)',
      'Complete vector pre-flight check by BTMT design team'
    ],
    inStock: true,
    stockCount: 25,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    deliveryInfo: 'Ships within 3–5 business days across Imo State and nationwide via courier.'
  },
  {
    id: 'prod-2',
    slug: 'starter-business-web-suite',
    name: 'Starter Business Web & Domain Suite',
    brand: 'BTMT Technology',
    category: 'Technology Solutions',
    price: 120000,
    originalPrice: 150000,
    description: 'A complete foundational digital launch package for startups and local businesses. Includes 1-year custom .ng or .com domain registration, secure cloud hosting, SSL certification, 5 branded corporate email inboxes, and a responsive 4-page modern website build.',
    specifications: [
      '1 Year Domain Registration (.com or .com.ng)',
      'High-speed SSD hosting with 99.9% uptime SLA',
      '5 Professional Business Email Accounts (e.g. info@yourdomain.com)',
      '4-Page Custom Responsive Website (Home, About, Services, Contact)',
      'Google Maps & WhatsApp Click-to-Chat integration'
    ],
    inStock: true,
    stockCount: 40,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    deliveryInfo: 'Digital provisioning initiated within 24 hours of onboarding intake.'
  },
  {
    id: 'prod-3',
    slug: 'mobile-media-creator-kit',
    name: 'BTMT Mobile Creator & Vlogging Kit',
    brand: 'Apex Media Tools',
    category: 'Media Equipment',
    price: 68000,
    originalPrice: 78000,
    description: 'A curated kit tested by the BTMT production team for solo content creators, podcasters, and brand managers. Features a dual wireless lavalier microphone system with noise-cancellation, bi-color LED ring light, and an all-metal 360-degree phone stabilizer tripod.',
    specifications: [
      'Dual Wireless Lavalier Microphones (Type-C & Lightning adapters included)',
      '2.4GHz low-latency audio transmission with up to 20m range',
      'Dimmable 10-inch Bi-Color LED Ring Light with USB-C rechargeable battery',
      'Heavy-duty aluminum extendable tripod stand (up to 160cm)'
    ],
    inStock: true,
    stockCount: 14,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    deliveryInfo: 'Immediate dispatch available in Owerri, Imo State; 2–4 days nationwide.'
  },
  {
    id: 'prod-4',
    slug: 'ethical-leadership-handbook',
    name: 'Moral & Ethical Excellence in Business Leadership',
    brand: 'BTMT Publishing',
    category: 'Publications & Books',
    price: 8500,
    description: 'The definitive guide to cultivating authentic visibility, organizational trust, and unwavering moral standards in modern commerce. Authored under the editorial direction of BTMT leadership for entrepreneurs, creators, and professionals.',
    specifications: [
      'Hardcover Edition with gold foil detailing',
      '224 pages of actionable case studies and framework diagrams',
      'Includes digital companion workbook and downloadable audit checklist'
    ],
    inStock: true,
    stockCount: 60,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    deliveryInfo: 'Shipped within 24–48 hours nationwide.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'why-businesses-need-independent-digital-home',
    title: 'Why Every Business Needs a Digital Home Independent of Social Media',
    category: 'Technology',
    excerpt: 'Social media algorithms change without warning and accounts can be suspended overnight. Discover why an independent website is your most valuable corporate asset.',
    author: 'BTMT Technology Desk',
    authorRole: 'Systems & Architecture Lead',
    publishedAt: 'October 24, 2026',
    readTime: '5 min read',
    isPublished: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    content: `
### The Illusion of Social Media Ownership

For many emerging brands and businesses across Nigeria and beyond, Instagram, TikTok, and WhatsApp feel like the entire internet. They offer rapid distribution, immediate feedback loops, and low initial barriers to entry.

However, relying entirely on rented land comes with existential business risks:
- Algorithms dictate who sees your announcements, often dropping organic reach to under 5%.
- Accounts are routinely flagged, disabled, or locked due to automated security triggers, leaving your business disconnected from customers.
- Direct messages and comments are difficult to integrate into inventory systems or accounting workflows.

### The Power of an Independent Digital Home

A professionally built corporate website gives your organization permanent autonomy:
1. **Search Authority**: Customers seeking reliable suppliers in Owerri, Lagos, or Abuja turn to Google. A well-structured website captures this high-intent demand.
2. **Permanent Credibility**: Major clients, institutional partners, and grant bodies require verified corporate domains before committing capital.
3. **Controlled User Experience**: You guide the visitor from curiosity to consultation without distractions from competitor advertisements or algorithmic feeds.

Invest in your foundation first. Use social media as an outbound distribution highway, but keep your website as the authoritative destination where transactions and relationships are permanently solidified.
    `
  },
  {
    id: 'blog-2',
    slug: 'moral-excellence-sustainable-competitive-advantage',
    title: 'Moral and Ethical Excellence as a Sustainable Competitive Advantage',
    category: 'Business Growth',
    excerpt: 'In an era of aggressive shortcuts and fleeting hype, authentic transparency and uncompromising ethical standards build the deepest client loyalty.',
    author: 'Michael C. George',
    authorRole: 'Founder, BTMT',
    publishedAt: 'October 12, 2026',
    readTime: '6 min read',
    isPublished: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    content: `
### Beyond the Transaction: The Ethical Foundation

At Blissful Touch Media & Technology, our official slogan is: *Building Authentic Visibility and Promoting Moral and Ethical Excellence*. This is not merely a slogan; it is the operating philosophy that governs how we treat client deadlines, data, and creative projects.

Too often, business development is framed as a zero-sum contest of persuasion and aggressive marketing. Companies promise unfeasible deadlines to secure contracts, only to deliver subpar work or disappear when challenges emerge.

### Three Pillars of Ethical Commerce

1. **Punctual & Truthful Commitments**: If a software system or video shoot requires four weeks for proper execution, we state it transparently rather than promising two weeks to win a bid.
2. **Value Before Visibility**: Authentic visibility only works when what is visible is genuinely good, functional, and durable. Amplifying a flawed service only accelerates customer disappointment.
3. **Respect for Client Resources**: Every budget committed to technology or media must produce measurable utility, whether through automated workflows or qualified client inquiries.

When your brand becomes renowned for uncompromising integrity, you no longer have to fight on price alone. Clients return because trust is the rarest and most valuable asset in modern business.
    `
  },
  {
    id: 'blog-3',
    slug: 'crafting-compelling-brand-identity-nigerian-market',
    title: 'Crafting a Compelling Brand Identity in Today’s Market',
    category: 'Branding',
    excerpt: 'A logo is only the visual signature of a much deeper strategic narrative. How to align your visual symbols with real market needs.',
    author: 'BTMT Creative Studio',
    authorRole: 'Brand Identity Practice',
    publishedAt: 'September 28, 2026',
    readTime: '4 min read',
    isPublished: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1000&q=80',
    content: `
### What a Brand Truly Represents

Many entrepreneurs believe that branding starts and finishes with hiring a designer to draw an abstract logo icon. While a distinctive visual mark is essential, visual identity is merely the outward expression of your underlying promise.

Your brand is the composite feeling, expectation, and memory that comes to a customer's mind when they hear your company's name.

### Key Considerations for Modern Brands

- **Legibility Across Micro-Screens**: In Nigeria, over 85% of brand interactions occur on smartphone screens. Your logo and typography must remain clear whether rendered on a 32-pixel browser favicon, a social avatar, or a 10-foot highway billboard.
- **Color Discipline**: Avoid jumping between multiple uncoordinated color palettes. Choose a dominant tone that communicates stability (such as deep navy) and pair it with a purposeful accent.
- **Tone of Voice**: Does your brand speak with authoritative clarity, warm hospitality, or playful innovation? Consistency across email receipts, social captions, and phone calls creates trust.
    `
  }
];

export const INITIAL_RESOURCES: CommunityResource[] = [
  {
    id: 'res-1',
    title: 'The Authentic Visibility Blueprint (2026 Edition)',
    description: 'A comprehensive 32-page guide on establishing verifiable corporate credibility, search presence, and digital media channels for Nigerian enterprises.',
    category: 'Guides & Ebooks',
    accessLevel: 'Public',
    fileFormat: 'PDF',
    fileSize: '4.2 MB',
    publishedAt: 'October 2026',
    downloadCount: 382
  },
  {
    id: 'res-2',
    title: 'Brand Identity & Visual Style Guide Template',
    description: 'An editable corporate identity checklist and layout specification file to ensure font, color, and logo consistency across team members and contractors.',
    category: 'Templates',
    accessLevel: 'Registered Members',
    fileFormat: 'DOCX',
    fileSize: '1.8 MB',
    publishedAt: 'October 2026',
    downloadCount: 219
  },
  {
    id: 'res-3',
    title: 'Software Development Scoping & Vendor RFP Template',
    description: 'A structured requirements questionnaire to define functional milestones, tech stack choices, and deliverables before contracting a development firm.',
    category: 'Strategy',
    accessLevel: 'Registered Members',
    fileFormat: 'XLSX',
    fileSize: '850 KB',
    publishedAt: 'September 2026',
    downloadCount: 174
  },
  {
    id: 'res-4',
    title: 'Code of Moral & Ethical Excellence in Digital Media',
    description: 'BTMT’s internal operational standards on client data confidentiality, transparent advertising, and truth in commercial storytelling.',
    category: 'Ethics & Standards',
    accessLevel: 'Public',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    publishedAt: 'August 2026',
    downloadCount: 420
  }
];

export const INITIAL_TRAINING: TrainingSession[] = [
  {
    id: 'trn-1',
    title: 'Building Authentic Online Visibility for Growing Brands',
    description: 'A practical, 2-hour masterclass exploring search indexing, Google Business profiles, and high-conversion website architecture.',
    date: 'November 14, 2026',
    time: '11:00 AM – 1:00 PM WAT',
    instructor: 'Michael C. George & BTMT Technical Leads',
    format: 'Online Webinar',
    accessRequirement: 'Free for Community Members',
    status: 'Upcoming'
  },
  {
    id: 'trn-2',
    title: 'Mobile Content Creation & Ethical Storytelling Workshop',
    description: 'Hands-on session covering lighting, smartphone audio setups, narrative scriptwriting, and editing reels that communicate genuine value.',
    date: 'November 28, 2026',
    time: '2:00 PM – 5:00 PM WAT',
    instructor: 'BTMT Media & Production Team',
    format: 'Hybrid Session',
    accessRequirement: 'Open to Public',
    status: 'Upcoming'
  }
];

export const INITIAL_ENQUIRIES: ServiceEnquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Dr. Chidi Okafor',
    email: 'chidi.okafor@zenithhealth.ng',
    phone: '+234 803 456 7890',
    companyName: 'Zenith Health Diagnostics',
    serviceId: 'web-dev',
    serviceTitle: 'Website Development',
    projectDescription: 'We require a modern patient portal and clinic information website with online appointment booking capabilities for our Owerri facility.',
    estimatedBudget: '₦400,000 - ₦800,000',
    preferredStartDate: 'Within 2 weeks',
    preferredContactMethod: 'Email',
    status: 'New',
    createdAt: '2026-10-30T10:15:00Z'
  },
  {
    id: 'enq-102',
    fullName: 'Amaka Nwosu',
    email: 'amaka@claritylaw.com',
    phone: '+234 703 112 3344',
    companyName: 'Clarity Chambers',
    serviceId: 'branding',
    serviceTitle: 'Branding',
    projectDescription: 'Complete visual identity overhaul including corporate stationery, signage guidelines, and executive presentation decks.',
    estimatedBudget: '₦200,000 - ₦500,000',
    preferredStartDate: 'Next Month',
    preferredContactMethod: 'Phone',
    status: 'Contacted',
    createdAt: '2026-10-28T14:30:00Z'
  }
];

export const INITIAL_PORTFOLIO: import('../types').PortfolioProject[] = [
  {
    id: 'port-1',
    title: 'Enterprise Clinical Portal & Online Booking Engine',
    client: 'Zenith Health Diagnostics',
    category: 'Technology',
    description: 'Architecture, interface engineering, and mobile appointment scheduling system for a diagnostic health network based in Imo State.',
    servicesDelivered: ['Custom Web Architecture', 'Mobile Portal UI/UX', 'SEO Optimization', 'SSL Security Handshake'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    impactMetrics: '100% Appointment Automation'
  },
  {
    id: 'port-2',
    title: 'Institutional Visual Identity & Corporate Stationery',
    client: 'Clarity Chambers',
    category: 'Media & Branding',
    description: 'Comprehensive brand identity system including logo guidelines, letterheads, presentation folders, and commercial offset print runs.',
    servicesDelivered: ['Brand Strategy', 'Logo & Typography', 'Stationery Package', 'Brand Manual'],
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=80',
    impactMetrics: 'Complete Corporate Relaunch'
  },
  {
    id: 'port-3',
    title: 'Regional Enterprise Leadership Summit Documentation',
    client: 'Southeastern Trade Council',
    category: 'Event Coverage',
    description: 'Multi-camera 4K broadcast, live streaming to international delegates, executive portraits, and same-day highlight reel distribution.',
    servicesDelivered: ['Multi-Cam Live Stream', '4K Event Documentation', 'Executive Photography', 'Press Media Kits'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    impactMetrics: '3,500+ Virtual Stakeholders'
  }
];
