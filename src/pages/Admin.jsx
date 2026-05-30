import { useState, useEffect } from 'react'
import api from '../api/axios'

function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [articles, setArticles] = useState([])
  const [view, setView] = useState('list') // 'list' | 'create' | 'edit'
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ title: '', content: '', status: 'DRAFT' })
  const [error, setError] = useState('')

  function fetchArticles() {
    api.get('/api/articles/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setArticles(res.data))
      .catch(() => logout())
  }

  useEffect(() => {
    if (token) fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function login() {
    try {
      const res = await api.post('/api/auth/login', { username, password })
      localStorage.setItem('adminToken', res.data.token)
      setToken(res.data.token)
      setError('')
    } catch {
      setError('Invalid credentials')
    }
  }

  function logout() {
    localStorage.removeItem('adminToken')
    setToken(null)
  }

  async function saveArticle(status) {
    try {
      const payload = { ...form, status }
      if (selected) {
        await api.put(`/api/articles/${selected.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await api.post('/api/articles', payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setView('list')
      setSelected(null)
      setForm({ title: '', content: '', status: 'DRAFT' })
      fetchArticles()
    } catch {
      setError('Failed to save')
    }
  }

  async function deleteArticle(id) {
    if (!confirm('Delete this article?')) return
    await api.delete(`/api/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchArticles()
  }

  function startEdit(article) {
    setSelected(article)
    setForm({ title: article.title, content: article.content, status: article.status })
    setView('edit')
  }

  // LOGIN SCREEN
  if (!token) return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <p className="text-gray-500 text-xs font-mono mb-8 tracking-widest uppercase">admin access</p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors font-mono"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors font-mono"
          />
          {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
          <button onClick={login}
            className="bg-white text-black rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-200 transition-colors mt-2">
            login
          </button>
        </div>
      </div>
    </main>
  )

  // CREATE / EDIT SCREEN
  if (view === 'create' || view === 'edit') return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
          {view === 'edit' ? 'edit article' : 'new article'}
        </p>
        <button onClick={() => { setView('list'); setSelected(null); setForm({ title: '', content: '', status: 'DRAFT' }) }}
          className="text-gray-600 hover:text-white text-sm font-mono transition-colors">
          ← back
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg font-bold outline-none focus:border-white/30 transition-colors"
        />
        
        <textarea
          placeholder="Write your article here..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows={20}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors resize-none leading-relaxed font-mono"
        />
        {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
        <div className="flex gap-3">
          <button onClick={() => saveArticle('PUBLISHED')}
            className="bg-white text-black rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-gray-200 transition-colors">
            publish
          </button>
          <button onClick={() => saveArticle('DRAFT')}
            className="border border-white/10 rounded-lg px-6 py-2.5 text-sm hover:border-white/30 transition-colors">
            save draft
          </button>
          <button onClick={() => { setView('list'); setSelected(null) }}
            className="text-gray-600 hover:text-white text-sm font-mono transition-colors ml-2">
            cancel
          </button>
        </div>
      </div>
    </main>
  )

  // ARTICLE LIST SCREEN
  return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-12">
        <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">admin</p>
        <div className="flex gap-4">
          <button onClick={() => { setForm({ title: '', content: '', status: 'DRAFT' }); setView('create') }}
            className="bg-white text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
            + new article
          </button>
          <button onClick={logout}
            className="text-gray-600 hover:text-white text-sm font-mono transition-colors">
            logout
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {articles.map(article => (
          <div key={article.id}
            className="border border-white/10 rounded-lg p-4 flex justify-between items-start hover:border-white/20 transition-colors">
            <div>
              <h3 className="font-medium mb-1">{article.title}</h3>
              <div className="flex gap-3 items-center">
                <span className={`text-xs font-mono ${article.status === 'PUBLISHED' ? 'text-green-500' : 'text-gray-600'}`}>
                  {article.status.toLowerCase()}
                </span>
                <span className="text-xs text-gray-700 font-mono">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
                <span className="text-xs text-gray-700 font-mono">
                  {article.viewCount} views
                </span>
              </div>
            </div>
            <div className="flex gap-3 ml-4 shrink-0">
              <button onClick={() => startEdit(article)}
                className="text-xs text-gray-500 hover:text-white transition-colors font-mono">
                edit
              </button>
              <button onClick={() => deleteArticle(article.id)}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors font-mono">
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Admin