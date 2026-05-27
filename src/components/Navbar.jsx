import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
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
      setActiveSection('')
      return
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200 // offset to trigger active state slightly early
      
      const aboutSection = document.getElementById('about')
      const projectsSection = document.getElementById('projects')

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

      // Detect if near the bottom of the page
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50
      if (isAtBottom && projectsSection) {
        currentSection = 'projects'
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
    if (link.to === '/blog') {
      return location.pathname.startsWith('/blog')
    }
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
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-zinc-900/80 backdrop-blur-xl bg-zinc-950/70 transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-royal shadow-[0_0_10px_#305CDE] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Link to="/" onClick={scrollToTop} className="text-lg font-bold tracking-tight font-display flex items-baseline group">
        Arya<span className="font-mono text-royal group-hover:text-[#4d75ec] transition-colors duration-300">.dev</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={link.onClick}
                className={`relative py-1 transition-colors duration-300 ${
                  active ? 'text-royal font-semibold' : 'text-zinc-300 hover:text-zinc-100'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar