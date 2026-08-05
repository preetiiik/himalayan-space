import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Contact.css'

const MISSION_TYPES = [
  'Young Astronaut Program',
  'Astro Summer Camp',
  'Astronomy Sessions',
  'Space Lab Partnership',
  'General Inquiry',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const location = useLocation()
  const presetMission = location.state?.missionType ?? ''

  const [values, setValues] = useState({
    missionType: presetMission,
    fullName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.missionType) next.missionType = 'Choose a mission type.'
    if (!values.fullName.trim()) next.fullName = 'Identity verification required.'
    if (!values.email.trim() || !EMAIL_RE.test(values.email)) next.email = 'Enter a valid frequency (email).'
    if (!values.message.trim()) next.message = 'Transmission details cannot be empty.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // TODO: wire to a real backend/email service once one exists in this
    // project — no such service is present yet, so this just logs the
    // payload and shows a local confirmation state.
    console.log('[Contact] transmission queued', values)
    setSubmitted(true)
  }

  return (
    <section className="contactPage">
      <div className="shell contactPage__inner">
        <span className="contactPage__badge" data-reveal="up">
          Secure Channel // Inquiry
        </span>

        <h1 className="contactPage__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
          Establish Contact
        </h1>

        <p className="contactPage__sub" data-reveal="up" style={{ '--reveal-delay': '140ms' }}>
          Connecting humanity with the infinite. Our mission control is ready for your signal.
        </p>

        <form className="contactForm" data-reveal="up" style={{ '--reveal-delay': '200ms' }} onSubmit={handleSubmit} noValidate>
          <label className="contactForm__field">
            <span className="contactForm__label">Mission Type</span>
            <select
              className="contactForm__select"
              value={values.missionType}
              onChange={update('missionType')}
              aria-invalid={Boolean(errors.missionType)}
            >
              <option value="">—Please choose an option—</option>
              {MISSION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.missionType && <span className="contactForm__error">{errors.missionType}</span>}
          </label>

          <label className="contactForm__field">
            <span className="contactForm__label">Full Name</span>
            <input
              className="contactForm__input"
              type="text"
              placeholder="Identity Verification Required"
              value={values.fullName}
              onChange={update('fullName')}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && <span className="contactForm__error">{errors.fullName}</span>}
          </label>

          <label className="contactForm__field">
            <span className="contactForm__label">Communication Frequency [Email]</span>
            <input
              className="contactForm__input"
              type="email"
              placeholder="alias@domain.com"
              value={values.email}
              onChange={update('email')}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="contactForm__error">{errors.email}</span>}
          </label>

          <label className="contactForm__field">
            <span className="contactForm__label">Secure Line [Tel]</span>
            <input
              className="contactForm__input"
              type="tel"
              placeholder="+00 000 000 000"
              value={values.phone}
              onChange={update('phone')}
            />
          </label>

          <label className="contactForm__field">
            <span className="contactForm__label">Message Protocol</span>
            <textarea
              className="contactForm__textarea"
              placeholder="Enter transmission details..."
              rows={5}
              value={values.message}
              onChange={update('message')}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <span className="contactForm__error">{errors.message}</span>}
          </label>

          <button className="contactForm__submit" type="submit">
            <i aria-hidden="true">▷</i> {submitted ? 'Signal Sent' : 'Submit'}
          </button>

          <p className="contactForm__footnote">
            Encryption: End-to-End // Himalayan Space Centre Secure Channel
          </p>
        </form>
      </div>
    </section>
  )
}
