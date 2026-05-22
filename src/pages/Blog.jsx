import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'
import SpotlightCard from '../components/SpotlightCard'

function Blog() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/articles')
            .then(res => {
                setArticles(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto relative pb-24">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid -z-20 pointer-events-none" />
            {/* Top radial gradient light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-royal/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <Reveal>
                <p className="text-zinc-400 text-sm mb-4 tracking-widest uppercase font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal shadow-[0_0_8px_#305CDE] animate-pulse" />
                    Writing
                </p>
                <h1 className="text-4xl font-bold font-display text-zinc-50 mb-12 tracking-tight">Blog</h1>
            </Reveal>

            {loading ? (
                <p className="text-zinc-400 font-mono text-sm animate-pulse">loading...</p>
            ) : articles.length === 0 ? (
                <p className="text-zinc-400 font-mono text-sm">no articles yet.</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {articles.map((article, index) => (
                        <Reveal key={article.id} delay={index * 80}>
                            <Link to={`/blog/${article.id}`} className="block group">
                                <SpotlightCard 
                                    className="p-5"
                                    containerClassName="transition-all duration-300 hover:shadow-[0_0_20px_rgba(48,92,222,0.06)]"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <h2 className="font-semibold text-zinc-100 group-hover:text-royal transition-colors duration-300 text-lg">
                                            {article.title}
                                        </h2>
                                        <span className="text-xs text-zinc-400 font-mono shrink-0 pt-1">
                                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Blog