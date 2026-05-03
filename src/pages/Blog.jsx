import {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

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
            <p className="text-gray-500 text-sm mb-4 tracking-widest uppercase font-mono">Writing</p>
            <h1 className="text-4xl font-bold mb-12">Blog</h1>

            {loading ?(
                <p className="text-gray-600 font-mono text-sm">loading...</p>
            ): articles.length === 0 ? (
                <p className="text-gray-600 font-mono text-sm">no articles yet.</p>
            ):(
                <div className="flex flex-col gap-6">
                    {articles.map(article => (
                        <Link key={article.id} to={`/blog/${article.id}`}
                        className="group border border-white/10 rounded-lg p-5 hover:border-white/30 transition-colors">
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
                            <div className="flex gap-2 flex-wrap mt-3">
                                {article.tags?.map(tag => (
                                    <span key={tag.id} className="text-xs px-2 py-1 bg-white/5 rounded font-mono text-gray-500">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Blog