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

/** Reports which section id is currently under the viewport midpoint. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    return () => io.disconnect()
  }, [ids])

  return active
}
