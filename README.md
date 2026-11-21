# Ramya N. — Cybersecurity Portfolio (Original UI)

This package preserves the original light-theme portfolio design. Only the folder structure and asset paths have been flattened so you can upload files directly to the GitHub repository root.

## Files in this package
- `index.html`
- `style.css`
- `script.js`
- `worker.js` (Cloudflare Worker backend)
- `wrangler.toml`
- `.gitignore`
- `ramya-profile.png`
- `Ramya-N-Resume.pdf`
- `README.md`

## Publish the website
1. Extract this ZIP on your computer.
2. Open your GitHub repository → **Add file → Upload files**.
3. Select all files inside the extracted folder (including hidden `.gitignore`, if shown) and upload them to the repository root.
4. Commit the changes.
5. Open **Settings → Pages** and select **Deploy from a branch**, `main`, `/ (root)`, then Save.

## Deploy the chatbot backend
GitHub Pages cannot securely run backend code or protect an API key. Deploy `worker.js` separately with Cloudflare Workers.

1. Install Node.js and Wrangler: `npm install -g wrangler`
2. In this folder, run: `npx wrangler login`
3. Edit `wrangler.toml` and replace `YOUR-GITHUB-USERNAME` in `ALLOWED_ORIGIN` with your GitHub Pages origin, e.g. `https://ramya123.github.io` (no repository path).
4. Create a Groq API key at https://console.groq.com/
5. Run `npx wrangler secret put GROQ_API_KEY` and paste the key when prompted.
6. Run `npx wrangler deploy`.
7. Copy the Worker URL and edit `script.js`: replace the `CHAT_API_URL` placeholder with `https://YOUR-WORKER.workers.dev/chat`.
8. Commit the updated `script.js` to GitHub.

Keep `GROQ_API_KEY` secret. Never put it in `script.js`, HTML, or GitHub.
