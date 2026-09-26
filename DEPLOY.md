# Deploying the website (GitHub Pages)

The site is hosted free on **GitHub Pages**. After the one-time setup below, every change pushed to the `main` branch goes live in about two minutes. The site also rebuilds automatically every Monday.

> **Authorship:** create the GitHub account with **Bhumi's own email** and make every commit under her name (step 2). Her website's history then belongs to her.

---

## 1. Create the GitHub account and repository

1. Sign up at <https://github.com/signup> using Bhumi's email address. Choose a professional username, e.g. `bhumikothia`.
2. Turn on two-factor authentication (**Settings → Password and authentication**).
3. Create a new repository (**+ → New repository**):
   - **Easiest option:** name it **`<username>.github.io`** (e.g. `bhumikothia.github.io`). The site is then served at `https://bhumikothia.github.io/`.
   - Any other name (e.g. `website`) works too. The site is then at `https://bhumikothia.github.io/website/`, and the build handles that path automatically.
   - Set it to **Public**. The free GitHub plan only offers Pages for public repositories.
   - Do **not** add a README, .gitignore or licence. The project already has them.

## 2. Push this folder (first time)

This needs [Git](https://git-scm.com/downloads). In a terminal, open the project folder and run:

```bash
git init -b main
git config user.name "Bhumi Kabariya"
git config user.email "HER-GITHUB-EMAIL"
git add .
git status
```

**Check the output of `git status` before continuing.** `Misc Documents/` (her private CV and the LinkedIn screenshots) and `.env` must **not** be listed. Both are excluded by `.gitignore`.

```bash
git commit -m "Initial version of website"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

GitHub asks her to sign in the first time. The browser sign-in is the simplest.

## 3. Turn on GitHub Pages

In the repository, open **Settings → Pages** and under **Build and deployment → Source**, choose **GitHub Actions**. The included workflow (`.github/workflows/deploy.yml`) does the rest.

## 4. Add the contact email (and optional analytics)

The email address is kept out of the public code. In the repository, open **Settings → Secrets and variables → Actions → Variables tab → New repository variable**:

| Name | Value |
|---|---|
| `CONTACT_EMAIL` | the email to show on the Contact page |
| `PUBLIC_CF_ANALYTICS_TOKEN` | *(optional, see step 6)* |

Then go to **Actions → Deploy to GitHub Pages → Run workflow** to publish. After a green ✓, the site is live at the address shown in **Settings → Pages**.

---

## 5. Connect a custom domain (optional, recommended)

A domain such as `bhumikabariya.com` looks more professional and stays the same even if hosting changes. Domains cost about US $10–15 a year from registrars such as Cloudflare Registrar, Namecheap or Porkbun.

1. **Verify the domain with GitHub first** (this prevents domain takeover): open **her account Settings → Pages → Add a domain** and follow the TXT-record instructions.
2. At the registrar's DNS settings, add:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `USERNAME.github.io` |

   (These are GitHub's published addresses. Check them against <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>.)
3. In the repository, open **Settings → Pages → Custom domain**, enter the domain and click **Save**.
4. When the DNS check passes (from a few minutes to 24 hours), tick **Enforce HTTPS**.
5. Run the workflow again (**Actions → Run workflow**) so links, the sitemap and search data use the new domain.

## 6. Privacy-friendly analytics (optional)

[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) is free and uses no cookies, so no cookie banner is needed.

1. Create a free Cloudflare account, go to **Analytics & Logs → Web Analytics → Add a site**, and enter the site's address.
2. Choose the **JavaScript snippet** option and copy only the `token` value from the snippet.
3. Add it as the repository variable `PUBLIC_CF_ANALYTICS_TOKEN` (step 4) and re-run the workflow.

## Keeping the site hidden while she edits

By default the site is **hidden from search engines**. Every page carries a `noindex` tag, and `robots.txt` asks all crawlers (Google, Bing, AI bots) to stay out. Anyone with the link can still open it.

For stronger privacy before launch:

- **Keep the repository Private** (**Settings → General → Danger Zone → Change visibility**). Nobody can see the code or content, but the free GitHub plan will not publish Pages from a private repository, so nothing is online at all.
- **Don't link the site anywhere** (ORCID, LinkedIn, email signatures) until launch.

**At launch:**
1. Make the repository **Public** (if it was private) and turn on Pages (step 3).
2. Add the repository variable **`SITE_INDEXING`** with the value **`on`** (Settings → Secrets and variables → Actions → Variables).
3. Run **Actions → Deploy to GitHub Pages → Run workflow**.
4. Then do step 7 below.

## 7. Help Google find the site (only after launch)

1. Open [Google Search Console](https://search.google.com/search-console), add the site as a **URL prefix** property and verify it. The "HTML tag" method is easiest: send the tag to whoever maintains the site to add it, or use DNS verification if you use a custom domain.
2. Under **Sitemaps**, submit `sitemap-index.xml`.
3. Add the website address to her **ORCID** (Websites & social links), **Google Scholar** profile (Homepage), **LinkedIn** (Contact info → Website) and **ResearchGate**. These links help search engines connect all her profiles.

---

## Everyday updates

- **Edit on GitHub:** open a file under `src/content/`, click ✏️, edit, then **Commit changes**. The site is live about two minutes later. EDITING.md explains every field.
- **Edit locally:** edit the file, then run `git add .`, `git commit -m "Add ICXYZ 2026 talk"` and `git push`.
- **If a deploy fails:** open the **Actions** tab and click the red ✗. The error names the file and field at fault (for example a missing date). Fix it and commit again. The previous version stays live in the meantime.

## Good to know

- **The weekly rebuild pauses** if the repository has had no activity for 60 days (a GitHub rule). GitHub emails a warning first; one click re-enables it. Past talks still move to "Past" in visitors' browsers regardless.
- **Evidence files** in `public/evidence/` are public. Remove personal details before adding them.
- **Local preview** before pushing: run `npm install` once, then `npm run build` and `npm run preview`.
