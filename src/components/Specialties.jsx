import { useRef, useState } from 'react'
import { SPECIALTIES } from '../data/content'
import SpaceArt from './SpaceArt'

/**
 * Two-column grid of specialty cards. Each card lifts on hover and its
 * rule extends; on hover or keyboard focus it also expands to reveal a
 * description beneath the title, while its artwork drifts gently
 * downward in the same motion, as if sinking into the space the card
 * just opened up.
 */
export default function Specialties() {
  const gridRef = useRef(null)
  const [failedImages, setFailedImages] = useState({})

  return (
    <section className="section specialties" id="programs">
      <div className="shell">
        <h2 className="display--sm specialties__title" data-reveal="up">
          {SPECIALTIES.title}
        </h2>
        <p className="specialties__eyebrow" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
          {SPECIALTIES.eyebrow}
        </p>

        <div className="specialties__grid" ref={gridRef}>
          {SPECIALTIES.items.map((item, i) => (
            <article
              className="spec"
              key={item.id}
              data-card={item.id}
              tabIndex={0}
              data-reveal={i % 2 === 0 ? 'left' : 'right'}
              style={{ '--reveal-delay': `${Math.floor(i / 2) * 110}ms` }}
            >
              <div className="spec__head">
                <span className="spec__rule" />
                <h3 className="spec__label">{item.label}</h3>
              </div>
              <div className="spec__descWrap">
                <p className="spec__desc">{item.description}</p>
              </div>
              <div className="spec__art">
                {item.image && !failedImages[item.id] ? (
                  <img
                    className="spec__artImg"
                    src={item.image}
                    alt=""
                    onError={() => setFailedImages((f) => ({ ...f, [item.id]: true }))}
                  />
                ) : (
                  <SpaceArt kind={item.art} />
                )}
              </div>
              <span className="spec__glow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
