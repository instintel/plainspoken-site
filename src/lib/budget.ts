import { getCollection, type CollectionEntry } from 'astro:content';

export type BudgetEntry = CollectionEntry<'budget'>;

// Published Budget pages, grouped by year (newest year first), each year's pages
// in series order: the feature (part 0) first, then parts 1, 2, 3...
export async function budgetYears() {
  const pages = (await getCollection('budget')).filter((p) => !p.data.draft);
  const years = [...new Set(pages.map((p) => p.data.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    pages: pages
      .filter((p) => p.data.year === year)
      .sort((a, b) => a.data.part - b.data.part || a.data.title.localeCompare(b.data.title)),
  }));
}
