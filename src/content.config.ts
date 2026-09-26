/**
 * Content schemas. Every file in src/content/ is checked against these rules
 * when the site builds — a missing date or a misspelled type stops the build
 * with a clear error instead of publishing something broken.
 *
 * See EDITING.md for a plain-language guide to each field.
 */
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({
  label: z.string(),
  url: z.url(),
});

/** Evidence for an entry: a live link, an archived copy, and/or a file in public/evidence/. */
const evidence = z.object({
  label: z.string(),
  url: z.url().optional(),
  archivedUrl: z.url().optional(),
  file: z.string().optional(), // e.g. "/evidence/certificate-icmbt-2024.pdf"
});

const datePrecision = z.enum(['day', 'month', 'year']).default('day');

const profile = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/profile' }),
  schema: z.object({
      name: z.string(),
      publishedAs: z.string().optional(),
      alternateNames: z.array(z.string()).default([]),
      pronouns: z.string().optional(),
      headline: z.string(),
      tagline: z.string(),
      location: z.object({
        city: z.string(),
        region: z.string(),
        country: z.string(),
        display: z.string(),
      }),
      affiliation: z.object({
        name: z.string(),
        department: z.string().optional(),
        url: z.url().optional(),
        ror: z.url().optional(),
      }),
      photo: z.string().optional(), // e.g. "/src/assets/images/bhumi-headshot.jpg"
      photoAlt: z.string().optional(),
      cv: z.string().optional(), // path under public/, e.g. "/cv/Bhumi-Kabariya-CV.pdf"
      links: z.object({
        googleScholar: z.url().optional(),
        orcid: z.url().optional(),
        linkedin: z.url().optional(),
        researchgate: z.url().optional(),
      }),
      availability: z.string().optional(),
      shortBio: z.string(),
      researchInterests: z.array(z.string()),
      keywords: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    type: z.enum([
      'journal-article',
      'conference-paper',
      'book',
      'book-chapter',
      'dataset',
      'sequence',
      'magazine',
      'preprint',
    ]),
    peerReviewed: z.boolean().default(false),
    authors: z.array(z.string()).min(1), // "Family, Given" — e.g. "Kothia, Bhumi A."
    date: z.coerce.date(),
    datePrecision,
    venue: z.string(), // journal, repository, magazine, or "Independently published"
    publisher: z.string().optional(),
    volume: z.coerce.string().optional(),
    issue: z.coerce.string().optional(),
    pages: z.coerce.string().optional(),
    version: z.coerce.string().optional(),
    doi: z.string().optional(), // bare DOI, e.g. "10.13005/bbra/3537"
    accession: z.coerce.string().optional(), // GenBank / database accession
    isbn: z.coerce.string().optional(),
    asin: z.coerce.string().optional(),
    url: z.url().optional(),
    license: z.string().optional(),
    featured: z.boolean().default(false),
    note: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    role: z.enum(['oral', 'poster', 'keynote', 'invited', 'session-chair', 'panelist', 'attendee']),
    event: z.string(),
    eventShort: z.string().optional(),
    organizer: z.string().optional(),
    location: z.object({
      venue: z.string().optional(),
      city: z.string().optional(),
      region: z.string().optional(),
      country: z.string().optional(),
    }),
    mode: z.enum(['in-person', 'virtual', 'hybrid']).optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    links: z.array(link).default([]),
    evidence: z.array(evidence).default([]),
    draft: z.boolean().default(false),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/training' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['workshop', 'course', 'certification', 'summer-school']),
    provider: z.string(),
    location: z.string().optional(),
    date: z.coerce.date(),
    datePrecision,
    evidence: z.array(evidence).default([]),
    draft: z.boolean().default(false),
  }),
});

const recognition = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/recognition' }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'award',
      'grant',
      'fellowship',
      'peer-review',
      'judging',
      'editorial',
      'membership',
      'media',
      'invited-role',
    ]),
    issuer: z.string(),
    issuerUrl: z.url().optional(),
    date: z.coerce.date(),
    datePrecision,
    endDate: z.coerce.date().optional(),
    summary: z.string(),
    evidence: z.array(evidence).min(1, 'Every recognition entry needs at least one piece of evidence.'),
    draft: z.boolean().default(false),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/education' }),
  schema: z.object({
    degree: z.string(),
    field: z.string(),
    institution: z.string(),
    institutionUrl: z.url().optional(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    status: z.enum(['completed', 'in-progress']),
    expected: z.string().optional(),
    thesis: z.string().optional(),
    note: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    location: z.string(),
    type: z.enum(['research', 'full-time', 'part-time', 'internship']),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    highlights: z.array(z.string()).default([]),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills/skills.yaml'),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    items: z.array(z.string()),
  }),
});

const beyond = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/beyond' }),
  schema: z.object({
      title: z.string(),
      kind: z.enum(['outreach', 'volunteering', 'hobby', 'mentoring', 'other']),
      date: z.coerce.date().optional(),
      photo: z.string().optional(), // e.g. "/src/assets/images/beyond/photo.jpg"
      photoAlt: z.string().optional(),
      link: link.optional(),
      draft: z.boolean().default(false),
  }),
});

export const collections = {
  profile,
  pages,
  publications,
  talks,
  training,
  recognition,
  education,
  experience,
  skills,
  beyond,
};
