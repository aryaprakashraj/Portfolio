import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ isTerminalMode, setIsTerminalMode }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  // Scroll Spy for Home page sections
  useEffect(() => {
    if (location.pathname !== '/') {
      if (activeSection !== '') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveSection('')
      }
      return
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200 // offset to trigger active state slightly early
      
      const aboutSection = document.getElementById('about')
      const projectsSection = document.getElementById('projects')
      const blogSection = document.getElementById('blog')

      let currentSection = 'home'

      if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= aboutTop) {
          currentSection = 'about'
        }
      }

      if (projectsSection) {
        const projectsTop = projectsSection.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= projectsTop) {
          currentSection = 'projects'
        }
      }

      if (blogSection) {
        const blogTop = blogSection.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= blogTop) {
          currentSection = 'blog'
        }
      }

      // Detect if near the bottom of the page
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50
      if (isAtBottom && blogSection) {
        currentSection = 'blog'
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScrollSpy)
    // Run once on mount/location change to set initially
    handleScrollSpy()

    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [location.pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLinkActive = (link) => {
    if (location.pathname === '/') {
      if (link.to === '/') {
        return activeSection === 'home'
      }
      if (link.to === '/#about') {
        return activeSection === 'about'
      }
      if (link.to === '/#projects') {
        return activeSection === 'projects'
      }
      if (link.to === '/blog') {
        return activeSection === 'blog'
      }
    } else {
      if (link.to === '/blog') {
        return location.pathname.startsWith('/blog')
      }
    }
    return false
  }

  const navLinks = [
    { label: 'Home', to: '/', onClick: scrollToTop },
    { label: 'About', to: '/#about' },
    { label: 'Projects', to: '/#projects' },
    { label: 'Blog', to: '/blog' }
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 md:px-8 py-4 flex justify-between items-center border-b border-zinc-200/50 backdrop-blur-xl bg-white/80 transition-all duration-300">
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-royal shadow-[0_0_10px_#305CDE] transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />

        <Link to="/" onClick={scrollToTop} className="text-lg font-bold tracking-tight font-display flex items-baseline group">
          Arya<span className="font-mono text-royal group-hover:text-[#4d75ec] transition-colors duration-300">.dev</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-sm font-medium items-center">
            {navLinks.map((link) => {
              const active = isLinkActive(link)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={link.onClick}
                  className={`relative py-1 transition-colors duration-300 ${
                    active ? 'text-royal font-semibold' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CLI Mode Toggle Button */}
          <button 
            onClick={() => setIsTerminalMode(!isTerminalMode)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs cursor-pointer transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
              isTerminalMode 
                ? 'bg-royal border-royal text-zinc-50 hover:bg-[#4d75ec]' 
                : 'bg-zinc-50/50 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300'
            }`}
            aria-label="Toggle Developer Console"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isTerminalMode ? 'bg-zinc-100 animate-pulse' : 'bg-zinc-600'}`} />
            {isTerminalMode ? 'CLI Mode: ON' : 'CLI Mode'}
          </button>
        </div>

        {/* Hamburger Menu Toggle (Mobile only) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden text-zinc-600 hover:text-zinc-950 p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Shelf/Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[260px] bg-white/95 border-l border-zinc-200 backdrop-blur-xl z-50 p-6 flex flex-col gap-8 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
          <span className="text-sm font-bold tracking-tight font-display text-zinc-500">Navigation</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  if (link.onClick) link.onClick(e)
                }}
                className={`py-2 px-3.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active 
                    ? 'text-royal font-semibold bg-royal/10 border-l-2 border-royal' 
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CLI Environment Switcher */}
        <div className="mt-auto border-t border-zinc-100 pt-6 flex flex-col gap-3">
          <span className="text-xs text-zinc-400 font-mono">Environment Mode</span>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsTerminalMode(!isTerminalMode)
            }}
            className={`w-full py-2.5 rounded-lg border font-mono text-xs cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
              isTerminalMode 
                ? 'bg-royal border-royal text-zinc-50 hover:bg-[#4d75ec]' 
                : 'bg-zinc-50/50 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300'
            }`}
            aria-label="Toggle Developer Console"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isTerminalMode ? 'bg-zinc-100 animate-pulse' : 'bg-zinc-600'}`} />
            {isTerminalMode ? 'CLI Mode: ON' : 'CLI Mode'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar