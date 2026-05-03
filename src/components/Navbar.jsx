import { Link } from 'react-router-dom'

function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-sm bg-black/80">
      <Link to="/" onClick={scrollToTop} className="text-lg font-bold tracking-tight font-mono">
        Arya<span className="text-gray-400">.dev</span>
      </Link>
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm text-gray-400">
          <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">home</Link>
          <Link to="/#about" className="hover:text-white transition-colors">about</Link>
          <Link to="/#projects" className="hover:text-white transition-colors">projects</Link>
          <Link to="/blog" className="hover:text-white transition-colors">blog</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar