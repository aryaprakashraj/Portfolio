import { useState, useEffect } from 'react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }

      if (totalHeight > 0) {
        setScrollPercent((scrollY / totalHeight) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const radius = 16
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-8 right-8 z-40 p-2.5 rounded-full bg-zinc-950/90 border border-zinc-800/80 text-zinc-400 hover:text-zinc-100 hover:border-royal/50 hover:shadow-[0_0_20px_rgba(48,92,222,0.15)] transition-all duration-500 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* SVG Circle Progress indicator */}
        <svg className="absolute -rotate-90 w-full h-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r={radius}
            className="stroke-zinc-800/40 fill-none"
            strokeWidth="2.5"
          />
          <circle
            cx="18"
            cy="18"
            r={radius}
            className="stroke-royal fill-none transition-all duration-100 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Arrow text */}
        <span className="relative z-10 text-xs font-mono select-none">↑</span>
      </div>
    </button>
  )
}

export default ScrollToTop
