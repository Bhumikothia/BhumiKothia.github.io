# What still needs input

Everything on the site was taken from her CV, LinkedIn, ORCID, or the public registries (Crossref, DataCite, NCBI GenBank). Nothing has been invented. The items below need Bhumi to **supply** something or **verify** it. Run `npm run todos` for the exact file and line of each one in the code.

Placeholders are safe to leave for now. On the live site, missing items are simply hidden (no photo shows her initials; with no CV the CV button doesn't appear). The yellow TODO boxes only appear in `npm run dev`.

## A. Needed before launch

| # | Item | Where it goes |
|---|---|---|
| A1 | **Professional headshot**, square, at least 800×800 px. It replaces the illustrative micrograph in the Home page hero. | `src/assets/images/bhumi-headshot.jpg`, then uncomment `photo:` in `profile.md` |
| A2 | **CV PDF without her phone number or home address.** The current CV has her phone number, so don't upload it as is. | `public/cv/Bhumi-Kabariya-CV.pdf`, then uncomment `cv:` in `profile.md` |
| A3 | **Review the long bio** on the About page and rewrite it in her own voice | `src/content/profile/profile.md` (text below the frontmatter) |
| A4 | **Review the Research page** for scientific accuracy. It describes only published work; check she is comfortable with every sentence. | `src/content/pages/research.md` |
| A5 | **Set `CONTACT_EMAIL`** as a GitHub repository variable (DEPLOY.md, step 4). Already set locally in `.env`. | GitHub settings |
| A6 | **Choose and buy a domain** (optional), or use `username.github.io` | DEPLOY.md, step 5 |

## B. Facts to verify (sources disagree or are incomplete)

| # | Question | What the sources say | Currently shown |
|---|---|---|---|
| B1 | Book publication date | ORCID and LinkedIn: **2 Sep 2025**. CV: **25 Oct 2025**. | 2 September 2025 |
| B2 | Book authors | LinkedIn lists Hiren B. Soni as co-author; the CV does not say | Kothia & Soni |
| B3 | Book ISBN (paperback) | Not in any source (Amazon blocked lookup) | ASIN B0FPDMPQMG only |
| B4 | Journal article page range | Crossref records only the first page, 767 | p. 767 |
| B5 | Journal volume/issue | Crossref metadata says "vol 2, issue 23"; the journal website says **Vol. 23, No. 2** | Vol. 23(2). Consider asking the journal to correct Crossref. |
| B6 | Magazine article (*Inspire*, ISTAR) | Authors from LinkedIn only; no online link | Kothia & Soni, pp. 151–153, no link |
| B7 | GenBank co-submitter **"Narolkar, S."** (NCBI record) | Full name not given anywhere | "S. Narolkar" |
| B8 | EHS job end date | CV and LinkedIn: **Mar 2022**. ORCID: **Feb 2022**. | Mar 2022 (consider updating ORCID) |
| B9 | Ph.D. dates | Start **Mar 2022** (ORCID/LinkedIn); the CV says only "2022". Expected completion **Dec 2026**, per you. | Mar 2022 – present, expected December 2026 |
| B10 | Journal article date | Crossref: 25 Jun 2026. LinkedIn/ORCID: 26 Jun 2026. | "June 2026" |
| B11 | Ph.D. supervisor | Not stated anywhere (Hiren B. Soni is co-author on all papers) | Not mentioned. Add if she wants. |

## C. Talks: in person or virtual? (important for credibility)

Each talk needs its **mode** (`in-person`, `virtual` or `hybrid`). **Program or abstract links** and **certificates** (PDFs in `public/evidence/`) would also strengthen them.

| Talk | Mode | Link | Certificate |
|---|---|---|---|
| IAES-02, MSU Baroda (Oct 2023, poster) | ❓ | ❓ | ❓ |
| CVMU Research Week-24 (Jan 2024, poster) | ❓ | ❓ | ❓ |
| CTBS-VII, Sardar Patel University (Feb 2024, oral) | ❓ | ❓ | ❓ |
| **ICAEBIO-24, ISIT New York** (May 2024, oral) | ❓ | ❓ | ❓ |
| **ICMBT-2024, MASTD / Glorious Vision University** (Aug 2024, oral). Actual venue city? | ❓ | ❓ | ❓ |

The same applies to the SICART workshop (June 2023): add a certificate if she has one.

## D. Recognition and service: nothing found yet

These sections are **hidden until an entry exists**. Add anything she has, each with evidence (see EDITING.md):

- [ ] Award certificate for the **Women Researcher Award 2026** (Scientific Laurels)
- [ ] **Wayback Machine archive** of the award page <https://www.scientificlaurels.com/biography/hfc006>, saved at <https://web.archive.org/save>
- [ ] Peer review for journals (invitation or thank-you emails, Web of Science/Publons record)
- [ ] Judging (poster/paper competitions, science fairs)
- [ ] Grants, fellowships, travel awards or scholarships
- [ ] Professional memberships (e.g. ASM, IWA, WEF, AWWA, Indian societies)
- [ ] Invited talks, session-chair roles or editorial board roles
- [ ] Media mentions (university news, newspapers, podcasts)

> **Note for the EB1A petition:** the recognition page lists only verifiable facts. Whether a given award or activity carries weight as EB1A evidence is a question for her immigration attorney, so review this page with them before relying on it.

## E. Beyond the Lab (currently shows "More to come")

- [ ] Hobbies and interests
- [ ] Outreach (school visits, science communication, workshops she led)
- [ ] Volunteering
- [ ] 2–4 photos (conference photos, outreach). Check that everyone pictured is happy to appear online.

## F. Skills to confirm

- [ ] **SEM/TEM, FTIR, zeta potential** or other instruments: add to `skills.yaml` only if she has used them herself. They are not in her CV or LinkedIn, so they are not listed now.
- [ ] Any formal **certifications** (lab safety, GLP, ISO, HAZWOPER, etc.)
- [ ] Languages spoken (optional)

## F2. Her own photos (recommended)

The site currently uses 7 **illustrative** Wikimedia Commons photos (credited under each image and on `/credits/`). Her own photos would be more authentic, especially for EB1A:

- [ ] Bhumi at the bench (streaking plates, microscope, jar test) with no unpublished results visible
- [ ] Photos presenting at conferences (ICAEBIO-24, ICMBT-2024, CTBS-2024 …)
- [ ] Field sampling photos, if taking them was permitted

## G. After launch

- [ ] Add the website URL to ORCID, Google Scholar, LinkedIn and ResearchGate (DEPLOY.md, step 7)
- [ ] Submit the sitemap in Google Search Console
- [ ] Set up Cloudflare Web Analytics (optional)
