# Editing the website

Everything on the site comes from small text files in **`src/content/`**. To add a publication, talk or award, you **copy an existing file, change the details, and save**. You don't need to touch any code.

You can edit files directly on GitHub (open the file, click the ✏️ pencil icon, then **Commit changes**). The site rebuilds and goes live about two minutes later.

---

## The rules

1. **One item = one file.** The file name doesn't appear on the site. Use something short and descriptive with no spaces, like `2026-05-icwt-oral.md`.
2. **Keep the `---` lines.** Everything between the two `---` lines is the item's details (its "frontmatter"). The format is `field: value`.
3. **Dates are written `YYYY-MM-DD`**, for example `2026-05-28`.
4. **Put quotes around titles that contain a colon (`:`)**, for example `title: "Bioflocculants: A Review"`.
5. **Lines starting with `#` are notes to editors.** They never appear on the site.
6. **If something is wrong, the build stops** and GitHub emails you. Nothing broken goes live. Open the failed run under **Actions** to see the exact file and field.
7. **Only publish what's already public.** Don't add unpublished thesis results, figures or isolate-level data.

To see changes on your own computer before publishing, see "Previewing locally" at the end.

---

## Add a publication or dataset

Folder: `src/content/publications/`. Copy the file closest to what you're adding, rename it, then edit it:

```yaml
---
title: "Full title exactly as published"
type: journal-article        # journal-article | conference-paper | book | book-chapter | dataset | sequence | magazine | preprint
peerReviewed: true           # journal articles only
authors:                     # "Family, Given", in the published order
  - Kothia, Bhumi A.
  - Soni, Hiren B.
date: 2026-06-26
datePrecision: month         # day | month | year: how much of the date to show
venue: Journal or repository name
publisher: Publisher name    # optional
volume: "23"                 # optional
issue: "2"                   # optional
pages: "767–775"             # optional
doi: 10.13005/bbra/3537      # the DOI only, without https://doi.org/
url: https://…               # optional if there is a DOI
license: CC BY 4.0           # optional
featured: true               # show on the Home page (keep to about 3)
---
```

- The site sorts items by year and groups them by type automatically.
- The **Cite** button (APA and BibTeX) is generated from these fields.
- Her own name is bolded automatically.
- For a GenBank sequence, use `type: sequence` with `accession: PP946851` and `url: https://www.ncbi.nlm.nih.gov/nuccore/PP946851`.

## Add a conference or talk

Folder: `src/content/talks/`

```yaml
---
title: "Title of the talk or poster"
role: oral                   # oral | poster | keynote | invited | session-chair | panelist | attendee
event: Full conference name
eventShort: ICXYZ-2026       # optional short name
organizer: Organising body   # optional
location:
  city: Richmond
  region: VA
  country: USA
mode: in-person              # in-person | virtual | hybrid
startDate: 2026-11-03
endDate: 2026-11-05          # optional for one-day events
links:                       # optional
  - label: Conference programme
    url: https://…
  - label: Abstract
    url: https://…
evidence:                    # optional: certificate or acceptance letter
  - label: Certificate of presentation (PDF)
    file: /evidence/icxyz-2026-certificate.pdf
---
```

Talks with a future date appear under **Upcoming**. Once the date passes they move to **Past** on their own, and the site also rebuilds weekly to keep this current.

## Add an award, grant, review or membership

Folder: `src/content/recognition/`. Every entry **must include at least one piece of evidence**, which keeps the page useful for verification.

```yaml
---
title: Name of the award or role
category: award              # award | grant | fellowship | peer-review | judging | editorial | membership | media | invited-role
issuer: Organisation that gave it
issuerUrl: https://…         # optional
date: 2026-08-01
datePrecision: month
endDate: 2027-08-01          # optional (memberships, editorial roles)
summary: >-
  One or two factual sentences describing what it is and why it was given.
evidence:
  - label: Announcement on the organiser's website
    url: https://…
    archivedUrl: https://web.archive.org/web/…   # recommended, see below
  - label: Award certificate (PDF)
    file: /evidence/award-certificate.pdf
---
```

**Evidence tips:**

- **Archive every web link.** Paste the link into <https://web.archive.org/save>, click **Save page**, then copy the resulting archive link into `archivedUrl`. The proof then survives even if the original page changes.
- **For PDFs or images** (certificates, letters, review invitations), put the file in **`public/evidence/`** and reference it as `/evidence/filename.pdf`. Before uploading, **black out personal details** (phone number, home address, ID numbers).
- **For peer review**, a Web of Science reviewer record or the journal's thank-you email (saved as PDF, with personal details removed) is the usual evidence.
- **Categories with no entries are hidden** on the live site, so adding the first peer-review entry makes that section appear.

## Add an education entry, job or skill

- **Degrees:** `src/content/education/`, one file per degree. For a degree in progress, use `status: in-progress` and `expected: December 2026`.
- **Jobs and research positions:** `src/content/experience/`. Leave out `end:` for a current role.
- **Skills:** `src/content/skills/skills.yaml`. Add a line under the right group, starting with `    - ` (four spaces, a dash and a space).
- **Workshops, courses and certifications:** `src/content/training/`

## Beyond the Lab

Folder: `src/content/beyond/`. Copy `_example.md`, rename it, fill it in and **delete the `draft: true` line**. To add a photo:

1. Put the image in `src/assets/images/`, for example `outreach-2025.jpg`. It is resized and compressed automatically.
2. Add these two fields:
   ```yaml
   photo: ../../assets/images/outreach-2025.jpg
   photoAlt: Bhumi explaining water filtration to school students
   ```
   Always describe the photo in `photoAlt`, for screen-reader users.

## Science photos (illustrative)

The microscope, agar-plate and treatment-plant photos are **openly licensed images from Wikimedia Commons**, not Bhumi's own work. Each one shows its credit and licence (the licences require this) and is labelled "Illustrative". All of them are listed on the `/credits/` page.

- All the details live in `src/lib/images.ts`: file, alt text, caption, author, licence and source link.
- **To swap in one of Bhumi's own lab photos:** put it in `src/assets/images/`, then either add a new entry in `images.ts` (author `Bhumi Kabariya`, licence `All rights reserved`) or show it through a Beyond the Lab entry. Her own photos are more authentic than stock images, so replace the illustrative ones whenever she has good pictures.
- **Never** caption an illustrative photo as her isolate, sample or lab.

## Profile, bio, headshot and CV

Everything is in **`src/content/profile/profile.md`**:

- **Headline, short bio and links:** the fields at the top.
- **Long bio** (About page): the text below the second `---`.
- **Headshot:** put a square photo (at least 800×800 px) at `src/assets/images/bhumi-headshot.jpg`, then remove the `#` in front of the `photo:` and `photoAlt:` lines. It replaces the Gram-stain micrograph inside the round "microscope field" on the Home page.
- **CV download:** put the PDF at `public/cv/Bhumi-Kabariya-CV.pdf`, then remove the `#` in front of `cv:`. **Use a version without her phone number or home address.**
- **Email:** change `email:`. It is never shown as plain text in the page source.

## Research page

Edit `src/content/pages/research.md`. It uses normal Markdown: `## Heading`, `**bold**`, `[link text](https://…)`. Keep it to published work only.

## Social sharing image

The image shown when the site is shared on LinkedIn, WhatsApp and so on is `public/og-default.png`. If her name or headline changes, edit the text at the top of `scripts/generate-og.mjs` and run `npm run og-image`.

---

## Previewing locally (optional)

This needs [Node.js 22+](https://nodejs.org).

```bash
npm install        # first time only
npm run dev        # open http://localhost:4321 (TODO boxes are visible here)
npm run build      # the same check GitHub runs before publishing
npm run todos      # list every remaining TODO
```

In `npm run dev`, yellow **TODO** boxes show what still needs content. They never appear on the live site.
