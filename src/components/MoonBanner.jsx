import { useState } from 'react'
import { MOON_BANNER } from '../data/content'

/* Emergence stages, innermost pair first. All three share the same
   1.05s transition and easing (see [data-reveal='moon'] in global.css)
   — only their START time is staggered, by the much shorter
   STAGE_GAP_MS, so pair 2 begins shortly after pair 1 BEGINS (not after
   it ends) and all three are moving, and finishing, within a tight
   overlapping window — one outward wave, not three sequential pop-ins.
   moonFrom is how far a moon starts from its own resting slot, toward the
   centre; positive travels left→right (left-side moons), negative the
   reverse (right-side moons), so both mirror the same distance. */
const STAGE_GAP_MS = 130
const STAGES = {
  gibbous: { delay: 0, moonFrom: 360 },
  crescent: { delay: STAGE_GAP_MS, moonFrom: 580 },
  half: { delay: STAGE_GAP_MS * 2, moonFrom: 780 },
}

/**
 * Lunar photo strip: a real full moon at centre, flanked symmetrically by
 * gibbous and crescent photos on each side. Each falls back to hiding
 * itself if its image is missing, rather than showing a broken icon.
 *
 * Entrance: the centre moon is always visible; the three flanking pairs
 * emerge from behind it in sequence (innermost → outermost), each pair
 * sliding out to its resting slot while fading in, triggered once via the
 * shared useScrollReveal() observer ([data-reveal='moon'], see
 * global.css) — the same one-time IntersectionObserver pattern used
 * everywhere else on the site, just with a per-element travel distance.
 */
export default function MoonBanner() {
  const [fullMoonFailed, setFullMoonFailed] = useState(false)
  const [gibbousFailed, setGibbousFailed] = useState(false)
  const [crescentFailed, setCrescentFailed] = useState(false)
  const [halfMoonFailed, setHalfMoonFailed] = useState(false)

  const photoMoon = (name, { src, failed, onFail, mirror, side }) => {
    const stage = STAGES[name]
    const bobDelay = (side === 'left' ? -1 : 1) * (stage.delay / 900 + 0.3)
    return (
      <span
        key={`${name}-${side}`}
        className={`moon moon--${name}`}
        data-reveal="moon"
        style={{
          '--reveal-delay': `${stage.delay}ms`,
          '--moon-from': `${side === 'left' ? stage.moonFrom : -stage.moonFrom}px`,
          '--bob-delay': `${bobDelay}s`,
        }}
      >
        {!failed && (
          <img
            className={`moon__photo ${mirror ? 'moon__photo--mirrored' : ''}`}
            src={src}
            alt=""
            onError={onFail}
          />
        )}
      </span>
    )
  }

  return (
    <section className="section moonBanner">
      <div className="shell">
        <h2 className="display--sm moonBanner__title" data-reveal="up">
          {MOON_BANNER.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="moonBanner__quote" data-reveal="up" style={{ '--reveal-delay': '140ms' }}>
          {MOON_BANNER.quote}
        </p>
      </div>

      <div className="moonBanner__row" aria-hidden="true">
        {photoMoon('half', {
          src: '/images/half-moon.png',
          failed: halfMoonFailed,
          onFail: () => setHalfMoonFailed(true),
          mirror: false,
          side: 'left',
        })}
        {photoMoon('crescent', {
          src: '/images/3.png',
          failed: crescentFailed,
          onFail: () => setCrescentFailed(true),
          mirror: true,
          side: 'left',
        })}
        {photoMoon('gibbous', {
          src: '/images/1.png',
          failed: gibbousFailed,
          onFail: () => setGibbousFailed(true),
          mirror: false,
          side: 'left',
        })}

        <span className="moon moon--full">
          {!fullMoonFailed && (
            <img
              className="moon__photo"
              src="/images/full-moon.png"
              alt=""
              onError={() => setFullMoonFailed(true)}
            />
          )}
        </span>

        {photoMoon('gibbous', {
          src: '/images/1.png',
          failed: gibbousFailed,
          onFail: () => setGibbousFailed(true),
          mirror: true,
          side: 'right',
        })}
        {photoMoon('crescent', {
          src: '/images/3.png',
          failed: crescentFailed,
          onFail: () => setCrescentFailed(true),
          mirror: false,
          side: 'right',
        })}
        {photoMoon('half', {
          src: '/images/half-moon.png',
          failed: halfMoonFailed,
          onFail: () => setHalfMoonFailed(true),
          mirror: true,
          side: 'right',
        })}
      </div>
    </section>
  )
}
