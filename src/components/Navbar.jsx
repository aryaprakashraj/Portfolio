import { Link } from 'react-router-dom'

function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-zinc-800 backdrop-blur-md bg-zinc-950/80">
      <Link to="/" onClick={scrollToTop} className="text-lg font-bold tracking-tight font-display flex items-baseline">
        Arya<span className="font-mono text-royal">.dev</span>
      </Link>
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm text-zinc-400 font-medium">
          <Link to="/" onClick={scrollToTop} className="hover:text-royal transition-colors duration-300">Home</Link>
          <Link to="/#about" className="hover:text-royal transition-colors duration-300">About</Link>
          <Link to="/#projects" className="hover:text-royal transition-colors duration-300">Projects</Link>
          <Link to="/blog" className="hover:text-royal transition-colors duration-300">Blog</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar