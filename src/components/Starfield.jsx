import { useEffect, useRef } from 'react'
import './Starfield.css'

/**
 * Canvas star layer: three depth bands drift at different rates, twinkle on a
 * per-star sine phase, and shift subtly with the pointer. Occasional shooting
 * stars streak across. Pauses entirely when the tab is hidden.
 */
export default function Starfield({ density = 0.00016 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let w, h, dpr, stars, shooters, raf
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Fall back to the viewport: in dev the stylesheet can land after the
      // first effect pass, leaving clientWidth at 0.
      w = canvas.clientWidth || window.innerWidth
      h = canvas.clientHeight || window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(w * h * density)
      stars = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.25 + depth * 1.15,
          depth,
          drift: 0.006 + depth * 0.028,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          hue: Math.random() > 0.86 ? 'rgba(169,216,244,' : 'rgba(255,255,255,',
        }
      })
      shooters = []
    }

    const spawnShooter = () => {
      shooters.push({
        x: Math.random() * w * 0.75,
        y: Math.random() * h * 0.45,
        len: 90 + Math.random() * 130,
        vx: 5.5 + Math.random() * 3.5,
        vy: 1.9 + Math.random() * 1.4,
        life: 1,
      })
    }

    let t = 0
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)

      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045

      for (const s of stars) {
        // vertical drift, wrapping at the top edge
        s.y -= s.drift
        if (s.y < -2) {
          s.y = h + 2
          s.x = Math.random() * w
        }

        const twinkle = 0.42 + 0.58 * Math.abs(Math.sin(s.phase + t * s.speed))
        const px = s.x + pointer.x * (s.depth * 22)
        const py = s.y + pointer.y * (s.depth * 22)

        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.hue}${(twinkle * (0.32 + s.depth * 0.6)).toFixed(3)})`
        ctx.fill()

        // brightest stars get a soft bloom
        if (s.depth > 0.88) {
          ctx.beginPath()
          ctx.arc(px, py, s.r * 4.5, 0, Math.PI * 2)
          ctx.fillStyle = `${s.hue}${(twinkle * 0.055).toFixed(3)})`
          ctx.fill()
        }
      }

      if (Math.random() < 0.0022 && shooters.length < 2) spawnShooter()

      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i]
        sh.x += sh.vx
        sh.y += sh.vy
        sh.life -= 0.011

        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.len, sh.y - sh.len * 0.34)
        grad.addColorStop(0, `rgba(255,255,255,${Math.max(sh.life, 0) * 0.85})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.len, sh.y - sh.len * 0.34)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.4
        ctx.stroke()

        if (sh.life <= 0 || sh.x > w + sh.len) shooters.splice(i, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(draw)
    }

    build()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', build)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
