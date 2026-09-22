# SecureStart

SecureStart is a lightweight cybersecurity readiness web app for small organizations that do not have dedicated security staff. It turns everyday security habits into a transparent Readiness Gap Score, category breakdown, and practical next steps.

Live site: https://securestart-lemon.vercel.app

## Why I Built It

Small clubs, nonprofits, student organizations, and local businesses often depend on email accounts, websites, payment tools, shared drives, and member or customer data. Many of their biggest risks come from preventable habits:

- Reused passwords
- Missing two-factor authentication
- Shared admin logins
- Unclear website or domain ownership
- Weak backup habits
- No plan for recovering hacked accounts

SecureStart helps these groups understand their current readiness without asking for passwords, account names, addresses, or financial details.

## Features

- Organization profile step with non-sensitive questions
- Cybersecurity checklist across six readiness areas
- Equal-category, normalized 0-100 readiness gap scoring
- Low, Moderate, High, and Urgent gap bands
- Category-by-category score breakdown
- Profile-aware recommendations
- Saved local assessment history using browser storage
- Downloadable Markdown report
- Built-in resource templates for 2FA, access tracking, backups, and incident planning
- Public scoring methodology and source mapping
- Detailed privacy and data-use policy
- Responsive cyberpunk/glitch visual design

## Risk Areas

SecureStart assesses:

- Account Security
- Access Control
- Data Protection
- Devices and Updates
- Website and Domain Safety
- Incident Readiness

## Scoring Model

Scoring version 2.0 maps each checklist answer to a simple gap value:

- Practice in place: 0 points
- Mostly or partly in place: 1 point
- Inconsistent or not sure: 2 points
- Practice absent or clear gap: 3 points

Each category is normalized to a 0-100 score first. SecureStart then averages every applicable category equally:

- Website risk is skipped when the organization does not have a website.
- Profile answers can change explanations and recommendations, but they do not add hidden numeric weights.
- Gap bands are 0-24 Low, 25-49 Moderate, 50-74 High, and 75-100 Urgent.

This keeps categories with more questions from automatically overpowering smaller categories. The score is a SecureStart heuristic, not a NIST grade, breach probability, compliance certification, or professional audit. The complete formula, worked example, source mapping, and limitations are published on the live [How Scoring Works](https://securestart-lemon.vercel.app/methodology) page.

## Privacy and Security

SecureStart is intentionally local-first:

- No login is required.
- Assessments are saved only in the browser with `localStorage`.
- The app does not ask for passwords, credentials, addresses, or payment details.
- The current app has no assessment database, analytics package, advertising trackers, or tracking cookies.
- Vercel may process ordinary hosting data such as IP addresses, approximate location, device/browser information, and request logs.
- Dynamic content is escaped or normalized before rendering.
- The deployed site uses security headers including Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.

The complete disclosure is published on the live [Privacy & Data Use](https://securestart-lemon.vercel.app/privacy) page.

## Tech Stack

- HTML
- CSS
- JavaScript
- Vercel for deployment

No frontend framework or backend is required for the current MVP.

## Run Locally

Clone the repo:

```bash
git clone https://github.com/SreehanAdigopula/SecureStart.git
cd SecureStart
```

Open `index.html` directly in a browser, or run a local static server:

```bash
npm start
```

Then visit:

```text
http://127.0.0.1:4173
```

## Project Status

SecureStart is an MVP focused on practical readiness assessment, not enterprise scanning. It does not inspect real devices, monitor endpoints, scan private accounts, predict breaches, certify compliance, or replace a professional cybersecurity audit. Existing reports created before scoring version 2.0 remain labeled as legacy results and are not silently recalculated.

Future improvements could include user testing with local organizations, before/after tracking, richer resource templates, and optional HTTPS checks for public websites.
