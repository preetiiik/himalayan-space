import { useEffect, useRef, useState } from 'react'

// Minimal scroll-into-view detector for one-shot entrance reveals, in the
// same spirit as useParallax / usePinProgress: attach the returned ref to
// the element, and `inView` flips to true once it crosses the threshold.
// Fails open (inView starts true) if IntersectionObserver isn't available,
// so the element is never stuck invisible.
export function useInView({ threshold = 0.2, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return [ref, inView]
}