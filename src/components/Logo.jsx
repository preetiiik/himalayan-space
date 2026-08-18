import { useState } from 'react'

/**
 * HSC badge. Renders the real logo from /images/logo.png and falls back to a
 * drawn hexagon if that file has not been added yet, so the header never
 * shows a broken-image icon.
 */
export default function Logo({ size = 60 }) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        className="logo logo--img"
        src="/images/logo.png"
        alt="Himalayan Space Centre"
        width={size}
        height={size * 0.72}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <svg
      className="logo"
      width={size}
      height={size * 0.72}
      viewBox="0 0 100 72"
      fill="none"
      role="img"
      aria-label="Himalayan Space Centre"
    >
      <path
        className="logo__hexOuter"
        d="M22 6h56l20 30-20 30H22L2 36 22 6Z"
        stroke="var(--accent)"
        strokeWidth="1.6"
        opacity="0.55"
      />
      <path
        className="logo__hexInner"
        d="M27 13h46l16 23-16 23H27L11 36l16-23Z"
        stroke="var(--ink-soft)"
        strokeWidth="1"
        opacity="0.4"
      />
      <text
        x="50"
        y="28"
        textAnchor="middle"
        fontFamily="var(--serif)"
        fontSize="8.5"
        letterSpacing="0.5"
        fill="var(--ink)"
        opacity="0.9"
      >
        Himalayan Space
      </text>
      <path
        className="logo__arrow"
        d="M24 44h44m0 0-9-6m9 6-9 6"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontFamily="var(--sans)"
        fontSize="5"
        letterSpacing="1.6"
        fill="var(--ink-muted)"
      >
        CENTRE
      </text>
    </svg>
  )
}
