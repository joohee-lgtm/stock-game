# Cloudflare Workers deployment

This deploys a **separate** Worker named `stock-game-market-dashboard`. It does not replace the existing stock-game Worker.

1. In GitHub repository Settings → Secrets and variables → Actions, add `CLOUDFLARE_API_TOKEN` (Workers Scripts Edit permission) and `CLOUDFLARE_ACCOUNT_ID`.
2. Open Actions → Deploy market dashboard to Cloudflare Workers → Run workflow.
3. Check the deployment logs for the actual `*.workers.dev` URL and visit its root path `/`.

The workflow runs automatically on pushes affecting market-dashboard once the secrets are configured. This is only deployment configuration, not proof that the Worker is running.

Important: The current server parser uses Node filesystem reads. Verify that OpenNext packages the CSV files into the Worker output before treating the deployment as production ready. The NASDAQ data is still fetched from FRED at runtime and may be unavailable. If the build or runtime fails, adapt the CSV loader to Worker-compatible bundled assets.
