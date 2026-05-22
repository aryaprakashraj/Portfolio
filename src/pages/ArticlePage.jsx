import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

function ArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/articles/${id}`)
      .then(res => {
        setArticle(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto relative">
      <div className="fixed inset-0 bg-grid -z-20 pointer-events-none" />
      <p className="text-zinc-500 font-mono text-sm animate-pulse">loading...</p>
    </main>
  )

  if (!article) return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto relative">
      <div className="fixed inset-0 bg-grid -z-20 pointer-events-none" />
      <p className="text-zinc-400 font-mono text-sm mb-6">article not found.</p>
      <Link to="/blog" className="text-zinc-400 hover:text-zinc-100 transition-colors font-mono flex items-center gap-1 group w-fit">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span> back to blog
      </Link>
    </main>
  )

  return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto pb-24 relative">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid -z-20 pointer-events-none" />
      {/* Top radial gradient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-royal/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Back link */}
      <Reveal>
        <Link to="/blog" className="text-zinc-400 hover:text-zinc-100 transition-colors font-mono mb-12 flex items-center gap-1 group w-fit">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span> back
        </Link>
      </Reveal>

      {/* Header */}
      <Reveal delay={100}>
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-display text-zinc-50 mb-4 leading-tight tracking-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>{article.viewCount} views</span>
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <Reveal delay={200}>
        <article className="text-zinc-200 leading-relaxed whitespace-pre-wrap text-[15px]">
          {article.content}
        </article>
      </Reveal>

    </main>
  )
}

export default ArticlePage