"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
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

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0b0f14 0%, #0d1117 50%, #0b0f14 100%)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #ff3366 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse-glow 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Engineering{" "}
          <span className="text-gradient">Intelligent Systems</span>
          <br />
          For The Future
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-[#64748b] mb-10 tracking-widest uppercase"
        >
          AI • Automation • Cyber Infrastructure • Digital Evolution
        </p>

        <div ref={ctaRef}>
          <button className="btn-primary text-lg">
            Explore Our Solutions
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#00d4ff] flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative bg-[#0d1117]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div ref={leftRef} className="relative">
            <div className="glass-card aspect-square rounded-2xl p-8 flex items-center justify-center">
              {/* Abstract tech visual */}
              <div className="relative w-full h-full">
                {/* Central core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full glow-blue" />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                  }}
                />

                {/* Orbiting rings */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00d4ff]/30"
                    style={{
                      width: `${60 + i * 50}px`,
                      height: `${60 + i * 50}px`,
                      animation: `spin ${4 + i * 2}s linear infinite`,
                    }}
                  />
                ))}

                {/* Code simulation */}
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#64748b]">
                  <div className="flex gap-2 mb-1">
                    <span className="text-[#00d4ff]">const</span>
                    <span>ai =</span>
                    <span className="text-[#8b5cf6]">new</span>
                    <span>NeuralCore()</span>
                  </div>
                  <div className="flex gap-2">
                    <span>ai.initialize(</span>
                    <span className="text-[#ff3366]">&apos;quantum&apos;</span>
                    <span>)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={rightRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Building The{" "}
              <span className="text-gradient">Intelligent Future</span>
            </h2>

            <div className="space-y-6 text-lg text-[#94a3b8]">
              <p>
                At ONIMIX TECH, we don&apos;t just build software — we engineer
                digital ecosystems that think, adapt, and evolve. Our mission
                is to create AI-powered tools and cyber infrastructure that
                redefine what&apos;s possible.
              </p>
              <p>
                From autonomous systems to secure cloud architectures, we
                combine cutting-edge research with practical implementation to
                deliver solutions that transform industries.
              </p>
              <p>
                We believe in technology that amplifies human potential,
                creating a bridge between today&apos;s challenges and
                tomorrow&apos;s opportunities.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { number: "150+", label: "Projects Delivered" },
                { number: "99.9%", label: "Uptime Guaranteed" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 glass rounded-xl"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#64748b] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

// Services Section
const services = [
  {
    title: "Artificial Intelligence Systems",
    description:
      "Custom AI models, machine learning pipelines, and intelligent automation that transform data into actionable insights.",
    icon: "🧠",
  },
  {
    title: "Automation Engineering",
    description:
      "End-to-end workflow automation that eliminates repetitive tasks and accelerates business processes.",
    icon: "⚡",
  },
  {
    title: "Cybersecurity Architecture",
    description:
      "Zero-trust security frameworks, threat detection systems, and compliance-ready infrastructure.",
    icon: "🔒",
  },
  {
    title: "Web & Platform Development",
    description:
      "Scalable web applications, progressive web apps, and enterprise platforms built for performance.",
    icon: "💻",
  },
  {
    title: "Data Intelligence",
    description:
      "Advanced analytics, data warehousing, and visualization dashboards that drive strategic decisions.",
    icon: "📊",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Multi-cloud architecture, DevOps pipelines, and infrastructure-as-code for resilient systems.",
    icon: "☁️",
  },
];

function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Comprehensive technology solutions designed to elevate your
            business capabilities
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card glass-card rounded-2xl p-8 cursor-pointer group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-[#00d4ff] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Game Section
function GameSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game constants
    const GAME_WIDTH = 600;
    const GAME_HEIGHT = 400;
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // Core (player)
    const core = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      radius: 25,
      color: "#00d4ff",
    };

    // Enemies
    let enemies: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    let score_ = 0;
    let animationId: number;
    let lastEnemySpawn = 0;

    // Mouse tracking
    let mouseX = core.x;
    let mouseY = core.y;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * GAME_WIDTH;
      mouseY = ((e.clientY - rect.top) / rect.height) * GAME_HEIGHT;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const spawnEnemy = () => {
      const side = Math.floor(Math.random() * 4);
      let x: number, y: number;

      switch (side) {
        case 0: // top
          x = Math.random() * GAME_WIDTH;
          y = -20;
          break;
        case 1: // right
          x = GAME_WIDTH + 20;
          y = Math.random() * GAME_HEIGHT;
          break;
        case 2: // bottom
          x = Math.random() * GAME_WIDTH;
          y = GAME_HEIGHT + 20;
          break;
        default: // left
          x = -20;
          y = Math.random() * GAME_HEIGHT;
      }

      const angle = Math.atan2(core.y - y, core.x - x);
      const speed = 2 + Math.random() * 2;

      enemies.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 8 + Math.random() * 8,
      });
    };

    const draw = (timestamp: number) => {
      // Clear canvas
      ctx.fillStyle = "rgba(11, 15, 20, 0.9)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw grid
      ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let x = 0; x < GAME_WIDTH; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < GAME_HEIGHT; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH, y);
        ctx.stroke();
      }

      // Update core position (follow mouse with easing)
      core.x += (mouseX - core.x) * 0.15;
      core.y += (mouseY - core.y) * 0.15;

      // Draw core glow
      const gradient = ctx.createRadialGradient(
        core.x,
        core.y,
        0,
        core.x,
        core.y,
        core.radius * 2
      );
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.5)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(core.x, core.y, core.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw core
      ctx.fillStyle = core.color;
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Spawn enemies
      if (timestamp - lastEnemySpawn > 800) {
        spawnEnemy();
        lastEnemySpawn = timestamp;
      }

      // Update and draw enemies
      enemies.forEach((enemy, i) => {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        // Draw enemy
        ctx.fillStyle = "#ff3366";
        ctx.shadowColor = "#ff3366";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Check collision with core
        const dx = enemy.x - core.x;
        const dy = enemy.y - core.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < core.radius + enemy.radius) {
          setScore(score_);
          if (score_ > highScore) {
            setHighScore(score_);
          }
          setGameState("gameover");
          return;
        }

        // Remove enemies that are too far
        if (
          enemy.x < -50 ||
          enemy.x > GAME_WIDTH + 50 ||
          enemy.y < -50 ||
          enemy.y > GAME_HEIGHT + 50
        ) {
          enemies.splice(i, 1);
          score_ += 10;
          setScore(score_);
        }
      });

      // Draw score
      ctx.fillStyle = "#00d4ff";
      ctx.font = "bold 20px var(--font-syne)";
      ctx.fillText(`Score: ${score_}`, 20, 30);

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gameState, highScore]);

  const startGame = () => {
    setScore(0);
    setGameState("playing");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".game-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="game-content text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-red">DEFEND THE CORE</span>
          </h2>
          <p className="text-[#64748b] text-lg">
            Protect the AI core from incoming cyber threats
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {gameState === "start" && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">Ready to Defend?</h3>
              <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
                Move your mouse to control the core. Defend against incoming
                threats and see how long you can survive!
              </p>
              <button
                onClick={startGame}
                className="btn-primary glow-blue"
              >
                Start Game
              </button>
            </div>
          )}

          {gameState === "playing" && (
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="game-canvas w-full cursor-none"
                style={{ maxWidth: "600px", margin: "0 auto", display: "block" }}
              />
            </div>
          )}

          {gameState === "gameover" && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">💀</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-red">
                Core Breached!
              </h3>
              <p className="text-3xl font-bold mb-2">Score: {score}</p>
              <p className="text-[#64748b] mb-8">High Score: {highScore}</p>
              <button
                onClick={startGame}
                className="btn-primary glow-red"
              >
                Try Again
              </button>
              <p className="mt-8 text-[#64748b] text-sm">
                Want to build systems like this? Work with ONIMIX TECH.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative bg-[#0b0f14] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="cta-content">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to{" "}
            <span className="text-gradient">Transform</span> Your Vision?
          </h2>
          <p className="text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto">
            Let&apos;s build something extraordinary together. Our team of
            experts is ready to bring your most ambitious projects to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary glow-blue text-lg">
              Start Your Project
            </button>
            <button className="px-8 py-4 rounded-lg border border-[#8b5cf6] text-white font-semibold hover:bg-[#8b5cf6]/10 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-[#1e293b] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              ONIMIX <span className="text-gradient">TECH</span>
            </h3>
            <p className="text-[#64748b] max-w-md">
              Engineering intelligent systems for the future. We bridge the
              gap between cutting-edge AI and practical, scalable solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#64748b]">
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-[#64748b]">
              <li>hello@onimix.tech</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e293b] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748b] text-sm">
            © 2024 ONIMIX TECH. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#64748b] hover:text-[#00d4ff] transition-colors">Privacy</a>
            <a href="#" className="text-[#64748b] hover:text-[#00d4ff] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="relative">
      <ParticleBackground />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GameSection />
      <CTASection />
      <Footer />
    </main>
  );
}
