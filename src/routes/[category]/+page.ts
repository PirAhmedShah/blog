import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { category: slug } = params;
	const { categories, postsByCategory } = await parent();

	const category = categories.find((c) => c.slug === slug);
	if (!category) error(404, `Category "${slug}" does not exist.`);

	const posts = postsByCategory[slug] ?? [];
	const content = await category.load();

	const tags = new Set<string>();
	for (const post of posts) {
		if (post.metadata.tags) {
			for (const tag of post.metadata.tags) tags.add(tag);
		}
	}

	return { category, content, posts, tags: [...tags].sort() };
};
