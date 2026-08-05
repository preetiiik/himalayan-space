import { useCallback, useEffect, useState } from 'react'
import { GALLERY } from '../data/content'

const TILES = Array.from({ length: GALLERY.count }, (_, i) => i + 1)

export default function Gallery() {
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir) => setOpen((cur) => (cur === null ? null : (cur + dir + TILES.length) % TILES.length)),
    []
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  return (
    <section className="section gallery" id="gallery">
      <div className="shell">
        <h2 className="display--sm gallery__title" data-reveal="up">
          {GALLERY.title}
        </h2>
        <p className="gallery__subtitle" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
          {GALLERY.subtitle}
        </p>

        <div className="gallery__grid">
          {TILES.map((n, i) => (
            <button
              className="tile"
              key={n}
              data-reveal="scale"
              style={{ '--reveal-delay': `${(i % 6) * 70}ms` }}
              onClick={() => setOpen(i)}
              aria-label={`Open gallery image ${n}`}
            >
              <img src={`/images/gallery/${n}.jpg`} alt="" loading="lazy" decoding="async" />
              <span className="tile__veil" aria-hidden="true">
                <i>＋</i>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label="Gallery viewer">
          <button className="lightbox__close" onClick={close} aria-label="Close">
            ✕
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            className="lightbox__img"
            src={`/images/gallery/${TILES[open]}.jpg`}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next image"
          >
            ›
          </button>
          <span className="lightbox__count">
            {open + 1} / {TILES.length}
          </span>
        </div>
      )}
    </section>
  )
}
