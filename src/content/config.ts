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
  commentary,
  reports,
};
