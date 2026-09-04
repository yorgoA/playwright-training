# Playwright Test Automation

A collection of Playwright end-to-end and API tests written in TypeScript, built while working through automation testing fundamentals and progressively applying them to real, live web applications (an Angular e-commerce demo, a login practice site, iframes, calendars, and REST APIs).

## What's covered

- **UI automation** — forms, locators (`getByRole`, `getByLabel`, `getByPlaceholder`), navigation, popups/child windows, iframes, and hidden/dynamic elements
- **End-to-end flows** — user registration, login, adding a product to cart, checkout, and verifying the resulting order in order history
- **API testing** — calling REST endpoints directly with `request.newContext()`, and mixing API setup with UI verification (e.g. placing an order via the API and confirming it in the UI)
- **Test data hygiene** — credentials are read from environment variables rather than hardcoded, and tests that create data (like registration) generate unique values so re-runs never collide with previous ones
- **CI** — the suite runs headless on every push/PR via GitHub Actions (see [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml))

## Project structure

```
tests/
├── chapter1_7/    # Core UI automation: forms, navigation, registration, checkout, popups
├── chapter8/      # Advanced locators, date pickers/calendars
├── chapter9/      # Hidden elements, dialogs, and iframes
├── chapter_10/    # API + UI hybrid: create data via API, verify in the UI
├── chapter_11/    # Pure API testing (no browser)
└── utils/         # Shared helpers (e.g. ApiUtils for auth/order API calls)
js_training/       # Standalone JavaScript exercises (array methods, etc.)
```

## Getting started

```bash
npm install
npx playwright install --with-deps
cp .env.example .env   # fill in a real login for the demo site
npm test
```

Other useful scripts:

```bash
npm run test:headed   # run with a visible browser
npm run test:debug    # step through with the Playwright inspector
npm run report        # open the last HTML report
npm run typecheck     # type-check the project with tsc
```

## Notes

Tests run against a public practice site ([rahulshettyacademy.com](https://rahulshettyacademy.com)), so a couple of tests read expected values straight off the page (e.g. dynamically-generated demo credentials) instead of hardcoding them, so they keep passing as the site's content changes.
