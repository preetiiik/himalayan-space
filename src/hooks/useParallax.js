import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Depth-parallax: translates the node as it travels through the viewport.
 * `speed` > 0 drifts down-slower (background), < 0 drifts up-faster (foreground).
 */
export function useParallax(speed = 0.18, { rotate = 0, scale = 0, baseRotate = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return

    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      // -1 (just below the fold) → 1 (just above it)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
      const clamped = Math.max(-1.5, Math.min(1.5, progress))

      const y = clamped * speed * 100
      // baseRotate keeps the element's resting angle — this transform replaces
      // any rotate() set in CSS, so the base has to be folded in here.
      const r = baseRotate + (rotate ? clamped * rotate : 0)
      const s = scale ? 1 + Math.abs(clamped) * scale : 1

      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(
        2
      )}deg) scale(${s.toFixed(3)})`
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
  }, [speed, rotate, scale, baseRotate])

  return ref
}

/** Raw window scrollY, rAF-throttled. Used for the sticky nav + hero depth. */
export function useScrollY() {
  const [y, setY] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setY(window.scrollY)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return y
}

/**
 * Reports which section id is currently under the viewport midpoint.
 *
 * `resetKey` (e.g. the router pathname) forces the observer to re-attach.
 * This matters because `ids` is usually a module-level constant whose
 * reference never changes, so a plain `[ids]` dependency only runs this
 * effect once on mount. Navigating away and back to the page that hosts
 * these sections remounts the DOM nodes, but without a changing dependency
 * the old observer — still watching now-detached elements — never gets
 * torn down and replaced, so `active` freezes until a full refresh.
 */
export function useActiveSection(ids, resetKey) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let io
    let cancelled = false
    let frame = 0

    const attach = () => {
      if (cancelled) return
      const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)

      if (elements.length === 0) {
        // Sections aren't in the DOM yet (e.g. just navigated back to the
        // page that renders them) — try again next frame instead of giving up.
        frame = requestAnimationFrame(attach)
        return
      }

      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (visible) setActive(visible.target.id)
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
      )
      elements.forEach((el) => io.observe(el))
    }

    attach()

    return () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
      io?.disconnect()
    }
  }, [ids, resetKey])

  return active
}