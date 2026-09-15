import { useState } from 'react'

/**
 * Image slot with a shimmering skeleton and a graceful fallback.
 * Looks for /public/images/<name>.jpg — until the real exports are dropped in,
 * the gradient placeholder keeps the layout intact.
 *
 * `ratio` is optional — pass e.g. "4 / 3" to force a fixed box (cropped via
 * object-fit in CSS), or omit it to let the image render at its natural
 * dimensions instead.
 */
export default function Figure({ name, ratio = null, className = '', alt = '' }) {
  const [state, setState] = useState('loading')

  return (
    <div
      className={`figure ${className} figure--${state}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        src={`/images/${name}.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setState('ready')}
        onError={() => setState('missing')}
      />
      <span className="figure__skeleton" aria-hidden="true" />
      <span className="figure__sheen" aria-hidden="true" />
    </div>
  )
}