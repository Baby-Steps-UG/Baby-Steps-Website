# Baby Steps website

- This checkout is a Next.js App Router website. Preserve the existing Next deployment flow.
- Routes live in `app/`; shared landing components in `app/components/landing/`; legal source text in `legal/`; assets in `public/`.
- Use direct headings and action labels. Keep copy needed for consent, errors, availability, legal meaning, and learning content.
- Website cookie access belongs in `app/lib/site-preferences.ts`. Optional reads and writes require current opt-in. Keep revocation, expiration, blocked-storage behavior, and the privacy notice in sync.
- Never place personal information, identifiers, or form submissions in preference cookies. Do not add analytics or advertising scripts without an explicit task requirement.
- `StoreAvailability` is the shared store status component. Keep both stores marked coming soon until real listing URLs are supplied.
- Preserve the Tally waitlist form and its fallback link. Do not submit test entries to the live form.
- Keep semantic landmarks, accessible names, keyboard focus, and mobile navigation intact when changing layout.
- Run `npm test` and `npm run build` for behavior changes. Use the manual browser checks in README when a browser is available. Do not claim visual verification from a successful build alone.
