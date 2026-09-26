# Bhumi Kabariya — academic website

Personal research website for **Bhumi Kabariya** (published as **Bhumi Kothia**), Ph.D. researcher in environmental science working on bacterial bioflocculants for wastewater treatment.

- **[EDITING.md](EDITING.md)**: how to add a publication, talk, award or photo (no coding needed)
- **[DEPLOY.md](DEPLOY.md)**: publishing on GitHub Pages and connecting a domain
- **[TODO.md](TODO.md)**: content still needed or to be verified

## Tech

[Astro](https://astro.build) static site with Tailwind CSS. All content lives in `src/content/` as Markdown/YAML, validated by schemas in `src/content.config.ts`.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build to dist/
npm run preview   # serve the production build
npm run todos     # list remaining TODOs
npm run og-image  # regenerate the social-sharing image
```

| Path | What's there |
|---|---|
| `src/content/` | All site content (one file per item) |
| `src/pages/` | One file per page |
| `src/components/`, `src/layouts/` | Reusable UI |
| `src/lib/` | Date formatting, citation (APA/BibTeX) and schema.org helpers |
| `public/` | Files served as-is (favicon, social image, `cv/`, `evidence/`) |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages (on push, weekly, or manually) |

`Misc Documents/` holds private source material and is excluded from git.
