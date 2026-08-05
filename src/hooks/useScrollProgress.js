import { useEffect, useRef } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Tracks scroll progress (0 → 1) through a tall "pin" wrapper — 0 as its top
 * reaches the viewport top, 1 as its bottom reaches the viewport bottom —
 * and writes it as a CSS custom property on the wrapper. Descendants read
 * it with var()/calc() to drive scroll-scrubbed transforms directly,
 * without a React re-render on every scroll frame.
 */
export function usePinProgress(property) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1
      el.style.setProperty(property, progress.toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [property])

  return ref
}
