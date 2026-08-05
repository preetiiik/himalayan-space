# Himalayan Space Centre

React implementation of the Himalayan Space Figma prototype — a single-page,
scroll-driven site with a live starfield, parallax depth, and section reveals.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

```
index.html                 document shell + Google Fonts
src/
  main.jsx                 React entry
  App.jsx                  section composition
  data/content.js          all copy, in one place
  styles/
    global.css             design tokens, buttons, reveal system
    sections.css           every section's layout
  hooks/
    useScrollReveal.js     IntersectionObserver → .is-revealed
    useCountUp.js          0 → target stat animation
    useParallax.js         scroll-linked transforms, nav state
  components/
    Starfield.jsx/.css     canvas stars, twinkle, shooting stars
    Navbar.jsx/.css        sticky nav, scroll progress, mobile menu
    Hero.jsx/.css          layered parallax hero
    About / MoonBanner / Specialties / Facts /
    Programs / Labs / Team / Gallery / CTA / Footer
public/images/             drop real exports here (see its README)
```

## Animation inventory

| Where | What happens |
| --- | --- |
| Background | Canvas starfield: 3 depth bands drift upward, per-star twinkle, pointer-reactive shift, occasional shooting stars. Pauses on tab blur. |
| Nav | Condenses and blurs past 90px, scroll-progress bar, animated underline on the active link, circular clip-path reveal on mobile |
| Hero | Headline lines rise out of overflow masks in sequence; astronaut floats on a 13s drift; Earth limb and copy scroll at different rates; block fades out on exit |
| About | Directional reveals; Saturn counter-rotates on scroll with a tilting ring; ISS parallaxes through a breathing orbit ring |
| Moon banner | Eight CSS moons, each with a sliding terminator, staggered scale-in, offset bobbing |
| Specialties | Cards lift on hover, rule extends, artwork scales/rotates out of the card, accent glow blooms behind |
| Facts | Stats count 0 → target with an ease-out-expo curve when scrolled into view; twinkling dots |
| Universe | Planetarium dome parallaxes and rotates; interior glow shifts on a loop |
| Programs / Events / Labs | Staggered reveals, image zoom + sheen wipe on hover, arrow slides on "Read More" |
| Team | Greyscale portraits regain colour and lift on hover; accent scan line sweeps down |
| Gallery | Tiles scale above their neighbours on hover; full lightbox with arrow-key/Escape navigation |
| CTA | Parallax Earth limb with a breathing sunrise terminator |
| Footer | Links slide right behind a growing rule; social icons lift and tilt |

Every animation is disabled under `prefers-reduced-motion: reduce`, and reveal
targets are forced visible so no content is ever hidden behind an animation.

## Notes

- No animation library — all motion is CSS transitions/keyframes driven by
  `IntersectionObserver` and rAF-throttled scroll listeners.
- Copy lives in `src/data/content.js`; edit there, not in components.
- Planets, moons, the ISS and the specialty artwork are CSS/SVG stand-ins
  because the Figma file is view-only and couldn't be exported. See
  `public/images/README.md` to swap in the real assets.
