import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalScrollHeight > 0) {
        setScrollProgress((window.scrollY / totalScrollHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.slice(1);
    }
    if (path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return false;
  };

  const navLinks = [
    { label: 'Home', to: '/', onClick: scrollToTop },
    { label: 'About', to: '/#about' },
    { label: 'Projects', to: '/#projects' },
    { label: 'Blog', to: '/blog' }
  ]

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-zinc-900/80 backdrop-blur-xl bg-zinc-950/70 transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-royal shadow-[0_0_10px_#305CDE] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Link to="/" onClick={scrollToTop} className="text-lg font-bold tracking-tight font-display flex items-baseline group">
        Arya<span className="font-mono text-royal group-hover:text-blue-400 transition-colors duration-300">.dev</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.onClick}
                className={`relative py-1 transition-colors duration-300 ${
                  active ? 'text-zinc-50' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-royal rounded-full shadow-[0_0_8px_#305CDE] animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar