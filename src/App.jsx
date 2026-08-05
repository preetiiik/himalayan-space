import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Starfield from './components/Starfield'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ProgramDetail from './pages/ProgramDetail'
import { useScrollReveal } from './hooks/useScrollReveal'
import './styles/sections.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useScrollReveal()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Starfield />
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
