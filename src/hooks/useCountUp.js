import { useEffect, useRef, useState } from 'react'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Animates 0 → target once the element scrolls into view.
 * Returns [ref, displayValue] where displayValue is locale-formatted.
 */
export function useCountUp(target, duration = 2000) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        io.disconnect()

        const startedAt = performance.now()
        const tick = (now) => {
          const t = Math.min((now - startedAt) / duration, 1)
          setValue(Math.round(easeOutExpo(t) * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return [ref, value.toLocaleString('en-US')]
}
