import {
  ServiceItem,
  ProductItem,
  BlogPost,
  CommunityResource,
  TrainingSession,
  ServiceEnquiry,
  PartnerCompany,
  TestimonialItem
} from '../types';

export const COMPANY_INFO = {
  name: 'Blissful Touch Media & Technology',
  shortName: 'BTMT',
  slogan: 'Building Authentic Visibility and Promoting Moral and Ethical Excellence',
  concept: 'Building intentional visibility for sustainable growth, increased productivity and profitability.',
  address: '43/45 MCC Road by PACs Junction, Owerri, Imo State, Nigeria.',
  phone: '+234 706 088 2645',
  phoneRaw: '+2347060882645',
  whatsappRaw: '2347060882645',
  email: 'blissfultouchmedia@gmail.com',
  founder: 'Michael C. George',
  foundingYear: 2017,
  registrationYear: 2022,
  registrationStatement: 'Blissful Touch Media & Technology was registered with the Corporate Affairs Commission (CAC) in 2022.',
  registrations: [
    { year: '2017', event: 'Founded by Michael C. George' },
    { year: '2022', event: 'Registered with the Corporate Affairs Commission (CAC)' }
  ],
  vision: 'To be a global system for authentic visibility and proliferation of moral and ethical excellence.',
  mission: 'To build a global system that provides authentic visibility and proliferation of moral and ethical excellence through innovative, creative and professional media, technological and entertaining products and services.',
  objectives: [
    'Build a media platform that provides authentic visibility for brands and organizations.',
    'Create and promote creative and innovative entertainment and educational products that promote moral and ethical excellence.',
    'Develop technological tools and platforms that inspire learning, growth, connection, productivity and global opportunities.',
    'Create and support events and platforms that inspire moral and ethical excellence.',
    'Help startups develop systems and build visibility that can provide access to funding and global opportunities.'
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
    youtubeUrl: 'https://youtube.com/@blissfultouchmedia_tv?si=TwujT3NOi0h9w8ST'
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
    imageUrl: '/assets/images/service-web-dev.jpg'
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
    featured: true,
    imageUrl: '/assets/images/service-software-dev.jpg'
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Technology',
    headline: 'Intuitive, Engaging, and User-Centred Digital Experiences',
    shortDescription: 'We design intuitive, visually engaging, and user-centred digital experiences that make interacting with technology simple and enjoyable. From website interfaces to mobile application experiences, we combine creativity, functionality, and usability to create designs that connect with users and support business goals.',
    fullDescription: 'We design intuitive, visually engaging, and user-centred digital experiences that make interacting with technology simple and enjoyable. From website interfaces to mobile application experiences, we combine creativity, functionality, and usability to create designs that connect with users and support business goals.',
    offerings: [
      'Website UI Design',
      'Mobile App UI Design',
      'User Experience (UX) Design',
      'Wireframing and Prototyping',
      'User Interface Redesign',
      'Design Systems'
    ],
    benefits: [
      'Reduces user friction and elevates customer engagement across digital touchpoints',
      'Aligns brand aesthetics seamlessly with measurable usability and conversion goals',
      'Provides reusable component systems that accelerate engineering handoff'
    ],
    process: [
      { step: '1', title: 'User Discovery', description: 'Mapping audience behaviours, workflows, and usability opportunities.' },
      { step: '2', title: 'Wireframes & Flows', description: 'Structuring intuitive navigation and interactive user journeys.' },
      { step: '3', title: 'Visual Design & Systems', description: 'Crafting responsive high-fidelity screens and reusable UI guidelines.' },
      { step: '4', title: 'Prototyping & Handoff', description: 'Interactive validation and clean specifications for engineering.' }
    ],
    ctaText: "LET'S GET STARTED",
    featured: true,
    imageUrl: '/assets/images/service-ui-ux.jpg'
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
    featured: true,
    imageUrl: '/assets/images/service-digital-marketing.jpg'
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
    featured: true,
    imageUrl: '/assets/images/service-branding.jpg'
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
      'Reliable delivery to your office nationwide and internationally'
    ],
    process: [
      { step: '1', title: 'Artwork Prepress', description: 'Resolution check, color space formatting (CMYK), and bleed calibration.' },
      { step: '2', title: 'Proof Approval', description: 'Digital or physical sample sign-off prior to volume run.' },
      { step: '3', title: 'Production & Dispatch', description: 'Precision printing, binding, cutting, and safe delivery.' }
    ],
    ctaText: 'Request a Print Service',
    featured: true,
    imageUrl: '/assets/images/service-printing.jpg'
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
    featured: true,
    imageUrl: '/assets/images/service-event-coverage.jpg'
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
    featured: false,
    imageUrl: '/assets/images/service-audio-visual.jpg'
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
    featured: false,
    imageUrl: '/assets/images/service-voice-over.jpg'
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
    featured: false,
    imageUrl: '/assets/images/service-scriptwriting.jpg'
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
    featured: false,
    imageUrl: '/assets/images/service-movie-production.jpg'
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
    featured: false,
    imageUrl: '/assets/images/service-podcast.jpg'
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'why-fake-it',
    slug: 'why-fake-it',
    name: 'WHY FAKE IT? (Exchanging The Best of You For The Less of You)',
    author: 'Michael C. George',
    brand: 'Michael C. George',
    category: 'Digital Book',
    format: 'Downloadable (Digital)',
    price: 1500,
    currency: 'NGN',
    currencySymbol: '₦',
    isFree: false,
    selarUrl: 'https://selar.com/39f2i4',
    isPurchasable: true,
    description:
      'What if the person you are trying so hard to becoming is costing you the person you were designed to be?\n\nIn a world where blending in feels safer than standing out, a lot of people have learned to wear masks - masks of success, confidence, perfection, happiness and acceptance. But beneath the mask is a question that demands an honest and true answer: WHO ARE YOU WHEN NOBODY IS WATCHING?\n\nThis author, Michael C. George uses true life stories, practical insights and applicable strategies to show you how to remove the mask, rediscover yourself and be the best o f you.',
    publicationDetails: 'Downloadable (Digital)',
    specifications: [
      'Author: Michael C. George',
      'Format: Downloadable (Digital)',
      'Price: ₦1,500',
      'Fulfillment: Direct Checkout on Selar'
    ],
    inStock: true,
    stockCount: 999,
    featured: true,
    imageUrl: '/assets/images/book-why-fake-it.jpg',
    deliveryInfo: 'Delivered as a downloadable digital product directly via Selar.'
  },
  {
    id: 'finding-fulfilment',
    slug: 'finding-fulfilment-as-a-young-person',
    name: 'FINDING FULFILMENT AS A YOUNG PERSON',
    author: 'Michael C. George',
    brand: 'Michael C. George',
    category: 'Digital Book',
    format: 'Downloadable (Digital)',
    price: 0,
    currency: 'NGN',
    currencySymbol: '₦',
    isFree: true,
    selarUrl: 'https://selar.com/e33ad3',
    isPurchasable: true,
    description:
      'How do I have a better life? How can I make a difference? How can I find fulfilment and enjoy true happiness in this world where a lot of people struggle to survive? Find out in this short book.',
    publicationDetails: 'Downloadable (Digital)',
    specifications: [
      'Author: Michael C. George',
      'Format: Downloadable (Digital)',
      'Price: Free',
      'Fulfillment: Direct Download on Selar'
    ],
    inStock: true,
    stockCount: 999,
    featured: true,
    imageUrl: '/assets/images/book-finding-fulfilment.jpg',
    deliveryInfo: 'Available as a free downloadable digital book directly via Selar.'
  }
];

export const INITIAL_PARTNERS: PartnerCompany[] = [
  { id: 'partner-1', name: 'Apex Media Group', category: 'Broadcasting & Media' },
  { id: 'partner-2', name: 'Horizon Digital Ventures', category: 'Technology & Cloud' },
  { id: 'partner-3', name: 'Vanguard Legal Consult', category: 'Corporate Services' },
  { id: 'partner-4', name: 'Nexus Trade Initiative', category: 'Commerce & Logistics' },
  { id: 'partner-5', name: 'Sterling Diagnostics', category: 'Enterprise Health' },
  { id: 'partner-6', name: 'Beacon Creative Studio', category: 'Design & Visual Arts' }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Sample Client Feedback',
    role: 'Operations Lead',
    company: 'Enterprise Partner (Demonstration Preview)',
    serviceCategory: 'Technology & Web Systems',
    quote: 'BTMT delivered our digital infrastructure with remarkable punctuality, clear communication, and unwavering attention to technical detail.',
    rating: 5
  },
  {
    id: 'test-2',
    clientName: 'Illustrative Endorsement',
    role: 'Managing Director',
    company: 'Creative Brand Partner (Demonstration Preview)',
    serviceCategory: 'Brand Strategy & Print',
    quote: 'Their commitment to moral excellence and structured brand positioning elevated our corporate visibility across digital and print touchpoints.',
    rating: 5
  },
  {
    id: 'test-3',
    clientName: 'Corporate Collaborator',
    role: 'Head of Communications',
    company: 'Educational Initiative (Demonstration Preview)',
    serviceCategory: 'Publishing & Media Production',
    quote: 'Working with BTMT brought clarity, editorial discipline, and aesthetic distinction to our publications and video documentaries.',
    rating: 5
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
    imageUrl: '/assets/images/blog-digital-home.jpg',
    content: `
### The Illusion of Social Media Ownership

For many emerging brands and businesses across Nigeria and beyond, Instagram, TikTok, and WhatsApp feel like the entire internet. They offer rapid distribution, immediate feedback loops, and low initial barriers to entry.

However, relying entirely on rented land comes with existential business risks:
- Algorithms dictate who sees your announcements, often dropping organic reach to under 5%.
- Accounts are routinely flagged, disabled, or locked due to automated security triggers, leaving your business disconnected from customers.
- Direct messages and comments are difficult to integrate into inventory systems or accounting workflows.

### The Power of an Independent Digital Home

A professionally built corporate website gives your organization permanent autonomy:
1. **Search Authority**: Customers seeking reliable suppliers across Lagos, Abuja, or Port Harcourt turn to Google. A well-structured website captures this high-intent demand.
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
    imageUrl: '/assets/images/blog-ethical-excellence.jpg',
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
    imageUrl: '/assets/images/blog-brand-identity.jpg',
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
    projectDescription: 'We require a modern patient portal and clinic information website with online appointment booking capabilities for our clinical facilities.',
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
    description: 'Architecture, interface engineering, and mobile appointment scheduling system for a regional diagnostic health network.',
    servicesDelivered: ['Custom Web Architecture', 'Mobile Portal UI/UX', 'SEO Optimization', 'SSL Security Handshake'],
    imageUrl: '/assets/images/portfolio-clinical.jpg',
    impactMetrics: '100% Appointment Automation'
  },
  {
    id: 'port-2',
    title: 'Institutional Visual Identity & Corporate Stationery',
    client: 'Clarity Chambers',
    category: 'Media & Branding',
    description: 'Comprehensive brand identity system including logo guidelines, letterheads, presentation folders, and commercial offset print runs.',
    servicesDelivered: ['Brand Strategy', 'Logo & Typography', 'Stationery Package', 'Brand Manual'],
    imageUrl: '/assets/images/portfolio-branding.jpg',
    impactMetrics: 'Complete Corporate Relaunch'
  },
  {
    id: 'port-3',
    title: 'Regional Enterprise Leadership Summit Documentation',
    client: 'Southeastern Trade Council',
    category: 'Event Coverage',
    description: 'Multi-camera 4K broadcast, live streaming to international delegates, executive portraits, and same-day highlight reel distribution.',
    servicesDelivered: ['Multi-Cam Live Stream', '4K Event Documentation', 'Executive Photography', 'Press Media Kits'],
    imageUrl: '/assets/images/portfolio-summit.jpg',
    impactMetrics: '3,500+ Virtual Stakeholders'
  }
];
