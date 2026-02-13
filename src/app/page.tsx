"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Featured show data
const featuredShow = {
  id: 1,
  title: "Cyberpunk: Edgerunners",
  genre: "Animation • Action • Sci-Fi",
  rating: "9.2",
  year: "2022",
  episodes: 10,
  synopsis: "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become an edgerunner: a mercenary outlaw.",
  image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
  banner: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80",
};

// Trending shows
const trendingShows = [
  { id: 1, title: "Demon Slayer", image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?w=400&q=80", rating: "9.5", episodes: 26 },
  { id: 2, title: "Jujutsu Kaisen", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80", rating: "9.3", episodes: 24 },
  { id: 3, title: "Attack on Titan", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80", rating: "9.4", episodes: 87 },
  { id: 4, title: "One Piece", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80", rating: "9.1", episodes: 1000 },
  { id: 5, title: "Naruto", image: "https://images.unsplash.com/photo-1614726365723-49cfae9b0694?w=400&q=80", rating: "9.0", episodes: 720 },
  { id: 6, title: "My Hero Academia", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80", rating: "8.9", episodes: 138 },
  { id: 7, title: "Death Note", image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?w=400&q=80", rating: "9.0", episodes: 37 },
  { id: 8, title: "Tokyo Revengers", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80", rating: "8.7", episodes: 58 },
];

// Categories
const categories = [
  { name: "Action", icon: "⚔️", count: 234 },
  { name: "Romance", icon: "💕", count: 189 },
  { name: "Comedy", icon: "😂", count: 312 },
  { name: "Horror", icon: "👻", count: 87 },
  { name: "Sci-Fi", icon: "🚀", count: 156 },
  { name: "Fantasy", icon: "🧙", count: 203 },
  { name: "Drama", icon: "🎭", count: 178 },
  { name: "Mystery", icon: "🔍", count: 94 },
];

// Continue watching
const continueWatching = [
  { id: 1, title: "Spy x Family", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80", progress: 65, episode: "S2 E12" },
  { id: 2, title: "Chainsaw Man", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80", progress: 42, episode: "S1 E8" },
  { id: 3, title: "Blue Lock", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80", progress: 88, episode: "S1 E22" },
  { id: 4, title: "Mob Psycho 100", image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?w=400&q=80", progress: 30, episode: "S3 E4" },
];

// Popular this week
const popularShows = [
  { id: 1, title: "Solo Leveling", rank: 1, image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80", views: "2.4M" },
  { id: 2, title: "Frieren", rank: 2, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80", views: "2.1M" },
  { id: 3, title: "Apothecary Diaries", rank: 3, image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80", views: "1.9M" },
  { id: 4, title: "Dungeon Meshi", rank: 4, image: "https://images.unsplash.com/photo-1626544827763-d516dce335ca?w=400&q=80", views: "1.8M" },
  { id: 5, title: "Shin-chan", rank: 5, image: "https://images.unsplash.com/photo-1614726365723-49cfae9b0694?w=400&q=80", views: "1.7M" },
];

// Particle Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 107, ${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />;
}

// Navigation Component
function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-netflix-red to-netflix-red-dark flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-white">ONIMIX</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["home", "movies", "series", "anime", "mylist"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-link ${activeTab === tab ? "text-netflix-red" : "text-gray-400"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search & Profile */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-end pb-24 overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent z-10" />
        <img src={featuredShow.banner} alt={featuredShow.title} className="w-full h-full object-cover" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-netflix-red/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-500/10 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-netflix-red text-white text-sm font-semibold rounded">Featured</span>
            <span className="text-yellow-400 text-sm font-bold">★ {featuredShow.rating}</span>
            <span className="text-gray-400 text-sm">{featuredShow.year}</span>
            <span className="text-gray-400 text-sm">{featuredShow.episodes} Episodes</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">{featuredShow.title}</h1>

          {/* Genre */}
          <p className="text-gray-300 text-lg mb-6">{featuredShow.genre}</p>

          {/* Synopsis */}
          <p className="text-gray-400 mb-8 line-clamp-3">{featuredShow.synopsis}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="btn-play flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </button>
            <button className="btn-info flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Trending Carousel
function TrendingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.8, scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%"
        }
      });
      gsap.fromTo(".trending-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-netflix-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-netflix-red">🔥</span> Trending Now
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {trendingShows.map((show, index) => (
            <div key={show.id} className="trending-card flex-shrink-0 group cursor-pointer">
              <div className="relative w-48 md:w-56 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
                <div className="aspect-[3/4]">
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Rank badge */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm font-semibold">{show.rating}</span>
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">{show.title}</h3>
                  <p className="text-gray-400 text-sm">{show.episodes} episodes</p>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="w-16 h-16 rounded-full bg-netflix-red flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".category-card", { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-netflix-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-purple-500">📺</span> Browse Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div key={category.name} className="category-card group cursor-pointer">
              <div className="glass-card rounded-xl p-4 text-center transition-all duration-300 group-hover:scale-105 group-hover:border-netflix-red/50">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-white font-semibold">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} titles</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Continue Watching Section
function ContinueWatchingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".continue-card", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, stagger: 0.15, duration: 0.6, scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-netflix-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-blue-500">⏯️</span> Continue Watching
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {continueWatching.map((show) => (
            <div key={show.id} className="continue-card flex-shrink-0 w-64 group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden mb-3">
                <div className="aspect-video">
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full bg-netflix-red" style={{ width: `${show.progress}%` }} />
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-netflix-red flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1 truncate">{show.title}</h3>
              <p className="text-gray-400 text-sm">{show.episode}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Popular This Week Section
function PopularSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".popular-row", { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.15, duration: 0.6, scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-netflix-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="text-yellow-500">🏆</span> Popular This Week
        </h2>

        <div className="space-y-4">
          {popularShows.map((show) => (
            <div key={show.id} className="popular-row flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className={`text-2xl font-bold ${show.rank <= 3 ? "text-yellow-500" : "text-gray-500"}`}>
                  {show.rank}
                </span>
              </div>
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={show.image} alt={show.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate group-hover:text-netflix-red transition-colors">{show.title}</h3>
                <p className="text-gray-500 text-sm">{show.views} views</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-netflix-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 bg-netflix-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-netflix-red to-netflix-red-dark flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="text-2xl font-bold text-white">ONIMIX</span>
            </div>
            <p className="text-gray-500">Your ultimate streaming destination for anime, movies, and series.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-netflix-red transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">Popular</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">Categories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-netflix-red transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-netflix-red transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-netflix-red transition-colors">
                <span className="text-white">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-netflix-red transition-colors">
                <span className="text-white">📷</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-netflix-red transition-colors">
                <span className="text-white">📘</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 pt-8 border-t border-white/10">
          <p>© 2024 ONIMIX. All rights reserved. Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-netflix-black">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <TrendingSection />
      <CategoriesSection />
      <ContinueWatchingSection />
      <PopularSection />
      <Footer />
    </main>
  );
}
