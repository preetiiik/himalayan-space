# Image assets

The Figma file could not be exported programmatically (view-only access), so the
build ships with CSS/SVG stand-ins. Drop real exports here using these exact
names and they take over automatically — no code changes needed.

## Hero

| File | Used by | Notes |
| --- | --- | --- |
| `astronaut.png` | `Hero.css` → `.hero__astronaut` | Transparent PNG, ~900px tall |

## Programs (`4:3`)

- `program-thailand.jpg`
- `program-space-day.jpg`
- `program-classes.jpg`

## Events (`3:4` posters)

- `event-young.jpg`
- `event-camp.jpg`
- `event-astronomy.jpg`

## Labs

- `lab-inauguration.jpg` (`16:10`)
- `lab-telescope.jpg` (`16:9`)
- `lab-rocketry.jpg` (`16:9`)

## Team — `public/images/team/`

Filename = lowercased name, punctuation stripped, spaces → hyphens.
Example: `Mr. Afroz Al Mamun` → `mr-afroz-al-mamun.jpg`. Portraits are `3:4`.

## Gallery — `public/images/gallery/`

`1.jpg` through `30.jpg`, square crops. Change the count in
`src/data/content.js` → `GALLERY.count` if you have a different number.

Missing files degrade gracefully: `Figure` swaps to a shimmering placeholder and
team portraits hide themselves rather than showing a broken-image icon.
