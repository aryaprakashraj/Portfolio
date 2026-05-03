import { Link } from 'react-router-dom'

function Navbar({ dark, setDark }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center border-b border-black/10 dark:border-white/10 backdrop-blur-sm bg-white/80 dark:bg-black/80 transition-colors duration-300">
      <Link to="/" className="text-lg font-bold tracking-tight font-mono">
        Aryaprakashraj<span className="text-gray-400">.dev</span>
      </Link>
      <div className="flex items-center gap-8">
        <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">home</Link>
          <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">about</Link>
          <Link to="/blog" className="hover:text-black dark:hover:text-white transition-colors">blog</Link>
        </div>
        <button
            onClick={() => setDark(!dark)}
            className="text-lg font-mono text-gray-500 hover:text-black dark:hover:text-white transition-colors p-2">
            {dark ? '○' : '●'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar