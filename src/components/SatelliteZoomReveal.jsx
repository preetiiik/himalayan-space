import { useCallback, useEffect, useRef, useState } from 'react'
import './SatelliteZoomReveal.css'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Satellite image that zooms toward a focus point while an SVG polygon
 * draws in and fills to mark a plot boundary, then a label fades in.
 * Plays once the frame scrolls into view. All per-instance config (image,
 * focus point, polygon, timing) is passed as props — see PROPS below.
 *
 * image        — required. Path under /images, e.g. '/images/plots/plot-42.jpg'
 * focusX/focusY— % (0-100) point in the image the zoom pans/scales toward
 * points       — required. Array of [x, y] pairs on a 0-100 grid (matches
 *                viewBoxWidth/viewBoxHeight), e.g. [[48,38],[63,34],...]
 * aspect       — CSS aspect-ratio for the frame, e.g. '954 / 469'
 */
export default function SatelliteZoomReveal({
  image,
  alt = '',
  focusX = 55,
  focusY = 62,
  aspect = '954 / 469',
  viewBoxWidth = 100,
  viewBoxHeight = 49,
  points,
  label,
  boundaryColor = '#ffc72c',
  boundaryFill = 'rgba(255, 199, 44, 0.18)',
  duration = 6,
  zoomFrom = 1,
  zoomTo = 1.9,
  replayable = false,
  className = '',
}) {
  const frameRef = useRef(null)
  const playedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const play = useCallback(() => {
    if (prefersReduced()) {
      setIsPlaying(true)
      return
    }
    const el = frameRef.current
    setIsPlaying(false)
    requestAnimationFrame(() => {
      if (el) void el.offsetWidth // force reflow so the CSS animations restart
      setIsPlaying(true)
    })
  }, [])

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true
            play()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play])

  const pointsAttr = Array.isArray(points) ? points.map(([x, y]) => `${x},${y}`).join(' ') : points

  return (
    <div className={`satZoom ${className}`}>
      <div
        className={`satZoom__frame ${isPlaying ? 'is-playing' : ''} ${imgFailed ? 'satZoom__frame--missing' : ''}`}
        ref={frameRef}
        style={{
          aspectRatio: aspect,
          '--focus-x': `${focusX}%`,
          '--focus-y': `${focusY}%`,
          '--boundary-color': boundaryColor,
          '--boundary-fill': boundaryFill,
          '--sat-duration': `${duration}s`,
          '--zoom-from': zoomFrom,
          '--zoom-to': zoomTo,
        }}
      >
        {!imgFailed && (
          <img
            className="satZoom__img"
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        )}

        <svg
          className="satZoom__overlay"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon className="satZoom__path" points={pointsAttr} />
        </svg>

        {label && <div className="satZoom__label">{label}</div>}
      </div>

      {replayable && (
        <button type="button" className="satZoom__replay" onClick={play}>
          Replay animation
        </button>
      )}
    </div>
  )
}
