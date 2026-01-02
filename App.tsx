import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Menu, X, ArrowRight, CheckCircle2, Mail, Phone, MapPin, Linkedin, Instagram, 
  Facebook, ShieldCheck, Sparkles, Zap, Play, ChevronLeft, ChevronRight, Globe, PlayCircle, Target, Clock, Tag
} from 'lucide-react';
import { SERVICES, STATS, TECH_PARTNERS, WORKFLOW, EXPLORATIONS, FAQ_ITEMS, TESTIMONIALS, BLOGS, IconMap, PRODUCTS, PORTFOLIO, PORTFOLIO_CATEGORIES, TEAM, CORE_VALUES, MILESTONES } from './constants';
import SectionHeader from './components/SectionHeader';
import AIConsultant from './components/AIConsultant';
import logoImage from '@assets/logo/logo.png';
import chairPosterImage from '@assets/modelImage/chair_image.png';

// --- Shared Components & Hooks ---

// Google Analytics tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const useGoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      // Track page view on route change for SPA
      const path = location.pathname + location.hash;
      // Get GA ID from the script tag or use default
      const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (gaScript) {
        const src = gaScript.getAttribute('src') || '';
        const match = src.match(/id=([^&]+)/);
        const gaId = match ? match[1] : null;
        
        if (gaId) {
          window.gtag('config', gaId, {
            page_path: path,
            page_title: document.title
          });
        }
      }
    }
  }, [location]);
};

const useSEO = (title: string, description?: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    const fullTitle = `${title} | VinKand Technologies`;
    document.title = fullTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    const oldDesc = metaDesc?.getAttribute('content');
    if (description && metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    return () => {
      document.title = prevTitle;
      if (oldDesc && metaDesc) metaDesc.setAttribute('content', oldDesc);
    };
  }, [title, description]);
};

const useReveal = (animationClass = 'fade-in-up', threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add(animationClass, 'visible');
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animationClass, threshold]);
  return ref;
};

const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Marquee: React.FC<{ items: any[]; renderItem: (item: any, index: number) => React.ReactNode }> = ({ items, renderItem }) => {
  return (
    <div className="relative overflow-hidden w-full group">
      <div className="animate-marquee flex gap-12 w-max group-hover:[animation-play-state:paused] py-4">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page Content ---

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  useSEO(service?.title || "Service", service?.description);

  if (!service) return (
    <div className="pt-40 text-center pb-20">
      <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
      <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
    </div>
  );

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24">
       {/* GEO: Breadcrumb Schema */}
       <script 
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": [
               {
                 "@type": "ListItem",
                 "position": 1,
                 "name": "Home",
                 "item": "https://vinkand.com/"
               },
               {
                 "@type": "ListItem",
                 "position": 2,
                 "name": service.title,
                 "item": `https://vinkand.com/#/services/${id}`
               }
             ]
           })
         }}
       />

       {/* Hero Section */}
       <div className="max-w-7xl mx-auto px-6 mb-16 fade-in-up visible">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600 font-bold hover:underline"><ChevronLeft size={20} /> Back to Home</Link>
          </nav>
          <div className="flex items-center gap-6 mb-6">
             <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                {IconMap[service.icon]}
             </div>
             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">{service.title}</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">{service.longDescription || service.description}</p>
       </div>

       {/* Features & Benefits Grid */}
       <div className="bg-slate-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
             {/* Features */}
             <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 fade-in-up visible delay-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Sparkles className="text-blue-600" /> Key Capabilities</h3>
                <ul className="space-y-4">
                   {service.features?.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                         <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                         <span className="text-slate-700 font-medium text-lg">{f}</span>
                      </li>
                   )) || <p>Details coming soon.</p>}
                </ul>
             </div>

             {/* Benefits */}
             <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2rem] shadow-xl fade-in-up visible delay-200">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Zap className="text-yellow-400" /> Business Impact</h3>
                <ul className="space-y-4">
                   {service.benefits?.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                         <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 flex-shrink-0" />
                         <span className="text-slate-300 font-medium text-lg">{b}</span>
                      </li>
                   )) || <p>Details coming soon.</p>}
                </ul>
             </div>
          </div>
       </div>

       {/* CTA */}
       <div className="max-w-7xl mx-auto px-6 mt-16 text-center fade-in-up visible delay-300">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your infrastructure?</h2>
                <Link to="/contact" className="inline-block bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                   Start Conversation
                </Link>
             </div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          </div>
       </div>
    </div>
  );
};

const BlogDetailPage: React.FC = () => {
  const { id } = useParams();
  const blog = BLOGS.find(b => b.id === id);

  useSEO(blog?.title || "Blog Post", blog?.excerpt);

  if (!blog) return (
    <div className="pt-40 text-center pb-20">
      <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
      <Link to="/blog" className="text-blue-600 hover:underline">Back to Insights</Link>
    </div>
  );

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24">
       {/* GEO: Breadcrumb Schema */}
       <script 
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "BreadcrumbList",
             "itemListElement": [
               {
                 "@type": "ListItem",
                 "position": 1,
                 "name": "Home",
                 "item": "https://vinkand.com/"
               },
               {
                 "@type": "ListItem",
                 "position": 2,
                 "name": "Blog",
                 "item": "https://vinkand.com/#/blog"
               },
               {
                 "@type": "ListItem",
                 "position": 3,
                 "name": blog.title,
                 "item": `https://vinkand.com/#/blog/${id}`
               }
             ]
           })
         }}
       />

       <div className="max-w-4xl mx-auto px-6 fade-in-up visible">
          <nav aria-label="Breadcrumb">
            <Link to="/blog" className="inline-flex items-center text-blue-600 font-bold mb-8 hover:underline"><ChevronLeft size={20} /> Back to Insights</Link>
          </nav>
          
          <div className="mb-6 flex flex-wrap gap-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            <span className="text-blue-600">{blog.category}</span>
            <span>•</span>
            <span>{blog.date}</span>
            {blog.readTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={16} /> {blog.readTime}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">{blog.title}</h1>
          
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
               {/* Placeholder avatar logic */}
               <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{blog.author.charAt(0)}</div>
            </div>
            <div>
              <div className="text-slate-900 font-bold">By {blog.author}</div>
              <div className="text-slate-500 text-xs uppercase tracking-wide">VinKand Research Team</div>
            </div>
          </div>
       </div>

       <div className="max-w-6xl mx-auto px-6 mb-16 fade-in-up visible delay-100">
          <img src={blog.image} alt={`${blog.title} - ${blog.category} article by ${blog.author}`} className="w-full h-auto max-h-[600px] object-cover rounded-[2rem] shadow-xl" loading="lazy" />
       </div>

       {/* GEO: Article Schema for AI Engines */}
       <script 
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify({
             "@context": "https://schema.org",
             "@type": "BlogPosting",
             "headline": blog.title,
             "description": blog.excerpt,
             "image": blog.image,
             "datePublished": blog.date,
             "author": {
               "@type": "Organization",
               "name": blog.author
             },
             "publisher": {
               "@type": "Organization",
               "name": "VinKand Technologies",
               "logo": {
                 "@type": "ImageObject",
                 "url": "https://vinkand.com/assets/logo/logo.png"
               }
             },
             "articleSection": blog.category,
             "keywords": blog.tags?.join(", ") || ""
           })
         }}
       />

       <div className="max-w-3xl mx-auto px-6 fade-in-up visible delay-200">
          <div className="prose prose-lg prose-slate text-slate-700 leading-relaxed space-y-6">
            <p className="font-bold text-xl md:text-2xl text-slate-900 leading-relaxed mb-8 border-l-4 border-blue-600 pl-6">{blog.excerpt}</p>
            
            {/* GEO: Quotation for AI Engines */}
            <blockquote className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 my-8" cite="https://vinkand.com">
              <p className="text-blue-900 font-bold italic">"The convergence of AI and spatial computing isn't just a trend; it's the next evolution of human-computer interaction that VinKand is leading."</p>
              <cite className="text-blue-600 text-sm font-bold block mt-2">— VinKand Engineering Lead</cite>
            </blockquote>

            {blog.content?.map((paragraph, idx) => (
              <p key={idx} className="text-lg">{paragraph}</p>
            )) || <p>Full content loading...</p>}
          </div>
          
          {blog.tags && (
             <div className="mt-12 pt-8 border-t border-slate-200">
               <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Tag size={18}/> Related Topics:</h4>
               <div className="flex flex-wrap gap-2">
                 {blog.tags.map(tag => (
                   <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors cursor-default">{tag}</span>
                 ))}
               </div>
             </div>
          )}
       </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  useSEO("Home", "VinKand Technologies - Enterprise AI, AR/VR solutions, and high-performance SaaS. Secure, scalable, intelligent innovation.");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const heroRef = useReveal('fade-in-up');
  const statsRef = useReveal('scale-up');
  
  const servicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
           entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const children = servicesRef.current?.children;
    if (children) {
      Array.from(children).forEach(child => observer.observe(child as Element));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-12 lg:pt-48 lg:pb-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div ref={heroRef} className="flex flex-col items-start text-left z-10 fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-bold tracking-wider uppercase mb-6 md:mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Global Technology Partner
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6 md:mb-8">
                Build the Future of <br />
                <span className="gradient-text">Corporate Intelligence</span>.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8 md:mb-12 font-medium">
                We engineer mission-critical AI architecture, spatial computing environments, and scalable SaaS platforms for the world's leading enterprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/contact" className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 rounded-full bg-blue-600 text-white text-sm md:text-lg font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-200">
                  Begin Consultation
                </Link>
                <Link to="/portfolio" className="inline-flex items-center justify-center h-12 md:h-16 px-6 md:px-10 rounded-full bg-white border-2 border-slate-200 text-slate-900 text-sm md:text-lg font-bold hover:border-slate-900 transition-all hover:scale-105">
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* Right Visual - 3D Model Viewer */}
            <div className="relative hidden lg:flex items-center justify-center h-[600px] w-full slide-in-right visible delay-200">
               <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
               
               <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <model-viewer 
                    src="https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/SheenChair/glTF-Binary/SheenChair.glb"
                    poster={chairPosterImage}
                    alt="A 3D model of a modern velvet chair"
                    shadow-intensity="1"
                    shadow-softness="1"
                    exposure="0.8"
                    environment-image="neutral"
                    camera-controls
                    disable-zoom
                    auto-rotate
                    touch-action="pan-y"
                    ar
                    style={{ width: '100%', height: '100%' }}
                  >
                  </model-viewer>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authority Stats */}
      <section ref={statsRef} className="py-12 md:py-20 bg-slate-900 text-white relative overflow-hidden scale-up">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-800">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center px-4 group hover:-translate-y-2 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 Trusted By - Tech Partners Marquee */}
      <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by innovative teams at</p>
        </div>
        <div className="flex opacity-60 hover:opacity-100 transition-opacity duration-500">
           <Marquee 
             items={TECH_PARTNERS}
             renderItem={(partner, idx) => (
               <div className="px-8 flex items-center justify-center">
                   <span className="text-2xl md:text-3xl font-bold text-slate-300 font-sans tracking-tight hover:text-blue-600 transition-colors cursor-default whitespace-nowrap">
                     {partner}
                   </span>
               </div>
             )}
           />
        </div>
      </section>

      {/* 3. Core Services */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader title="Technical Ecosystems" subtitle="We specialize in four critical pillars of modern digital infrastructure." />
          <div ref={servicesRef} className="grid md:grid-cols-2 gap-6 md:gap-8">
            {SERVICES.map((s, idx) => (
              <div key={s.id} className={`fade-in-up delay-${(idx + 1) * 100} bg-white p-6 md:p-12 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 group`}>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {IconMap[s.icon]}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">{s.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium mb-6 md:mb-8">{s.description}</p>
                <Link to={`/services/${s.id}`} className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform cursor-pointer text-sm md:text-base">
                  <span className="mr-2">Explore Solution</span> <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategic Workflow */}
      <section className="py-16 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader title="Engineering Roadmap" subtitle="Our methodology is precise, transparent, and built for velocity." />
            
            <div className="relative mt-12 md:mt-20">
              {/* Central Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-100 rounded-full hidden md:block"></div>
              
              <div className="space-y-12 md:space-y-24">
                {WORKFLOW.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  const StepRef = useReveal(isEven ? 'slide-in-left' : 'slide-in-right');
                  
                  return (
                    <div key={idx} ref={StepRef} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} ${isEven ? 'slide-in-left' : 'slide-in-right'}`}>
                      
                      {/* Image Content */}
                      <div className="flex-1 w-full">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white">
                          <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                          {/* Adjusted Height for Mobile */}
                          <img src={step.image} alt={step.title} className="w-full h-48 sm:h-64 lg:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-blue-600 shadow-lg">
                             {idx + 1}
                          </div>
                        </div>
                      </div>

                      {/* Center Node (Desktop Only) */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} items-center`}>
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm">
                            {step.icon}
                          </div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">{step.title.split('. ')[1]}</h3>
                          <p className={`text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </section>

      {/* 5. Client Impact */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-500">Accelerating growth for the Fortune 500.</p>
         </div>
         
         <div className="w-full">
           <Marquee 
             items={TESTIMONIALS} 
             renderItem={(t: typeof TESTIMONIALS[0]) => (
                <div className="w-[280px] sm:w-[320px] md:w-[400px] bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-slate-100" />
                      <div>
                        <div className="text-sm md:text-lg font-bold text-slate-900">{t.name}</div>
                        <div className="text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-wider">{t.company}</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base font-medium italic leading-relaxed">"{t.content}"</p>
                </div>
             )} 
           />
         </div>
      </section>

      {/* 6. Featured Innovations */}
      <section className="py-16 md:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">Innovation Lab</h2>
              <p className="text-slate-400 text-base sm:text-lg md:text-xl">R&D breakthroughs from our skunkworks division.</p>
            </div>
            <Link to="/portfolio" className="flex items-center gap-2 text-white font-bold border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors text-sm md:text-base">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {EXPLORATIONS.map((ex, idx) => {
              const delay = (idx % 3) * 100;
              return (
                <div key={ex.id} onClick={() => setVideoId(ex.videoId)} className={`group relative rounded-3xl overflow-hidden aspect-video md:aspect-[4/3] bg-slate-800 cursor-pointer fade-in-up delay-${delay} visible`}>
                  <img src={ex.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" alt={ex.title} />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                     <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="text-white w-8 h-8 fill-current ml-1" />
                     </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 z-10" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <div className="text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> {ex.tag}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{ex.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal for Featured Innovations */}
      {videoId && (
         <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4 md:p-8" onClick={() => setVideoId(null)}>
           <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 z-[110]">
             <X size={32} />
           </button>
           <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative" onClick={(e) => e.stopPropagation()}>
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`} 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowFullScreen
             ></iframe>
           </div>
         </div>
       )}

      {/* 7. FAQ Section */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader title="Common Inquiries" subtitle="Clarity on our operational standards and security protocols." centered={true} />
          
          {/* GEO: FAQ Schema for AI Engines */}
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQ_ITEMS.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />

          <div className="mt-8 md:mt-12 space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-blue-200 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none bg-slate-50 hover:bg-white transition-colors"
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900 pr-8">{faq.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${openFaq === i ? 'bg-blue-600 border-blue-600 text-white rotate-45' : 'border-slate-300 text-slate-400'}`}>
                    <X size={18} />
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-blue-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center text-white relative overflow-hidden shadow-2xl animate-glow">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full border-[60px] border-white/20"></div>
                 <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full bg-blue-500 blur-3xl"></div>
              </div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 md:mb-10 tracking-tight">Ready to dominate <br/>your market?</h2>
                <p className="text-base sm:text-xl md:text-2xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">
                  Join the 500+ enterprises leveraging VinKand's architecture to scale globally.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                   <Link to="/contact" className="bg-white text-blue-600 px-8 py-3 md:px-12 md:py-5 rounded-full font-bold text-base md:text-xl hover:scale-105 transition-transform shadow-xl">
                     Start Consultation
                   </Link>
                   <a href="mailto:info@vinkand.com" className="bg-blue-700 border border-blue-500 text-white px-8 py-3 md:px-12 md:py-5 rounded-full font-bold text-base md:text-xl hover:bg-blue-800 transition-colors">
                     info@vinkand.com
                   </a>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- Legal Pages ---

const LegalPage: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="pt-32 pb-20 lg:pt-48 lg:pb-32">
    <div className="max-w-4xl mx-auto px-6">
      <SectionHeader title={title} subtitle="" centered={false} />
      <div className="prose prose-lg prose-slate text-slate-600 max-w-none">
        {children}
      </div>
    </div>
  </div>
);

const PrivacyPage: React.FC = () => (
  <LegalPage title="Privacy Policy">
    <div className="space-y-8">
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="font-bold text-slate-900 mb-2">Effective Date: January 1, 2026</p>
        <p className="text-sm">At VinKand Technologies, we prioritize your data privacy. This policy outlines how we collect, use, and protect your information.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h3>
        <p className="mb-4">We collect information to provide better services to all our users. This includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Information:</strong> Name, email address, phone number, and company details provided via our contact forms.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system collected automatically.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited and time spent.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h3>
        <p className="mb-4">Your data allows us to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, operate, and maintain our services.</li>
          <li>Improve, personalize, and expand our website.</li>
          <li>Understand and analyze how you use our website.</li>
          <li>Communicate with you, including for customer service, to provide updates, and for marketing purposes.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h3>
        <p>We implement industry-standard security measures, including encryption and secure server protocols (SOC2 Type II compliant), to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-blue-600 font-bold">info@vinkand.com</span>.</p>
      </div>
    </div>
  </LegalPage>
);

const TermsPage: React.FC = () => (
  <LegalPage title="Terms of Service">
    <div className="space-y-8">
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="font-bold text-slate-900 mb-2">Effective Date: January 1, 2026</p>
        <p className="text-sm">Please read these Terms of Service carefully before using the VinKand Technologies website operated by VinKand Technologies Inc.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h3>
        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Intellectual Property</h3>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of VinKand Technologies and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Use License</h3>
        <p className="mb-4">Permission is granted to temporarily download one copy of the materials (information or software) on VinKand Technologies' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>Attempt to decompile or reverse engineer any software contained on VinKand Technologies' website;</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h3>
        <p>In no event shall VinKand Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.</p>
      </div>
    </div>
  </LegalPage>
);

const SLAPage: React.FC = () => (
  <LegalPage title="Service Level Agreement (SLA)">
    <div className="space-y-8">
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="font-bold text-slate-900 mb-2">Effective Date: January 1, 2026</p>
        <p className="text-sm">This Service Level Agreement ("SLA") outlines the performance guarantees for VinKand Technologies' Enterprise Cloud Services.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Service Availability Guarantee</h3>
        <p>VinKand guarantees a Monthly Uptime Percentage of at least <strong>99.99%</strong> during any monthly billing cycle. If we fail to meet this guarantee, you will be eligible for a Service Credit.</p>
        <div className="mt-4 grid grid-cols-2 gap-4 border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-100 p-3 font-bold text-slate-700">Monthly Uptime Percentage</div>
          <div className="bg-slate-100 p-3 font-bold text-slate-700">Service Credit</div>
          <div className="p-3 border-t border-slate-200">Less than 99.99% but {'>='} 99.9%</div>
          <div className="p-3 border-t border-slate-200">10%</div>
          <div className="p-3 border-t border-slate-200">Less than 99.9% but {'>='} 99.0%</div>
          <div className="p-3 border-t border-slate-200">25%</div>
          <div className="p-3 border-t border-slate-200">Less than 99.0%</div>
          <div className="p-3 border-t border-slate-200">100%</div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Support Response Times</h3>
        <p className="mb-4">Our support team adheres to the following response time targets based on issue severity:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Critical (P1):</strong> System down, production halted. Response within <strong>15 minutes</strong> (24/7).</li>
          <li><strong>High (P2):</strong> Severe performance degradation. Response within <strong>2 hours</strong>.</li>
          <li><strong>Normal (P3):</strong> Non-critical bugs or questions. Response within <strong>1 business day</strong>.</li>
          <li><strong>Low (P4):</strong> Feature requests or cosmetic issues. Response within <strong>2-3 business days</strong>.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Scheduled Maintenance</h3>
        <p>We will provide at least 48 hours notice for any scheduled maintenance that may impact service availability. Maintenance windows are typically scheduled during off-peak hours (Sunday 02:00 - 06:00 UTC).</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Exclusions</h3>
        <p>This SLA does not apply to any performance issues caused by: (i) factors outside of our reasonable control; (ii) using the service in a manner inconsistent with the documentation; or (iii) your or any third party's hardware or software.</p>
      </div>
    </div>
  </LegalPage>
);


// --- Restored Inner Pages ---

const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* 1. Hero */}
        <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="fade-in-up visible">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-bold uppercase mb-6">Since 2019</div>
                   <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-6 md:mb-8 leading-tight">Engineering Trust in a <br/><span className="gradient-text">Digital First World</span>.</h1>
                   <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                     VinKand Technologies exists to bridge the gap between bleeding-edge academic AI research and reliable, scalable enterprise software. We don't just write code; we architect the future of your business.
                   </p>
                   <div className="flex gap-8 md:gap-12 border-t border-slate-200 pt-8">
                      <div>
                         <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1">500+</div>
                         <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Projects Delivered</div>
                      </div>
                      <div>
                         <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1">98%</div>
                         <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">Retention Rate</div>
                      </div>
                   </div>
                </div>
                {/* Responsive Image Height */}
                <div className="relative h-56 sm:h-72 lg:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl slide-in-right visible delay-200 group">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" alt="Office Culture" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                </div>
            </div>
        </section>

        {/* 2. Mission & Vision */}
        <section className="bg-slate-900 text-white py-12 md:py-24 mb-16 md:mb-24 rounded-[2rem] md:rounded-[3rem] mx-4 lg:mx-8">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                 <div className="space-y-6 fade-in-up visible delay-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4"><Target size={28} /></div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Mission</h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-medium">To democratize enterprise-grade AI infrastructure, ensuring that powerful intelligence and spatial computing tools are accessible, secure, and scalable for forward-thinking organizations worldwide.</p>
                 </div>
                 <div className="space-y-6 fade-in-up visible delay-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4"><Globe size={28} /></div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Vision</h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-medium">We envision a world where the boundary between physical and digital reality dissolves, powered by ethical AI and seamless interfaces that enhance human potential rather than replacing it.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. Expertise */}
        <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-32">
           <SectionHeader title="Our Expertise" subtitle="Multidisciplinary engineering at the highest level." centered />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {['AI Architecture', 'Spatial Computing', 'SaaS Development', 'Mobile Engineering', 'Data Analytics'].map((item, i) => (
                 <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all text-center">
                    <div className="text-blue-600 mb-4 flex justify-center"><CheckCircle2 size={32} /></div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900">{item}</h3>
                 </div>
              ))}
           </div>
        </section>

        {/* 4. Core Values */}
        <section className="bg-slate-50 py-16 md:py-24 mb-16 md:mb-32">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="Our Core Values" subtitle="The DNA that drives every architectural decision we make." centered />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {CORE_VALUES.map((v, i) => (
                        <div key={i} className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-up visible delay-${i*100}`}>
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                {v.icon}
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">{v.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. Careers CTA */}
        <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
            <div className="bg-blue-600 rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-white shadow-2xl">
                 <div className="relative z-10">
                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Join the Revolution</h2>
                     <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">We are always looking for exceptional engineers, designers, and strategists. <br className="hidden md:block"/>Help us build the impossible.</p>
                     <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-slate-100 transition-colors shadow-lg">View Open Positions</button>
                 </div>
                 <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
                 <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
            </div>
        </section>
    </div>
  );
};

const PortfolioPage: React.FC = () => {
  useSEO("Portfolio", "Evidence of our excellence in AI, SaaS, and Immersive engineering.");
  const [activeCategory, setActiveCategory] = useState('all');
  const [videoId, setVideoId] = useState<string | null>(null);

  const filtered = activeCategory === 'all' 
    ? PORTFOLIO 
    : PORTFOLIO.filter(p => p.categories.includes(activeCategory));

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center fade-in-up visible">
        <SectionHeader title="The Innovation Showcase" subtitle="Evidence of our excellence in AI, SaaS, and Immersive engineering." />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 flex flex-wrap justify-center gap-3 md:gap-4 fade-in-up visible delay-100">
        {PORTFOLIO_CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 md:px-8 md:py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filtered.map((p, idx) => (
          <div key={p.id} onClick={() => setVideoId(p.videoId)} className={`group cursor-pointer fade-in-up visible delay-${(idx % 3) * 100} flex flex-col h-full`}>
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 aspect-[16/10] shadow-xl border border-slate-100">
              <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="text-white w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                 </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm pointer-events-none">
                {p.categories[0]}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{p.title}</h3>
              <p className="text-sm md:text-base text-slate-600 mb-4 font-medium line-clamp-3 flex-1">{p.description}</p>
              <div className="flex gap-2 flex-wrap mt-auto">{p.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1.5 rounded-full text-slate-600">#{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoId && (
         <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4 md:p-8" onClick={() => setVideoId(null)}>
           <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 z-[110]">
             <X size={32} />
           </button>
           <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative" onClick={(e) => e.stopPropagation()}>
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`} 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowFullScreen
             ></iframe>
           </div>
         </div>
       )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  useSEO("Elite SaaS Suite", "Premium ready-to-deploy enterprise solutions including Quick Look AR and PxlGenX.");
  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24">
    <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-32 text-center fade-in-up visible">
       <SectionHeader title="Elite SaaS Suite" subtitle="Ready-to-deploy enterprise solutions." />
    </div>
    <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-40">
      {PRODUCTS.map((p, i) => (
        <div key={p.id} className={`grid lg:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} fade-in-up visible`}>
          <div className={`${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
             <div className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6 flex items-center gap-2"><Zap size={18} /> {p.tagline}</div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-slate-900">{p.name}</h2>
             <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium">{p.description}</p>
             
             {/* GEO: Structured Data for AI Engines */}
             <script 
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                 __html: JSON.stringify({
                   "@context": "https://schema.org",
                   "@type": "SoftwareApplication",
                   "name": p.name,
                   "description": p.description,
                   "applicationCategory": "BusinessApplication",
                   "offers": {
                     "@type": "Offer",
                     "price": "0",
                     "priceCurrency": "USD"
                   },
                   "featureList": p.features
                 })
               }}
             />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
               {p.features.map(f => <div key={f} className="flex gap-3 font-bold text-slate-800 text-base md:text-lg"><CheckCircle2 size={24} className="text-green-500 flex-shrink-0" /> {f}</div>)}
             </div>
             <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-blue-600 transition-colors">Visit Website</a>
          </div>
          <div className={`rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
            <img 
              src={p.image} 
              className="w-full h-full object-cover aspect-video hover:scale-105 transition-transform duration-700" 
              alt={`${p.name} - ${p.tagline} | VinKand Enterprise SaaS Solution`} 
              loading="lazy"
              width="800"
              height="450"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

const BlogPage: React.FC = () => {
  useSEO("Blog & Insights", "Expert commentary on the future of AI, Augmented Reality, and digital ecosystems.");
  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24">
    <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 text-center fade-in-up visible">
      <SectionHeader title="Tech Insights" subtitle="Deep dives into AI architectures and spatial computing." />
    </div>
    <div className="max-w-4xl mx-auto px-6 grid gap-12 md:gap-16">
      {BLOGS.map((b, idx) => (
        <Link to={`/blog/${b.id}`} key={b.id} className={`group bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row hover:shadow-2xl hover:-translate-y-2 transition-all fade-in-up visible delay-${idx * 100}`}>
          <div className="md:w-2/5 h-56 md:h-auto relative"><img src={b.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={b.title} /></div>
          <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
             <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               {b.date} <span className="w-1 h-1 bg-slate-400 rounded-full" /> {b.category}
             </div>
             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 group-hover:text-blue-600 transition-colors leading-tight">{b.title}</h2>
             <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 md:mb-8">{b.excerpt}</p>
             <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2"><div className="w-6 h-1 bg-blue-600 rounded-full" /> By {b.author}</div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

const ContactPage: React.FC = () => {
  useSEO("Contact Us", "Connect with VinKand Technologies for innovative AI and AR solutions.");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // NOTE: You must generate an Access Key from https://web3forms.com/ and replace 'YOUR_ACCESS_KEY_HERE' below.
    // It is free and takes seconds.
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8f2b77b4-fa8f-4cc0-bbd3-edcaee48c138", 
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.details,
          subject: "New Inquiry from VinKand Website",
          from_name: "VinKand Website"
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', details: '' });
        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 fade-in-up visible"><SectionHeader title="Start Your Journey" subtitle="Reach out to our tech strategy team today." /></div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 bg-white rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 shadow-xl border border-slate-100 fade-in-up visible delay-200">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-slate-900">VinKand Global Hub</h3>
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="p-4 md:p-5 bg-blue-50 text-blue-600 rounded-2xl"><Mail size={24} /></div>
                  <div><p className="font-bold text-base md:text-lg text-slate-900">Email Us</p><p className="text-slate-600 text-base md:text-lg">info@vinkand.com</p></div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="p-4 md:p-5 bg-blue-50 text-blue-600 rounded-2xl"><Phone size={24} /></div>
                  <div><p className="font-bold text-base md:text-lg text-slate-900">Call Us</p><p className="text-slate-600 text-base md:text-lg">+1 (555) 123-4567</p></div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="p-4 md:p-5 bg-blue-50 text-blue-600 rounded-2xl"><MapPin size={24} /></div>
                  <div><p className="font-bold text-base md:text-lg text-slate-900">Global HQ</p><p className="text-slate-600 text-base md:text-lg">Silicon Valley, CA 94043</p></div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
             {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">Thank you for contacting us. We will respond shortly.</p>
                </div>
             ) : (
                 <>
                 <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                   <div className="space-y-2">
                     <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 ml-2">First Name</label>
                     <input 
                        required
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text" 
                        className="w-full bg-slate-50 p-3 md:p-5 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none text-base md:text-lg border border-transparent focus:bg-white" 
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 ml-2">Last Name</label>
                     <input 
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text" 
                        className="w-full bg-slate-50 p-3 md:p-5 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none text-base md:text-lg border border-transparent focus:bg-white" 
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 ml-2">Work Email</label>
                   <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      className="w-full bg-slate-50 p-3 md:p-5 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none text-base md:text-lg border border-transparent focus:bg-white" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 ml-2">Project Details</label>
                   <textarea 
                      required
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={5} 
                      className="w-full bg-slate-50 p-3 md:p-5 rounded-2xl font-medium focus:ring-2 focus:ring-blue-500 outline-none text-base md:text-lg border border-transparent focus:bg-white"
                   ></textarea>
                 </div>
                 {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold">
                        Something went wrong. Please try again or email us directly.
                    </div>
                 )}
                 <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full bg-blue-600 text-white py-4 md:py-6 rounded-2xl font-bold text-lg md:text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                 >
                    {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                 </button>
                 </>
             )}
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Navbar & Footer ---

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menu]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || menu ? 'bg-white shadow-sm py-3 md:py-4 border-b border-slate-100' : 'bg-transparent py-4 lg:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoImage} alt="VinKand Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover drop-shadow-lg group-hover:scale-105 transition-transform" />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-slate-900">VinKand<span className="text-blue-600">.</span></span>
        </Link>
        <div className="hidden lg:flex items-center gap-10 text-base font-bold text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link to="/portfolio" className="hover:text-blue-600 transition-colors">Works</Link>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">Insights</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>
        <div className="hidden lg:block">
           <Link to="/contact" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1">
             Start Project
           </Link>
        </div>
        <button className="lg:hidden text-slate-900 p-2 -mr-2 focus:outline-none z-50" onClick={() => setMenu(!menu)}>
            {menu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[49] flex flex-col pt-28 px-6 pb-8 transform transition-transform duration-300 lg:hidden ${menu ? 'translate-x-0' : 'translate-x-full'} h-screen w-screen`}>
        <div className="flex flex-col gap-6 text-xl font-bold text-slate-900 overflow-y-auto flex-1">
          <Link to="/" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">Home</Link>
          <Link to="/about" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">About Us</Link>
          <Link to="/portfolio" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">Portfolio</Link>
          <Link to="/products" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">Products</Link>
          <Link to="/blog" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">Blog</Link>
          <Link to="/contact" onClick={() => setMenu(false)} className="border-b border-slate-100 pb-4">Contact</Link>
          <Link to="/contact" onClick={() => setMenu(false)} className="bg-blue-600 text-white p-4 rounded-xl text-center shadow-lg mt-4">Start Project</Link>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 md:py-20 border-t border-slate-800 text-sm">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-6 text-white text-2xl font-bold group">
          <img src={logoImage} alt="VinKand Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover drop-shadow-lg group-hover:scale-105 transition-transform" />
          <span className="text-white">VinKand</span><span className="text-blue-600">.</span>
        </Link>
        <p className="max-w-xs mb-8 font-medium leading-relaxed">Architecting the digital future for enterprise. Secure, scalable, and intelligent.</p>
        <div className="flex gap-4">
          {[Linkedin, Instagram, Facebook].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"><Icon size={18} /></a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
        <div className="flex flex-col gap-4 font-medium">
          <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
          <Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
          <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
          <Link to="/blog" className="hover:text-blue-400 transition-colors">Insights</Link>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
        <div className="flex flex-col gap-4 font-medium">
          <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          <Link to="/sla" className="hover:text-blue-400 transition-colors">SLA</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-8 text-xs font-bold uppercase tracking-widest">
      <div>&copy; {new Date().getFullYear()} VinKand Technologies Inc.</div>
      <div className="flex gap-8">
        <div className="flex items-center gap-2"><Globe size={14} /> Global / English</div>
        <div className="flex items-center gap-2"><ShieldCheck size={14} /> SOC2 Compliant</div>
      </div>
    </div>
  </footer>
);

// Component to track analytics inside Router context
const AppContent: React.FC = () => {
  useGoogleAnalytics();
  
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sla" element={<SLAPage />} />
        </Routes>
      </main>
      <Footer />
      <AIConsultant />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;