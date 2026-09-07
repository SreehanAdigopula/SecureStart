# SecureStart

SecureStart is a lightweight cybersecurity readiness web app for small organizations that do not have dedicated security staff. It turns everyday security habits into a clear risk score, category breakdown, and practical next steps.

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
- Cybersecurity checklist across five risk areas
- Normalized 0-100 risk scoring
- Low, Moderate, High, and Critical risk levels
- Category-by-category score breakdown
- Profile-aware recommendations
- Saved local assessment history using browser storage
- Downloadable Markdown report
- Built-in resource templates for 2FA, access tracking, backups, and incident planning
- Responsive cyberpunk/glitch visual design

## Risk Areas

SecureStart assesses:

- Account Security
- Access Control
- Data Protection
- Website and Domain Safety
- Incident Readiness

## Scoring Model

Each checklist answer maps to a simple risk value:

- Safe answer: 0 points
- Mild risk: 1 point
- Moderate risk: 2 points
- High risk: 3 points

Each category is normalized to a 0-100 score first. SecureStart then averages the active categories, with small profile-based weighting adjustments:

- Website risk is skipped when the organization does not have a website.
- Data Protection gets extra weight when the organization handles member or customer data.
- Access Control gets extra weight for larger organizations.

This keeps categories with more questions from automatically overpowering smaller categories.

## Privacy and Security

SecureStart is intentionally local-first:

- No login is required.
- Assessments are saved only in the browser with `localStorage`.
- The app does not ask for passwords, account names, addresses, or payment details.
- Dynamic content is escaped or normalized before rendering.
- The deployed site uses security headers including Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.

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
python3 -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173
```

## Project Status

SecureStart is an MVP focused on practical readiness assessment, not enterprise scanning. It does not inspect real devices, monitor endpoints, scan private accounts, or replace a professional cybersecurity audit.

Future improvements could include user testing with local organizations, before/after tracking, richer resource templates, and optional HTTPS checks for public websites.
