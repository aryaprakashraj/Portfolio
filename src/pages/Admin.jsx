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

  const [activeTab, setActiveTab] = useState('articles')
  const [subscribers, setSubscribers] = useState([])
  const [newsletters, setNewsletters] = useState([])
  const [newsletterForm, setNewsletterForm] = useState({ subject: '', body: '' })
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [newsletterError, setNewsletterError] = useState('')

  function fetchArticles() {
    api.get('/api/articles/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setArticles(res.data))
      .catch(() => logout())
  }

  function fetchSubscribers() {
    api.get('/api/subscriber/get-subscribers', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setSubscribers(res.data))
      .catch(() => logout())
  }

  function fetchNewsletters() {
    api.get('/api/newsletter', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setNewsletters(res.data))
      .catch(() => logout())
  }

  useEffect(() => {
    if (token) {
      fetchArticles()
      fetchSubscribers()
      fetchNewsletters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function sendNewsletter(e) {
    e.preventDefault()
    if (!newsletterForm.subject.trim() || !newsletterForm.body.trim()) {
      setNewsletterError('Please fill in both subject and body.')
      setNewsletterStatus('error')
      return
    }
    setNewsletterStatus('loading')
    setNewsletterError('')
    try {
      await api.post('/api/newsletter/send', newsletterForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewsletterStatus('success')
      setNewsletterForm({ subject: '', body: '' })
      fetchNewsletters()
      setTimeout(() => {
        setNewsletterStatus('idle')
      }, 6000)
    } catch (err) {
      setNewsletterStatus('error')
      let msg = 'Failed to send newsletter.'
      if (err.response) {
        if (typeof err.response.data === 'string') {
          msg = err.response.data
        } else if (err.response.data?.message) {
          msg = err.response.data.message
        } else if (err.response.data?.error) {
          msg = err.response.data.error
        }
      }
      setNewsletterError(msg)
    }
  }

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
        <p className="text-zinc-450 text-xs font-mono mb-8 tracking-widest uppercase">admin access</p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none text-zinc-900 focus:border-zinc-400 transition-colors font-mono"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none text-zinc-900 focus:border-zinc-400 transition-colors font-mono"
          />
          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
          <button onClick={login}
            className="bg-zinc-950 text-zinc-50 rounded-lg px-4 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors mt-2 cursor-pointer shadow-sm">
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
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
          {view === 'edit' ? 'edit article' : 'new article'}
        </p>
        <button onClick={() => { setView('list'); setSelected(null); setForm({ title: '', content: '', status: 'DRAFT' }) }}
          className="text-zinc-500 hover:text-zinc-900 text-sm font-mono transition-colors cursor-pointer">
          ← back
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-lg font-bold text-zinc-900 outline-none focus:border-zinc-400 transition-colors"
        />

        <textarea
          placeholder="Write your article here..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows={20}
          className="bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors resize-none leading-relaxed font-mono"
        />
        {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
        <div className="flex gap-3">
          <button onClick={() => saveArticle('PUBLISHED')}
            className="bg-zinc-950 text-zinc-50 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm">
            publish
          </button>
          <button onClick={() => saveArticle('DRAFT')}
            className="border border-zinc-200 rounded-lg px-6 py-2.5 text-sm hover:border-zinc-450 hover:bg-zinc-50 transition-colors text-zinc-700 cursor-pointer">
            save draft
          </button>
          <button onClick={() => { setView('list'); setSelected(null) }}
            className="text-zinc-500 hover:text-zinc-900 text-sm font-mono transition-colors ml-2 cursor-pointer">
            cancel
          </button>
        </div>
      </div>
    </main>
  )

  // ARTICLE LIST & NEWSLETTER & SUBSCRIBER TABS DASHBOARD SCREEN
  return (
    <main className="min-h-screen px-8 pt-32 max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">admin console</p>
        <button onClick={logout}
          className="text-zinc-500 hover:text-zinc-900 text-sm font-mono transition-colors cursor-pointer">
          logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-zinc-200 pb-4 mb-8 font-mono text-sm select-none">
        <button
          onClick={() => { setActiveTab('articles'); setError('') }}
          className={`pb-1 cursor-pointer transition-colors relative ${activeTab === 'articles' ? 'text-royal font-semibold' : 'text-zinc-400 hover:text-zinc-950'
            }`}
        >
          Articles
          {activeTab === 'articles' && <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-royal shadow-[0_0_8px_#305CDE]" />}
        </button>
        <button
          onClick={() => { setActiveTab('newsletters'); setError('') }}
          className={`pb-1 cursor-pointer transition-colors relative ${activeTab === 'newsletters' ? 'text-royal font-semibold' : 'text-zinc-400 hover:text-zinc-950'
            }`}
        >
          Newsletters
          {activeTab === 'newsletters' && <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-royal shadow-[0_0_8px_#305CDE]" />}
        </button>
        <button
          onClick={() => { setActiveTab('subscribers'); setError('') }}
          className={`pb-1 cursor-pointer transition-colors relative ${activeTab === 'subscribers' ? 'text-royal font-semibold' : 'text-zinc-400 hover:text-zinc-950'
            }`}
        >
          Subscribers
          {activeTab === 'subscribers' && <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-royal shadow-[0_0_8px_#305CDE]" />}
        </button>
      </div>

      {/* TAB CONTENT: ARTICLES */}
      {activeTab === 'articles' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-serif text-zinc-900">Manage Articles</h2>
            <button onClick={() => { setForm({ title: '', content: '', status: 'DRAFT' }); setView('create') }}
              className="bg-zinc-950 text-zinc-50 rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm">
              + new article
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {articles.length === 0 ? (
              <p className="text-zinc-400 font-mono text-sm">No articles found.</p>
            ) : (
              articles.map(article => (
                <div key={article.id}
                  className="border border-zinc-200 bg-zinc-50/20 hover:bg-zinc-50/50 rounded-lg p-4 flex justify-between items-start hover:border-zinc-300 transition-colors">
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-1">{article.title}</h3>
                    <div className="flex gap-3 items-center">
                      <span className={`text-xs font-mono ${article.status === 'PUBLISHED' ? 'text-emerald-600' : 'text-zinc-400'}`}>
                        {article.status.toLowerCase()}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {article.viewCount} views
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 ml-4 shrink-0 font-mono">
                    <button onClick={() => startEdit(article)}
                      className="text-xs text-zinc-550 hover:text-royal transition-colors cursor-pointer">
                      edit
                    </button>
                    <button onClick={() => deleteArticle(article.id)}
                      className="text-xs text-zinc-550 hover:text-red-500 transition-colors cursor-pointer">
                      delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: NEWSLETTERS */}
      {activeTab === 'newsletters' && (
        <div className="flex flex-col gap-10">
          {/* Compose Form */}
          <section className="p-6 border border-zinc-200 bg-zinc-50/20 rounded-xl">
            <h2 className="text-lg font-bold font-serif text-zinc-900 mb-4">Compose & Send</h2>
            <form onSubmit={sendNewsletter} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Subject Line"
                value={newsletterForm.subject}
                onChange={e => setNewsletterForm({ ...newsletterForm, subject: e.target.value })}
                required
                disabled={newsletterStatus === 'loading'}
                className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none text-zinc-900 focus:border-zinc-455 transition-colors font-mono disabled:opacity-50"
              />
              <textarea
                placeholder="Write your newsletter body here... Markdown is supported or plain text."
                value={newsletterForm.body}
                onChange={e => setNewsletterForm({ ...newsletterForm, body: e.target.value })}
                required
                rows={10}
                disabled={newsletterStatus === 'loading'}
                className="bg-white border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-455 transition-colors resize-none leading-relaxed font-mono disabled:opacity-50"
              />
              {newsletterError && <p className="text-red-500 text-xs font-mono">{newsletterError}</p>}
              {newsletterStatus === 'success' && (
                <p className="text-emerald-600 text-xs font-mono flex items-center gap-1.5 animate-fadeIn">
                  <span>✓</span> Newsletter sent successfully to all subscribers!
                </p>
              )}
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="bg-zinc-950 text-zinc-50 rounded-lg px-6 py-3 text-sm font-medium hover:bg-zinc-850 transition-colors cursor-pointer shadow-sm disabled:opacity-50 font-mono w-fit self-start"
              >
                {newsletterStatus === 'loading' ? 'Sending to subscribers...' : 'Send Newsletter'}
              </button>
            </form>
          </section>

          {/* History */}
          <section>
            <h2 className="text-lg font-bold font-serif text-zinc-900 mb-4">Sent History</h2>
            <div className="flex flex-col gap-3">
              {newsletters.length === 0 ? (
                <p className="text-zinc-400 font-mono text-sm">No newsletters sent yet.</p>
              ) : (
                newsletters.map((newsletter, idx) => (
                  <div
                    key={newsletter.id || idx}
                    className="border border-zinc-200 bg-zinc-50/20 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-medium text-zinc-900 mb-1">{newsletter.subject}</h3>
                      <p className="text-xs text-zinc-500 font-mono">
                        Sent: {new Date(newsletter.createdAt || newsletter.sentAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {/* TAB CONTENT: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div>
          <h2 className="text-xl font-bold font-serif text-zinc-900 mb-6">Subscriber Directory</h2>
          <div className="flex flex-col gap-3">
            {subscribers.length === 0 ? (
              <p className="text-zinc-400 font-mono text-sm">No subscribers registered yet.</p>
            ) : (
              subscribers.map((subscriber, idx) => (
                <div
                  key={subscriber.id || idx}
                  className="border border-zinc-200 bg-zinc-50/20 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2"
                >
                  <div>
                    <h3 className="font-semibold text-zinc-800 text-sm">{subscriber.name || 'Anonymous'}</h3>
                    <p className="text-xs text-zinc-500 font-mono">{subscriber.mail || subscriber.email}</p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${subscriber.status === 'SUBSCRIBED' || subscriber.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                      }`}>
                      {(subscriber.status || 'Subscribed').toLowerCase()}
                    </span>
                    <span className="text-zinc-400">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Admin