import { useState } from 'react'
import { CONTACT_SECTION, FOOTER } from '../data/content'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMAIL_PRIORITY = ['ceo', 'space']

export default function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Name is required.'
    if (!values.email.trim() || !EMAIL_RE.test(values.email)) next.email = 'Enter a valid email.'
    if (!values.message.trim()) next.message = 'Please describe your inquiry.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: wire to a real form-handling/email service once one exists
    // in this project — none is currently set up, so this just logs the
    // payload and shows a local confirmation state.
    console.log('[ContactSection] inquiry queued', values)
    setSubmitted(true)
  }

  const orderedEmails = [...FOOTER.emails].sort(
    (a, b) => EMAIL_PRIORITY.indexOf(a.split('@')[0]) - EMAIL_PRIORITY.indexOf(b.split('@')[0])
  )

  return (
    <section className="section contactSection" id="contact">
      <div className="shell contactSection__grid">
        <div className="contactSection__form">
          <h2 className="contactSection__title" data-reveal="up">
            {CONTACT_SECTION.title}
          </h2>
          <p className="lede contactSection__sub" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
            {CONTACT_SECTION.subtitle}
          </p>
          <hr
            className="divider contactSection__divider"
            data-reveal="up"
            style={{ '--reveal-delay': '120ms' }}
          />

          <form
            className="contactSection__formEl"
            onSubmit={handleSubmit}
            noValidate
            data-reveal="up"
            style={{ '--reveal-delay': '160ms' }}
          >
            <div className="contactSection__row">
              <label className="contactSection__field">
                <span className="contactSection__label">Name</span>
                <input
                  className="contactSection__input"
                  type="text"
                  placeholder="Enter your Name"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="contactSection__error">{errors.name}</span>}
              </label>

              <label className="contactSection__field">
                <span className="contactSection__label">Email</span>
                <input
                  className="contactSection__input"
                  type="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="contactSection__error">{errors.email}</span>}
              </label>
            </div>

            <label className="contactSection__field">
              <span className="contactSection__label">Phone</span>
              <input
                className="contactSection__input"
                type="tel"
                placeholder="+X-XXX-XXX-XXXX"
                value={values.phone}
                onChange={update('phone')}
              />
            </label>

            <label className="contactSection__field">
              <span className="contactSection__label">Comment/Message</span>
              <textarea
                className="contactSection__input contactSection__textarea"
                placeholder="Briefly describe your mission or inquiry..."
                rows={3}
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <span className="contactSection__error">{errors.message}</span>}
            </label>

            <button type="submit" className="btn btn--ghost contactSection__submit">
              {submitted ? 'Sent' : 'Initiate Contact'} <i aria-hidden="true">→</i>
            </button>
          </form>

          <div className="contactSection__legal" data-reveal="up" style={{ '--reveal-delay': '200ms' }}>
            <p className="contactSection__legalIntro">{CONTACT_SECTION.legal}</p>
            <p className="contactSection__legalHeading">{CONTACT_SECTION.registeredOffice.heading}</p>
            <address className="contactSection__legalAddress">
              {CONTACT_SECTION.registeredOffice.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
        </div>

        <div className="contactSection__info" data-reveal="right">
          <div className="contactSection__group">
            <p className="contactSection__groupLabel">Phone Communications</p>
            <span className="contactSection__groupRule" />
            <div className="contactSection__phones">
              {FOOTER.phones.map((number, i) => (
                <div className="contactSection__phone" key={number}>
                  <span className="contactSection__phoneNumber">{number}</span>
                  <span className="contactSection__phoneLabel">{CONTACT_SECTION.phoneLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contactSection__group">
            <p className="contactSection__groupLabel">Digital Protocols</p>
            <span className="contactSection__groupRule" />
            <div className="contactSection__emails">
              {orderedEmails.map((email) => (
                <a className="contactSection__email" href={`mailto:${email}`} key={email}>
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}