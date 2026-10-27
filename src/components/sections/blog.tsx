import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Clock, Calendar, User, Search, X, Tag, BookOpen, Share2, ThumbsUp, ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../../utils/scroll';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Engineering & 3D' | 'UI/UX & Systems' | 'Growth & Strategy' | 'AI & Future';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'webgl-performance-2026',
    title: 'Achieving 60FPS WebGL on Mobile: Advanced GSAP & Three.js Optimization Techniques',
    excerpt: 'How we engineered high-fidelity 3D car configurators and real-time canvas animations without draining mobile CPU & battery.',
    content: `
      <p class="text-lg leading-relaxed text-gray-200">
        In modern web development, rich 3D interactions are no longer limited to high-end desktop rigs. With proper memory management, shader pruning, and GSAP scroll choreography, mobile browsers can achieve liquid-smooth 60fps WebGL experiences.
      </p>

      <h3 class="text-2xl font-bold font-display text-white mt-8 mb-4">1. Texture Compression & GPU VRAM Allocation</h3>
      <p class="text-gray-300 leading-relaxed mb-4">
        Uncompressed PNG textures are the single largest bottleneck for WebGL initialization on mobile Safari and Chrome. By converting assets to compressed GPU formats like KTX2 and Basis Universal, we reduced initial VRAM footprint by 78% while maintaining crisp visual fidelity.
      </p>

      <blockquote class="my-6 p-6 border-l-4 border-ln-yellow bg-white/5 rounded-r-2xl italic text-gray-200">
        "The key to mobile WebGL isn't rendering fewer polygons—it's managing garbage collection cycles so the browser frame budget never spikes over 16.6 milliseconds."
      </blockquote>

      <h3 class="text-2xl font-bold font-display text-white mt-8 mb-4">2. Offscreen Canvas & Web Workers</h3>
      <p class="text-gray-300 leading-relaxed mb-4">
        Offloading heavy physics matrix calculations to dedicated Web Workers prevents main thread lag during scroll events. Coupled with GSAP's <code class="bg-white/10 px-2 py-1 rounded text-ln-yellow text-sm font-mono">ScrollTrigger.matchMedia()</code>, layout shifts are entirely eliminated across tablet and phone viewports.
      </p>

      <h3 class="text-2xl font-bold font-display text-white mt-8 mb-4">Key Takeaways for Engineering Teams</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-300">
        <li>Dispose of geometries and materials explicitly when components unmount to avoid memory leaks.</li>
        <li>Limit shadow map resolutions dynamically based on device pixel ratio (DPR).</li>
        <li>Batch draw calls into instanced meshes wherever repeating 3D elements exist.</li>
      </ul>
    `,
    category: 'Engineering & 3D',
    author: {
      name: 'Alexandre Mercer',
      role: 'Lead Creative Technologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    tags: ['WebGL', 'GSAP', 'Three.js', 'Performance'],
  },
  {
    id: 'design-systems-scale',
    title: 'Building Fluid Design Systems That Scale From Startup to Enterprise',
    excerpt: 'Why static pixel tokens fail on ultra-wide and mobile displays—and how fluid clamp typography creates consistent visual hierarchy.',
    content: `
      <p class="text-lg leading-relaxed text-gray-200">
        Design systems often suffer from rigidity. As product suites expand, hardcoded breakpoint steps result in fragmented layout bugs and inconsistent vertical rhythm.
      </p>
      <h3 class="text-2xl font-bold font-display text-white mt-8 mb-4">Mathematical Fluidity Over Breakpoint Sprawl</h3>
      <p class="text-gray-300 leading-relaxed mb-4">
        By utilizing CSS clamp calculations for spacing scale and font sizing, interfaces adapt smoothly to any viewport resolution from 320px foldables to 4K desktop monitors.
      </p>
    `,
    category: 'UI/UX & Systems',
    author: {
      name: 'Sophia Thorne',
      role: 'Head of Product Design',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
    date: 'Jul 12, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    tags: ['Design Systems', 'Tailwind', 'Typography', 'UI Architecture'],
  },
  {
    id: 'ai-agents-web-apps',
    title: 'Integrating Real-time AI Agents into Custom Web Applications',
    excerpt: 'A practical architecture breakdown for low-latency streaming responses, tool calling, and human-in-the-loop workflows.',
    content: `
      <p class="text-lg leading-relaxed text-gray-200">
        AI integration has evolved beyond simple chat interfaces. Next-generation web applications leverage background agents that automate multi-step user workflows directly inside client dashboards.
      </p>
    `,
    category: 'AI & Future',
    author: {
      name: 'David Chen',
      role: 'Principal AI Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    date: 'Jul 04, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Generative AI', 'Full Stack', 'WebSockets', 'UX'],
  },
  {
    id: 'conversion-cro-retention',
    title: 'The High-Converting Agency Playbook: Micro-Animations & Cognitive Load',
    excerpt: 'How subtle hover feedback and purposeful motion choreography decrease drop-offs on high-ticket B2B service landing pages.',
    content: `
      <p class="text-lg leading-relaxed text-gray-200">
        Micro-interactions act as visual friction-reducers. When users receive immediate optical feedback upon tapping or scrolling, confidence in the platform rises significantly.
      </p>
    `,
    category: 'Growth & Strategy',
    author: {
      name: 'Elena Rostova',
      role: 'VP of Growth',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    },
    date: 'Jun 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['Conversion', 'CRO', 'UX Psychology', 'Strategy'],
  },
  {
    id: 'nextjs-vite-micro-frontends',
    title: 'Micro-Frontend Strategy: Decoupling Monoliths Without Developer Friction',
    excerpt: 'Combining Vite speed in local development with robust serverless deployment layers for enterprise scale.',
    content: `
      <p class="text-lg leading-relaxed text-gray-200">
        Modular application architecture enables parallel feature velocity across distributed engineering teams. Here is how we structure high-scale applications.
      </p>
    `,
    category: 'Engineering & 3D',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
    date: 'Jun 19, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    tags: ['Architecture', 'TypeScript', 'Frontend', 'DevOps'],
  },
];

const categories = ['All', 'Engineering & 3D', 'UI/UX & Systems', 'Growth & Strategy', 'AI & Future'] as const;

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.animate-blog-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#0d0f0f] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-ln-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-image-noise opacity-10 pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-3xl">
            <div className="animate-blog-header inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-ln-yellow text-xs sm:text-sm font-sans font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-ln-yellow" />
              <span>INSIGHTS & PERSPECTIVES</span>
            </div>

            <h2 className="animate-blog-header font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95]">
              LOGICSTAC <span className="font-serif italic font-normal text-ln-yellow text-lowercase">Journal</span>.
            </h2>

            <p className="animate-blog-header font-sans text-base sm:text-lg text-gray-300 leading-relaxed">
              Engineering breakthroughs, WebGL case studies, and modern UI/UX design architecture from our senior agency team.
            </p>
          </div>

          {/* Search Box */}
          <div className="animate-blog-header relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-ln-yellow rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="animate-blog-header flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-sans font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-ln-yellow text-ln-deep-forest border-ln-yellow shadow-md scale-105'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Card (Only shown if 'All' or matching featured category) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div className="animate-blog-header mb-16 group relative bg-white/[0.03] border border-white/15 rounded-3xl overflow-hidden hover:border-ln-yellow/50 transition-all duration-500 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Featured Image */}
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-ln-yellow text-ln-deep-forest text-xs font-sans font-bold uppercase tracking-wider">
                    Featured Article
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-sans font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Featured Content */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-black/40 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ln-yellow" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-ln-yellow" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-ln-yellow transition-colors duration-300 leading-snug">
                    {featuredPost.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-ln-yellow/40"
                    />
                    <div>
                      <div className="text-sm font-sans font-bold text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-gray-400 font-sans">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredPost)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ln-yellow text-ln-deep-forest font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-ln-yellow/50 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-sans font-bold tracking-wider uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-ln-yellow" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-ln-yellow" />
                      {post.readTime}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight text-white group-hover:text-ln-yellow transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Arrow Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                    loading="lazy"
                  />
                  <span className="text-xs font-sans font-medium text-gray-300">
                    {post.author.name}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-ln-yellow group-hover:text-ln-deep-forest text-white flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 p-8">
            <BookOpen className="w-12 h-12 text-ln-yellow mx-auto mb-4 opacity-80" />
            <h3 className="font-display text-xl font-bold uppercase text-white mb-2">No Articles Found</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              We couldn't find any journal posts matching "{searchQuery}". Try searching for categories like WebGL, AI, or Design Systems.
            </p>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#131515] border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-ln-yellow/10 border border-ln-yellow/30 text-ln-yellow text-xs font-sans font-bold uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="hidden sm:inline text-xs font-mono text-gray-400">
                  {activeArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-medium transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-ln-yellow" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-ln-yellow hover:text-black text-white transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
              
              {/* Article Hero */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-ln-yellow"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">
                      {activeArticle.author.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {activeArticle.author.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-96">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Body HTML */}
              <div
                className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-ln-yellow"
                dangerouslySetInnerHTML={{ __html: activeArticle.content }}
              />

              {/* Article Footer & CTA */}
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activeArticle.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact-form"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveArticle(null);
                    scrollToSection('#contact-form');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ln-yellow text-ln-deep-forest font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Build With LogicStac</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
