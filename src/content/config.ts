import { defineCollection, z } from 'astro:content';

// PLAINspoken content architecture — mirrors the institutional-content-engine's
// three levels. This is where the content engine's output should land:
// one markdown file per piece, frontmatter carrying the metadata below.

const dailyBriefs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(true), // keep true until the human approval gate clears it
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
  commentary,
  reports,
};
