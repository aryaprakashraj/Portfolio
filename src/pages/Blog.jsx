import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

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

            <Reveal>
                <p className="text-zinc-400 text-sm mb-4 tracking-widest uppercase font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal/70 shadow-[0_0_8px_#305CDE]" />
                    Writing
                </p>
                <h1 className="text-4xl font-bold font-serif text-zinc-900 mb-12 tracking-tight">Blog</h1>
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
                                <div 
                                    className="p-5 border border-zinc-100 hover:border-zinc-300 bg-zinc-50/20 hover:bg-zinc-50/60 rounded-xl transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <h2 className="font-semibold text-zinc-800 group-hover:text-royal transition-colors duration-300 text-lg">
                                            {article.title}
                                        </h2>
                                        <span className="text-xs text-zinc-500 font-mono shrink-0 pt-1">
                                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Blog