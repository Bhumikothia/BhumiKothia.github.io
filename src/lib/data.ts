/** Shared queries so every page sorts and filters content the same way. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('Missing src/content/profile/profile.md');
  return entry;
}

export function selfNames(profile: CollectionEntry<'profile'>['data']): string[] {
  return [profile.name, ...(profile.publishedAs ? [profile.publishedAs] : []), ...profile.alternateNames];
}

const byDateDesc = (a: Date, b: Date) => b.getTime() - a.getTime();

export async function getPublications() {
  const all = await getCollection('publications', ({ data }) => !data.draft);
  return all.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

export async function getTalks() {
  const all = await getCollection('talks', ({ data }) => !data.draft);
  return all.sort((a, b) => byDateDesc(a.data.startDate, b.data.startDate));
}

/** Split talks into upcoming (soonest first) and past (newest first), as of build time. */
export function splitTalks(talks: CollectionEntry<'talks'>[], now = new Date()) {
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const isUpcoming = (t: CollectionEntry<'talks'>) => (t.data.endDate ?? t.data.startDate) >= today;
  return {
    upcoming: talks.filter(isUpcoming).reverse(),
    past: talks.filter((t) => !isUpcoming(t)),
  };
}

export async function getRecognition() {
  const all = await getCollection('recognition', ({ data }) => !data.draft);
  return all.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

/** Counts derived from content — never typed by hand, so they are always accurate. */
export async function getStats() {
  const pubs = await getPublications();
  const talks = await getTalks();
  const count = (t: string) => pubs.filter((p) => p.data.type === t).length;
  return {
    journalArticles: count('journal-article'),
    datasets: count('dataset'),
    sequences: count('sequence'),
    books: count('book'),
    oral: talks.filter((t) => ['oral', 'keynote', 'invited'].includes(t.data.role)).length,
    posters: talks.filter((t) => t.data.role === 'poster').length,
    presentations: talks.filter((t) => t.data.role !== 'attendee').length,
  };
}

export function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}
