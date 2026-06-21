import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Reveal from '../components/Reveal'

function Blog() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [subscribeName, setSubscribeName] = useState('')
    const [subscribeEmail, setSubscribeEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
    const [subscribeError, setSubscribeError] = useState('')

    useEffect(() => {
        api.get('/api/articles')
            .then(res => {
                setArticles(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setSubscribeStatus('loading')
        setSubscribeError('')
        try {
            await api.post('/api/subscriber/add', {
                mail: subscribeEmail,
                name: subscribeName
            })
            setSubscribeStatus('success')
            setSubscribeName('')
            setSubscribeEmail('')
            setTimeout(() => {
                setSubscribeStatus('idle')
            }, 6000)
        } catch (err) {
            setSubscribeStatus('error')
            let msg = 'Failed to subscribe. Please try again.'
            if (err.response) {
                if (typeof err.response.data === 'string') {
                    msg = err.response.data
                } else if (err.response.data?.message) {
                    msg = err.response.data.message
                } else if (err.response.data?.error) {
                    msg = err.response.data.error
                }
            }
            setSubscribeError(msg)
        }
    }

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

            {/* Newsletter Subscription Widget */}
            <Reveal delay={loading ? 100 : (articles.length * 80 + 100)}>
                <section className="mt-24 pt-12 border-t border-zinc-100">
                    <p className="text-zinc-450 text-xs font-mono mb-4 tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        newsletter
                    </p>
                    <h2 className="text-2xl font-bold font-serif text-zinc-900 mb-2">Subscribe to my newsletter</h2>
                    <p className="text-zinc-500 text-[15px] leading-relaxed mb-6 max-w-2xl">
                        Get notified when I write new articles about backend systems, Java, Spring Boot, and Linux. No spam, unsubscribe anytime.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Name"
                            value={subscribeName}
                            onChange={(e) => setSubscribeName(e.target.value)}
                            required
                            disabled={subscribeStatus === 'loading'}
                            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none text-zinc-900 focus:border-zinc-400 transition-colors font-mono disabled:opacity-50"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            required
                            disabled={subscribeStatus === 'loading'}
                            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm outline-none text-zinc-900 focus:border-zinc-400 transition-colors font-mono disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={subscribeStatus === 'loading'}
                            className="bg-zinc-950 text-zinc-50 rounded-lg px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm disabled:opacity-50 font-mono"
                        >
                            {subscribeStatus === 'loading' ? 'subscribing...' : 'subscribe'}
                        </button>
                    </form>
                    {subscribeStatus === 'success' && (
                        <p className="text-emerald-600 text-xs font-mono mt-3 flex items-center gap-1.5">
                            <span>✓</span> Subscribed successfully! Welcome aboard.
                        </p>
                    )}
                    {subscribeStatus === 'error' && (
                        <p className="text-red-500 text-xs font-mono mt-3">
                            ✕ {subscribeError}
                        </p>
                    )}
                </section>
            </Reveal>
        </main>
    )
}

export default Blog