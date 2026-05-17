import { defineCollection, } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const post = defineCollection({
    loader: glob({ base: './src/content/post', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		audioSource: z.string(),
		audioSize: z.number(),
	}),
});

export const collections = { post };
