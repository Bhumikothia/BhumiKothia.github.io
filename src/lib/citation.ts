import type { CollectionEntry } from 'astro:content';

type Pub = CollectionEntry<'publications'>['data'];

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** "Kothia, Bhumi A." → "Kothia, B. A." */
function apaAuthor(author: string): string {
  const [family, given = ''] = author.split(',').map((s) => s.trim());
  const initials = given
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((part) => `${part[0]}.`)
    .join(' ');
  return initials ? `${family}, ${initials}` : family;
}

function apaAuthors(authors: string[]): string {
  const list = authors.map(apaAuthor);
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]}, & ${list[1]}`;
  return `${list.slice(0, -1).join(', ')}, & ${list[list.length - 1]}`;
}

/** APA 7th-edition style reference (plain text). */
export function apa(p: Pub): string {
  const year = p.date.getUTCFullYear();
  const authors = apaAuthors(p.authors);
  const doi = p.doi ? ` https://doi.org/${p.doi}` : p.url ? ` ${p.url}` : '';
  switch (p.type) {
    case 'journal-article':
    case 'magazine': {
      let src = p.venue;
      if (p.volume) src += `, ${p.volume}`;
      if (p.issue) src += `(${p.issue})`;
      if (p.pages) src += `, ${p.pages}`;
      return `${authors} (${year}). ${p.title}. ${src}.${doi}`;
    }
    case 'dataset':
      return `${authors} (${year}). ${p.title} (Version ${(p.version ?? '1').replace(/^V/i, '')}) [Data set]. ${p.venue}.${doi}`;
    case 'book':
      return `${authors} (${year}). ${p.title}. ${p.publisher ?? p.venue}.${p.isbn ? ` ISBN ${p.isbn}.` : ''}${doi}`;
    case 'sequence':
      return `${authors} (${year}). ${p.title} (GenBank accession ${p.accession}) [Nucleotide sequence]. ${p.venue}.${doi}`;
    default:
      return `${authors} (${year}). ${p.title}. ${p.venue}.${doi}`;
  }
}

function bibKey(p: Pub): string {
  const family = p.authors[0].split(',')[0].trim().toLowerCase().replace(/[^a-z]/g, '');
  const word = p.title.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).find((w) => w.length > 3) ?? 'item';
  return `${family}${p.date.getUTCFullYear()}${word}`;
}

function esc(value: string): string {
  return value.replace(/([&%$#_])/g, '\\$1');
}

/** BibTeX entry. */
export function bibtex(p: Pub): string {
  const type =
    p.type === 'journal-article' || p.type === 'magazine'
      ? 'article'
      : p.type === 'book'
        ? 'book'
        : p.type === 'conference-paper'
          ? 'inproceedings'
          : 'misc';
  const fields: [string, string | undefined][] = [
    ['author', p.authors.join(' and ')],
    ['title', `{${esc(p.title)}}`],
    [type === 'article' ? 'journal' : type === 'misc' ? 'howpublished' : 'publisher', esc(type === 'book' ? (p.publisher ?? p.venue) : p.venue)],
    ['year', String(p.date.getUTCFullYear())],
    ['month', p.datePrecision !== 'year' ? MONTHS[p.date.getUTCMonth()] : undefined],
    ['volume', p.volume],
    ['number', p.issue],
    ['pages', p.pages?.replace('–', '--')],
    ['version', p.version],
    ['isbn', p.isbn],
    ['doi', p.doi],
    ['url', p.doi ? `https://doi.org/${p.doi}` : p.url],
    ['note', p.type === 'dataset' ? 'Dataset' : p.type === 'sequence' ? `GenBank accession ${p.accession}` : undefined],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => (k === 'month' ? `  ${k} = ${v}` : `  ${k} = {${v}}`))
    .join(',\n');
  return `@${type}{${bibKey(p)},\n${body}\n}`;
}
