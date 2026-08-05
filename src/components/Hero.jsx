import { useState } from 'react'
import { HERO } from '../data/content'
import { useScrollY } from '../hooks/useParallax'
import SpaceArt from './SpaceArt'
import './Hero.css'

export default function Hero() {
  const y = useScrollY()
  const [hasPhoto, setHasPhoto] = useState(true)
  const [hasAstronaut, setHasAstronaut] = useState(true)

  // Hero depth: the image drifts slower than the copy, and the whole
  // block fades out as you leave it.
  const imgShift = y * 0.28
  const copyShift = y * 0.5
  const fade = Math.max(0, 1 - y / 620)

  return (
    <section className="hero" id="top">
      <div className="hero__media" style={{ transform: `translate3d(0, ${imgShift}px, 0)` }}>
        <img
          className="hero__photo"
          src="/images/earth-planet.jpg"
          alt=""
          aria-hidden="true"
          onError={() => setHasPhoto(false)}
        />
        {!hasPhoto && <div className="hero__earth" />}
        <div className="hero__astronaut">
          {hasAstronaut ? (
            <img
              className="hero__astronautImg"
              src="/images/hero-astronaut-float.png"
              alt=""
              onError={() => setHasAstronaut(false)}
            />
          ) : (
            <SpaceArt kind="astronaut" />
          )}
        </div>
        <div className="hero__vignette" />
      </div>

      <div className="hero__body shell" style={{ transform: `translate3d(0, ${copyShift}px, 0)`, opacity: fade }}>
        <h1 className="hero__title">
          {HERO.title.map((line, i) => (
            <span className="hero__line" key={line}>
              <span className="hero__lineInner" style={{ animationDelay: `${0.35 + i * 0.14}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero__lede">{HERO.body}</p>

        <div className="hero__actions">
          <a href="#explore" className="btn btn--ghost">
            {HERO.secondary}
          </a>
          <a href="#explore" className="btn btn--solid">
            {HERO.primary}
          </a>
        </div>
      </div>

      <div className="hero__scroll" style={{ opacity: fade }}>
        <span className="hero__scrollLabel">Scroll</span>
        <span className="hero__scrollLine" />
      </div>
    </section>
  )
}
