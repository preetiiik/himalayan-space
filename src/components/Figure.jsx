import { useState } from 'react'

/**
 * Image slot with a shimmering skeleton and a graceful fallback.
 * Looks for /public/images/<name>.jpg — until the real exports are dropped in,
 * the gradient placeholder keeps the layout intact.
 */
export default function Figure({ name, ratio = '4 / 3', className = '', alt = '' }) {
  const [state, setState] = useState('loading')

  return (
    <div
      className={`figure ${className} figure--${state}`}
      style={{ aspectRatio: ratio }}
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
