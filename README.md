# Baby Steps website

Next.js 16 and React 19 website for the Baby Steps Luganda learning app.

## Develop

Use Node.js 22.15 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Check and build

```sh
npm test
npm run build
npm start
```

The dependency-free tests cover cookie consent, withdrawal, expiry, blocked storage, and quiz data validation. The build checks TypeScript and generates every route. `npm run lint` is available separately.

With a development or production server running, use `npm run check:routes` to verify every page, internal links, privacy anchors, images, the pilot flow, and the 404 response. It defaults to `http://localhost:3000`; set `SITE_URL` to check another local server.

If routes exist on disk but a long-running development server returns 404, restart `npm run dev` and run the route check against that server. A production build alone does not verify the currently running development server.

## Structure

- `app/`: public routes and root layout.
- `app/components/landing/`: navigation, content, quiz, store status, and cookie controls.
- `app/lib/site-preferences.ts`: the only website cookie read/write boundary.
- `legal/`: the policy and terms rendered at `/privacy` and `/terms`.
- `public/`: existing brand assets and app screenshots.

The pilot information page is `/waitlist/pilot`, linked from Languages, Waitlist, and the footer. It provides testing instructions, feedback email, privacy/consent information, and contact details. Its registration action links to the existing waitlist; it does not create a separate signup service or enrol a child.

Store availability artwork is served locally. Original URLs and asset details are recorded in `public/store/SOURCES.md`.

## Cookies

Optional cookies are off by default. The consent cookie lasts 180 days. Opt-in enables remembering the dismissed waitlist offer (180 days) and Luganda quiz progress (30 days). No personal information is stored. Rejecting or revoking consent deletes the optional cookies.

The provider stays mounted across navigation. Cookie settings use a native dialog for keyboard focus, Escape dismissal, and focus restoration. Optional writes re-check the cookie choice each time, including after changes in another tab. Blocked storage falls back to in-memory interaction.

Keep cookie names, purpose, retention, tests, and `legal/privacy_policy.md` aligned. Website settings govern first-party cookies. The embedded Tally form is a separate service; it loads only on `/waitlist`.

## Manual browser checks

1. Open a fresh browser session. No optional cookies should exist. Reject optional cookies and play the quiz; answers should work without persistence.
2. Allow optional cookies. Dismiss the offer, answer a quiz question, reload, and confirm both preferences restore.
3. Reopen Cookie settings, turn preferences off, and save. Confirm both optional cookies are deleted and a reload starts a fresh quiz.
4. Check consent dialog keyboard navigation, Escape, and focus return. Check the mobile Menu and Skip to content link.
5. Check all routes at phone and desktop widths. Both stores must say Coming soon; store labels must not act like download links.
6. Open `/waitlist` and verify the embedded form and new-tab fallback. Do not submit test entries to the live waitlist.

## Deployment

This repository retains its existing Next.js deployment flow. `npm run build` produces `.next`; use `npm start` for a production server. No hosting migration or automatic publication is configured here.
