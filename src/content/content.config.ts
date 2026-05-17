import { defineCollection, z } from 'astro:content';

const post = defineCollection({
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
