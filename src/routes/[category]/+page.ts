import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { categories } = await parent();
	const category = categories.find((c) => c.slug === params.category);

	if (!category) error(404, `Category "${params.category}" not found.`);

	const content = await category.load();
	return { content, category };
};
