import { CTA as COPY } from '../data/content'
import { useParallax } from '../hooks/useParallax'

export default function CTA() {
  const glow = useParallax(0.12)

  return (
    <section className="cta" id="contact">
      <div className="cta__scene" aria-hidden="true">
        <div className="cta__limb" ref={glow} />
        <div className="cta__sunrise" />
      </div>

      <div className="shell cta__body">
        <p className="eyebrow cta__eyebrow" data-reveal="up">
          {COPY.eyebrow}
        </p>
        <h2 className="display cta__title" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
          {COPY.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="cta__actions" data-reveal="up" style={{ '--reveal-delay': '230ms' }}>
          <a href="#explore" className="btn btn--solid">
            {COPY.primary}
          </a>
          <a href="#contact" className="btn btn--ghost">
            {COPY.secondary}
          </a>
        </div>
      </div>
    </section>
  )
}
