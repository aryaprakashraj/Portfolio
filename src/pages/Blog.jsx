import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

function Blog(){
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
        <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto">
            <Reveal>
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">Writing</p>
            <h1 className="text-4xl font-bold mb-12">Blog</h1>
            </Reveal>

            {loading ?(
                <p className="text-gray-600 font-mono text-sm">loading...</p>
            ): articles.length === 0 ? (
                <p className="text-gray-600 font-mono text-sm">no articles yet.</p>
            ):(
                <div className="flex flex-col gap-6">
                    {articles.map((article, index) => (
                        <Reveal key={article.id} delay={index * 100}>
                        <Link to={`/blog/${article.id}`}
                        className="group border border-white/10 rounded-lg p-5 hover:border-white/30 transition-colors block">
                            <div className="flex justify-between ites-start mb-2">
                                <h2 className="font-medium group-hover: text-white transition-colors">
                                    {article.title}
                                </h2>
                                <span className="text-xs text-gray-600 font-mono ml-4 shrink-0">
                                    {new Date(article.createdAt).toLocaleDateString('en-us', {
                                        month: 'short' ,day : 'numeric' , year: 'numeric'
                                    })}
                                </span>
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