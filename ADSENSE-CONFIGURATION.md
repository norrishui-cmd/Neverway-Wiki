# AdSense site configuration

Publisher ID: `ca-pub-9505220977121599`

Configured across the complete static site:

- AdSense loader script in every HTML `<head>`.
- `google-adsense-account` meta tag in every HTML `<head>`.
- Root `/ads.txt` containing the authorized Google seller record.

The configuration script is idempotent and can be rerun safely:

```bash
node scripts/configure-adsense.mjs
```

The international-page build also invokes the configuration script so regenerated Japanese and Spanish pages keep the verification tags.
