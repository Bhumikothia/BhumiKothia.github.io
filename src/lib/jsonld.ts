/**
 * schema.org structured data (JSON-LD) so search engines understand who
 * Bhumi is and what she has published and presented.
 */
import type { CollectionEntry } from 'astro:content';
import { displayName, isoDate } from './format';

type Profile = CollectionEntry<'profile'>['data'];
type Pub = CollectionEntry<'publications'>;
type Talk = CollectionEntry<'talks'>;

export function personId(site: URL): string {
  return new URL('#person', site).href;
}

export function person(p: Profile, site: URL, imageUrl?: string) {
  const sameAs = Object.values(p.links).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(site),
    name: p.name,
    alternateName: p.alternateNames,
    url: site.href,
    ...(imageUrl ? { image: imageUrl } : {}),
    jobTitle: p.headline,
    description: p.shortBio,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: p.affiliation.name,
      ...(p.affiliation.url ? { url: p.affiliation.url } : {}),
      ...(p.affiliation.ror ? { sameAs: p.affiliation.ror } : {}),
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: p.location.city,
      addressRegion: p.location.region,
      addressCountry: p.location.country,
    },
    ...(p.links.orcid
      ? { identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: p.links.orcid } }
      : {}),
    knowsAbout: [...p.researchInterests, ...p.keywords],
    sameAs,
  };
}

function authorList(authors: string[], selfNames: string[], site: URL) {
  return authors.map((a) => {
    const family = a.split(',')[0].trim().toLowerCase();
    const isSelf = selfNames.some((n) => n.toLowerCase().includes(family));
    return isSelf
      ? { '@type': 'Person', '@id': personId(site), name: displayName(a) }
      : { '@type': 'Person', name: displayName(a) };
  });
}

export function publication(entry: Pub, selfNames: string[], site: URL) {
  const d = entry.data;
  const typeMap: Record<string, string> = {
    'journal-article': 'ScholarlyArticle',
    'conference-paper': 'ScholarlyArticle',
    preprint: 'ScholarlyArticle',
    magazine: 'Article',
    book: 'Book',
    'book-chapter': 'Chapter',
    dataset: 'Dataset',
    sequence: 'Dataset',
  };
  const url = d.doi ? `https://doi.org/${d.doi}` : d.url;
  return {
    '@context': 'https://schema.org',
    '@type': typeMap[d.type],
    '@id': new URL(`publications/#${entry.id}`, site).href,
    name: d.title,
    ...(typeMap[d.type] !== 'Dataset' ? { headline: d.title.slice(0, 110) } : {}),
    author: authorList(d.authors, selfNames, site),
    ...(d.type === 'dataset' || d.type === 'sequence' ? { creator: authorList(d.authors, selfNames, site) } : {}),
    datePublished: isoDate(d.date),
    ...(url ? { url, sameAs: url } : {}),
    ...(d.doi ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: d.doi } } : {}),
    ...(d.accession ? { identifier: { '@type': 'PropertyValue', propertyID: 'GenBank', value: d.accession } } : {}),
    ...(d.isbn ? { isbn: d.isbn } : {}),
    ...(d.license === 'CC BY 4.0' ? { license: 'https://creativecommons.org/licenses/by/4.0/' } : {}),
    ...(d.publisher ? { publisher: { '@type': 'Organization', name: d.publisher } } : {}),
    ...(d.type === 'journal-article'
      ? {
          isPartOf: {
            '@type': 'PublicationIssue',
            ...(d.issue ? { issueNumber: d.issue } : {}),
            isPartOf: {
              '@type': 'PublicationVolume',
              ...(d.volume ? { volumeNumber: d.volume } : {}),
              isPartOf: { '@type': 'Periodical', name: d.venue },
            },
          },
          ...(d.pages ? { pagination: d.pages } : {}),
        }
      : {}),
    ...(d.type === 'dataset' || d.type === 'sequence'
      ? { includedInDataCatalog: { '@type': 'DataCatalog', name: d.venue } }
      : {}),
  };
}

const ROLE_LABEL: Record<string, string> = {
  oral: 'Oral presentation',
  poster: 'Poster presentation',
  keynote: 'Keynote',
  invited: 'Invited talk',
  'session-chair': 'Session chair',
  panelist: 'Panelist',
  attendee: 'Attendee',
};

export function roleLabel(role: string): string {
  return ROLE_LABEL[role] ?? role;
}

export function event(entry: Talk, site: URL) {
  const d = entry.data;
  const mode = {
    'in-person': 'https://schema.org/OfflineEventAttendanceMode',
    virtual: 'https://schema.org/OnlineEventAttendanceMode',
    hybrid: 'https://schema.org/MixedEventAttendanceMode',
  } as const;
  const place = [d.location.venue, d.location.city, d.location.region, d.location.country].filter(Boolean).join(', ');
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': new URL(`talks/#${entry.id}`, site).href,
    name: d.event,
    description: `${roleLabel(d.role)}: “${d.title}”`,
    startDate: isoDate(d.startDate),
    endDate: isoDate(d.endDate ?? d.startDate),
    ...(d.mode ? { eventAttendanceMode: mode[d.mode] } : {}),
    ...(place ? { location: { '@type': 'Place', name: place, address: place } } : {}),
    ...(d.organizer ? { organizer: { '@type': 'Organization', name: d.organizer } } : {}),
    ...(d.role !== 'attendee' ? { contributor: { '@type': 'Person', '@id': personId(site) } } : {}),
    ...(d.links[0] ? { url: d.links[0].url } : {}),
  };
}
