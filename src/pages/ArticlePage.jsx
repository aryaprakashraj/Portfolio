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
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto">
      <p className="text-gray-600 font-mono text-sm">loading...</p>
    </main>
  )

  if (!article) return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto">
      <p className="text-gray-600 font-mono text-sm">article not found.</p>
      <Link to="/blog" className="text-gray-500 text-sm hover:text-white transition-colors font-mono">
        ← back to blog
      </Link>
    </main>
  )

  return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto pb-24">

      {/* Back link */}
      <Reveal>
      <Link to="/blog" className="text-gray-600 text-sm hover:text-white transition-colors font-mono mb-12 block">
        ← back
      </Link>
      </Reveal>

      {/* Header */}
      <Reveal delay={100}>
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-mono">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            })}
          </span>
          <span className="font-mono">{article.viewCount} views</span>
        </div>
      </div>
      </Reveal>

      {/* Content */}
      <Reveal delay={200}>
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
      </Reveal>

    </main>
  )
}

export default ArticlePage