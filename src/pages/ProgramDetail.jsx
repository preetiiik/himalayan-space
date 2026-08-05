import { Link, useParams } from 'react-router-dom'
import { PROGRAMS, LABS } from '../data/content'
import { slugify } from '../utils/slugify'
import Figure from '../components/Figure'
import './ProgramDetail.css'

// Shared detail-page template — not just for "Our Programs" cards.
// Anything with the same shape (title, date, tag, body, fullBody,
// gallery) can link into it via /programs/:slug, so the Labs section's
// "Space Labs" feature reuses this pool instead of a duplicate entry.
const DETAIL_ENTRIES = [...PROGRAMS.items, LABS.feature, ...LABS.items]

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = DETAIL_ENTRIES.find((item) => item && slugify(item.title) === slug)

  if (!program) {
    return (
      <section className="section progDetail">
        <div className="shell">
          <p className="eyebrow">Program Not Found</p>
          <h1 className="display--sm progDetail__title">We couldn't find that program.</h1>
          <Link to="/" className="btn btn--ghost btn--sm progDetail__back">
            ← Back to Home
          </Link>
        </div>
      </section>
    )
  }

  const gallery = program.gallery?.length ? program.gallery : [program.img]

  return (
    <section className="section progDetail">
      <div className="shell">
        <Link to="/" className="progDetail__back">
          ← Back to Home
        </Link>

        <p className="eyebrow progDetail__tag" data-reveal="up">
          {program.tag}
        </p>
        <h1 className="display progDetail__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          {program.title}
        </h1>
        <time className="progDetail__date" data-reveal="up" style={{ '--reveal-delay': '120ms' }}>
          {program.date}
        </time>

        <p className="lede progDetail__body" data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
          {program.body}
        </p>
        <p className="progDetail__placeholder" data-reveal="up" style={{ '--reveal-delay': '200ms' }}>
          {program.fullBody}
        </p>
      </div>

      <div className="shell progDetail__galleryWrap">
        <p className="eyebrow" data-reveal="up">
          Gallery
        </p>
        <div className="progDetail__gallery">
          {gallery.map((img, i) => (
            <div
              className="progDetail__galleryItem"
              key={`${img}-${i}`}
              data-reveal="up"
              style={{ '--reveal-delay': `${i * 100}ms` }}
            >
              <Figure name={img} ratio="4 / 3" className="progDetail__galleryMedia" />
            </div>
          ))}
        </div>
      </div>

      {program.extraBlocks?.map((block, i) => (
        <div className="shell progDetail__block" key={i} data-reveal="up">
          <div className="progDetail__banner">
            <Figure name={block.image} ratio="21 / 9" className="progDetail__bannerMedia" />
            {block.caption && <p className="progDetail__bannerCaption">{block.caption}</p>}
          </div>
        </div>
      ))}
    </section>
  )
}
