import { useState } from 'react'
import { CONTACT_SECTION, FOOTER } from '../data/content'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Letters, spaces, hyphens and apostrophes only
const NAME_RE = /^[A-Za-z][A-Za-z' -]*$/

const EMAIL_PRIORITY = ['ceo', 'space']

// Matches the hubs listed in the "Phone Communications" panel
const COUNTRY_CODES = [
  { code: '+1', label: '+1 (Primary Hub)' },
  { code: '+880', label: '+880 (Regional Link)' },
  { code: '+91', label: '+91 (Field Ops)' },
]

// The country code is chosen separately via the dropdown.
// This only handles the remaining local digits, capped at 10.
const sanitizePhoneDigits = (raw) =>
  raw.replace(/\D/g, '').slice(0, 10)

const validatePhoneDigits = (digits) => {
  if (!digits) return 'Phone number is required.'
  if (digits.length < 10) {
    return 'Number is too short — enter all 10 digits.'
  }
  if (digits.length > 10) {
    return 'Number is too long — enter only 10 digits.'
  }
  return ''
}

export default function ContactSection() {
  // Form values
  const [values, setValues] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    message: '',
  })

  // Validation errors
  const [errors, setErrors] = useState({})

  // Successful submission state
  const [submitted, setSubmitted] = useState(false)

  // Success popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  // Update normal fields
  const update = (field) => (e) => {
    setValues((v) => ({
      ...v,
      [field]: e.target.value,
    }))

    // Clear error when user starts correcting the field
    if (errors[field]) {
      setErrors((err) => ({
        ...err,
        [field]: undefined,
      }))
    }
  }

  // Handle phone input
  const handlePhoneChange = (e) => {
    const digits = sanitizePhoneDigits(e.target.value)

    setValues((v) => ({
      ...v,
      phone: digits,
    }))

    if (errors.phone) {
      setErrors((err) => ({
        ...err,
        phone: undefined,
      }))
    }
  }

  // Validate phone on blur
  const handlePhoneBlur = () => {
    const message = validatePhoneDigits(values.phone)

    setErrors((err) => ({
      ...err,
      phone: message || undefined,
    }))
  }

  // Validate complete form
  const validate = () => {
    const next = {}

    // Name validation
    if (!values.name.trim()) {
      next.name = 'Name is required.'
    } else if (!NAME_RE.test(values.name.trim())) {
      next.name =
        'Name can only contain letters, spaces, and hyphens.'
    }

    // Email validation
    if (
      !values.email.trim() ||
      !EMAIL_RE.test(values.email.trim())
    ) {
      next.email = 'Enter a valid email.'
    }

    // Phone validation
    const phoneError = validatePhoneDigits(values.phone)

    if (phoneError) {
      next.phone = phoneError
    }

    // Message validation
    if (!values.message.trim()) {
      next.message = 'Please describe your inquiry.'
    }

    setErrors(next)

    return Object.keys(next).length === 0
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate before sending
    if (!validate()) {
      return
    }

    try {
      // Reset previous submitted state
      setSubmitted(false)

      const response = await fetch(
        'http://localhost:5000/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            countryCode: values.countryCode,
            phone: values.phone,
            message: values.message.trim(),
          }),
        }
      )

      const data = await response.json()

      // Backend returned an error
      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to send inquiry'
        )
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      setSubmitted(true)

      // Show success popup
      setShowSuccessPopup(true)

      // Clear form
      setValues({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        message: '',
      })

      // Clear validation errors
      setErrors({})
    } catch (error) {
      console.error('Contact form error:', error)

      alert(
        error.message ||
          'Something went wrong. Please try again.'
      )
    }
  }

  // Sort emails according to priority
  const orderedEmails = [...FOOTER.emails].sort(
    (a, b) =>
      EMAIL_PRIORITY.indexOf(a.split('@')[0]) -
      EMAIL_PRIORITY.indexOf(b.split('@')[0])
  )

  return (
    <section
      className="section contactSection"
      id="contact"
    >
      <div className="shell contactSection__grid">

        {/* =========================
            CONTACT FORM
        ========================== */}

        <div className="contactSection__form">

          <h2
            className="contactSection__title"
            data-reveal="up"
          >
            {CONTACT_SECTION.title}
          </h2>

          <p
            className="lede contactSection__sub"
            data-reveal="up"
            style={{
              '--reveal-delay': '80ms',
            }}
          >
            {CONTACT_SECTION.subtitle}
          </p>

          <hr
            className="divider contactSection__divider"
            data-reveal="up"
            style={{
              '--reveal-delay': '120ms',
            }}
          />

          <form
            className="contactSection__formEl"
            onSubmit={handleSubmit}
            noValidate
            data-reveal="up"
            style={{
              '--reveal-delay': '160ms',
            }}
          >

            {/* NAME + EMAIL */}

            <div className="contactSection__row">

              <label className="contactSection__field">
                <span className="contactSection__label">
                  Name
                </span>

                <input
                  className="contactSection__input"
                  type="text"
                  placeholder="Enter your Name"
                  value={values.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                />

                {errors.name && (
                  <span className="contactSection__error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="contactSection__field">
                <span className="contactSection__label">
                  Email
                </span>

                <input
                  className="contactSection__input"
                  type="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                />

                {errors.email && (
                  <span className="contactSection__error">
                    {errors.email}
                  </span>
                )}
              </label>

            </div>

            {/* PHONE */}

            <label className="contactSection__field">

              <span className="contactSection__label">
                Phone
              </span>

              <div className="contactSection__phoneRow">

                <select
                  className="contactSection__input contactSection__select contactSection__select--code"
                  value={values.countryCode}
                  onChange={update('countryCode')}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map(
                    ({ code, label }) => (
                      <option
                        key={code}
                        value={code}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>

                <input
                  className="contactSection__input contactSection__input--phone"
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

              {errors.phone && (
                <span className="contactSection__error">
                  {errors.phone}
                </span>
              )}

            </label>

            {/* MESSAGE */}

            <label className="contactSection__field">

              <span className="contactSection__label">
                Comment/Message
              </span>

              <textarea
                className="contactSection__input contactSection__textarea"
                placeholder="Briefly describe your mission or inquiry..."
                rows={3}
                value={values.message}
                onChange={update('message')}
                aria-invalid={Boolean(errors.message)}
              />

              {errors.message && (
                <span className="contactSection__error">
                  {errors.message}
                </span>
              )}

            </label>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="btn btn--ghost contactSection__submit"
            >
              {submitted
                ? 'Sent'
                : 'Initiate Contact'}

              <i aria-hidden="true">
                →
              </i>
            </button>

          </form>

          {/* LEGAL INFORMATION */}

          <div
            className="contactSection__legal"
            data-reveal="up"
            style={{
              '--reveal-delay': '200ms',
            }}
          >

            <p className="contactSection__legalIntro">
              {CONTACT_SECTION.legal}
            </p>

            <p className="contactSection__legalHeading">
              {CONTACT_SECTION.registeredOffice.heading}
            </p>

            <address className="contactSection__legalAddress">
              {CONTACT_SECTION.registeredOffice.lines.map(
                (line) => (
                  <span key={line}>
                    {line}
                  </span>
                )
              )}
            </address>

          </div>

        </div>

        {/* =========================
            CONTACT INFORMATION
        ========================== */}

        <div
          className="contactSection__info"
          data-reveal="right"
        >

          {/* PHONE COMMUNICATIONS */}

          <div className="contactSection__group">

            <p className="contactSection__groupLabel">
              Phone Communications
            </p>

            <span className="contactSection__groupRule" />

            <div className="contactSection__phones">

              {FOOTER.phones.map(
                (number, i) => (
                  <div
                    className="contactSection__phone"
                    key={number}
                  >

                    <a
                      className="contactSection__phoneNumber"
                      href={`tel:${number.replace(
                        /[^+\d]/g,
                        ''
                      )}`}
                    >
                      {number}
                    </a>

                    <span className="contactSection__phoneLabel">
                      {CONTACT_SECTION.phoneLabels[i]}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          {/* DIGITAL PROTOCOLS */}

          <div className="contactSection__group">

            <p className="contactSection__groupLabel">
              Digital Protocols
            </p>

            <span className="contactSection__groupRule" />

            <div className="contactSection__emails">

              {orderedEmails.map(
                (email) => (
                  <a
                    className="contactSection__email"
                    href={`mailto:${email}`}
                    key={email}
                  >
                    {email}
                  </a>
                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          SUCCESS POPUP
      ========================== */}

      {showSuccessPopup && (
        <div
          className="contactSuccessOverlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contactSuccessTitle"
        >

          <div className="contactSuccessPopup">

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="contactSuccessClose"
              onClick={() =>
                setShowSuccessPopup(false)
              }
              aria-label="Close"
            >
              ×
            </button>

            {/* SUCCESS ICON */}

            <div
              className="contactSuccessIcon"
              aria-hidden="true"
            >
              ✓
            </div>

            {/* TITLE */}

            <h3 id="contactSuccessTitle">
              Message Sent Successfully
            </h3>

            {/* MESSAGE */}

            <p>
              Thank you for contacting Himalayan
              Space. Your inquiry has been received
              successfully. Our team will get back to
              you shortly.
            </p>

            {/* OK BUTTON */}

            <button
              type="button"
              className="contactSuccessButton"
              onClick={() =>
                setShowSuccessPopup(false)
              }
            >
              OK
            </button>

          </div>

        </div>
      )}

    </section>
  )
}