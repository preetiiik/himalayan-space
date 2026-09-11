import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router's <Link> updates the URL hash but never scrolls to it —
// that's only handled automatically for same-page anchor clicks by the
// browser, not for route changes. This watches the location on every
// navigation and, if there's a hash, scrolls the matching element into
// view once it's actually in the DOM (a fresh route needs a tick to
// render before the target section exists to scroll to).
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const id = hash.replace('#', '')

    // Retry across a couple of frames: right after navigating to "/",
    // the Programs section may not be mounted/laid out yet.
    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (attempts < 10) {
        attempts += 1
        requestAnimationFrame(tryScroll)
      }
    }
    requestAnimationFrame(tryScroll)
  }, [pathname, hash])

  return null
}