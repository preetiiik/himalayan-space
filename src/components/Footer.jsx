import { FOOTER } from '../data/content'
import Logo from './Logo'
import { useState } from 'react'

export default function Footer() {
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div className="footer__brand" data-reveal="up">
          <Logo size={85} />
          <p className="footer__blurb">{FOOTER.blurb}</p>
          <div className="footer__social">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialLink"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}

            <div className="footer__whatsapp">
              <button
                type="button"
                className="footer__socialLink"
                aria-label="WhatsApp"
                onClick={() => setShowWhatsApp(!showWhatsApp)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
                  <path d="M9 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.1.4-1.7.2-1.2-.3-2.4-1-3.4-2s-1.7-2.2-2-3.4c-.2-.6-.1-1.2.2-1.7Z" />
                </svg>
              </button>

              {showWhatsApp && (
                <div className="footer__whatsappMenu">
                  <a
                    href="https://wa.me/919731757556"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 97317 57556
                  </a>

                  <a
                    href="https://wa.me/919606351695"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 96063 51695
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer__col" data-reveal="up" style={{ '--reveal-delay': '110ms' }}>
          <h3 className="footer__heading">{FOOTER.linksHeading}</h3>
          <ul className="footer__list">
            {FOOTER.links.map((l) => {
              const sectionIds = {
                Explore: 'explore',
                'Our Team': 'team',
                Programs: 'programs',
                Gallery: 'gallery',
                'Contact Us': 'contact',
              }

              return (
                <li key={l}>
                  <a
                    href={`#${sectionIds[l] || l.toLowerCase().replace(/\s+/g, '-')}`}
                    className="footer__link"
                  >
                    {l}
                  </a>
                </li>
              )
            })}
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
        <div className="shell">
          {FOOTER.legal}{' '}
          <a
            href={FOOTER.poweredByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__poweredLink"
          >
            {FOOTER.poweredBy}
          </a>
        </div>
      </div>
    </footer>
  )
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: "https://www.instagram.com/himalayanspacecentre/",
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
    href: "https://www.youtube.com/channel/UCaCqkmAakjeRxghbrQCvjg",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: "https://www.facebook.com/himalayanspacecentre",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8.8c0-.5.4-.8 1-.8Z" />
      </svg>
    ),
  },
]
