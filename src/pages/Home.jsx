import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

function Home() {
    const [articles, setArticles] = useState([])

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

    return (
        <main className="max-w-3xl mx-auto px-8">

            {/* Hero */}
            <section className="pt-32 pb-24 flex flex-col justify-center">
                <Reveal delay={0}>
                    <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">
                        Hey, I'm
                    </p>
                </Reveal>
                <Reveal delay={100}>
                    <h1 className="text-6xl font-bold mb-4 leading-tight">
                        Arya Prakash Raj
                    </h1>
                </Reveal>
                <Reveal delay={200}>
                    <h2 className="text-xl text-gray-400 mb-6">
                        Backend Developer · CS Student · Builder
                    </h2>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-gray-400 leading-relaxed max-w-xl mb-8">
                        I build backend systems with Java and Spring Boot.
                        Third year CS student at Dhaanish Ahmed Institute of Technology,
                        figuring things out in public and writing about it.
                    </p>
                </Reveal>
                <Reveal delay={400}>
                    <div className="flex gap-4 mb-12">
                        <Link to="/blog"
                            className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Read my blog
                        </Link>
                        <a href="#about"
                            className="px-5 py-2.5 border border-white/20 text-sm rounded-lg hover:border-white/50 transition-colors">
                            About me
                        </a>
                    </div>
                </Reveal>
                <Reveal delay={500}>
                    <div className="flex gap-6">
                        <a href="https://github.com/aryaprakashraj" target="_blank" rel="noreferrer"
                            className="text-gray-600 hover:text-white transition-colors text-sm font-mono">
                            github →
                        </a>
                        <a href="https://linkedin.com/in/aryaprakashraj" target="_blank" rel="noreferrer"
                            className="text-gray-600 hover:text-white transition-colors text-sm font-mono">
                            linkedin →
                        </a>
                        <a href="mailto:aryaprakashraj@gmail.com"
                            className="text-gray-600 hover:text-white transition-colors text-sm font-mono">
                            email →
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* About */}
            <section id="about" className="py-24 border-t border-white/10">
                <Reveal delay={0}>
                    <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">About</p>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="text-3xl font-bold mb-6">Who I am</h2>
                </Reveal>
                <Reveal delay={200}>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        I'm a third-year Computer Science student focused on backend development.
                        I learn by building real things — this site is one of them, built from
                        scratch with Spring Boot and React.
                    </p>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-gray-300 leading-relaxed">
                        I enjoy understanding how systems work under the hood — from REST APIs
                        and databases to OS internals and algorithms. 250+ LeetCode problems in Java,
                        actively preparing for placements.
                    </p>
                </Reveal>
            </section>

            {/* Skills */}
            <Reveal delay={100}>
                <section className="py-24 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase font-mono">skills</p>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { category: "Languages", items: "Java, Python, SQL" },
                            { category: "Backend", items: "Spring Boot, Spring Security, REST APIs" },
                            { category: "Database", items: "PostgreSQL, Spring Data JPA" },
                            { category: "Tools", items: "Git, Linux, IntelliJ, Postman" },
                            { category: "CS Fundamentals", items: "DSA, OOP, OS concepts" },
                            { category: "Currently Learning", items: "React, System Design" },
                        ].map((skill) => (
                            <div key={skill.category} className="border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                                <p className="text-xs text-gray-500 font-mono mb-1">{skill.category}</p>
                                <p className="text-sm text-gray-300">{skill.items}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Projects */}
            <Reveal delay={100}>
                <section id="projects" className="py-24 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase font-mono">projects</p>
                    <div className="flex flex-col gap-4">
                        {[
                            {
                                name: "Personal Blog & Portfolio",
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
                            <a key={project.name} href={project.link} target="_blank" rel="noreferrer"
                                className="border border-white/10 rounded-lg p-5 hover:border-white/30 transition-colors group">
                                <h3 className="font-medium mb-1 group-hover:text-white transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-3">{project.desc}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded font-mono text-gray-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* Recent Writing */}
            <Reveal delay={100}>
                <section className="py-24 border-t border-white/10">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-gray-500 text-sm tracking-widest uppercase font-mono">recent writing</p>
                        <Link to="/blog" className="text-xs text-gray-600 hover:text-white transition-colors font-mono">
                            all posts →
                        </Link>
                    </div>
                    {articles.length === 0 ? (
                        <p className="text-gray-700 font-mono text-sm">no posts yet.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {articles.map(article => (
                                <Link key={article.id} to={`/blog/${article.id}`}
                                    className="group flex justify-between items-center py-3 border-b border-white/5 hover:border-white/20 transition-colors">
                                    <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                                        {article.title}
                                    </span>
                                    <span className="text-xs text-gray-600 font-mono ml-4 shrink-0">
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
                <section id="contact" className="py-24 border-t border-white/10">
                    <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">contact</p>
                    <h2 className="text-3xl font-bold mb-4">Let's talk</h2>
                    <p className="text-gray-400 mb-6">
                        Open to internships, collaborations, or just a good conversation about tech.
                    </p>
                    <a href="mailto:aryaprakashraj@gmail.com"
                        className="text-white hover:text-gray-300 transition-colors font-mono">
                        aryaprakashraj@gmail.com →
                    </a>
                </section>
            </Reveal>

            {/* Footer */}
            <Reveal delay={200}>
                <footer className="py-8 border-t border-white/10 text-center">
                    <p className="text-gray-700 text-xs font-mono">
                        built with Spring Boot + React · arya prakash · 2026
                    </p>
                </footer>
            </Reveal>

        </main>
    )
}

export default Home