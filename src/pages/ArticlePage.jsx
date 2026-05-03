import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

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
      <Link to="/blog" className="text-gray-600 text-sm hover:text-white transition-colors font-mono mb-12 block">
        ← back
      </Link>

      {/* Header */}
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
        {article.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {article.tags.map(tag => (
              <span key={tag.id} className="text-xs px-2 py-1 bg-white/5 rounded font-mono text-gray-500">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>

    </main>
  )
}

export default ArticlePage