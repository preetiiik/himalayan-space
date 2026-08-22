import { useState } from 'react'
import { ABOUT, STORY, VISION_MISSION } from '../data/content'
import { useParallax } from '../hooks/useParallax'
import { usePinProgress } from '../hooks/useScrollProgress'
import { useInView } from '../hooks/useInView'

export default function About() {
  const saturn = useParallax(-0.22, { rotate: 6 })
  const [saturnRevealRef, saturnInView] = useInView({ threshold: 0.25 })
  const vmPin = usePinProgress('--vm-progress')
  const [saturnImgFailed, setSaturnImgFailed] = useState(false)
  const [stationImgFailed, setStationImgFailed] = useState(false)

  return (
    <section className="section about" id="explore">
      {/* ---- Every explorer starts with a question ---- */}
      <div className="shell about__grid">
        <div>
          <p className="eyebrow" data-reveal="up">
            {ABOUT.eyebrow}
          </p>
          <h2 className="display about__title" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
            {ABOUT.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <div className="about__stat" data-reveal="up" style={{ '--reveal-delay': '260ms' }}>
            <span className="about__statValue">{ABOUT.stat.value}</span>
            <span className="about__statLabel">{ABOUT.stat.label}</span>
          </div>
        </div>

        <div className="about__aside">
          <p className="lede" data-reveal="right" style={{ '--reveal-delay': '160ms' }}>
            {ABOUT.body}
          </p>
          <div className="about__badges" data-reveal="right" style={{ '--reveal-delay': '300ms' }}>
            {ABOUT.badges.map((b) => (
              <span className="about__badge" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Origin story, with Saturn drifting alongside ---- */}
      <div className="about__story">
        <div className="shell about__storyGrid">
          <div className="about__storyText">
            {STORY.map((para, i) => (
              <p key={i} data-reveal="up" style={{ '--reveal-delay': `${i * 110}ms` }}>
                {para}
              </p>
            ))}
          </div>

          <div
            className={`about__saturnWrap${saturnInView ? ' is-in' : ''}`}
            aria-hidden="true"
            ref={saturnRevealRef}
          >
            <div className="about__saturn" ref={saturn}>
              {saturnImgFailed ? (
                <>
                  <span className="about__saturnBody" />
                  <span className="about__saturnRing" />
                </>
              ) : (
                <img
                  className="about__saturnImg"
                  src="/images/saturn.png"
                  alt=""
                  onError={() => setSaturnImgFailed(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Vision / Mission, orbiting the station ---- */}
      <div className="shell">
        <hr className="divider" />
      </div>

      <div className="about__vmPin" ref={vmPin}>
        <div className="shell about__vm">
          <div className="about__vmCell about__vmCell--start">
            <p className="eyebrow eyebrow--ruled">{VISION_MISSION.vision.label}</p>
            <p className="lede">{VISION_MISSION.vision.body}</p>
          </div>

          <div className="about__orbit" aria-hidden="true">
            <span className="about__orbitRing" />
            <div
              className={`about__station ${stationImgFailed ? 'about__station--drawn' : 'about__station--photo'}`}
            >
              {!stationImgFailed && (
                <img
                  className="about__stationImg"
                  src="/images/satellite.png"
                  alt=""
                  onError={() => setStationImgFailed(true)}
                />
              )}
            </div>
          </div>

          <div className="about__vmCell about__vmCell--end">
            <p className="eyebrow eyebrow--ruled about__vmLabelEnd">{VISION_MISSION.mission.label}</p>
            <p className="lede">{VISION_MISSION.mission.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}