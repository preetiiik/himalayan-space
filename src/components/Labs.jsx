import { Link } from 'react-router-dom'
import { LABS } from '../data/content'
import { slugify } from '../utils/slugify'
import Figure from './Figure'

export default function Labs() {
  return (
    <section className="section labs">
      <div className="shell">
        <p className="eyebrow labs__eyebrow" data-reveal="up">
          {LABS.eyebrow}
        </p>
        <h2 className="display--sm labs__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          {LABS.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        {/* Wide feature card */}
        <article className="lab lab--wide" data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
          <Figure name={LABS.feature.img} ratio="16 / 10" className="lab__media" />
          <div className="lab__body">
            <p className="eyebrow eyebrow--muted">{LABS.feature.eyebrow}</p>
            <h3 className="lab__name lab__name--lg">{LABS.feature.title}</h3>
            <p className="lab__copy">{LABS.feature.body}</p>
            <Link to={`/programs/${slugify(LABS.feature.title)}`} className="btn btn--sm">
              Read More
            </Link>
          </div>
        </article>

        {/* Two supporting cards */}
        <div className="labs__pair">
          {LABS.items.map((item, i) => (
            <article
              className="lab"
              key={item.title}
              data-reveal={i === 0 ? 'left' : 'right'}
              style={{ '--reveal-delay': '120ms' }}
            >
              <Figure name={item.img} ratio="16 / 9" className="lab__media" />
              <div className="lab__body">
                <p className="eyebrow eyebrow--muted">{item.eyebrow}</p>
                <h3 className="lab__name">{item.title}</h3>
                <p className="lab__copy">{item.body}</p>
                <Link to={`/programs/${slugify(item.title)}`} className="btn btn--sm">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
