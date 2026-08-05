import { Link, useNavigate } from 'react-router-dom'
import { PROGRAMS, EVENTS } from '../data/content'
import { slugify } from '../utils/slugify'
import Figure from './Figure'

export default function Programs() {
  const navigate = useNavigate()

  const joinEvent = (title) => {
    navigate('/contact', { state: { missionType: title } })
  }

  return (
    <section className="section programs">
      {/* ---- Our Programs ---- */}
      <div className="shell">
        <p className="eyebrow" data-reveal="up">
          {PROGRAMS.eyebrow}
        </p>
        <h2 className="programs__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          {PROGRAMS.title}
        </h2>

        <div className="programs__grid">
          {PROGRAMS.items.map((item, i) => (
            <article
              className="prog"
              key={item.title}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 130}ms` }}
            >
              <Figure name={item.img} ratio="4 / 3" className="prog__media" />
              <p className="prog__tag">{item.tag}</p>
              <time className="prog__date">{item.date}</time>
              <h3 className="prog__name">{item.title}</h3>
              <p className="prog__body">{item.body}</p>
              <Link to={`/programs/${slugify(item.title)}`} className="prog__more">
                Read More <i aria-hidden="true">→</i>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* ---- Events ---- */}
      <div className="shell programs__events">
        <p className="eyebrow" data-reveal="up">
          {EVENTS.eyebrow}
        </p>
        <h2 className="programs__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          {EVENTS.title}
        </h2>

        <div className="programs__grid">
          {EVENTS.items.map((item, i) => (
            <article
              className="event"
              key={item.title}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 130}ms` }}
            >
              <Figure name={item.img} ratio="3 / 4" className="event__media" />
              <div className="event__foot">
                <h3 className="event__name">{item.title}</h3>
                <p className="event__date">
                  <i aria-hidden="true">◷</i> {item.date}
                </p>
                <button className="btn btn--sm event__btn" onClick={() => joinEvent(item.title)}>
                  Join Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
