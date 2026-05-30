import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import ArticlePage from './pages/ArticlePage'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import FullTerminalConsole from './components/FullTerminalConsole'

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(() => {
    return localStorage.getItem('isTerminalMode') === 'true'
  })

  const handleSetTerminalMode = (val) => {
    setIsTerminalMode(val)
    localStorage.setItem('isTerminalMode', val)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-royal/30">
        {!isTerminalMode && <Navbar isTerminalMode={isTerminalMode} setIsTerminalMode={handleSetTerminalMode} />}
        {isTerminalMode ? (
          <FullTerminalConsole setIsTerminalMode={handleSetTerminalMode} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        )}
        {!isTerminalMode && <ScrollToTop />}
      </div>
    </BrowserRouter>
  )
}

export default App