import { defineCollection, z } from 'astro:content';

// PLAINspoken content architecture — mirrors the institutional-content-engine's
// three levels, plus evergreen explainers. One markdown file per piece,
// frontmatter carrying the metadata below. Fields not listed here are dropped
// at build, so every field the pipeline writes must be declared.

const dailyBriefs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(true), // keep true until the human approval gate clears it
  }),
});

// Evergreen explainers (Task H). The file name is the URL: src/content/explainers/opr.md
// is published at /explainers/opr/ and keeps that address for good. Updates change the
// file in place and bump `lastmod`; never rename the file.
const explainers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Short glossary name for the A to Z list on /explainers/ ("OPR (Overnight Policy Rate)").
    // Optional: when missing, the hub derives one from the title.
    term: z.string().optional(),
    date: z.date(),
    lastmod: z.date().optional(),
    summary: z.string(),
    topic: z.string().default('More'),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    type: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

// Budget series (one section per year). Files live in a year folder:
// src/content/budget/2027/income-tax.md is published at /budget/2027/income-tax/.
// part 0 is the year's feature; parts 1, 2, 3... are the series, listed in that order.
// Like explainers, a published file is never renamed: updates bump `lastmod`.
const budget = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastmod: z.date().optional(),
    summary: z.string(),
    year: z.number(),
    part: z.number().default(1),
    kind: z.enum(['feature', 'guide']).default('guide'),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

const commentary = defineCollection({
  // L2 — deep commentary, 500-1,200 words, one developed argument
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

const reports = defineCollection({
  // L3 — intelligence reports, 2,000-5,000 words, durable IP
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = {
  'daily-briefs': dailyBriefs,
  explainers,
  budget,
  commentary,
  reports,
};
