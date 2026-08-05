import { useState } from 'react'
import { FACTS, UNIVERSE } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { useParallax } from '../hooks/useParallax'

export default function Facts() {
  const dome = useParallax(-0.14, { rotate: 3 })
  const [domeFailed, setDomeFailed] = useState(false)

  return (
    <section className="section facts">
      <div className="shell">
        <p className="eyebrow facts__eyebrow" data-reveal="up">
          {FACTS.eyebrow}
        </p>
        <h2 className="display--sm facts__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          {FACTS.title}
        </h2>

        <div className="facts__row">
          {FACTS.items.map((item, i) => (
            <Stat key={item.label} {...item} delay={i * 120} />
          ))}
        </div>
      </div>

      {/* ---- We Bring The Universe Closer ---- */}
      <div className="shell universe">
        <p className="eyebrow universe__eyebrow" data-reveal="up">
          {UNIVERSE.eyebrow}
        </p>
        <h2 className="display universe__title" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
          {UNIVERSE.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        <div className="universe__grid">
          <div className="universe__domeWrap" data-reveal="scale" aria-hidden="true">
            <div className={`universe__dome ${!domeFailed ? 'universe__dome--photo' : ''}`} ref={dome}>
              {!domeFailed ? (
                <img
                  className="universe__domeImg"
                  src="/images/universe-dome.png"
                  alt=""
                  onError={() => setDomeFailed(true)}
                />
              ) : (
                <>
                  <span className="universe__domeGlow" />
                  <span className="universe__domeSeam" />
                  <span className="universe__domeSeam universe__domeSeam--b" />
                </>
              )}
            </div>
          </div>

          <div className="universe__copy">
            {UNIVERSE.paragraphs.map((p, i) => (
              <p key={i} className="lede" data-reveal="right" style={{ '--reveal-delay': `${i * 120}ms` }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label, delay }) {
  const [ref, display] = useCountUp(value)

  return (
    <div className="stat" ref={ref} data-reveal="up" style={{ '--reveal-delay': `${delay}ms` }}>
      <span className="stat__value">
        {display}
        {suffix}
      </span>
      <span className="stat__label">{label}</span>
      <span className="stat__dot" />
    </div>
  )
}
