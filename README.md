# Free Age Calculator

Browser-based exact age calculator for [free-age-calculator.web-free.site](https://free-age-calculator.web-free.site).

Built from [RajkumarKamarthi/Age-Calculator](https://github.com/RajkumarKamarthi/Age-Calculator) (MIT), with school enrollment cutoff mode and static pages for the web-free.site hub.

## Develop

```bash
node scripts/build-html.mjs   # regenerate prerendered HTML after template changes
node scripts/test-age.mjs     # age logic tests
npx wrangler dev              # local static preview (optional)
```

Static assets live in `public/`. Deploy with Cloudflare Workers static assets (`wrangler.toml`).