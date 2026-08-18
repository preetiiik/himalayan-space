import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import { useScrollY, useActiveSection } from '../hooks/useParallax'
import Logo from './Logo'
import './Navbar.css'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

// Icon components
const ICONS = {
  explore: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  programs: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
}

export default function Navbar() {
  const y = useScrollY()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const pendingScroll = useRef(null)

  const condensed = y > 90

  // These links point to homepage section ids (#explore, #contact, etc.),
  // which only exist while Home is mounted. From any other route,
  // document.getElementById returns null and scrollIntoView silently
  // no-ops. Off the homepage, navigate there first and defer the scroll
  // until the target section has actually mounted.
  useEffect(() => {
    if (location.pathname !== '/' || !pendingScroll.current) return
    const id = pendingScroll.current
    pendingScroll.current = null
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      pendingScroll.current = id
      navigate('/')
    }
  }

  return (
    <header className={`nav ${condensed ? 'is-condensed' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner shell">
        <a href="#top" className="nav__logo" onClick={(e) => go(e, 'top')} aria-label="Himalayan Space Centre — home">
          <Logo />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => go(e, link.id)}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
            >
              <span className="nav__link-icon">{ICONS[link.id]}</span>
              <span className="nav__link-text">{link.label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn--ghost btn--sm nav__cta">
          Contact Us
        </a>

        <button
          className="nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Progress bar tracking how far down the page you are */}
      <span className="nav__progress" style={{ transform: `scaleX(${scrollFraction(y)})` }} />
    </header>
  )
}

function scrollFraction(y) {
  if (typeof document === 'undefined') return 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(y / max, 1) : 0
}
