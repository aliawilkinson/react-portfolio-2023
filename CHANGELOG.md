# Changelog

All notable changes to this project are documented here.

---

## [Refactor] - May 2026

A pass over the codebase to fix bugs, remove anti-patterns, and bring things up to current React conventions. Nothing visual changed - this is all structural and correctness work.

---

### Bug Fixes

**`Testimonials.jsx` - stray `section` keyword in JSX**
The opening tag was `<motion.section section className=...>` - the extra `section` was being treated as a boolean prop. Removed it.

**`Experience.jsx` - progress bar dots didn't match the data**
The timeline had 4 hardcoded dots with hardcoded colors that didn't correspond to the 5 `workExp` entries. The dots are now rendered by mapping over `workExp` and reading `exp.dotColor` from the data, so they'll always stay in sync.

**`useOutsideAlerter` - viewport width captured at mount, never updated**
`document.documentElement.clientWidth` was read outside `useEffect`, so it captured the width once at mount and never updated on resize. Moved the read inside the event handler so it's always current. Also added `setMenuOpened` to the dependency array.

**`useHeaderShadow` - inconsistent state type (boolean vs string)**
Initial state was `false` (boolean) but the hook set it to a CSS string on scroll. Now initializes to `"none"` (string) consistently. Extracted the shadow string to a named constant to avoid repetition.

**`Header.jsx` - asset imports used wrong relative path**
LinkedIn and GitHub SVGs were imported as `'../../../src/assets/...'` - a path that works by accident but is wrong. Fixed to `'../../assets/...'`.

**`Footer.jsx` - same wrong asset import paths**
Same issue as Header. Fixed.

**`InfoPost.jsx` - missing `alt` attribute on post image**
The `<img>` had no `alt`. Now uses the post title as the alt text.

**`Hero.jsx` - empty `alt` attribute on portrait**
`alt=""` is valid for decorative images but this is a portrait photo that conveys meaning. Changed to `alt="Alia Wilkinson"`.

**`CaseStudies.jsx` - generic `alt="project"` on all images**
Each case study image now has a descriptive alt text matching its content.

**`Testimonials.jsx` - `alt=""` on reviewer photos, `key={i}` on named data**
Reviewer photos now use `alt={comment.name}`. Keys changed from array index to `comment.name` since the data is stable and names are unique.

**`Experience.jsx` - `key={i}` on named data**
Keys changed from array index to `exp.place`.

---

### Architecture / Structure

**`Header` and `Footer` were rendered inside both `Home` and `InfoPost`**
This meant every route was responsible for mounting its own chrome, and any change to the header/footer had to be made in multiple places. Moved both up to `App.jsx` so they wrap all routes once. `Home` and `InfoPost` no longer import or render them.

**`InfoPost` rendered `<CaseStudies />` at the bottom of every post**
Odd coupling - a post page shouldn't know about or render the case studies section. Removed. If you want a "see more" section on post pages in the future, that's a deliberate feature to add back intentionally.

**`Home.jsx` imported `Routes`, `Route`, `useNavigate` and never used them**
Dead imports removed.

**`Experience.jsx` imported `Resume` and had it commented out**
Dead import removed.

**`CaseStudies.jsx` imported `Resume` and never used it**
Dead import removed.

**`CaseStudies.jsx` imported `textVariant2` and never used it**
Dead import removed.

**`Experience.jsx` imported `slideIn`, `staggerChildren`, `textVariant2` and didn't use them all**
Cleaned up to only what's actually used.

---

### Code Quality

**`data.js` - `var` in `calculateYearDifference`**
Changed to `const`.

**`data.js` - dead `CaseStudies` export (array of empty objects)**
This was never imported or used anywhere. Removed.

**Inline styles moved to SCSS modules**
- `style={{ marginTop: "10px" }}` on the CaseStudies subheading → `.subheading` class in `CaseStudies.module.scss`
- `style={{ marginTop: "2rem" }}` on the Testimonials subheading → `.subheading` class in `Testimonials.module.scss`
- `style={{ height: '1rem' }}` on LinkedIn/GitHub icons in Header and Footer → `.navIcon` class in their respective SCSS modules

**`Header` mobile menu toggle changed from `<div>` to `<button>`**
A `div` with an `onClick` is not keyboard accessible and not semantically correct for an interactive control. Changed to `<button>` with `aria-label` and `aria-expanded` attributes. The `onKeyDown` handler for Enter is technically redundant on a button (buttons fire `onClick` on Enter natively) but left in for clarity. The SCSS was updated to reset button default styles.

**`Header` now wires up `useOutsideAlerter`**
The hook existed and was correct but was never actually called in `Header`. Added `useRef` for the menu element and wired the hook up so clicking outside the mobile menu closes it.

**External links now have `rel="noopener noreferrer"`**
LinkedIn and GitHub links in both Header and Footer opened in `target="_blank"` without `rel`. Added for security (prevents the opened tab from accessing `window.opener`).

---

### Not Changed (known issues left for later)

**`Resume.jsx` - reCAPTCHA `sitekey="TODO: add key"`**
The component is functional but the reCAPTCHA won't verify without a real site key. The component is also not rendered anywhere currently (it was commented out in `Experience`). Left as-is until there's a decision on whether to bring it back and wire up a real key.

**`getMenuStyles` in `motion.js` reads the DOM directly**
This utility function calls `document.documentElement.clientWidth` - a side effect that ideally belongs in a hook. Left for now since it's a small contained thing, but worth moving to a hook if `motion.js` grows.

**`motion.js` has both `staggerContainer` (function) and `staggerChildren` (object) doing similar things**
Minor inconsistency in the animation utilities. Not a bug, just a bit confusing. Left alone since changing it would require touching every component that uses them.
