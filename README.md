<div align="center">

![Rakesh Puri & Associates — website project](public/readme-banner.svg)

# Rakesh Puri & Associates

**Advocates & Legal Consultants · Rajasthan, India**

A considered web presence built around **law, investigation, evidence and courtroom advocacy**.

[Live website](https://rkpurilaw1.netlify.app/) · [Practice areas](https://rkpurilaw1.netlify.app/practice-areas/) · [Professional profile](https://rkpurilaw1.netlify.app/professional-profile/) · [Contact](https://rkpurilaw1.netlify.app/contact/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/fd1de754-f499-40a7-8f36-291b3541f07b/deploy-status)](https://app.netlify.com/projects/rkpurilaw1/deploys)

</div>

---

## § Project at a glance

This repository contains a responsive, 15-page **React 19** website for **Rakesh Puri & Associates**. Its content introduces the practice, Rakesh Kumar Puri’s professional background, principal practice areas, courts and forums, and contact information. Vite builds the client code; a Node script pre-renders each page to static HTML for direct links and search metadata.

The website is deliberately informational. It does not promise results, publish testimonials or present an illustrative photograph as a portrait of Rakesh Puri. See [launch notes](LAUNCH_NOTES.md) for the page review and remaining client inputs, and [social bio options](SOCIAL_BIOS.md) for profile copy.

| | What is included |
|---|---|
| 🏛️ **Practice** | Criminal law, constitutional writ matters and the wider practice-area index |
| 📖 **Profile** | Biography, police-service journey, investigation background and education |
| 🧭 **Experience** | Evidence, witnesses, forensic material, trial preparation, courts and forums |
| ✉️ **Contact** | Published telephone number, WhatsApp enquiry handoff and contact page |
| 🔎 **Discovery** | Page titles, descriptions, social preview image, canonical links, JSON-LD, sitemap and robots.txt |
| ♿ **Usability** | Responsive layout, keyboard focus, semantic HTML and reduced-motion support |
| 🖼️ **Imagery** | Two replaceable illustrative photos, plus a credited photograph of the Rajasthan High Court |

## 🗂️ Website pages

| Page | Purpose |
|---|---|
| `/` | Home and practice introduction |
| `/about/` | About the practice |
| `/practice-areas/` | All listed practice areas |
| `/practice-areas/criminal-law/` | Criminal law focus |
| `/practice-areas/writ-jurisdiction/` | Constitutional and writ jurisdiction |
| `/investigation-expertise/` | Investigation and trial-evidence background |
| `/courts-and-forums/` | Client-supplied forum experience |
| `/professional-profile/` | Rakesh Kumar Puri’s profile |
| `/insights/` | Editorial topics awaiting advocate review |
| `/insights/understanding-investigation-records/` | Reserved article page; not published as legal advice |
| `/contact/` | Chambers contact details and enquiry form status |
| `/privacy-policy/`, `/terms/`, `/disclaimer/` | Website information and legal notices |
| `/404/` | Not-found page |

## 🛠️ Run locally

The site is a **React 19 + Vite** project. Its 15 routes are pre-rendered during the production build, so each page has real HTML, page-specific metadata and a working direct URL.

```bash
# From the repository root
npm ci
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173/`. To check the production output:

```bash
npm run build
npm run preview
```

`npm run build` checks all 15 routes, local links, metadata, sitemap and the 404 page. `npm run test:smoke` opens the built site in a local Chrome browser and checks navigation, the mobile menu, favicon assets, images, visitor acknowledgement and the WhatsApp enquiry form. Set `CHROME_PATH` if Chrome is installed outside the usual location.

## 🚀 Deploy on Netlify

Connect this repository's `main` branch to Netlify. The root-level [`netlify.toml`](netlify.toml) runs the React build and validation, then publishes `dist`.

| Netlify build setting | Value |
|---|---|
| Base directory | Leave empty (repository root) |
| Package directory | Leave empty |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | Leave at the default; this site has no functions |
| Build status | Active builds |

The repository root is the project root, so **do not** enter `rakesh-puri-site` as the Base directory. `netlify.toml` is the source of truth for the build command and publish directory. Every push to `main` triggers a Netlify deploy when automatic builds are active.

After a deploy, Netlify's **Deploy File Explorer** should show `index.html` directly at the top of the published files. If the site displays Netlify's 404 page, check that the project is connected to this repository and the `main` branch, and that the latest deploy succeeded.

### Project structure

```text
.
├── public/                       # Static public assets (images, icons, banner)
│   ├── apple-touch-icon.png      # Home-screen icon
│   ├── bhagirath-singh.jpg       # Team member photograph
│   ├── favicon.svg               # Vector browser icon
│   ├── favicon.ico               # Classic browser icon
│   ├── favicon-32.png            # PNG browser icon
│   ├── placeholder-chambers.webp # Illustrative chambers visual
│   ├── placeholder-research.webp # Illustrative research visual
│   ├── rajasthan-high-court.jpg  # Rajasthan High Court photograph
│   ├── rakesh-kumar-puri.jpg     # Founder advocate portrait
│   ├── readme-banner.svg         # Project banner
│   └── social-card.png           # Open Graph / social preview
├── src/                          # Application source code
│   ├── content/
│   │   └── pages.json            # Content and metadata for all 21 routes
│   ├── App.jsx                   # React shell and layout components
│   ├── main.jsx                  # Client hydration entry
│   └── style.css                 # Clean CSS styling (Taylor Wessing aesthetic)
├── scripts/
│   └── prerender.mjs             # Static site generator for SEO (pre-renders all 21 pages)
├── index.html                    # Root HTML entry point
├── package.json                  # Dependencies and build scripts
└── netlify.toml                  # Deployment configuration
```

Edit page content in `src/content/pages.json`, the shared layout in `src/App.jsx`, and styling in `src/style.css`. Then run `npm run build`.

## 🎨 Design and imagery

The site’s wordmark, editorial headings, deep navy and warm ivory are intended to suit a senior legal practice. Two **AI-generated, temporary illustrative images** appear on the home and About pages. They do not depict the advocate, his office or a real case. The images are labelled as illustrative on the website.

To replace them, put approved photographs in `public/` and update the image paths and alt text in `src/App.jsx` (`HeroVisual` and `EditorialPhoto`). Keep descriptive alt text and remove the temporary-image captions once the replacement images have been reviewed and approved. Then run `npm run build`.

A genuine photograph of the **Rajasthan High Court building in Jodhpur** gives the site local context. It is labelled as court architecture; it is **not** a chambers photograph or a portrait of the advocate.

**Photo credit:** [TrendSPLEND / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:New_Rajasthan_High_Court_Building.jpg), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The downloaded JPEG is used unchanged. Attribution also appears in the website footer.

The professional-profile portrait area remains an RKP monogram until an authentic photograph is supplied and approved by Rakesh Kumar Puri.

### Favicon

The RK monogram is provided in `public/` as SVG, PNG, ICO and Apple touch icon variants. All pages include the corresponding icon links.

## 📞 Contact behaviour

- The phone link calls **+91 94144 32758**, the client-supplied professional number.
- The floating green WhatsApp button opens a conversation with that number.
- The floating Contact button opens `/contact/`.
- The enquiry form prepares a WhatsApp link with the entered details. Choosing to continue shares those details with WhatsApp; the visitor then reviews and decides whether to send the chat message. The website does not store form contents.
- An official email address has not yet been approved. The form does not claim to send email.

## ✅ Review before public launch

The following are handoff items for a fully approved public site:

1. **Verify professional facts:** 35 years of police service, 5,000+ cases investigated or supervised, 300+ commendations, appointments and Bar Council details.
2. **Resolve the chronology:** client-provided **2016 Bar Council enrolment**, **11 years of legal practice**, and **1979 education year/degree formatting** need confirmation together.
3. **Approve the official portrait**, any chamber images, the intended domain and a LinkedIn profile URL if one is to be shown.
4. **Approve an official email and secure form endpoint** if email-based enquiries are required in addition to the working WhatsApp handoff.
5. **Have the advocate review** the disclaimer, privacy wording, practice descriptions and any future articles against applicable professional rules.
6. **Confirm production quality** with deployment-specific accessibility, performance and social-preview checks. The local validator does not replace those checks.

The site currently points canonical metadata and its sitemap to the intended domain, `https://rkpurilaw.com`. Update the domain in `scripts/prerender.mjs` if the approved production domain differs.

## ⚖️ Professional-information note

Website content is for general information. Viewing it or using a contact link does not create an advocate–client relationship. Specific advice requires a formal engagement and review of the facts and applicable law. The final legal wording must be approved by the advocate before public release.

---

<div align="center">

**Website developed by [IITdeveloper](https://iitdeveloper.com/)**

</div>
