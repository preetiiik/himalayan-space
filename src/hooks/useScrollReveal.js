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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
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
