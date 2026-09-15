import { useEffect, useState } from 'react'
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
// Letters, spaces, hyphens and apostrophes only — no digits or other special characters
const NAME_RE = /^[A-Za-z][A-Za-z' -]*$/

// Matches the hubs listed in the site's "Phone Communications" panel
const COUNTRY_CODES = [
  { code: '+1', label: '+1 (Primary Hub)' },
  { code: '+880', label: '+880 (Regional Link)' },
  { code: '+91', label: '+91 (Field Ops)' },
]

// The country code is chosen separately via the dropdown, so this only
// deals with the remaining local digits — strip anything non-numeric as
// it's typed and cap it at 10 digits.
const sanitizePhoneInput = (raw) => raw.replace(/\D/g, '').slice(0, 10)

const validatePhoneValue = (digits) => {
  if (!digits) return 'Secure line is required.'
  if (digits.length < 10) return 'Number is too short — enter all 10 digits.'
  if (digits.length > 10) return 'Number is too long — enter only 10 digits.'
  if (!/^[6-9]/.test(digits)) return 'Number must start with 6, 7, 8, or 9.'
  return ''
}

// Backend endpoint for the contact form. server.js runs standalone on its
// own port (CORS is locked to the Vite dev origin, not proxied), so this
// needs the full backend URL. Override with VITE_API_URL in a .env file
// for staging/production instead of editing this directly.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const CONTACT_ENDPOINT = `${API_BASE}/api/contact`

export default function Contact() {
  const location = useLocation()
  const presetMission = location.state?.missionType ?? ''

  const initialValues = () => ({
    missionType: presetMission,
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  })

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const closeSuccess = () => {
    setSubmitted(false)
    setValues(initialValues())
    setErrors({})
  }

  // Auto-dismiss the confirmation after a few seconds
  useEffect(() => {
    if (!submitted) return undefined
    const timer = setTimeout(closeSuccess, 6000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const handlePhoneChange = (e) => {
    const sanitized = sanitizePhoneInput(e.target.value)
    setValues((v) => ({ ...v, phone: sanitized }))
    if (errors.phone) setErrors((err) => ({ ...err, phone: undefined }))
  }

  const handlePhoneBlur = () => {
    const message = validatePhoneValue(values.phone)
    setErrors((err) => ({ ...err, phone: message || undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.missionType) next.missionType = 'Choose a mission type.'
    if (!values.fullName.trim()) next.fullName = 'Identity verification required.'
    else if (!NAME_RE.test(values.fullName.trim())) next.fullName = 'Name can only contain letters, spaces, and hyphens.'
    if (!values.email.trim() || !EMAIL_RE.test(values.email)) next.email = 'Enter a valid frequency (email).'
    const phoneError = validatePhoneValue(values.phone)
    if (phoneError) next.phone = phoneError
    if (!values.message.trim()) next.message = 'Transmission details cannot be empty.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    const payload = {
      missionType: values.missionType,
      name: values.fullName.trim(),
      email: values.email.trim(),
      countryCode: values.countryCode,
      phone: values.phone,
      message: values.message.trim(),
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Server responded with ${res.status}`)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('[Contact] submission failed', err)
      setSubmitError(err.message || 'Transmission failed — please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
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
            <div className="contactForm__phoneRow">
              <select
                className="contactForm__select contactForm__select--code"
                value={values.countryCode}
                onChange={update('countryCode')}
                aria-label="Country code"
              >
                {COUNTRY_CODES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                className="contactForm__input contactForm__input--phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="9876543210"
                value={values.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                aria-invalid={Boolean(errors.phone)}
              />
            </div>
            {errors.phone && <span className="contactForm__error">{errors.phone}</span>}
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

          <button className="contactForm__submit" type="submit" disabled={submitting}>
            <i aria-hidden="true">▷</i> {submitted ? 'Signal Sent' : submitting ? 'Transmitting…' : 'Submit'}
          </button>

          {submitError && <p className="contactForm__error contactForm__error--submit">{submitError}</p>}

          <p className="contactForm__footnote">
            Encryption: End-to-End // Himalayan Space Centre Secure Channel
          </p>
        </form>

        {submitted && (
          <div
            className="contactSuccess__overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contactSuccessTitle"
            onClick={closeSuccess}
          >
            <div className="contactSuccess__card" onClick={(e) => e.stopPropagation()}>
              <span className="contactSuccess__icon" aria-hidden="true">
                ✓
              </span>
              <h2 className="contactSuccess__title" id="contactSuccessTitle">
                Signal Sent
              </h2>
              <p className="contactSuccess__text">
                Your transmission has reached mission control. We'll respond to your secure line shortly.
              </p>
              <button type="button" className="contactSuccess__close" onClick={closeSuccess}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}