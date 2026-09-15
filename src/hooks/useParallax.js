import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Depth-parallax: translates the node as it travels through the viewport.
 * `speed` > 0 drifts down-slower (background), < 0 drifts up-faster (foreground).
 */
export function useParallax(
  speed = 0.18,
  { rotate = 0, scale = 0, baseRotate = 0 } = {}
) {
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
      const progress =
        (rect.top + rect.height / 2 - vh / 2) /
        (vh / 2 + rect.height / 2)

      const clamped = Math.max(-1.5, Math.min(1.5, progress))

      const y = clamped * speed * 100

      // baseRotate keeps the element's resting angle.
      const r =
        baseRotate + (rotate ? clamped * rotate : 0)

      const s =
        scale
          ? 1 + Math.abs(clamped) * scale
          : 1

      el.style.transform =
        `translate3d(0, ${y.toFixed(2)}px, 0) ` +
        `rotate(${r.toFixed(2)}deg) ` +
        `scale(${s.toFixed(3)})`
    }

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [speed, rotate, scale, baseRotate])

  return ref
}

/**
 * Raw window scrollY, rAF-throttled.
 * Used for the sticky nav + hero depth.
 */
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

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', onScroll)

      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return y
}

/**
 * Detects which homepage section is currently active.
 *
 * Contact is handled here even though it is NOT included
 * in NAV_LINKS. This allows the existing Contact Us button
 * to represent the Contact section without creating a
 * second Contact Us navigation item.
 */
export function useActiveSection(ids, resetKey) {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    let frame = 0
    let cancelled = false

    // Contact is intentionally added only for detection.
    // It does NOT create another navbar link.
    const sectionIds = [...ids, 'contact']

    const updateActiveSection = () => {
      if (cancelled) return

      const activationPoint = window.innerHeight * 0.35

      let currentSection = sectionIds[0] || ''

      for (const id of sectionIds) {
        const section = document.getElementById(id)

        if (!section) continue

        const rect = section.getBoundingClientRect()

        /*
         * Once a section reaches the upper 35% activation
         * point, it becomes the active section.
         *
         * Because we loop through the sections in order,
         * the last section that has reached the activation
         * point becomes active.
         */
        if (rect.top <= activationPoint) {
          currentSection = id
        }
      }

      setActive((previous) =>
        previous === currentSection
          ? previous
          : currentSection
      )
    }

    const onScroll = () => {
      if (frame) return

      frame = requestAnimationFrame(() => {
        frame = 0
        updateActiveSection()
      })
    }

    /*
     * Attach once the sections exist in the DOM.
     */
    const attach = () => {
      if (cancelled) return

      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      if (elements.length === 0) {
        frame = requestAnimationFrame(attach)
        return
      }

      // Initial active section
      updateActiveSection()

      window.addEventListener('scroll', onScroll, {
        passive: true,
      })

      window.addEventListener('resize', onScroll)
    }

    attach()

    return () => {
      cancelled = true

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [ids, resetKey])

  return active
}