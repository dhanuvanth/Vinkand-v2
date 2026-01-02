import React from 'react';
import { 
  BrainCircuit, Globe, Smartphone, Layers, Boxes, 
  Workflow, Sparkles, Zap, Box, Monitor, Code2, Rocket, Search, Users2, Target, PenTool, Flag 
} from 'lucide-react';
import { Service, Project, Testimonial, Product, BlogPost, TeamMember, Category } from './types';
import testimonial1 from '@assets/testimone/female2.jpg';
import testimonial2 from '@assets/testimone/male1.jpg';
import testimonial3 from '@assets/testimone/female4.jpg';
import testimonial4 from '@assets/testimone/male3.jpg';
import testimonial5 from '@assets/testimone/male5.jpg';
import testimonial6 from '@assets/testimone/female6.jpg';

export const SERVICES: Service[] = [
  { 
    id: '1', 
    title: 'Enterprise AI Architecture', 
    category: 'AI', 
    description: 'Deploying custom Large Language Models (LLMs) and predictive engines that integrate securely into your existing corporate infrastructure.', 
    longDescription: 'Our Enterprise AI Architecture service is designed to bridge the gap between theoretical AI models and practical business applications. We don\'t just deploy models; we build the entire ecosystem around them, ensuring scalability, security, and integration with your existing data pipelines.',
    features: ['Secure API Integration', 'RAG Pipeline Implementation', 'AI Governance Frameworks', 'Predictive Analytics Engines'],
    benefits: ['Automate complex decision-making', 'Enhance customer support efficiency', 'Unlock hidden insights from data', 'Future-proof your technology stack'],
    icon: 'BrainCircuit' 
  },
  { 
    id: '2', 
    title: 'High-Scale Web Platforms', 
    category: 'Web', 
    description: 'Architecting resilient SaaS ecosystems designed to handle millions of concurrent requests with 99.99% uptime availability.', 
    longDescription: 'We engineer web platforms that are built to withstand the demands of global enterprise traffic. Utilizing modern microservices architectures and edge computing, we ensure your digital presence is fast, reliable, and always available.',
    features: ['Microservices Architecture', 'Serverless Computing', 'Global CDN Optimization', 'Real-time Data Sync'],
    benefits: ['99.99% Uptime Guarantee', 'Sub-second page loads globally', 'Seamless scalability during spikes', 'Reduced infrastructure costs'],
    icon: 'Globe' 
  },
  { 
    id: '3', 
    title: 'Intelligent Mobile Systems', 
    category: 'App', 
    description: 'Native iOS and Android solutions featuring on-device machine learning, offline capability, and secure API middleware.', 
    longDescription: 'In a mobile-first world, your application needs to do more than just display data. We build intelligent mobile systems that leverage on-device processing for faster performance and enhanced privacy.',
    features: ['Cross-Platform Development', 'On-Device ML Inference', 'Offline-First Architecture', 'Biometric Security Integration'],
    benefits: ['Native-like performance', 'Enhanced user data privacy', 'Works without internet connection', 'Faster time-to-market'],
    icon: 'Smartphone' 
  },
  { 
    id: '4', 
    title: 'Immersive Spatial Computing', 
    category: 'Immersive', 
    description: 'Industrial-grade AR/VR training simulations and luxury retail experiences built for Apple Vision Pro and Meta Quest.', 
    longDescription: 'Prepare for the next computing platform. We develop industrial and retail applications for Apple Vision Pro and Meta Quest, creating experiences that blend the physical and digital worlds seamlessly.',
    features: ['3D Asset Optimization', 'Spatial UI/UX Design', 'Multi-user Shared Experiences', 'Physics-based Interactions'],
    benefits: ['Revolutionize training', 'Create unforgettable brand experiences', 'Visualize complex data in 3D', 'Remote collaboration enhancement'],
    icon: 'Layers' 
  }
];

export const WORKFLOW = [
  { 
    title: '01. Strategic Audit', 
    description: 'We begin with a forensic audit of your current technology stack to identify bottlenecks and opportunities.', 
    icon: <Search className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: '02. Solution Blueprint', 
    description: 'Our architects draft a scalable technical roadmap, selecting the optimal infrastructure for long-term growth.', 
    icon: <Target className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: '03. UX-Driven Design', 
    description: 'We prototype high-fidelity interfaces where accessibility and user retention are the primary metrics.', 
    icon: <PenTool className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: '04. Agile Engineering', 
    description: 'Development occurs in two-week sprints with continuous integration, ensuring rapid feedback loops.', 
    icon: <Code2 className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: '05. Global Deployment', 
    description: 'We execute a staged rollout across global availability zones with proactive AI-based monitoring.', 
    icon: <Rocket className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  }
];

// Replaced with Portfolio items 1-6
export const EXPLORATIONS = [
  { id: 1, title: "Augmented Reality Education", tag: "Interactive Learning", img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800", videoId: "YCsuwhvcFgk" },
  { id: 2, title: "Augmented Reality Education 2", tag: "Advanced Training", img: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800", videoId: "TH9qMNiwgL8" },
  { id: 3, title: "StarMapAR", tag: "Space Exploration", img: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=800", videoId: "m19-ZVN6paU" },
  { id: 4, title: "WebAR Product Display", tag: "E-commerce", img: "https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=800", videoId: "2_z4hi99VoM" },
  { id: 5, title: "Virtual Try-On Solutions", tag: "Fashion Tech", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800", videoId: "9NIm6vqL1yU" },
  { id: 6, title: "AR Real Estate Tour", tag: "Virtual Tours", img: "https://images.unsplash.com/photo-1628744404730-5e143358539b?w=800", videoId: "Fd8b83KMfyU" },
];

export const FAQ_ITEMS = [
  { question: "How does VinKand ensure data security in AI integrations?", answer: "We adhere strictly to ISO 27001 standards. All AI models are deployed in private cloud environments (VPC), ensuring your proprietary data never trains public models." },
  { question: "What is your typical engagement timeline for enterprise SaaS?", answer: "From architectural discovery to MVP launch, our accelerated timeline typically spans 12-16 weeks, utilizing our pre-built proprietary modules." },
  { question: "Do you provide Service Level Agreements (SLAs) for post-launch support?", answer: "Yes. We offer tiered support packages guaranteeing response times as low as 15 minutes for critical infrastructure issues, 24/7/365." },
  { question: "Can you take over an existing codebase from another vendor?", answer: "Absolutely. Our 'Rescue & Refactor' service begins with a code audit to stabilize the application before implementing new feature sets." },
  { question: "Do you offer on-premise deployment for regulated industries?", answer: "Yes. For clients in defense, healthcare, and finance, we provide air-gapped or on-premise deployments of our entire AI and data stack." },
  { question: "How do you handle ongoing maintenance?", answer: "We provide managed maintenance services where our engineering team continuously monitors application performance, applies security patches, and manages API lifecycle updates on a monthly retainer." },
  { question: "Is there a trial period or proof-of-concept phase?", answer: "We typically start with a 4-week 'Discovery & Prototype' phase. This allows stakeholders to validate the solution's ROI with a working PoC before committing to full-scale development." }
];

export const TECH_PARTNERS = ["ArchBIM", "AnyLine", "Givaudan", "Bloomsburg Museum", "NALA Art", "BoxABL", "Asian Paints", "Meta", "Shopify Plus", "Verizon"];

export const TESTIMONIALS: Testimonial[] = [
  { 
    id: 't1', 
    name: 'Sarah Jenkins', 
    role: 'CTO', 
    company: 'ArchBIM', 
    content: 'VinKand did not just build software; they re-engineered our entire operational logic. We reduced overhead by 22% within the first quarter of deployment.', 
    avatar: testimonial1
  },
  { 
    id: 't2', 
    name: 'Marcus Chen', 
    role: 'Founder', 
    company: 'AnyLine', 
    content: 'The spatial computing solution they delivered is years ahead of the market. They translated our abstract vision into a stable, revenue-generating product.', 
    avatar: testimonial2
  },
  { 
    id: 't3', 
    name: 'Elena Rodriguez', 
    role: 'VP of Innovation', 
    company: 'Givaudan', 
    content: 'Security was our primary concern. VinKand\'s approach to API encryption and middleware architecture passed our external audits with zero flags.', 
    avatar: testimonial3
  },
  { 
    id: 't4', 
    name: 'David Smith', 
    role: 'Product Lead', 
    company: 'Bloomsburg Museum', 
    content: 'Their ability to handle complex AI requirements without compromising on UI/UX is rare. A true engineering partner.', 
    avatar: testimonial4
  },
  { 
    id: 't5', 
    name: 'James Wilson', 
    role: 'Director', 
    company: 'NALA Art', 
    content: 'The ROI was visible within 30 days. Their AI implementation automated 60% of our tier-1 support tickets.', 
    avatar: testimonial5
  },
  { 
    id: 't6', 
    name: 'Anita Roy', 
    role: 'CEO', 
    company: 'BoxABL', 
    content: 'Exceptional attention to detail. The haptic feedback system they built is saving lives in our training simulations.', 
    avatar: testimonial6
  },
];

export const BLOGS: BlogPost[] = [
  { 
    id: 'b1', 
    title: 'The Future of Spatial Retail', 
    excerpt: 'Analyzing how Augmented Reality is shifting consumer behavior in luxury markets.', 
    date: 'Oct 24, 2024', 
    author: 'Sarah Chen', 
    category: 'Strategy', 
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    tags: ['Augmented Reality', 'Retail', 'Consumer Behavior'],
    content: [
      "The retail landscape is undergoing a seismic shift. For decades, the e-commerce experience has been defined by static images and 2D interfaces. However, with the advent of accessible Augmented Reality (AR) technology and high-fidelity mobile hardware, we are witnessing the dawn of Spatial Retail.",
      "Luxury markets are leading this charge. Brands are no longer just selling products; they are selling immersive experiences. By allowing customers to visualize high-ticket items—from designer furniture to haute couture—within their own physical space, brands are significantly reducing return rates and increasing conversion metrics.",
      "At VinKand, we have observed that users who engage with AR features are 30% more likely to make a purchase. But the technology goes beyond just 'try-before-you-buy.' It enables storytelling. Imagine pointing your phone at a handbag and seeing the artisan crafting it in an Italian workshop, or seeing the sustainability journey of the materials used.",
      "As devices like the Apple Vision Pro enter the consumer mainstream, the definition of a 'store' will blur. The physical and digital will merge, creating a unified commerce layer where the constraints of physics no longer limit the customer experience. The future isn't just online; it's everywhere."
    ]
  },
  { 
    id: 'b2', 
    title: 'Generative AI in the Enterprise', 
    excerpt: 'Practical frameworks for deploying LLMs without leaking proprietary IP.', 
    date: 'Nov 02, 2024', 
    author: 'David Okafor', 
    category: 'Intelligence', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
    tags: ['Generative AI', 'LLMs', 'Data Privacy', 'Enterprise'],
    content: [
      "The rush to adopt Generative AI is palpable across every boardroom. However, the enthusiasm often hits a wall when the conversation turns to data privacy and intellectual property. How do you leverage the power of models like GPT-4 or Gemini without handing over your corporate secrets?",
      "The answer lies in architectural isolation and Retrieval-Augmented Generation (RAG). Instead of fine-tuning a massive public model with your data—which carries risks of leakage—enterprises should focus on building robust RAG pipelines. This allows a frozen, secure foundation model to access your proprietary data in real-time, only when necessary to answer a specific query.",
      "Furthermore, the deployment environment matters. At VinKand, we advocate for Virtual Private Cloud (VPC) deployments for AI inference. By keeping the vector databases and the inference engine within your controlled perimeter, you ensure that no data ever traverses the public internet unnecessarily.",
      "We are also seeing a rise in 'Small Language Models' (SLMs). These are specialized, efficient models trained on domain-specific data. They are cheaper to run, faster to infer, and easier to secure than their massive generalist counterparts. For many enterprise tasks, bigger isn't always better; smarter is."
    ]
  },
  { 
    id: 'b3', 
    title: 'The Rise of Edge AI: Processing at the Source', 
    excerpt: 'Reducing latency and bandwidth costs by moving intelligence to the device.', 
    date: 'Jan 20, 2025', 
    author: 'David Okafor', 
    category: 'Intelligence', 
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    tags: ['Edge AI', 'IoT', 'Latency', 'Hardware'],
    content: [
      "Cloud AI is powerful, but it has a speed limit: the speed of light. For applications requiring real-time decision making—like autonomous drones, industrial robotics, or AR overlays—the round-trip time to a data center is simply too slow.",
      "Edge AI brings the model to the data, rather than sending the data to the model. By running optimized neural networks directly on local devices or edge servers, we can achieve sub-millisecond inference times. This is crucial for safety-critical systems where a delay could mean an accident.",
      "This shift also has massive privacy implications. In healthcare or smart home applications, users are increasingly wary of sending raw video or audio streams to the cloud. With Edge AI, the raw data never leaves the device; only the insights or metadata are transmitted.",
      "At VinKand, we are leveraging new hardware accelerators like the Apple Neural Engine and specialized edge TPUs to deploy models that were previously thought too heavy for mobile. We are entering an era where your thermostat, your car, and your glasses will all possess localized, autonomous intelligence."
    ]
  },
  {
    id: 'b4',
    title: 'VR Training: The New Industrial Standard',
    excerpt: 'Reducing risk and operational costs through immersive simulation training.',
    date: 'Feb 10, 2025',
    author: 'Sarah Chen',
    category: 'Immersive',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    tags: ['VR', 'Industrial', 'Training', 'Safety'],
    content: [
        "Industrial training has traditionally been expensive, dangerous, and hard to scale. Bringing new employees onto an oil rig or a manufacturing floor for training exposes them to risks before they are ready. Virtual Reality (VR) changes this paradigm entirely.",
        "By creating high-fidelity digital twins of industrial environments, we allow trainees to practice complex procedures—and even fail safely—without real-world consequences. Studies show that VR-trained employees retain information 40% better than classroom learners.",
        "At VinKand, we build physics-accurate simulations for clients in energy and logistics. These aren't just 360-videos; they are fully interactive environments where muscle memory is developed. A mistake in VR is a lesson; a mistake in the field is a liability.",
        "The ROI is immediate. Travel costs for training centers are eliminated, equipment downtime for training purposes is zero, and the time-to-competency is drastically reduced."
    ]
  },
  {
    id: 'b5',
    title: 'Predictive Analytics in Supply Chain',
    excerpt: 'How AI models are anticipating disruptions before they happen.',
    date: 'Feb 18, 2025',
    author: 'David Okafor',
    category: 'Intelligence',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    tags: ['AI', 'Logistics', 'Supply Chain', 'Predictive'],
    content: [
        "Modern supply chains are fragile. A delay in one port can cascade into global shortages. Traditional ERP systems report what happened; Predictive AI tells you what will happen.",
        "By ingesting vast datasets—weather patterns, geopolitical news, shipping routes, and historical sales data—our predictive engines can forecast delays with remarkable accuracy. This allows logistics managers to reroute shipments or adjust inventory buffers weeks in advance.",
        "This isn't magic; it's math. We utilize time-series forecasting and graph neural networks to model the complex interdependencies of the global trade network. For our clients, this visibility translates to millions in saved detention fees and lost sales.",
        "The future of logistics is autonomous. Systems that not only predict disruption but automatically tender new shipments to avoid it. We are building that future today."
    ]
  },
  {
    id: 'b6',
    title: 'The B2B Mobile Experience Gap',
    excerpt: 'Why enterprise mobile apps must match consumer standards to drive adoption.',
    date: 'Feb 25, 2025',
    author: 'Emily Zhao',
    category: 'App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    tags: ['Mobile', 'UX/UI', 'Enterprise', 'Productivity'],
    content: [
        "There is a pervasive myth that enterprise software doesn't need to be beautiful, it just needs to work. This mindset leads to clunky, frustrating mobile apps that employees hate using. Poor usability leads to poor data entry, which corrupts the entire business intelligence pipeline.",
        "Your employees use Instagram and Spotify. They expect fluid animations, intuitive gestures, and instant load times. When they switch to their work app and face 3-second loading spinners and 1990s forms, friction occurs.",
        "VinKand's approach to 'Intelligent Mobile Systems' puts UX first. We use native technologies (SwiftUI and Jetpack Compose) to ensure smooth performance. We design for 'one-thumb' usage for field workers. We implement offline-first architecture so productivity doesn't stop in dead zones.",
        "Invest in design, and you invest in data integrity. When users enjoy the tool, compliance becomes organic rather than enforced."
    ]
  }
];

export const STATS = [
  { label: 'Enterprise Projects', value: 500, suffix: '+', icon: <Workflow className="w-5 h-5" /> },
  { label: 'Global Markets', value: 59, suffix: '', icon: <Globe className="w-5 h-5" /> },
  { label: 'Active Partners', value: 200, suffix: '+', icon: <Users2 className="w-5 h-5" /> },
  { label: 'Client Retention', value: 98, suffix: '%', icon: <Zap className="w-5 h-5" /> },
];

export const TEAM: TeamMember[] = [
  { id: 'tm1', name: 'Alex Mercer', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years in AI.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { id: 'tm2', name: 'Sarah Chen', role: 'CTO', bio: 'Expert in distributed systems and AR/VR.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { id: 'tm3', name: 'David Okafor', role: 'Head of AI', bio: 'PhD in Machine Learning.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
  { id: 'tm4', name: 'Emily Zhao', role: 'Product Design', bio: 'Creating immersive user experiences.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' }
];

export const CORE_VALUES = [
  { title: 'Radical Transparency', description: 'We share our roadmap, pricing, and architecture openly with clients.', icon: <Search className="w-8 h-8" /> },
  { title: 'Velocity with Precision', description: 'Speed matters, but never at the cost of stability or security.', icon: <Zap className="w-8 h-8" /> },
  { title: 'Client-Centricity', description: 'We build what solves your problems, not what looks shiny on a slide deck.', icon: <Users2 className="w-8 h-8" /> },
  { title: 'Continuous Evolution', description: 'Technology moves fast. We ensure your infrastructure moves faster.', icon: <Workflow className="w-8 h-8" /> },
];

export const MILESTONES = [
  { year: '2019', title: 'The Genesis', description: 'Founded in a Silicon Valley garage with a seed round of $2M.' },
  { year: '2020', title: 'First Enterprise Win', description: 'Secured contract with a Fortune 500 logistics firm to automate routing.' },
  { year: '2022', title: 'Series B Funding', description: 'Raised $45M to expand our proprietary AI neural engine.' },
  { year: '2023', title: 'Global Expansion', description: 'Opened innovation hubs in London, Singapore, and Berlin.' },
  { year: '2024', title: 'Market Dominance', description: 'Recognized as the top Enterprise AI integrator by TechWeekly.' },
];

export const PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'Quick Look AR', 
    tagline: 'Create Immersive AR Content', 
    description: 'A platform to transform products into interactive Augmented Reality (AR) experiences in minutes without any coding. It allows businesses to showcase products in AR, enhancing user engagement and visualization.', 
    features: ['Easy Model Upload', 'Instant QR Access', 'Analytics Dashboard', 'No Coding Required'], 
    image: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&q=80&w=800',
    url: 'https://quicklookar.com/'
  },
  { 
    id: 'p2', 
    name: 'PxlGenX', 
    tagline: 'Free AI Image Generator | Create & Edit 4K Images', 
    description: 'A professional AI-powered creative studio that utilizes Google Gemini and Imagen 3 to generate and edit high-quality images. It enables users to build complex workflows and edit visuals using natural language.', 
    features: ['High-Quality Generation', 'Natural Language Editing', 'Advanced Models', 'Creative Studio'], 
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    url: 'https://pxlgenx.com/'
  },
  { 
    id: 'p3', 
    name: 'Insta Banana', 
    tagline: 'Virtual Try-On for Any E-commerce Site', 
    description: 'An AI-powered tool (available as a Chrome Extension) that allows users to virtually try on clothes from any e-commerce website. Users can upload their own photos to see how items look on them before buying.', 
    features: ['Universal Compatibility', 'Virtual Try-On', 'AI Visualization', 'Browser Integration'], 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    url: 'https://instabanana.com/'
  },
  { 
    id: 'p4', 
    name: 'Headshot Engine', 
    tagline: 'AI Headshot Generator for Professional Headshots', 
    description: 'An AI service that transforms casual photos into professional, studio-quality headshots. It focuses on preserving exact facial features while upgrading the background, lighting, and attire.', 
    features: ['Speed: 30s Generation', '100% Privacy Focused', 'High Quality (1024x1024)', 'Multiple Styles'], 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    url: 'https://headshotengine.com/'
  }
];

export const PORTFOLIO_CATEGORIES: Category[] = [
    { id: "all", name: "All Projects" },
    { id: "education", name: "Education" },
    { id: "medical", name: "Medical & Healthcare" },
    { id: "art", name: "Art & Culture" },
    { id: "retail", name: "Retail" },
    { id: "industrial", name: "Industrial" },
    { id: "architecture", name: "Architecture" },
    { id: "real-estate", name: "Real Estate" }
];

export const PORTFOLIO: Project[] = [
    {
        id: 1,
        title: "Augmented Reality Education",
        description: "We have developed an innovative augmented reality (AR) solution for educational institutions, transforming how students engage with subjects like history, chemistry, zoology, and biology. This cutting-edge technology overlays digital information onto the real world, creating an immersive learning environment.",
        categories: ["education", "medical"],
        imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800",
        videoId: "YCsuwhvcFgk",
        tags: ["AR", "Education", "Interactive Learning"]
    },
    {
        id: 2,
        title: "Augmented Reality Education 2",
        description: "Building on our successful AR platform, this enhanced version introduces interactive 3D molecular structures for chemistry, historical reconstructions for social studies, and detailed anatomical models for biology. Students can manipulate virtual specimens, conduct safe virtual experiments, and explore historical sites through time-travel simulations.",
        categories: ["education", "medical"],
        imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800",
        videoId: "TH9qMNiwgL8",
        tags: ["AR", "Education", "Interactive Learning"]
    },
    {
        id: 3,
        title: "StarMapAR",
        description: "StarMapAR is an augmented reality app that lets you explore the solar system up close from your smartphone or tablet. Experience the planets in stunning 3D detail, right in your own space.",
        categories: ["education", "art"],
        imageUrl: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=800",
        videoId: "m19-ZVN6paU",
        tags: ["AR", "Education", "Space"]
    },
    {
        id: 4,    
        title: "WebAR Product Display",
        description: "Experience a whole new way to explore beverages and foods with our immersive AR solution. Through augmented reality, you can visualize lifelike 3D models of various drinks and dishes right in front of you.",
        categories: ["retail", "industrial"],
        imageUrl: "https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=800",
        videoId: "2_z4hi99VoM",
        tags: ["WebAR", "Product Visualization", "E-commerce"]
    },
    {
        id: 5,
        title: "Virtual Try-On Solutions",
        description: "Revolutionary virtual try-on experiences for fashion and accessories, allowing customers to visualize products before purchase.",
        categories: ["retail"],
        imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
        videoId: "9NIm6vqL1yU",
        tags: ["AR", "Fashion", "E-commerce"]
    },
    {
        id: 6,
        title: "AR Real Estate Tour",
        description: "Virtual property tours enhanced with AR, allowing potential buyers to visualize furniture placement, view property information, and see renovation possibilities.",
        categories: ["real-estate", "architecture"],
        imageUrl: "https://images.unsplash.com/photo-1628744404730-5e143358539b?w=800",
        videoId: "Fd8b83KMfyU",
        tags: ["AR", "Real Estate", "Virtual Tour"]
    },
    {
        id: 7,
        title: "AR Anatomy Visualization",
        description: "Interactive 3D anatomy visualization using AR for medical education and training.",
        categories: ["medical", "education"],
        imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
        videoId: "bZh0Vi_-pbs",
        tags: ["AR", "Medical", "Education"]
    },
    {
        id: 8,
        title: "AR Museum Experience",
        description: "Bring artwork to life with interactive AR experiences in museums, making art more engaging and informative for visitors.",
        categories: ["art", "education"],
        imageUrl: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        videoId: "6dRk5uwMwIo",
        tags: ["AR", "Culture", "Education"]
    },
    {
        id: 9,
        title: "FloorCraft AR",
        description: "AR Tiles is an innovative app that brings your physical spaces to life using augmented reality. It allows users to place, customize, and interact with virtual tiles in real-world environments through their smartphones or AR glasses.",
        categories: ["retail", "architecture"],
        imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
        videoId: "NXq04pNBp4E",
        tags: ["AR", "Interior Design", "Home Improvement"]
    },
    {
        id: 10,
        title: "AR Car Assistant",
        description: "This app provides live information about cars using AR technology, helping users understand vehicle features and maintenance needs in real-time.",
        categories: ["industrial", "education"],
        imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        videoId: "xwaRm7SzCWw",
        tags: ["AR", "Automotive", "Technical"]
    },
    {
        id: 11,
        title: "WebAR Home Furnishings",
        description: "View home appliances and furniture in your space before buying, similar to IKEA's AR experience. Perfect for visualizing how furniture fits in your home.",
        categories: ["retail", "architecture"],
        imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        videoId: "9MyawbVs4KE",
        tags: ["WebAR", "Furniture", "E-commerce"]
    },
    {
        id: 12,
        title: "AR Pathology Visualization",
        description: "Advanced AR application for medical pathology, enabling detailed visualization of medical specimens and educational content for medical professionals.",
        categories: ["medical", "education"],
        imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800",
        videoId: "VPRj5bHE1P8",
        tags: ["AR", "Medical", "Professional"]
    },
    {
        id: 13,
        title: "AR Picture Frame",
        description: "Interactive picture frame that comes to life through QR codes, blending traditional art with augmented reality technology.",
        categories: ["art", "retail"],
        imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
        videoId: "6I2DzKsfgpE",
        tags: ["AR", "Art", "Interactive"]
    },
    {
        id: 14,
        title: "AR Training",
        description: "Advanced AR training platform for proper use of tools, providing step-by-step guidance to train users on how to use tools",
        categories: ["industrial", "education"],
        imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
        videoId: "Lzy1VDaQtso",
        tags: ["AR", "Industrial", "Training"]
    },
    {
        id: 15,
        title: "AR Architecture Viewer",
        description: "Visualize architectural designs in real-world scale, allowing clients to walk through virtual buildings and make informed decisions about their projects.",
        categories: ["architecture", "real-estate"],
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
        videoId: "jrVqaMCijpQ",
        tags: ["AR", "Architecture", "Design"]
    },
    {
        id: 16,
        title: "AR Portal Experience",
        description: "Experience a new way of tourism through AR portals, transporting users to different locations and environments instantly.",
        categories: ["art", "education"],
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        videoId: "56FQhWI51MA",
        tags: ["AR", "Tourism", "Interactive"]
    }
];

export const IconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="w-8 h-8" />, Globe: <Globe className="w-8 h-8" />, Smartphone: <Smartphone className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />, Boxes: <Boxes className="w-8 h-8" />,
  Box: <Box className="w-8 h-8" />, Monitor: <Monitor className="w-8 h-8" />,
};