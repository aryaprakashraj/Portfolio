import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'

function Home() {
    const [articles, setArticles] = useState([])
    const [copied, setCopied] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)



    useEffect(() => {
        api.get('/api/articles')
            .then(res => setArticles(res.data.slice(0, 3)))
            .catch(() => { })
    }, [])

    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const el = document.getElementById(location.hash.slice(1))
                el?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }, [location])

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
            setIsHovered(true)
        }
        window.addEventListener('mousemove', handleGlobalMouseMove)
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
    }, [])

    const copyEmail = () => {
        navigator.clipboard.writeText('aryaprakashraj@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="max-w-3xl mx-auto px-8 relative">

            {/* Grid & Radial Glow Background */}
            <div className="fixed inset-0 bg-grid -z-20 pointer-events-none" />

            {/* Interactive Mouse-Following Glow */}
            <div
                className="fixed pointer-events-none -z-10 transition-transform duration-700 ease-out"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(48, 92, 222, 0.05) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    opacity: isHovered ? 1 : 0
                }}
            />

            {/* Fallback Static Top Glow (Centered behind hero) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[450px] bg-royal/10 blur-[130px] rounded-full pointer-events-none -z-10" />

            {/* Hero */}
            <section className="pt-32 pb-24 flex flex-col justify-center">
                <Reveal delay={0}>
                    <p className="text-zinc-500 text-sm mb-4 tracking-widest uppercase font-mono">
                        Hey, I'm
                    </p>
                </Reveal>
                <Reveal delay={100}>
                    <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-royal to-zinc-100 animate-text-shimmer bg-[length:200%_auto] mb-5 leading-[1.15]">
                        Arya Prakash Raj
                    </h1>
                </Reveal>
                <Reveal delay={200}>
                    <div className="flex flex-wrap gap-2.5 mb-6">
                        {["Backend Developer", "CS Student", "Builder"].map((role) => (
                            <span key={role} className="text-xs px-3.5 py-1.5 border border-zinc-850 bg-zinc-900/30 rounded-full font-mono text-zinc-300 flex items-center gap-1.5 hover:border-royal/40 hover:text-zinc-100 transition-all duration-300 select-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-royal animate-pulse" />
                                {role}
                            </span>
                        ))}
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-zinc-200 leading-relaxed max-w-xl mb-8">
                        I build backend systems with Java and Spring Boot.
                        Third year CS student at Dhaanish Ahmed Institute of Technology,
                        figuring things out in public and writing about it.
                    </p>
                </Reveal>
                <Reveal delay={400}>
                    <div className="flex gap-4">
                        <Link to="/blog"
                            className="px-5 py-2.5 bg-zinc-50 text-zinc-950 text-sm font-medium rounded-lg hover:bg-zinc-200 transition-all duration-300 shadow-md btn-shine flex items-center gap-1 group">
                            Read my blog
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </Link>
                        <a href="#about"
                            className="px-5 py-2.5 border border-zinc-800 text-sm rounded-lg hover:border-zinc-650 hover:text-zinc-200 transition-all duration-300">
                            About me
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* About */}
            <section id="about" className="py-24 border-t border-zinc-900">
                <Reveal delay={0}>
                    <p className="text-zinc-400 text-sm mb-4 tracking-widest uppercase font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                        About
                    </p>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="text-3xl font-bold font-display tracking-tight text-zinc-50 mb-6">Who I am ?</h2>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-zinc-200 leading-relaxed mb-4">
                        I'm a third-year Computer Science student focused on backend development.
                        I learn by building real things — this site is one of them, built from
                        scratch with Spring Boot and React.
                    </p>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-zinc-200 leading-relaxed">
                        I enjoy understanding how systems work under the hood — from REST APIs
                        and databases to OS internals and algorithms. 250+ LeetCode problems in Java,
                        actively preparing for placements.
                    </p>
                </Reveal>
            </section>

            {/* Skills */}
            <Reveal delay={100}>
                <section className="py-24 border-t border-zinc-900">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <p className="text-zinc-400 text-sm tracking-widest uppercase font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                            skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { 
                                category: "Languages", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="16 18 22 12 16 6" />
                                        <polyline points="8 6 2 12 8 18" />
                                    </svg>
                                ),
                                items: ["Java", "Python", "SQL"] 
                            },
                            { 
                                category: "Backend", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                        <line x1="6" y1="6" x2="6.01" y2="6" />
                                        <line x1="6" y1="18" x2="6.01" y2="18" />
                                        <line x1="10" y1="6" x2="10.01" y2="6" />
                                        <line x1="10" y1="18" x2="10.01" y2="18" />
                                    </svg>
                                ),
                                items: ["Spring Boot", "Spring Security", "REST APIs"] 
                            },
                            { 
                                category: "Database", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                                    </svg>
                                ),
                                items: ["PostgreSQL", "Spring Data JPA"] 
                            },
                            { 
                                category: "Tools", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="4 17 10 11 4 5" />
                                        <line x1="12" y1="19" x2="20" y2="19" />
                                    </svg>
                                ),
                                items: ["Git", "Linux", "IntelliJ", "Postman"] 
                            },
                            { 
                                category: "CS Fundamentals", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                        <rect x="9" y="9" width="6" height="6" />
                                        <line x1="9" y1="1" x2="9" y2="4" />
                                        <line x1="15" y1="1" x2="15" y2="4" />
                                        <line x1="9" y1="20" x2="9" y2="23" />
                                        <line x1="15" y1="20" x2="15" y2="23" />
                                        <line x1="20" y1="9" x2="23" y2="9" />
                                        <line x1="20" y1="15" x2="23" y2="15" />
                                        <line x1="1" y1="9" x2="4" y2="9" />
                                        <line x1="1" y1="15" x2="4" y2="15" />
                                    </svg>
                                ),
                                items: ["DSA", "OOP", "OS concepts"] 
                            },
                            { 
                                category: "Currently Learning", 
                                icon: (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12 2.5 5.5 5.5 0 0 0 6.5 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                        <path d="M9 18h6" />
                                        <path d="M10 22h4" />
                                    </svg>
                                ),
                                items: ["React", "System Design"] 
                            },
                        ].map((skill) => (
                            <SpotlightCard 
                                key={skill.category}
                                className="p-5 flex flex-col justify-between"
                                containerClassName="transition-all duration-300 hover:shadow-[0_0_20px_rgba(48,92,222,0.06)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-block text-[10px] px-2.5 py-0.5 bg-zinc-900/60 border border-zinc-850 rounded font-mono text-zinc-300 tracking-wider uppercase group-hover:border-royal/30 group-hover:text-royal transition-all duration-300 select-none">
                                            {skill.category}
                                        </span>
                                        <div className="p-1.5 rounded-lg bg-zinc-900/40 border border-zinc-850 group-hover:border-royal/20 group-hover:bg-royal/5 transition-all duration-300 text-zinc-400 group-hover:text-royal shadow-inner">
                                            {skill.icon}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skill.items.map((item) => (
                                            <span 
                                                key={item} 
                                                className="text-xs px-2.5 py-1 bg-zinc-900/20 hover:bg-zinc-900/70 border border-zinc-850 hover:border-royal/30 text-zinc-300 hover:text-zinc-100 rounded-md transition-all duration-300 select-none font-mono hover:scale-[1.02] hover:-translate-y-0.5"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Projects */}
            <Reveal delay={100}>
                <section id="projects" className="py-24 border-t border-zinc-900">
                    <p className="text-zinc-400 text-sm mb-8 tracking-widest uppercase font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                        projects
                    </p>
                    <div className="flex flex-col gap-4">
                        {[
                            {
                                name: "Personal Blog",
                                desc: "Full-stack personal site with Spring Boot REST API, JWT auth, PostgreSQL, and React frontend.",
                                tags: ["Spring Boot", "React", "PostgreSQL", "JWT"],
                                link: "https://github.com/aryaprakashraj/Blog"
                            },
                            {
                                name: "Next Leap",
                                desc: "Career path recommendation system with Spring Boot backend.",
                                tags: ["Spring Boot", "Java"],
                                link: "https://github.com/aryaprakashraj/NextLeap"
                            },
                            {
                                name: "Topper Friend",
                                desc: "Personalized learning with Adaptive and active tuning AI chatbot.",
                                tags: ["Python"],
                                link: "#"
                            },
                        ].map((project) => (
                            <a key={project.name} href={project.link} target="_blank" rel="noreferrer" className="block group">
                                <SpotlightCard
                                    className="p-6"
                                    containerClassName="transition-all duration-300 hover:shadow-[0_0_25px_rgba(48,92,222,0.08)]"
                                >
                                    <h3 className="font-semibold text-zinc-50 text-lg mb-2 group-hover:text-royal transition-colors duration-300 flex items-center justify-between">
                                        {project.name}
                                        <span className="text-zinc-400 group-hover:text-royal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm font-mono">↗</span>
                                    </h3>
                                    <p className="text-zinc-200 group-hover:text-zinc-50 transition-colors duration-300 text-sm mb-4 leading-relaxed">{project.desc}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2.5 py-1 bg-zinc-900/80 border border-zinc-800/80 group-hover:border-royal/30 group-hover:text-zinc-100 rounded-md font-mono text-zinc-300 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            </a>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Recent Writing */}
            <Reveal delay={100}>
                <section className="py-24 border-t border-zinc-900">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-zinc-400 text-sm tracking-widest uppercase font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                            recent writing
                        </p>
                        <Link to="/blog" className="text-xs text-zinc-500 hover:text-royal transition-colors font-mono">
                            all posts →
                        </Link>
                    </div>
                    {articles.length === 0 ? (
                        <p className="text-zinc-600 font-mono text-sm">no posts yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {articles.map(article => (
                                <Link key={article.id} to={`/blog/${article.id}`}
                                    className="group flex justify-between items-center py-4 px-4 rounded-xl border border-zinc-900/30 bg-zinc-950/20 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300">
                                    <span className="text-zinc-100 group-hover:text-royal transition-colors text-sm font-medium">
                                        {article.title}
                                    </span>
                                    <span className="text-xs text-zinc-400 font-mono ml-4 shrink-0">
                                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric'
                                        })}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </Reveal>

            {/* Contact */}
            <Reveal delay={100}>
                <section id="contact" className="py-24 border-t border-zinc-900">
                    <p className="text-zinc-400 text-sm mb-6 tracking-widest uppercase font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                        contact
                    </p>
                    <SpotlightCard
                        className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                        containerClassName="hover:shadow-[0_0_30px_rgba(48,92,222,0.1)]"
                    >
                        <div>
                            <h2 className="text-3xl font-bold font-display tracking-tight text-zinc-50 mb-2">Let's talk</h2>
                            <p className="text-zinc-200 text-sm leading-relaxed max-w-sm mb-4">
                                Open to internships, collaborations, or just a good conversation about tech.
                            </p>
                            <div className="flex items-center gap-3">
                                <a href="https://github.com/aryaprakashraj" target="_blank" rel="noreferrer"
                                    aria-label="GitHub Profile"
                                    className="p-2.5 rounded-xl border border-zinc-850 bg-zinc-950/40 text-zinc-200 hover:text-zinc-100 hover:border-royal/50 hover:shadow-[0_0_10px_rgba(48,92,222,0.15)] hover:scale-105 transition-all duration-300">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/aryaprakashraj" target="_blank" rel="noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="p-2.5 rounded-xl border border-zinc-850 bg-zinc-950/40 text-zinc-400 hover:text-zinc-100 hover:border-royal/50 hover:shadow-[0_0_10px_rgba(48,92,222,0.15)] hover:scale-105 transition-all duration-300">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <button
                                onClick={copyEmail}
                                className="px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:text-zinc-100 text-sm font-mono text-zinc-300 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group min-w-[140px]"
                            >
                                {copied ? (
                                    <>
                                        <span className="text-emerald-400">✓</span>
                                        <span className="text-emerald-400 font-medium">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="group-hover:scale-105 transition-transform">📄</span>
                                        <span>Copy Email</span>
                                    </>
                                )}
                            </button>
                            <a
                                href="mailto:aryaprakashraj@gmail.com"
                                className="px-5 py-3 rounded-xl bg-zinc-50 text-zinc-950 hover:bg-zinc-200 text-sm font-medium transition-all duration-300 text-center flex items-center justify-center gap-1.5 btn-shine shadow-md"
                            >
                                Email me <span className="font-mono">→</span>
                            </a>
                        </div>
                    </SpotlightCard>
                </section>
            </Reveal>

            {/* Footer */}
            <Reveal delay={200}>
                <footer className="py-8 border-t border-zinc-900 text-center">
                    <p className="text-zinc-600 text-xs font-mono">
                        built with Spring Boot + React · Aryaprakashraj · 2026
                    </p>
                </footer>
            </Reveal>

        </main>
    )
}

export default Home