import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../data/content'
import { useScrollY, useActiveSection } from '../hooks/useParallax'
import Logo from './Logo'
import './Navbar.css'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

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
              {link.label}
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
