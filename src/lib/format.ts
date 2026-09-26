export type Precision = 'day' | 'month' | 'year';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Dates in content files are calendar dates, so always read them in UTC. */
export function formatDate(date: Date, precision: Precision = 'day'): string {
  const y = date.getUTCFullYear();
  const m = MONTHS[date.getUTCMonth()];
  if (precision === 'year') return String(y);
  if (precision === 'month') return `${m} ${y}`;
  return `${date.getUTCDate()} ${m} ${y}`;
}

export function formatMonthYear(date: Date): string {
  return `${MONTHS[date.getUTCMonth()].slice(0, 3)} ${date.getUTCFullYear()}`;
}

/** "16–17 October 2023", "28 Feb – 2 Mar 2024", "9 February 2024". */
export function formatRange(start: Date, end?: Date): string {
  if (!end || start.getTime() === end.getTime()) return formatDate(start);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();
  if (sameMonth) {
    return `${start.getUTCDate()}–${end.getUTCDate()} ${MONTHS[end.getUTCMonth()]} ${end.getUTCFullYear()}`;
  }
  if (sameYear) {
    return `${start.getUTCDate()} ${MONTHS[start.getUTCMonth()].slice(0, 3)} – ${end.getUTCDate()} ${MONTHS[end.getUTCMonth()].slice(0, 3)} ${end.getUTCFullYear()}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** "Jul 2021 – Mar 2022" or "Mar 2022 – present". */
export function formatSpan(start: Date, end?: Date): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'present'}`;
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Prefix an internal path with the site's base path (needed on GitHub Pages project sites). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** "Kothia, Bhumi A." → "Bhumi A. Kothia" */
export function displayName(author: string): string {
  const [family, given] = author.split(',').map((s) => s.trim());
  return given ? `${given} ${family}` : family;
}

/** Absolute URL of the site root, including the base path, always ending in "/". */
export function siteRoot(site: URL | undefined): URL {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return new URL(base, site);
}
