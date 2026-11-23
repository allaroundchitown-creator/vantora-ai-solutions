# Vantora AI Solutions — website

A responsive, static multi-section website built around the Vantora logo assets in the connected agency blueprint Google Doc. Original logo assets were extracted from that document and optimized into transparent wordmarks. Brand colors: #0B0B0F, #2DD4BF, #14B8A6, #FFFFFF. Font: Inter.

## Preview

Open `index.html` with a local HTTP server for the most accurate preview:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. This site is standard HTML/CSS/JavaScript; no build step is required.

## Deploy

To publish on Netlify, drag the entire site folder or its ZIP into Netlify's deploy interface, or connect a Git repository. The form uses Netlify Forms (`data-netlify="true"`) and will only accept submissions when hosted on a compatible Netlify deployment with form detection enabled. After deploying, send a test submission and check Netlify's Forms dashboard, notification email, and spam settings.

The existing Vantora site is not changed by this package. To replace it, manually deploy the package to the correct Netlify site and verify its DNS settings.

## Customize before production

- Confirm the business name (website footer says **Vantora AI Solutions**, while the source logo says **VANTORA**).
- Confirm the public contact email `sales@vantoraaisolutions.com`; change it in `index.html` and `privacy.html` if needed.
- Review the privacy policy to accurately reflect real data retention, provider, and analytics behavior.
- Connect your chosen domain and check internal links, site URL and form handling after deployment.
- Optionally replace the free-audit form or buttons with a verified scheduling link when a booking tool is set up.
- The ROI calculator uses hypothetical changes in win rate, not guaranteed outcomes. It intentionally computes **gross profit** rather than calling all incremental sales profit.
- Do not insert unverified testimonials or client result claims without permission and evidence.

## Files

- `index.html`: homepage and Netlify lead form
- `styles.css`: responsive visual design
- `script.js`: mobile nav, interactive solution tabs, and ROI calculator
- `thank-you.html`: form success page
- `privacy.html`: draft privacy notice
- `assets/`: original and processed Vantora logos, favicon, share preview
