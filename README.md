# Vantora AI Solutions — website

Responsive Vantora homepage based on a clean, bright, purple-and-lavender landing-page style.

## Website
- `index.html` — current homepage, with inline CSS and JavaScript. Mobile responsive; no build step needed.
- `styles.css`, `script.js`, `thank-you.html`, `privacy.html`, and `assets/` — retained from the previous website version. They are not required by the new standalone homepage.

## Preview
Open `index.html` in a browser or run `python -m http.server 8080` and visit http://localhost:8080.

## Deploy
The homepage is static and can be deployed to Netlify, Vercel, or another static host. If a host is configured to deploy this repository from `main`, changes to `index.html` may deploy automatically.

## Before launching
- The growth-audit contact form currently opens an email to `sales@vantoraaisolutions.com`. It does **not** submit leads to a server, CRM, or Netlify Forms. Connect a real form handler before relying on it for submissions.
- Dashboard metrics are explicitly illustrative/sample data, not real customer results.
- Confirm services and marketing copy, contact details, privacy practices, and any desired scheduling integration.
- The hero image loads remotely from Unsplash; replace or self-host it if preferred.
