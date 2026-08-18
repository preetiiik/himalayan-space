import { TEAM } from '../data/content'

/**
 * Portraits render greyscale and desaturated, then lift and regain colour
 * on hover — the treatment used in the prototype's team grid.
 */
export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="shell">
        <h2 className="display--sm team__title" data-reveal="up">
          {TEAM.title}
        </h2>
        <p className="team__subtitle" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
          {TEAM.subtitle}
        </p>

        {TEAM.groups.map((group) => (
          <div className="team__group" key={group.heading}>
            <h3 className="team__heading" data-reveal="left">
              {group.heading}
            </h3>

            <div className="team__grid">
              {group.people.map((person, i) => (
                <figure
                  className="member"
                  key={person.name}
                  data-reveal="up"
                  style={{ '--reveal-delay': `${(i % 5) * 90}ms` }}
                >
                  <div className="member__portrait">
                    <img
                      src={`/images/team/${slug(person.name)}.jpg`}
                      alt={person.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden'
                      }}
                    />
                    <span className="member__scan" aria-hidden="true" />
                  </div>
                  <figcaption>
                    <span className="member__name">{person.name}</span>
                    <span className="member__role">{person.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/\s+/g, '-')
