Server compression and caching

This project is deployed on Vercel. To improve performance:

1) `vercel.json` headers (already added)
- Static assets are cached long-term (immutable) so browsers/CDNs can reuse them.
- Root page is set to `max-age=0, must-revalidate` so HTML is fresh.

2) Brotli/gzip
- Vercel automatically serves Brotli/gzip for supported clients. If you self-host behind nginx, enable compression like:

nginx config snippet:

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml text/plain image/x-icon;
gzip_comp_level 6;
# Brotli (if built with brotli module)
brotli on;
brotli_types text/css application/javascript application/json image/svg+xml text/plain image/x-icon;
brotli_comp_level 5;
```

3) Serve pre-compressed assets (optional)
- Precompress large JS/CSS during build and serve `*.br` when `Accept-Encoding` includes `br`.
- Vercel handles compression automatically—no extra steps needed for Vercel.

4) Third-party scripts
- Defer non-critical 3rd-party scripts until `requestIdleCallback` or user interaction. Example:

```js
if ('requestIdleCallback' in window) requestIdleCallback(()=> loadScript('https://example.com/script.js'))
else setTimeout(()=> loadScript('https://example.com/script.js'), 2000)

function loadScript(src){ const s=document.createElement('script'); s.src=src; s.async=true; document.body.appendChild(s) }
```

5) Validate
- After deploy run Lighthouse and confirm improved FCP/LCP.
