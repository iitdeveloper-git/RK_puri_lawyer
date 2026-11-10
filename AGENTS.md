# AGENTS.md

Short rules for every AI coding agent in this repo.

## Project
- What it is: Website for R.K. Puri Law (Advocates & Legal Consultants), Jodhpur. Live preview: https://rkpurilawyer.netlify.app
- Stack: React 19 + Vite 7 (single-page app), plain CSS, content in JSON. No backend.
- Run locally: `npm run dev`
- Build: `npm run build` (output in `dist/`, which is committed)
- Tests: none yet. Verify with `npm run build` and by loading the pages.
- Deploy: Netlify builds from `main` (`netlify.toml`; SPA redirect to `index.html`).

## Sources of truth
- Page content: `src/content/pages.json` (HTML strings per route)
- Knowledge posts: `src/content/posts.json` (`"draft": true` shows "Coming soon")
- Layout and components: `src/App.jsx`; styles: `src/style.css`
- Specs (when used): `specs/<NNN-feature>/`; principles: `.specify/memory/constitution.md`

## Workflow
1. For anything bigger than a small fix: spec -> plan -> tasks, approved before code.
2. One task at a time; show build output before saying "done".
3. Commit and push only when the user asks. `dist/` is rebuilt before each commit.

## Standards and constraints
- Bar Council of India rules: no advertising or solicitation. No rates or fees, no client testimonials, no case-result claims.
- Keep the visitor disclaimer popup, and the Disclaimer, Privacy Policy and Terms pages, consistent with each other.
- Do not publish unreviewed legal commentary. Posts need advocate review first.
- Contact form posts to the IITDeveloper gateway and then opens WhatsApp. Do not show the phone number on the site.

## Never
- Invent facts about the advocate, cases or credentials.
- Add placeholder or sample text to live pages without marking it as a draft.
- Touch secrets or deploy settings without being asked.
