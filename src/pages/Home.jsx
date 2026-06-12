import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

function Home() {
    const [articles, setArticles] = useState([])
    const [copied, setCopied] = useState(false)

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

    const copyEmail = () => {
        navigator.clipboard.writeText('aryaprakashraj@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <main className="max-w-3xl mx-auto px-8 relative">

            {/* Hero */}
            <section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center py-10 sm:py-16 md:py-24">
                <Reveal delay={0}>
                    <p className="text-zinc-400 text-sm mb-4 tracking-widest uppercase font-mono">
                        Hey, I'm
                    </p>
                </Reveal>
                <Reveal delay={100}>
                    <h1 className="text-5xl sm:text-6xl font-bold font-serif tracking-tight text-zinc-900 mb-5 leading-[1.15]">
                        Arya Prakash Raj
                    </h1>
                </Reveal>
                <Reveal delay={200}>
                    <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 mb-8">
                        {["Backend Developer", "CS Student", "Builder"].map((role, idx, arr) => (
                            <span key={role} className="text-sm font-mono text-zinc-500 flex items-center select-none">
                                {role}
                                {idx < arr.length - 1 && (
                                    <span className="text-royal font-bold ml-3 select-none">·</span>
                                )}
                            </span>
                        ))}
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-zinc-600 text-lg sm:text-[21px] font-normal leading-relaxed tracking-tight max-w-2xl mx-auto mb-8">
                        Backend developer in the making.
                        I like systems that are honest about what they do and I try to build that way too.
                        Java, Spring Boot, Linux, and a blog where I think out loud.
                    </p>
                </Reveal>
                <Reveal delay={400}>
                    <div className="flex justify-center gap-4">
                        <Link to="/blog"
                            className="px-5 py-2.5 bg-zinc-950 text-zinc-50 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-all duration-300 shadow-sm flex items-center gap-1 group">
                            Read my blog
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </Link>
                        <a href="#about"
                            className="px-5 py-2.5 border border-zinc-200 text-zinc-600 text-sm rounded-lg hover:border-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-300">
                            About me
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* About */}
            <section id="about" className="py-24 border-t border-zinc-100">
                <Reveal delay={100}>
                    <h2 className="text-3xl font-bold font-serif tracking-tight text-zinc-900 mb-6">Who I am ?</h2>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-zinc-600 text-[16px] sm:text-[18px] font-normal leading-relaxed tracking-tight mb-4">
                        Still figuring things out, just doing it in public. I'm a Final Year CS student who got hooked on how systems actually work under the hood.
                        Not just "it works," but why it works. I write about the things I can't stop thinking about.
                        This site is one of those things I built to figure out.
                    </p>
                </Reveal>

            </section>

            {/* Skills */}
            <Reveal delay={100}>
                <section className="py-24 border-t border-zinc-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <p className="text-zinc-600 text-sm tracking-widest uppercase font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal/70 shadow-[0_0_8px_#305CDE]" />
                            skills
                        </p>
                    </div>

                    <div className="flex flex-col border-t border-zinc-100">
                        {[
                            {
                                category: "Languages",
                                items: ["Java", "Python", "SQL"]
                            },
                            {
                                category: "Backend",
                                items: ["Spring Boot", "Spring Security", "REST APIs"]
                            },
                            {
                                category: "Database",
                                items: ["PostgreSQL", "Spring Data JPA"]
                            },
                            {
                                category: "Tools",
                                items: ["Git", "Linux", "IntelliJ", "Postman"]
                            },
                            {
                                category: "CS Fundamentals",
                                items: ["DSA", "OOP", "OS concepts"]
                            },
                            {
                                category: "Currently Learning",
                                items: ["React", "System Design"]
                            },
                        ].map((skill) => (
                            <div
                                key={skill.category}
                                className="flex flex-col sm:flex-row sm:items-baseline py-5 border-b border-zinc-100 gap-2 sm:gap-6"
                            >
                                <span className="w-full sm:w-44 text-xs font-mono text-zinc-500 uppercase tracking-wider shrink-0 select-none">
                                    {skill.category}
                                </span>
                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                    {skill.items.map((item, idx) => (
                                        <span key={item} className="text-[15px] text-zinc-800 font-medium flex items-center">
                                            {item}
                                            {idx < skill.items.length - 1 && (
                                                <span className="text-zinc-300 font-normal ml-2.5 select-none">·</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Projects */}
            <Reveal delay={100}>
                <section id="projects" className="py-24 border-t border-zinc-100">
                    <p className="text-zinc-600 text-sm mb-8 tracking-widest uppercase font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal/70 shadow-[0_0_8px_#305CDE]" />
                        projects
                    </p>
                    <div className="flex flex-col gap-4">
                        {[
                            {
                                name: "Personal Blog",
                                desc: "Full-stack portfolio site with Spring Boot REST API, JWT auth, PostgreSQL, and React frontend.",
                                tags: ["Spring Boot", "PostgreSQL", "JWT", "Docker"],
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
                                <div className="p-6 border border-zinc-100 hover:border-zinc-300/80 bg-zinc-50/20 hover:bg-zinc-50/60 rounded-xl transition-all duration-300">
                                    <h3 className="font-semibold text-zinc-900 text-lg mb-2 group-hover:text-royal transition-colors duration-300 flex items-center justify-between">
                                        {project.name}
                                        <span className="text-zinc-450 group-hover:text-royal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-sm font-mono">↗</span>
                                    </h3>
                                    <p className="text-zinc-600 text-[15px] mb-4 leading-relaxed">{project.desc}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2.5 py-1 bg-white border border-zinc-200 group-hover:border-zinc-350 rounded-md font-mono text-zinc-600 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Recent Writing */}
            <Reveal delay={100}>
                <section id="blog" className="py-24 border-t border-zinc-100">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-zinc-600 text-sm tracking-widest uppercase font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal/70 shadow-[0_0_8px_#305CDE]" />
                            recent writing
                        </p>
                        <Link to="/blog" className="text-xs text-zinc-500 hover:text-royal transition-colors font-mono">
                            all posts →
                        </Link>
                    </div>
                    {articles.length === 0 ? (
                        <p className="text-zinc-400 font-mono text-sm">no posts yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {articles.map(article => (
                                <Link key={article.id} to={`/blog/${article.id}`}
                                    className="group flex justify-between items-center py-4 px-4 rounded-xl border border-zinc-100 bg-zinc-50/20 hover:border-zinc-200 hover:bg-zinc-50 transition-all duration-300">
                                    <span className="text-zinc-800 group-hover:text-royal transition-colors text-sm font-medium">
                                        {article.title}
                                    </span>
                                    <span className="text-xs text-zinc-500 font-mono ml-4 shrink-0">
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
                <section id="contact" className="py-24 border-t border-zinc-100">
                    <p className="text-zinc-600 text-sm mb-6 tracking-widest uppercase font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal/70 shadow-[0_0_8px_#305CDE]" />
                        contact
                    </p>
                    <div className="p-8 border border-zinc-100 bg-zinc-50/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold font-serif tracking-tight text-zinc-900 mb-2">Let's talk</h2>
                            <p className="text-zinc-600 text-[15px] leading-relaxed max-w-sm mb-4">
                                Open to internships, collaborations, or just a good conversation about tech.
                            </p>
                            <div className="flex items-center gap-3">
                                <a href="https://github.com/aryaprakashraj" target="_blank" rel="noreferrer"
                                    aria-label="GitHub Profile"
                                    className="p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-650 hover:text-royal hover:border-royal/30 hover:scale-105 transition-all duration-300">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/aryaprakashraj" target="_blank" rel="noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="p-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-650 hover:text-royal hover:border-royal/30 hover:scale-105 transition-all duration-300">
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
                                className="px-5 py-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-350 hover:text-zinc-950 text-sm font-mono text-zinc-600 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group min-w-[140px]"
                            >
                                {copied ? (
                                    <>
                                        <span className="text-emerald-500">✓</span>
                                        <span className="text-emerald-500 font-medium">Copied!</span>
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
                                className="px-5 py-3 rounded-xl bg-zinc-950 text-zinc-50 hover:bg-zinc-800 text-sm font-medium transition-all duration-300 text-center flex items-center justify-center gap-1.5 shadow-sm"
                            >
                                Email me <span className="font-mono">→</span>
                            </a>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* Footer */}
            <Reveal delay={200}>
                <footer className="py-8 border-t border-zinc-100 text-center">
                    <p className="text-zinc-400 text-xs font-mono">
                        built with Spring Boot + React · Aryaprakashraj · 2026
                    </p>
                </footer>
            </Reveal>

        </main>
    )
}

export default Home