import { FOOTER } from '../data/content'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__brand" data-reveal="up">
          <Logo size={64} />
          <p className="footer__blurb">{FOOTER.blurb}</p>
          <div className="footer__social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="footer__socialLink" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col" data-reveal="up" style={{ '--reveal-delay': '110ms' }}>
          <h3 className="footer__heading">{FOOTER.linksHeading}</h3>
          <ul className="footer__list">
            {FOOTER.links.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="footer__link">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col" data-reveal="up" style={{ '--reveal-delay': '200ms' }}>
          <h3 className="footer__heading">{FOOTER.contactHeading}</h3>
          <ul className="footer__list">
            {FOOTER.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/[^+\d]/g, '')}`} className="footer__link">
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer__list footer__list--mail">
            {FOOTER.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className="footer__link">
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__legal">
        <div className="shell">{FOOTER.legal}</div>
      </div>
    </footer>
  )
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8.8c0-.5.4-.8 1-.8Z" />
      </svg>
    ),
  },
]
