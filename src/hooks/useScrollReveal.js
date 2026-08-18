import { useEffect } from 'react'

/**
 * Watches every [data-reveal] node in the document and adds .is-revealed
 * as it scrolls into view. New nodes are picked up via MutationObserver so
 * lazily-rendered sections animate too.
 */
export function useScrollReveal() {
  useEffect(() => {
    const seen = new WeakSet()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          io.unobserve(entry.target)
        }
      },
      // Horizontal margin matters here, not just vertical: reveal elements
      // like [data-reveal='moon'] start translated up to 780px sideways
      // from their resting slot (see MoonBanner.jsx), and
      // getBoundingClientRect() — what the observer actually measures —
      // reflects that transform. On a wide desktop viewport a 780px
      // horizontal offset can still land inside the viewport bounds, but
      // on a narrow mobile viewport (~375-430px) it pushes the element's
      // whole box completely off-screen, so it never intersects and
      // .is-revealed never gets added — the element is stuck at its
      // start position forever. Generous left/right rootMargin absorbs
      // that offset regardless of viewport width; the -8% bottom margin
      // (trigger slightly before the very bottom edge) is unchanged.
      { threshold: 0.12, rootMargin: '0px 800px -8% 800px' }
    )

    const scan = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        io.observe(el)
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}