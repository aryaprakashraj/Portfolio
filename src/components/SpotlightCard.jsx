import { useRef } from 'react'

function SpotlightCard({ children, className = '', containerClassName = '', ...props }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative p-[1px] rounded-xl overflow-hidden bg-zinc-800/40 hover:bg-zinc-800/80 transition-colors duration-500 group ${containerClassName}`}
      {...props}
    >
      {/* Border Spotlight Radial Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            rgba(48, 92, 222, 0.35),
            transparent 80%
          )`
        }}
      />

      {/* Inner Card Content */}
      <div className={`relative z-10 w-full h-full rounded-[11px] bg-zinc-950/95 transition-colors duration-300 ${className}`}>
        {/* Soft Background Highlight Under Mouse */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[11px]"
          style={{
            background: `radial-gradient(
              180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
              rgba(48, 92, 222, 0.05),
              transparent 80%
            )`
          }}
        />
        {children}
      </div>
    </div>
  )
}

export default SpotlightCard
